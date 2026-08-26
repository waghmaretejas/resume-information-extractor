package com.nexoraa.resumeextractor.service.extractor;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@Service
public class PdfTextExtractor implements ResumeTextExtractor{
	
	@Override
	public boolean supports(String fileName) {
		return fileName != null && fileName.toLowerCase().endsWith(".pdf");
	}
	
	@Override
	public String extractText(MultipartFile file) throws IOException {
		
		try (PDDocument document = Loader.loadPDF(file.getBytes())) {
			
			PDFTextStripper textStripper = new PDFTextStripper();
			
			return textStripper.getText(document);
		}
	}
}
