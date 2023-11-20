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
    <div className="flex flex-col w-full max-w-xs">
      <label className="self-start p-2 block text-sm font-medium">CV / Resume</label>
      <div className="flex">
        <input ref={ref} name="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="files" type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
    </div>
  );
});

export default UploadFile;