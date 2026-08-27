import { useRef, useState } from "react";
import {
  ArrowUpFromLine,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  CloudUpload,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  Upload,
  Wrench,
  X,
} from "lucide-react";

import { uploadResume } from "./api/resumeApi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function Header({ onReset }) {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 px-5 py-4 backdrop-blur sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-950 sm:text-xl">
              Resume Information Extractor
            </h1>
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              AI-Powered Resume Analysis
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-500 bg-white px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 sm:px-4 sm:text-sm"
        >
          <CloudUpload size={16} />
          <span className="hidden sm:inline">Upload Another</span>
          <span className="sm:hidden">Upload</span>
        </button>
      </div>
    </header>
  );
}

function UploadPanel({ selectedFile, setSelectedFile, onExtract, loading }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const validateAndSetFile = (file) => {
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
      setFileError("Only PDF and DOCX files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (file.size === 0) {
      setFileError("The selected file is empty.");
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must not exceed 5 MB.");
      setSelectedFile(null);
      return;
    }

    setFileError("");
    setSelectedFile(file);
  };

  const handleFileChange = (event) => {
    validateAndSetFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndSetFile(event.dataTransfer.files?.[0]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6 lg:p-7">
      <div className="text-center">
        <h2 className="text-xl font-bold text-indigo-600">Upload Resume</h2>
        <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-slate-500">
          Upload your resume in PDF or DOCX format and let AI extract the
          information
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className={`mt-8 rounded-xl border-2 border-dashed p-7 text-center transition sm:p-9 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-indigo-300 bg-indigo-50/20 hover:border-indigo-500 hover:bg-indigo-50/60"
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <ArrowUpFromLine size={32} strokeWidth={1.8} />
        </div>

        <p className="mt-5 text-sm font-medium text-slate-700">
          Drag and drop your resume here
        </p>
        <p className="my-3 text-sm text-slate-400">or</p>

        <button
          type="button"
          onClick={handleBrowseClick}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Upload size={16} />
          Browse File
        </button>

        <p className="mt-4 text-xs font-medium text-slate-500">
          PDF or DOCX (Max 5MB)
        </p>
      </div>

      {fileError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {fileError}
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <FileText size={21} />
          </div>

          <div className="min-w-0 flex-1">
            {selectedFile ? (
              <>
                <p className="truncate text-sm font-semibold text-slate-800">
                  {selectedFile.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </>
            ) : (
              <>
                <p className="truncate text-sm font-semibold text-slate-800">
                  No resume selected
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Choose a file to continue
                </p>
              </>
            )}
          </div>

          {selectedFile && (
            <button
              type="button"
              onClick={removeFile}
              className="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              title="Remove file"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onExtract}
        disabled={!selectedFile || loading}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition ${
          selectedFile && !loading
            ? "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-200 hover:-translate-y-0.5 hover:shadow-lg"
            : "cursor-not-allowed bg-indigo-300"
        }`}
      >
        <Sparkles size={17} />
        {loading ? "Analyzing your resume..." : "Extract Information"}
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={17} />
        <span>Your data is secure and will not be stored.</span>
      </div>
    </aside>
  );
}

function EmptyState({ message = "No information found." }) {
  return (
    <div className="flex flex-1 items-center justify-center py-8 text-center">
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <section className="min-h-[190px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={19} />
        </div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ProfilePlaceholder() {
  return (
    <div className="rounded-2xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-8 text-center sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-indigo-500 shadow-sm ring-8 ring-indigo-100/60">
        <CircleUserRound size={32} strokeWidth={1.6} />
      </div>
      <h3 className="mt-6 text-lg font-bold text-slate-800">
        Your candidate profile will appear here
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Upload a resume and extract its information to see a structured
        candidate profile.
      </p>
    </div>
  );
}

function CandidateProfile({ personalInfo }) {
  const info = personalInfo || {};
  const firstLetter = info.name?.charAt(0)?.toUpperCase() || "?";

  const normalizeUrl = (value) => {
    if (!value) return "";
    return value.startsWith("http://") || value.startsWith("https://")
      ? value
      : `https://${value}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-bold text-white">
          {firstLetter}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-bold text-slate-900">
            {info.name || "Name not found"}
          </h3>

          <p className="mt-1 text-sm font-medium text-indigo-600">
            Candidate Profile
          </p>

          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-600">
            {info.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-slate-400" />
                <span>{info.email}</span>
              </div>
            )}

            {info.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-slate-400" />
                <span>{info.phone}</span>
              </div>
            )}

            {info.github && (
              <a
                href={normalizeUrl(info.github)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-indigo-600"
              >
                <ExternalLink size={16} />
                <span>GitHub</span>
              </a>
            )}

            {info.linkedin && (
              <a
                href={normalizeUrl(info.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-indigo-600"
              >
                <ExternalLink size={16} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationSection({ education }) {
  if (!education || education.length === 0) {
    return (
      <SectionCard title="Education" icon={GraduationCap}>
        <EmptyState message="No education information found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Education" icon={GraduationCap}>
      <div className="space-y-6">
        {education.map((item, index) => (
          <div
            key={index}
            className={
              index !== education.length - 1
                ? "border-b border-slate-100 pb-5"
                : ""
            }
          >
            <h4 className="font-semibold text-slate-800">
              {item.degree || "Qualification not specified"}
            </h4>

            {item.institution && (
              <p className="mt-1 text-sm text-indigo-600">{item.institution}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
              {(item.startDate || item.endDate) && (
                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {item.startDate || "?"} - {item.endDate || "?"}
                </span>
              )}

              {item.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {item.location}
                </span>
              )}
            </div>

            {item.score && (
              <p className="mt-2 text-xs font-medium text-slate-500">
                Score: {item.score}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SkillsSection({ skills }) {
  const technicalSkills = skills?.technicalSkills || [];
  const softSkills = skills?.softSkills || [];

  if (technicalSkills.length === 0 && softSkills.length === 0) {
    return (
      <SectionCard title="Skills" icon={Wrench}>
        <EmptyState message="No skills found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Skills" icon={Wrench}>
      <div className="space-y-5">
        {technicalSkills.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Technical Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {softSkills.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Soft Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

function WorkExperienceSection({ workExperience }) {
  if (!workExperience || workExperience.length === 0) {
    return (
      <SectionCard title="Work Experience" icon={BriefcaseBusiness}>
        <EmptyState message="No work experience found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Work Experience" icon={BriefcaseBusiness}>
      <div className="space-y-6">
        {workExperience.map((job, index) => (
          <div
            key={index}
            className={
              index !== workExperience.length - 1
                ? "border-b border-slate-100 pb-5"
                : ""
            }
          >
            <h4 className="font-semibold text-slate-800">
              {job.position || "Position not specified"}
            </h4>

            {job.company && (
              <p className="mt-1 text-sm text-indigo-600">{job.company}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
              {(job.startDate || job.endDate) && (
                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {job.startDate || "?"} - {job.endDate || "Present"}
                </span>
              )}

              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                </span>
              )}
            </div>

            {job.description && (
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                {job.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <SectionCard title="Projects" icon={FolderOpen}>
        <EmptyState message="No projects found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Projects" icon={FolderOpen}>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={
              index !== projects.length - 1
                ? "border-b border-slate-100 pb-5"
                : ""
            }
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-semibold text-slate-800">
                {project.name || "Unnamed Project"}
              </h4>

              {project.github && (
                <a
                  href={
                    project.github.startsWith("http://") ||
                    project.github.startsWith("https://")
                      ? project.github
                      : `https://${project.github}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition hover:text-indigo-600"
                  title="Open project repository"
                >
                  <ExternalLink size={17} />
                </a>
              )}
            </div>

            {project.description && (
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                {project.description}
              </p>
            )}

            {project.technologies?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((technology, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}

            {project.links?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.links.map((link, linkIndex) => {
                  const href =
                    link.startsWith("http://") || link.startsWith("https://")
                      ? link
                      : `https://${link}`;

                  return (
                    <a
                      key={linkIndex}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
                    >
                      <ExternalLink size={13} />
                      Project Link
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function CertificationsSection({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return (
      <SectionCard title="Certifications" icon={Award}>
        <EmptyState message="No certifications found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Certifications" icon={Award}>
      <div className="space-y-5">
        {certifications.map((certification, index) => (
          <div
            key={index}
            className={
              index !== certifications.length - 1
                ? "border-b border-slate-100 pb-4"
                : ""
            }
          >
            <h4 className="font-semibold text-slate-800">
              {certification.name || "Certification"}
            </h4>

            {certification.issuer && (
              <p className="mt-1 text-sm text-slate-500">
                {certification.issuer}
              </p>
            )}

            {certification.issueDate && (
              <p className="mt-2 text-xs text-slate-400">
                Issued: {certification.issueDate}
              </p>
            )}

            {certification.credentialId && (
              <p className="mt-1 text-xs text-slate-400">
                Credential ID: {certification.credentialId}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function AchievementsSection({ achievements }) {
  if (!achievements || achievements.length === 0) {
    return (
      <SectionCard title="Achievements" icon={Trophy}>
        <EmptyState message="No achievements found." />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Achievements" icon={Trophy}>
      <div className="space-y-5">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={
              index !== achievements.length - 1
                ? "border-b border-slate-100 pb-4"
                : ""
            }
          >
            <h4 className="font-semibold text-slate-800">
              {achievement.title || "Achievement"}
            </h4>

            {achievement.description && (
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                {achievement.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function DashboardContent({ profile, loading, error }) {
  return (
    <main className="min-w-0">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <CircleUserRound size={19} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Extracted Candidate Profile
            </h2>

            <p className="text-xs text-slate-500">
              {profile
                ? "AI successfully extracted the candidate information"
                : "AI will organize the information from your resume here"}
            </p>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
            profile
              ? "bg-emerald-50 text-emerald-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          <CheckCircle2 size={15} />
          {profile ? "Extraction Completed" : "Ready for resume"}
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-10 text-center">
          <Sparkles
            className="mx-auto animate-pulse text-indigo-600"
            size={32}
          />
          <h3 className="mt-4 font-semibold text-slate-800">
            Analyzing your resume...
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            AI is extracting candidate information.
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && !profile && <ProfilePlaceholder />}

      {!loading && profile && (
        <>
          <CandidateProfile personalInfo={profile.personalInfo} />

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <EducationSection education={profile.education} />
            <SkillsSection skills={profile.skills} />
            <WorkExperienceSection workExperience={profile.workExperience} />
            <ProjectsSection projects={profile.projects} />
            <CertificationsSection certifications={profile.certifications} />
            <AchievementsSection achievements={profile.achievements} />
          </div>
        </>
      )}
    </main>
  );
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError("");
      setProfile(null);

      const data = await uploadResume(selectedFile);

      console.log("Backend response:", data);
      setProfile(data);
    } catch (error) {
      console.error("Upload failed:", error);

      setError(
        error.response?.data?.message ||
          "Failed to analyze the resume. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setProfile(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onReset={handleReset} />

      <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-6 lg:px-12">
        <UploadPanel
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onExtract={handleExtract}
          loading={loading}
        />

        <DashboardContent profile={profile} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
