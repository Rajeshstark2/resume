import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Converts different document types to plain text and returns both the text content and a File object
 * @param file The file to convert
 * @returns An object with the text content and a File object in .txt format
 */
export const convertToText = async (file: File): Promise<{ text: string, textFile: File }> => {
  const fileType = file.type;
  const buffer = await file.arrayBuffer();
  let text = '';
  
  // PDF file conversion
  if (fileType === 'application/pdf') {
    try {
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const textContent: string[] = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str)
          .join(' ');
        textContent.push(pageText);
      }
      
      text = textContent.join('\n');
    } catch (error) {
      console.error('Error converting PDF:', error);
      throw new Error('Failed to convert PDF file. Please try a different file format.');
    }
  }
  
  // DOCX file conversion
  else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      fileType === 'application/msword') {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      text = result.value;
    } catch (error) {
      console.error('Error converting DOCX:', error);
      throw new Error('Failed to convert DOCX file. Please try a different file format.');
    }
  }
  
  // TXT file - already in text format
  else if (fileType === 'text/plain') {
    try {
      const decoder = new TextDecoder('utf-8');
      text = decoder.decode(buffer);
    } catch (error) {
      console.error('Error reading TXT:', error);
      throw new Error('Failed to read text file. Please try again.');
    }
  }
  
  else {
    throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
  }
  
  // Create a .txt file from the extracted text
  const originalName = file.name.split('.').slice(0, -1).join('.');
  const txtFileName = `${originalName}.txt`;
  const textFile = new File([text], txtFileName, { type: 'text/plain' });
  
  return { text, textFile };
};