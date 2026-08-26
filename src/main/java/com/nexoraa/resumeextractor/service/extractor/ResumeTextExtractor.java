package com.nexoraa.resumeextractor.service.extractor;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ResumeTextExtractor {
	
	boolean supports(String fileName);
	
	String extractText(MultipartFile file) throws IOException;
	
}
	

