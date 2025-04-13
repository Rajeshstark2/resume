import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Gemini API key is missing. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 2000,
  onRetry?: (attempt: number, delay: number) => void
): Promise<T> {
  let retries = 0;
  while (true) {
    try {
      return await operation();
    } catch (error: any) {
      if (!error?.message?.includes('quota') || retries >= maxRetries) {
        throw error;
      }
      retries++;
      const delay = initialDelay * Math.pow(2, retries - 1);
      if (onRetry) {
        onRetry(retries, delay);
      }
      await sleep(delay);
    }
  }
}

function cleanJsonResponse(response: string): string {
  // Remove markdown code block formatting if present
  return response.replace(/```json\n?|\n?```/g, '').trim();
}

export const analyzeResume = async (
  resumeText: string,
  onRetry?: (attempt: number, delay: number) => void
): Promise<string> => {
  // This function expects text input from a .txt file
  // All file conversions should happen before calling this function
  try {
    const operation = async () => {
      const prompt = `You are an expert resume analyzer. Analyze this resume and provide detailed feedback on format, content, and ATS optimization. Return the analysis in JSON format with the following structure:
      {
        "personalInfo": {
          "name": "string",
          "email": "string",
          "linkedin": "string (optional)"
        },
        "workExperience": {
          "roles": ["string"],
          "achievements": ["string"],
          "impact": ["string"]
        },
        "education": {
          "degrees": ["string"],
          "certifications": ["string"]
        },
        "skills": ["string"],
        "atsScore": number,
        "readabilityScore": number,
        "suggestions": {
          "strengths": ["string"],
          "weaknesses": ["string"],
          "improvements": ["string"]
        }
      }

      Resume text: ${resumeText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return cleanJsonResponse(text);
    };

    return await retryWithExponentialBackoff(operation, 3, 2000, onRetry);
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    if (error?.message?.includes('quota')) {
      throw new Error('API rate limit exceeded. Please wait a moment before trying again.');
    }
    if (error?.message?.includes('not found')) {
      throw new Error('Invalid API configuration. Please check your API key and settings.');
    }
    throw new Error('An error occurred while analyzing the resume. Please try again later.');
  }
};

export const matchJobDescription = async (
  resumeText: string,
  jobDescription: string,
  onRetry?: (attempt: number, delay: number) => void
): Promise<string> => {
  // This function expects text input from a .txt file
  // All file conversions should happen before calling this function
  try {
    const operation = async () => {
      const prompt = `Compare this resume with the job description and provide a detailed analysis in JSON format with the following structure:
      {
        "percentage": number,
        "matchingSkills": ["string"],
        "missingSkills": ["string"],
        "suggestions": ["string"]
      }

      Resume: ${resumeText}

      Job Description: ${jobDescription}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return cleanJsonResponse(text);
    };

    return await retryWithExponentialBackoff(operation, 3, 2000, onRetry);
  } catch (error: any) {
    console.error('Error matching job description:', error);
    if (error?.message?.includes('quota')) {
      throw new Error('API rate limit exceeded. Please wait a moment before trying again.');
    }
    if (error?.message?.includes('not found')) {
      throw new Error('Invalid API configuration. Please check your API key and settings.');
    }
    throw new Error('An error occurred while analyzing the job match. Please try again later.');
  }
};