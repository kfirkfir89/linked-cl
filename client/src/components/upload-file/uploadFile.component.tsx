import React, { forwardRef } from 'react';

interface UploadFileProps {
  onFileSelect: (file: File | null) => void;
}

const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(({ onFileSelect }, ref) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onFileSelect(file ? file : null);
  };

  return (
    <div className="flex flex-col">
      <input ref={ref} type="file" accept=".pdf" onChange={handleFileChange} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
    </div>
  );
});

export default UploadFile;