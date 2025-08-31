package com.example.modelviewer.repository;

import com.example.modelviewer.model.ModelViewerFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelViewerRepository extends JpaRepository<ModelViewerFile, Long> {
}
