package com.nexoraa.resumeextractor.service;

import com.nexoraa.resumeextractor.exception.InvalidResumeException;
import com.nexoraa.resumeextractor.model.CandidateProfile;
import com.nexoraa.resumeextractor.service.ai.GeminiService;
import com.nexoraa.resumeextractor.service.extractor.ResumeTextExtractor;
import com.nexoraa.resumeextractor.service.validator.ResumeFileValidator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ResumeService {
	
	private final List<ResumeTextExtractor> resumeTextExtractors;
	private final ResumeFileValidator resumeFileValidator;
	private final GeminiService geminiService;
	
	public ResumeService(
			List<ResumeTextExtractor> resumeTextExtractors,
			ResumeFileValidator resumeFileValidator,
			GeminiService geminiService) {
		
		this.resumeTextExtractors = resumeTextExtractors;
		this.resumeFileValidator = resumeFileValidator;
		this.geminiService = geminiService;
	}
	
	public CandidateProfile uploadResume(MultipartFile file) throws IOException {
		
		resumeFileValidator.validateFile(file);
		
		String fileName = file.getOriginalFilename();
		
		ResumeTextExtractor extractor = getExtractor(fileName);
		
		String resumeText = extractor.extractText(file);
		
		CandidateProfile candidateProfile =
				geminiService.extractResume(resumeText);
		
		return candidateProfile;
	}
	
	private ResumeTextExtractor getExtractor(String fileName) {
		
		for (ResumeTextExtractor extractor : resumeTextExtractors) {
			
			if (extractor.supports(fileName)) {
				return extractor;
			}
		}
		
		throw new InvalidResumeException(
				"No extractor found for this file type"
		);
	}
}
