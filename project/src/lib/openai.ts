import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please check your .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 2000, // Increased initial delay
  onRetry?: (attempt: number, delay: number) => void
): Promise<T> {
  let retries = 0;
  while (true) {
    try {
      return await operation();
    } catch (error: any) {
      if (error?.status !== 429 || retries >= maxRetries) {
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

export const analyzeResume = async (
  resumeText: string,
  onRetry?: (attempt: number, delay: number) => void
): Promise<any> => {
  try {
    const operation = () => openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer. Analyze the resume and provide detailed feedback on format, content, and ATS optimization."
        },
        {
          role: "user",
          content: resumeText
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = await retryWithExponentialBackoff(operation, 3, 2000, onRetry);
    return response.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error('API rate limit exceeded. Please wait a moment before trying again.');
    }
    console.error('Error analyzing resume:', error);
    throw new Error('An error occurred while analyzing the resume. Please try again later.');
  }
};

export const matchJobDescription = async (
  resumeText: string,
  jobDescription: string,
  onRetry?: (attempt: number, delay: number) => void
): Promise<any> => {
  try {
    const operation = () => openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Compare the resume with the job description and provide a match percentage, matching skills, missing skills, and suggestions for improvement."
        },
        {
          role: "user",
          content: `Resume: ${resumeText}\n\nJob Description: ${jobDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = await retryWithExponentialBackoff(operation, 3, 2000, onRetry);
    return response.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error('API rate limit exceeded. Please wait a moment before trying again.');
    }
    console.error('Error matching job description:', error);
    throw new Error('An error occurred while analyzing the job match. Please try again later.');
  }
};