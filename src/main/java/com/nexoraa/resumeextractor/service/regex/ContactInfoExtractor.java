package com.nexoraa.resumeextractor.service.regex;

import com.nexoraa.resumeextractor.model.PersonalInfo;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ContactInfoExtractor {
	
	private static final Pattern EMAIL_PATTERN =
			Pattern.compile(
					"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"
			);
	
	private static final Pattern PHONE_PATTERN =
			Pattern.compile(
					"(?<!\\d)(?:\\+91[\\s-]?)?[6-9]\\d{4}[\\s-]?\\d{5}(?!\\d)"
			);
	
	private static final Pattern GITHUB_PATTERN =
			Pattern.compile(
					"(?i)(?:https?://)?(?:www\\.)?github\\.com/[A-Za-z0-9-]+"
			);
	
	private static final Pattern LINKEDIN_PATTERN =
			Pattern.compile(
					"(?i)(?:https?://)?(?:www\\.)?linkedin\\.com/in/[A-Za-z0-9-_%]+/?"
			);
	
	public PersonalInfo extract(String resumeText) {
		
		PersonalInfo personalInfo = new PersonalInfo();
		
		personalInfo.setName(extractName(resumeText));
		personalInfo.setEmail(extractFirstMatch(EMAIL_PATTERN, resumeText));
		personalInfo.setPhone(extractFirstMatch(PHONE_PATTERN, resumeText));
		personalInfo.setGithub(extractFirstMatch(GITHUB_PATTERN, resumeText));
		personalInfo.setLinkedin(extractFirstMatch(LINKEDIN_PATTERN, resumeText));
		
		return personalInfo;
	}
	
	private String extractName(String resumeText) {
		
		return resumeText
				.lines()
				.map(String::trim)
				.filter(line -> !line.isEmpty())
				.filter(line -> line.matches(".*[A-Za-z].*"))
				.findFirst()
				.orElse(null);
	}
	
	private String extractFirstMatch(Pattern pattern, String text) {
		
		Matcher matcher = pattern.matcher(text);
		
		if (matcher.find()) {
			return matcher.group();
		}
		
		return null;
	}
}
