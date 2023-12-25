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
    <label
      className="flex flex-col cursor-pointer text-sm tracking-wide p-6 text-sky-500 hover:text-sky-600 w-full  border-[1px] border-sky-200 border-dashed hover:bg-gray-100 hover:border-gray-400">
      <div className="flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="p-2 uppercase font-semibold">CV / Resume</p>
      </div>
      <input className='opacity-0 absolute w-0' ref={ref} name="files" id="files" type="file" accept=".pdf" onChange={handleFileChange} />
    </label>
  );
});

export default UploadFile;