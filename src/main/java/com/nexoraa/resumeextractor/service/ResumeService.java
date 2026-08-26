package com.nexoraa.resumeextractor.service;

import com.nexoraa.resumeextractor.service.extractor.ResumeTextExtractor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ResumeService {
	
	@Value("${app.max-file-size}")
	private DataSize maxFileSize;
	
	private final List<ResumeTextExtractor> resumeTextExtractors;
	
	public ResumeService(List<ResumeTextExtractor> resumeTextExtractors) {
		this.resumeTextExtractors = resumeTextExtractors;
	}
	
	public String uploadResume(MultipartFile file) throws IOException {
	
		validateFile(file);
		
		String fileName = file.getOriginalFilename();
		
		ResumeTextExtractor extractor = getExtractor(fileName);
		
		return extractor.extractText(file);
	}
	
	
	private void validateFile(MultipartFile file) {
		
		if (file.isEmpty()) {
			throw new IllegalArgumentException("Please upload a valid resume file");
		}
		
		if (file.getSize() > maxFileSize.toBytes()) {
			throw new IllegalArgumentException(
					"File size must not exceed " + maxFileSize.toMegabytes() + " MB"
			);
		}
		
		String fileName = file.getOriginalFilename();
		
		if (fileName == null ||
				(!fileName.toLowerCase().endsWith(".pdf")
						&& !fileName.toLowerCase().endsWith(".docx"))) {
			
			throw new IllegalArgumentException("Only PDF and DOCX files are allowed");
		}
		
	}
	
	private ResumeTextExtractor getExtractor(String fileName) {
		
		for (ResumeTextExtractor extractor : resumeTextExtractors) {
			
			if (extractor.supports(fileName)) {
				return extractor;
			}
		}
		
		throw new IllegalArgumentException("No extractor found for this file type");
	}
}
