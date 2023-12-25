import { useRef, useState } from 'react';

function validateLinkedInUrl (linkedInUrl: string) {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/;
  return regex.test(linkedInUrl);
};
function validatePdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

type CoverLetterGeneratorState = {
  file: File | null,
  url: string,
  error: string,
  isLoading: boolean
}
const INITIAL_STATE: CoverLetterGeneratorState = {
  file: null,
  url: '',
  error: '',
  isLoading: false
}
const useCoverLetterGenerator = () => {
  const [state, setState] = useState<CoverLetterGeneratorState>(INITIAL_STATE);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [downloadFileName, setDownloadFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileSelect = (selectedFile: File | null) => {
    setState((prevState) => ({ ...prevState, file: selectedFile }));
  };

  const handleLinkChange = (link: string) => {
    setState((prevState) => ({ ...prevState, url: link }));
  };

  const handleSubmit = async () => {
    if (!validateLinkedInUrl(state.url)) {
      setState(prevState => ({ ...prevState, error: 'Please enter a valid LinkedIn URL.' }));
      return;
    }
    if (!state.file) return;
    if (state.file && !validatePdfFile(state.file)) {
      setState(prevState => ({ ...prevState, error: 'Invalid file type. Please upload a PDF file.' }));
      return;
    }

    setState(prevState => ({ ...prevState, isLoading: true, error: '' }));

    const formData = new FormData();
    formData.append('file', state.file);
    formData.append('url', state.url);

    try {
        const response = await fetch('http://localhost:3000/api/v1/cover-letter/', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
    

        const coverLetterData = response.headers.get('Cover-Letter-Data')!;
        setContent(coverLetterData);

        const contentDisposition = response.headers.get('Content-Disposition')!;
        const parts = contentDisposition.split('=');
        if (parts.length > 1) {
          const fileName = parts[1].trim().replace(/"/g, '');
          setDownloadFileName(fileName);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setBlobUrl(url); 

        setState(INITIAL_STATE);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
    } catch (error) {
      setState(prevState => ({ ...prevState, error: (error as Error).message, isLoading: false }));
    }
  };

  return { ...state, blobUrl, downloadFileName, content, fileInputRef, handleFileSelect, handleLinkChange, handleSubmit };
};

export default useCoverLetterGenerator;