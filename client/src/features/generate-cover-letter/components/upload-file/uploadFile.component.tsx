import { InputHTMLAttributes, forwardRef, memo } from 'react';
import { ReactComponent as UploadIcon } from '../../../../assets/upload.svg';

interface UploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
  fileName: string,
  onFileSelect: (File: File | null) => void;
}

const UploadFile = forwardRef(({ onFileSelect, fileName, ...props }: UploadFileProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { accept, type } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files.length > 0 ? e.target.files[0] : null;

    onFileSelect(file ? file : null);
  };

  return (
    <label
      className="flex flex-col cursor-pointer text-sm tracking-wide card rounded-box place-items-center p-10 bg-slate-300 text-sky-600 hover:text-white w-full  hover:bg-slate-300">
      <UploadIcon className='w-8' />
      {
        fileName ?
          <span className="p-2  uppercase text-center font-semibold">{fileName}</span>
          :
          <span className="p-2 uppercase text-center font-semibold whitespace-nowrap">CV / Resume</span>

      }
      <input ref={ref} id='upload-input' className='opacity-0 absolute w-0' type={type} accept={accept} onChange={handleFileChange} {...props} />
    </label>
  );
});

export default memo(UploadFile);
