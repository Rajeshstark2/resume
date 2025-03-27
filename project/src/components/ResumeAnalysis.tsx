import React from 'react';
import { FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { ResumeAnalysis as ResumeAnalysisType } from '../types';

interface ResumeAnalysisProps {
  analysis: ResumeAnalysisType;
  isLoading: boolean;
}

export const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Name:</span> {analysis.personalInfo.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Email:</span> {analysis.personalInfo.email}
            </p>
            {analysis.personalInfo.linkedin && (
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">LinkedIn:</span> {analysis.personalInfo.linkedin}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Scores
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 dark:text-gray-300">ATS Compatibility</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {analysis.atsScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 rounded-full h-2"
                  style={{ width: `${analysis.atsScore}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 dark:text-gray-300">Readability</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {analysis.readabilityScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 rounded-full h-2"
                  style={{ width: `${analysis.readabilityScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Key Findings
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center text-green-500">
              <CheckCircle className="h-5 w-5 mr-2" />
              <h4 className="font-medium">Strengths</h4>
            </div>
            <ul className="space-y-1">
              {analysis.suggestions.strengths.map((strength, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-red-500">
              <XCircle className="h-5 w-5 mr-2" />
              <h4 className="font-medium">Areas to Improve</h4>
            </div>
            <ul className="space-y-1">
              {analysis.suggestions.weaknesses.map((weakness, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {weakness}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-yellow-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              <h4 className="font-medium">Suggestions</h4>
            </div>
            <ul className="space-y-1">
              {analysis.suggestions.improvements.map((improvement, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Skills & Experience
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Work Impact
            </h4>
            <ul className="space-y-1">
              {analysis.workExperience.impact.map((impact, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {impact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};