package com.example.modelviewer.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;


@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expiration}")
	private Long jwtExpiration;

	private final Set<String> invalidTokens = ConcurrentHashMap.newKeySet();

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>(), userDetails);
	}

	public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
		return buildToken(claims, userDetails, jwtExpiration);
	}

	public Long getJwtExpirationTime() {
		return jwtExpiration;
	}

	private String buildToken(Map<String, Object> claims, UserDetails userDetails, Long expiration) {
		return Jwts.builder()
		           .claims(claims)
		           .subject(userDetails.getUsername())
		           .issuedAt(new Date(System.currentTimeMillis()))
		           .expiration(new Date(System.currentTimeMillis() + expiration))
		           .signWith(getSignInKey())
		           .compact();
	}

	public boolean isTokenValid(String token) {
		if (token == null) return false;
		if (invalidTokens.contains(token)) return false;

		try {
			Claims claims = extractAllClaims(token);
			Date exp = claims.getExpiration();
			return exp == null || exp.after(new Date());
		}
		catch (JwtException |
		       IllegalArgumentException ex) {
			// malformed, expired, unsupported, signature invalid, etc.
			return false;
		}
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public void invalidateToken(String token) {
		invalidTokens.add(token);
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser()
		           .verifyWith(getSignInKey())
		           .build()
		           .parseSignedClaims(token)
		           .getPayload();
	}

	private SecretKey getSignInKey() {
		return Keys.hmacShaKeyFor(secretKey.getBytes());
	}
}
