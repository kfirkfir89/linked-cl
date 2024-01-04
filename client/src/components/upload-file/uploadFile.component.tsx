import React, { InputHTMLAttributes, forwardRef } from 'react';

type UploadFileProps = {
  onFileSelect: (file: File | null) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(({ onFileSelect, ...props }, ref) => {

  const { accept, type } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files.length > 0 ? e.target.files[0] : null;

    onFileSelect(file ? file : null);
  };

  return (
    <label
      className="flex flex-col cursor-pointer text-sm tracking-wide p-6 text-sky-500 hover:text-sky-600 w-full  border-[1px] border-sky-200 border-dashed hover:bg-gray-100 hover:border-gray-400">
      <div className="flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="p-2 uppercase font-semibold">CV / Resume</p>
      </div>
      <input role='uploadInput' className='opacity-0 absolute w-0' ref={ref} type={type} accept={accept} onChange={handleFileChange} />
    </label>
  );
});

export default UploadFile;