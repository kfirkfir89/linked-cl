import { useState } from 'react';
import { CoverLetter } from '../../../context/coverLetterContext';

function validateLinkedInUrl (linkedInUrl: string) {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/;
  return regex.test(linkedInUrl);
};

function validatePdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

function validateInput (url: string, file: File | null, setError: (error: string) => void): boolean {
  setError(''); 
  if (!validateLinkedInUrl(url)) {
    setError('Please enter a valid LinkedIn URL.');
    return false;
  }
  if (!file) {
    setError('No file provided.');
    return false;
  }
  if (!validatePdfFile(file)) {
    setError('Invalid file type. Please upload a PDF file.');
    return false;
  }
  return true;
};

function getFileName(contentDisposition: string): string {
  const parts = contentDisposition.split('=');
  if (parts.length > 1) {
    return parts[1].trim().replace(/"/g, '');
  }
  return '';
}

async function constructCoverLetter (response: Response): Promise<CoverLetter> {
  const coverLetterContent = response.headers.get('Cover-Letter-Data')!;
  const contentDisposition = response.headers.get('Content-Disposition')!;
  const downloadFileName = getFileName(contentDisposition);

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  const coverLetter: CoverLetter = {
    downloadUrl: downloadUrl,
    downloadFileName: downloadFileName,
    coverLetterContent: coverLetterContent
  }

  return coverLetter;
};

const useCoverLetterGenerator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateCoverLetter = async (url: string, file: File) => {
    
    if (!validateInput(url, file, setError)) return;

    
    try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('url', url);

        const response = await fetch('http://localhost:3000/api/v1/cover-letter/', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }

        const coverLetter = await constructCoverLetter(response);
        setIsLoading(false);
        return coverLetter;
      } catch (error) {
        setIsLoading(false);
        setError((error as Error).message);
      }
  };

  return { isLoading, error, generateCoverLetter };
};

export default useCoverLetterGenerator;