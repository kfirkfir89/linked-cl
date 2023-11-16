import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator from '../../hooks/useCoverLetterGenerator';

const GenerateCoverLetter = () => {
  const { error, isLoading, url, file, fileInputRef, content, handleFileSelect, handleLinkChange, handleSubmit } = useCoverLetterGenerator();

  return (
    <div className="flex flex-col bg-red-300 gap-2 p-4 items-center container">
      <span className="text-2xl bg-red-900 font-bold">hello</span>
      <LinkInput value={url} onLinkChange={handleLinkChange} />
      <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} />
      <button disabled={!(url && file)} onClick={handleSubmit} className={`btn-success btn ${isLoading ? 'loading' : ''}`}>Generate Cover Letter</button>
      <span>
        {content}
      </span>
      <span>
        {error}
      </span>
    </div>
  );
}

export default GenerateCoverLetter;