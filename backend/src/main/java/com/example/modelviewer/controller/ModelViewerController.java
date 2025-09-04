package com.example.modelviewer.controller;

import com.example.modelviewer.model.ModelViewerFile;
import com.example.modelviewer.service.ModelViewerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
	public ResponseEntity<ModelViewerFile> upload(@RequestParam("file") MultipartFile file) {
		return ResponseEntity.ok(service.saveFile(file));
	}

	@GetMapping("/getAll")
	public List<ModelViewerFile> list() {
		return service.listFiles();
	}
}
