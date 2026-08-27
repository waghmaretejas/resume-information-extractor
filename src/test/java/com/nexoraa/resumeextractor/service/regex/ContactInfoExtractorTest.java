package com.nexoraa.resumeextractor.service.regex;

import com.nexoraa.resumeextractor.model.PersonalInfo;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class ContactInfoExtractorTest {
	
	private final ContactInfoExtractor extractor =
			new ContactInfoExtractor();
	
	@Test
	void shouldExtractAllContactInformation() {
		
		String resumeText = """
                Tejas Waghmare
                Email: tejas@example.com
                Phone: +91 9876543210
                GitHub: https://github.com/waghmaretejas
                LinkedIn: https://www.linkedin.com/in/waghmaretejas
                """;
		
		PersonalInfo result = extractor.extract(resumeText);
		
		assertEquals("tejas@example.com", result.getEmail());
		assertEquals("+91 9876543210", result.getPhone());
		assertEquals(
				"https://github.com/waghmaretejas",
				result.getGithub()
		);
		assertEquals(
				"https://www.linkedin.com/in/waghmaretejas",
				result.getLinkedin()
		);
	}
	
	@Test
	void shouldReturnNullWhenContactInformationIsMissing() {
		
		String resumeText = "This resume contains no contact information.";
		
		PersonalInfo result = extractor.extract(resumeText);
		
		assertNull(result.getEmail());
		assertNull(result.getPhone());
		assertNull(result.getGithub());
		assertNull(result.getLinkedin());
	}
}
