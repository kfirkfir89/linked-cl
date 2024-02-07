import { useCallback, useState } from "react";

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    setFile(selectedFile);
    console.log('selectedFile:', selectedFile)
    setFileName(selectedFile?.name ? selectedFile?.name : '');
  },[]);


  return { file, fileName, handleFileSelect }
};

export default useUploadFile;