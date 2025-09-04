package com.example.modelviewer.service;

import com.example.modelviewer.dto.AuthenticationRequest;
import com.example.modelviewer.dto.AuthenticationResponse;
import com.example.modelviewer.dto.RegisterRequest;
import com.example.modelviewer.model.User;
import com.example.modelviewer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.getEmail()))
			throw new RuntimeException("User already exists with email " + request.getEmail());

		var user = User.builder()
		               .firstName(request.getFirstName())
		               .lastName(request.getLastName())
		               .email(request.getEmail())
		               .password(passwordEncoder.encode(request.getPassword()))
		               .role(User.Role.USER)
		               .build();

		var savedUser = userRepository.save(user);
		var jwtToken = jwtService.generateToken(savedUser);

		return AuthenticationResponse.builder()
		                             .accessToken(jwtToken)
		                             .expiresIn(jwtService.getJwtExpirationTime())
		                             .user(AuthenticationResponse.UserInfo.builder()
		                                                                  .id(savedUser.getId())
		                                                                  .email(savedUser.getEmail())
		                                                                  .firstName(savedUser.getFirstName())
		                                                                  .lastName(savedUser.getLastName())
		                                                                  .role(savedUser.getRole()
		                                                                                 .name())
		                                                                  .build())
		                             .build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
				)
		                                  );

		var user = userRepository.findByEmail(request.getEmail())
		                         .orElseThrow(() -> new RuntimeException(
				                         "User not found with email: " + request.getEmail()));
		var jwtToken = jwtService.generateToken(user);

		return AuthenticationResponse.builder()
		                             .accessToken(jwtToken)
		                             .expiresIn(jwtService.getJwtExpirationTime())
		                             .user(AuthenticationResponse.UserInfo.builder()
		                                                                  .id(user.getId())
		                                                                  .email(user.getEmail())
		                                                                  .firstName(user.getFirstName())
		                                                                  .lastName(user.getLastName())
		                                                                  .role(user.getRole()
		                                                                            .name())
		                                                                  .build())
		                             .build();
	}
}
