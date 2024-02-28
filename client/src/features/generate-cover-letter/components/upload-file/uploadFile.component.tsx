import { InputHTMLAttributes, memo } from 'react';
import { ReactComponent as UploadIcon } from '../../../../assets/upload.svg';

type UploadFileProps = {
  fileName: string,
  onFileSelect: (file: File | null) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const UploadFile = ({ onFileSelect, fileName, ...props }: UploadFileProps) => {

  const { accept, type } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files.length > 0 ? e.target.files[0] : null;

    onFileSelect(file ? file : null);
  };

  return (
    <label
      className="flex flex-col cursor-pointer text-sm tracking-wide card rounded-box place-items-center p-10 bg-slate-200 text-sky-600 hover:text-white w-full  hover:bg-slate-300">
      <UploadIcon className='w-8' />
      {
        fileName ?
          <span className="p-2  uppercase text-center font-semibold">{fileName}</span>
          :
          <span className="p-2 uppercase text-center font-semibold whitespace-nowrap">CV / Resume</span>

      }
      <input role='uploadInput' id='upload-input' className='opacity-0 absolute w-0' type={type} accept={accept} onChange={handleFileChange} />
    </label>
  );
};

export default memo(UploadFile);
