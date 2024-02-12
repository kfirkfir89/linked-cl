import { useCallback, useEffect, useState } from "react";

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    // setFileName(file?.name ? file?.name : '');
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  }, [file]); 

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    setFile(selectedFile); 

  }, []); 

  return { file, fileName, handleFileSelect };
};

export default useUploadFile;