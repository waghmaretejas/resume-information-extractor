package com.nexoraa.resumeextractor.controller;

import com.nexoraa.resumeextractor.model.CandidateProfile;
import com.nexoraa.resumeextractor.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
	
	private final ResumeService resumeService;
	
	public ResumeController(ResumeService resumeService) {
		this.resumeService = resumeService;
	}
	
	@PostMapping("/upload")
	public ResponseEntity<CandidateProfile> uploadResume(
			@RequestParam("file") MultipartFile file
	) throws IOException {
		
		CandidateProfile candidateProfile =
				resumeService.uploadResume(file);
		
		return ResponseEntity.ok(candidateProfile);
	}
}
