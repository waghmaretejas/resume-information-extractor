package com.nexoraa.resumeextractor.prompt;

public final class ResumeExtractionPrompt {
	
	private ResumeExtractionPrompt() {
	}
	
	public static String create(String resumeText) {
		
		return """
                You are an accurate resume information extraction system.

                Extract information only from the provided resume and return
                structured data matching the CandidateProfile schema.

                GENERAL RULES:
                1. Extract only information explicitly present in the resume.
                2. Do not invent, assume, or infer missing information.
                3. Use null for missing single values.
                4. Use empty lists for sections not present in the resume.
                5. Preserve information accurately.
                6. Do not add explanations outside the structured response.

                PERSONAL INFORMATION:
                Do not extract personal information.
                Name, email, phone, GitHub, and LinkedIn are extracted
                separately by another component.

                EDUCATION:
                For every education entry, extract:
                - degree
                - institution
                - location, only if explicitly present
                - startDate
                - endDate
                - score, CGPA, percentage, or grade

                If education is ongoing or currently pursuing, preserve that
                information in the appropriate date field.

                SKILLS:
                Separate skills into:
                - technicalSkills
                - softSkills

                Technical skills include explicitly mentioned programming
                languages, frameworks, libraries, databases, tools, cloud
                platforms, APIs, DevOps technologies, and other technologies.

                Do not include hobbies, interests, spoken languages, or
                unrelated personal information as skills.

                WORK EXPERIENCE:
                For every work experience entry, extract:
                - position
                - company
                - location
                - startDate
                - endDate
                - description

                Keep responsibilities and work details associated with the
                correct company and position.

                If multiple projects are described under a job, keep the job
                as one work experience entry and preserve its relevant work
                details in the description.

                PROJECTS:
                Extract all explicitly described projects, including:
                - personal projects
                - academic projects
                - freelance projects

                For every project, extract:
                - name
                - description
                - GitHub URL, only if explicitly associated with that project
                - links
                - technologies

                If a project contains website URLs, live demo URLs, repository
                URLs, or other project-specific links, place them in links
                instead of including them inside the description.

                IMPORTANT FOR PROJECT TECHNOLOGIES:
                Include technologies explicitly listed in the project's tech
                stack or explicitly mentioned in the project's description.

                This may include programming languages, frameworks, libraries,
                databases, APIs, security technologies, ORMs, validation
                frameworks, build tools, cloud services, DevOps tools, and
                other technologies.

                Do not omit explicitly mentioned project technologies.

                CERTIFICATIONS:
                For every certification, extract:
                - name
                - issuer
                - issueDate
                - credentialId

                ACHIEVEMENTS:
                Extract meaningful achievements only.

                For every achievement, extract:
                - title
                - description

                Avoid unnecessarily duplicating the exact same sentence in
                both title and description when a shorter title can represent
                the achievement.

                Do not treat hobbies, interests, extracurricular activities,
                or spoken languages as achievements unless they are explicitly
                presented as an achievement.

                Resume:
                --------------------
                %s
                --------------------
                """.formatted(resumeText);
	}
}
