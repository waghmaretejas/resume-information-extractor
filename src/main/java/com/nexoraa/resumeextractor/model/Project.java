package com.nexoraa.resumeextractor.model;

import lombok.Data;

import java.util.List;

@Data
public class Project {
	
	private String name;
	
	private String description;
	
	private String github;
	
	private List<String> links;
	
	private List<String> technologies;
}
