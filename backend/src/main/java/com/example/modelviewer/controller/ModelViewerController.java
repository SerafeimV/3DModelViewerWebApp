package com.example.modelviewer.controller;

import com.example.modelviewer.model.ModelViewerFile;
import com.example.modelviewer.service.ModelViewerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
	public ResponseEntity<Resource> getFile(@PathVariable("id") Long id) throws
	                                                                     IOException {
		ModelViewerFile file = service.getFile(id);
		Path path = Paths.get(file.getStoragePath());

		Resource resource = new UrlResource(path.toUri());
		String contentType = file.getContentType();
		return ResponseEntity.ok()
		                     .contentType(MediaType.parseMediaType(contentType))
		                     .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; " +
				                     "filename=\"" + file.getFilename() + "\""
		                            )
		                     .body(resource);
	}
}
