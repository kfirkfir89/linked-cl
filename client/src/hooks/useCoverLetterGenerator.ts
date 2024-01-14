import { useState } from 'react';

export type CoverLetter  = {
  downloadUrl: string,
  downloadFileName: string,
  coverLetterContent: string
}

function validateLinkedInUrl (linkedInUrl: string) {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/;
  return regex.test(linkedInUrl);
};

function validatePdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

function getFileName(contentDisposition: string): string {
  const parts = contentDisposition.split('=');
  if (parts.length > 1) {
    return parts[1].trim().replace(/"/g, '');
  }
  return '';
}

const useCoverLetterGenerator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateCoverLetter = async (url: string, file: File) => {
    if (!validateLinkedInUrl(url)) {
      setError('Please enter a valid LinkedIn URL.');
      return;
    }
    if (!file) return;
    if (file && !validatePdfFile(file)) {
      setError('Invalid file type. Please upload a PDF file.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('url', url);

    try {
        const response = await fetch('http://localhost:3000/api/v1/cover-letter/', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
    

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