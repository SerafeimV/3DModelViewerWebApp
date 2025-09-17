package com.example.modelviewer.controller;

import com.example.modelviewer.dto.AuthenticationRequest;
import com.example.modelviewer.dto.AuthenticationResponse;
import com.example.modelviewer.dto.RegisterRequest;
import com.example.modelviewer.service.AuthenticationService;
import com.example.modelviewer.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;
	private final JwtService jwtService;

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
		return ResponseEntity.ok(authenticationService.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authenticationService.authenticate(request));
	}

	@GetMapping("/me")
	public ResponseEntity<String> getCurrentUser(@RequestHeader("Authorization") String token) {
		if (jwtService.isTokenValid(token)) {
			return ResponseEntity.ok("You are authenticated!");
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
		                     .build();
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logout(@RequestHeader("Authorization") String token) {
		System.out.println("Auth header: " + token); // debug
		if (token == null || !token.startsWith("Bearer ")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			                     .build();
		}
		jwtService.invalidateToken(token.replace("Bearer ", ""));
		return ResponseEntity.ok()
		                     .build();
	}
}
