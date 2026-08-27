package com.nexoraa.resumeextractor.service.ai;

import com.nexoraa.resumeextractor.model.CandidateProfile;
import com.nexoraa.resumeextractor.prompt.ResumeExtractionPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {
	
	private final ChatClient chatClient;
	
	public GeminiService(ChatClient chatClient) {
		this.chatClient = chatClient;
	}
	
	public CandidateProfile extractResume(String resumeText) {
		
		String prompt = ResumeExtractionPrompt.create(resumeText);
		
		return chatClient
				.prompt()
				.user(prompt)
				.call()
				.entity(CandidateProfile.class);
	}
}
