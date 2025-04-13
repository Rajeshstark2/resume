export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface Project {
  name: string;
  url: string;
  description: string;
}

export interface ResumeAnalysis {
  personalInfo: {
    name: string;
    email: string;
    linkedin?: string;
  };
  workExperience: {
    roles: string[];
    achievements: string[];
    impact: string[];
  };
  education: {
    degrees: string[];
    certifications: string[];
  };
  skills: string[];
  atsScore: number;
  readabilityScore: number;
  suggestions: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
}

export interface JobMatch {
  percentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface FileConversion {
  originalFile: File;
  textFile: File;
  text: string;
}