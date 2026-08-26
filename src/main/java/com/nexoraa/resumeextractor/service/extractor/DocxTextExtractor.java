package com.nexoraa.resumeextractor.service.extractor;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DocxTextExtractor implements ResumeTextExtractor{
	
	@Override
	public boolean supports(String fileName) {
		return fileName != null && fileName.toLowerCase().endsWith(".docx");
	}
	
	@Override
	public String extractText(MultipartFile file) throws IOException {
		
		try (XWPFDocument document = new XWPFDocument(file.getInputStream())) {
			
			StringBuilder extractedText = new StringBuilder();
			
			for (XWPFParagraph paragraph : document.getParagraphs()) {
				extractedText.append(paragraph.getText());
				extractedText.append("\n");
			}
			
			return extractedText.toString();
		}
	}
}
