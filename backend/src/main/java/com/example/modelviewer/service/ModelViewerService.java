package com.example.modelviewer.service;

import com.example.modelviewer.model.ModelViewerFile;
import com.example.modelviewer.repository.ModelViewerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ModelViewerService {
	private final ModelViewerRepository repo;

	@Value("${storage.path}")
	private String storagePath;
	@Value("${storage.mode}")
	private String stoargeMode;

	public ModelViewerService(ModelViewerRepository repo) {
		this.repo = repo;
	}

	//uploads file and saves it either on app storage or to db according to the storage mode
	public ModelViewerFile saveFile(MultipartFile file) {
		try {
			Path storageDir = Paths.get(storagePath);

			if (Files.notExists(storageDir)) {
				Files.createDirectories(storageDir);
			}

			String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();

			Path targetPath = storageDir.resolve(uniqueName);
			Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

			ModelViewerFile modelViewerFile = new ModelViewerFile();
			modelViewerFile.setFilename(file.getOriginalFilename());
			modelViewerFile.setSize(file.getSize());
			modelViewerFile.setUploadDate(LocalDateTime.now());
			modelViewerFile.setStoragePath(targetPath.toString());

			return repo.save(modelViewerFile);
		}
		catch (IOException e) {
			throw new RuntimeException("Failed to store file", e);
		}
	}

	public List<ModelViewerFile> listFiles() {
		return repo.findAll();
	}
}
