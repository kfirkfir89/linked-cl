import { useCallback, useState } from "react";

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    setFile(selectedFile);
  },[]);


  return { file, handleFileSelect }
};

export default useUploadFile;