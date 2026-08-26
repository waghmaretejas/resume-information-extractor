package com.nexoraa.resumeextractor.service;

import com.nexoraa.resumeextractor.exception.InvalidResumeException;
import com.nexoraa.resumeextractor.service.extractor.ResumeTextExtractor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ResumeService {
	
	private final List<ResumeTextExtractor> resumeTextExtractors;
	@Value("${app.max-file-size}")
	private DataSize maxFileSize;
	
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
			throw new InvalidResumeException("Please upload a valid resume file");
		}
		
		if (file.getSize() > maxFileSize.toBytes()) {
			throw new InvalidResumeException("File size must not exceed " + maxFileSize.toMegabytes() + " MB");
		}
		
		String fileName = file.getOriginalFilename();
		
		if (fileName == null || (!fileName.toLowerCase().endsWith(".pdf") && !fileName.toLowerCase().endsWith(".docx"))) {
			
			throw new InvalidResumeException("Only PDF and DOCX files are allowed");
		}
		
	}
	
	private ResumeTextExtractor getExtractor(String fileName) {
		
		for (ResumeTextExtractor extractor : resumeTextExtractors) {
			
			if (extractor.supports(fileName)) {
				return extractor;
			}
		}
		
		throw new InvalidResumeException("No extractor found for this file type");
	}
}
