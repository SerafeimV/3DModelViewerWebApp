package com.example.modelviewer.repository;

import com.example.modelviewer.model.ModelViewerFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModelViewerRepository extends JpaRepository<ModelViewerFile, Long> {
	Optional<ModelViewerFile> findById(Long id);
}
