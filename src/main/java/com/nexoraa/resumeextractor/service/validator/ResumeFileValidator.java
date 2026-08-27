package com.nexoraa.resumeextractor.service.validator;

import com.nexoraa.resumeextractor.exception.InvalidResumeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ResumeFileValidator {
	
	@Value("${app.max-file-size}")
	private DataSize maxFileSize;
	
	public void validateFile(MultipartFile file) {
		
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

}
