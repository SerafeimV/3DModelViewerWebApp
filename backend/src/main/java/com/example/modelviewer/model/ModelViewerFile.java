package com.example.modelviewer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Table(name = "model_viewer_file")
@Entity
public class ModelViewerFile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String filename;
	private Long size;
	private String uploadedBy;
	private LocalDateTime uploadDate;
	private String storagePath;

	public String getContentType() {
		if (filename.endsWith(".glb")) return "model/gltf-binary";
		if (filename.endsWith(".gltf")) return "model/gltf+json";
		if (filename.endsWith(".obj")) return "text/plain";
		if (filename.endsWith(".fbx")) return "application/octet-stream";

		// Last-resort fallback
		return "application/octet-stream";
	}
}