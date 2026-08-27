package com.nexoraa.resumeextractor.model;

import lombok.Data;

@Data
public class WorkExperience {
	
	private String company;
	
	private String position;
	
	private String location;
	
	private String startDate;
	
	private String endDate;
	
	private String description;
}
