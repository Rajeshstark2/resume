import React, { useState } from 'react';
import { matchJobDescription } from '../lib/gemini';
import type { JobMatch } from '../types';

export const JobMatcher: React.FC<{ resumeText: string }> = ({ resumeText }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState<JobMatch | null>(null);

  const handleMatch = async () => {
    if (!jobDescription.trim()) return;

    setIsLoading(true);
    try {
      const result = await matchJobDescription(resumeText, jobDescription);
      setMatch(JSON.parse(result));
    } catch (error) {
      console.error('Error matching job description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Job Description Matcher
      </h3>
      
      <div className="space-y-4">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        
        <button
          onClick={handleMatch}
          disabled={isLoading || !jobDescription.trim()}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Match Job Description'}
        </button>
      </div>

      {match && (
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-600 dark:text-gray-300">Match Score</span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {match.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-500 rounded-full h-2"
                style={{ width: `${match.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Matching Skills
              </h4>
              <ul className="space-y-1">
                {match.matchingSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-green-600 dark:text-green-400 flex items-center"
                  >
                    <span className="mr-2">✓</span> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Missing Skills
              </h4>
              <ul className="space-y-1">
                {match.missingSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-red-600 dark:text-red-400 flex items-center"
                  >
                    <span className="mr-2">×</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Improvement Suggestions
            </h4>
            <ul className="space-y-1">
              {match.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};