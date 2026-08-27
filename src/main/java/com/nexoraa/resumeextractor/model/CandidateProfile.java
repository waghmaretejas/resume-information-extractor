package com.nexoraa.resumeextractor.model;

import lombok.Data;

import java.util.List;

@Data
public class CandidateProfile {
	
	private PersonalInfo personalInfo;
	
	private List<Education> education;
	
	private Skills skills;
	
	private List<WorkExperience> workExperience;
	
	private List<Project> projects;
	
	private List<Certification> certifications;
	
	private List<Achievement> achievements;
}
