import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { ResumeAnalysis } from '../components/ResumeAnalysis';
import { JobMatcher } from '../components/JobMatcher';
import { analyzeResume } from '../lib/gemini';
import type { ResumeAnalysis as ResumeAnalysisType } from '../types';

export const Home: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisType | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryDelay, setRetryDelay] = useState(0);

  const handleRetry = (attempt: number, delay: number) => {
    setRetryCount(attempt);
    setRetryDelay(Math.round(delay / 1000));
  };

  const handleFileAnalysis = async (text: string) => {
    setIsAnalyzing(true);
    setError(null);
    setRetryCount(0);
    setRetryDelay(0);
    
    try {
      const result = await analyzeResume(text, handleRetry);
      setAnalysis(JSON.parse(result));
      setResumeText(text);
    } catch (error: any) {
      console.error('Error analyzing resume:', error);
      setError(error.message || 'An error occurred while analyzing the resume.');
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      await handleFileAnalysis(text);
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'text/plain': ['.txt']
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Transform Your Resume with AI
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant feedback, optimization suggestions, and ATS compatibility analysis powered by advanced AI.
          </p>
        </div>

        <div className="mt-10">
          <div
            {...getRootProps()}
            className={`max-w-lg mx-auto flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            <div className="space-y-1 text-center">
              <input {...getInputProps()} />
              {isAnalyzing ? (
                <Loader2 className="mx-auto h-12 w-12 text-primary-500 animate-spin" />
              ) : (
                <Upload className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
              )}
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  <span>{isAnalyzing ? 'Analyzing...' : 'Upload a file'}</span>
                </label>
                {!isAnalyzing && <p className="pl-1">or drag and drop</p>}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, DOCX, or TXT up to 10MB
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 max-w-lg mx-auto">
            <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                    {retryCount > 0 && (
                      <span className="block mt-1">
                        Retrying automatically in {retryDelay} seconds... (Attempt {retryCount}/3)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysis && (
          <>
            <div className="mt-12">
              <ResumeAnalysis analysis={analysis} isLoading={isAnalyzing} />
            </div>
            <JobMatcher resumeText={resumeText} />
          </>
        )}

        {!analysis && !error && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              How It Works
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Upload Your Resume',
                  description:
                    'Simply drag and drop your resume in PDF, DOCX, or TXT format.',
                },
                {
                  title: 'AI Analysis',
                  description:
                    'Our AI engine analyzes your resume for content, format, and ATS compatibility.',
                },
                {
                  title: 'Get Detailed Feedback',
                  description:
                    'Receive personalized suggestions to improve your resume and increase your chances of landing interviews.',
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <div className="absolute -top-4 left-4 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};