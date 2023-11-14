interface UploadFileProps {
  onFileSelect: (file: File) => void;
}

const UploadFile = ({ onFileSelect }: UploadFileProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]); // Pass the selected file to parent
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
    </div>
  );
};

export default UploadFile;