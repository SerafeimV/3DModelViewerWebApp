package com.example.modelviewer.config;

import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(
					@NonNull org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
				registry.addMapping("/**")
				        .allowedHeaders("*")
				        .allowedOrigins("http://localhost:5174", "http://localhost:5173")
				        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				        .allowCredentials(true);
			}
		};
	}
}
