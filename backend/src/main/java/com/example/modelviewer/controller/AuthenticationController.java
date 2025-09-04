package com.example.modelviewer.controller;

import com.example.modelviewer.dto.AuthenticationRequest;
import com.example.modelviewer.dto.AuthenticationResponse;
import com.example.modelviewer.dto.RegisterRequest;
import com.example.modelviewer.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
		return ResponseEntity.ok(authenticationService.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authenticationService.authenticate(request));
	}

	@GetMapping("/me")
	public ResponseEntity<String> getCurrentUser() {
		return ResponseEntity.ok("You are authenticated!");
	}
}
