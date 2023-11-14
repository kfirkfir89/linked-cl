import { useState } from 'react';

const useCoverLetterGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleLinkChange = (link: string) => {
    setUrl(link);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    if (file && url) {
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
  
        const result = await response.json();
        setContent(result.data);
        setError('');
        setIsLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setIsLoading(false);
      }
    }
  };

  return { error, isLoading ,file, url, content, handleFileSelect, handleLinkChange, handleSubmit };
};

export default useCoverLetterGenerator;