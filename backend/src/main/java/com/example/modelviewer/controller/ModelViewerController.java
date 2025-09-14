package com.example.modelviewer.controller;

import com.example.modelviewer.model.ModelViewerFile;
import com.example.modelviewer.service.ModelViewerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.rmi.server.UID;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/models")
public class ModelViewerController {
	private final ModelViewerService service;

	public ModelViewerController(ModelViewerService service) {
		this.service = service;
	}

	@GetMapping("/")
	public String hello() {
		return "Backend is running 🚀";
	}

	@PostMapping("/addModel")
	public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file,
	                                Authentication auth) {
		String username = auth.getName();
		return ResponseEntity.ok(service.saveFile(file, username));
	}

	@GetMapping("/getAll")
	public List<ModelViewerFile> list() {
		return service.listFiles();
	}

	@GetMapping("/get/{id}")
	public ModelViewerFile getFile(@PathVariable("id") Long id) {return service.getFile(id);}
}
