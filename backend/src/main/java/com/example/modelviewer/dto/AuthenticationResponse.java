package com.example.modelviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	private String accessToken;
	private String tokenType = "Bearer";
	private Long expiresIn;
	private UserInfo user;

	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class UserInfo {
		private Long id;
		private String email;
		private String firstName;
		private String lastName;
		private String role;
	}
}
