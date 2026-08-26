package com.nexoraa.resumeextractor.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {
	
	@Value("${app.max-file-size}")
	private DataSize maxFileSize;
	
	public String uploadResume(MultipartFile file) {
		if (file.isEmpty()) {
			return "Please upload a valid resume file";
		}
		
		if (file.getSize() > maxFileSize.toBytes()) {
			return "File size must not exceed " + maxFileSize.toMegabytes() + " MB";
		}
		
		String fileName = file.getOriginalFilename();
		
		if (fileName == null || !fileName.toLowerCase().endsWith(".pdf") && !fileName.toLowerCase().endsWith(".docx")) {
			return "Only PDF and DOCX files are allowed";
		}
		
		return "Resume uploaded successfully";
	}
	
}
