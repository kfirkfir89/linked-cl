import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator from '../../hooks/useCoverLetterGenerator';

const GenerateCoverLetter = () => {
  const { error, isLoading, url, file, content, handleFileSelect, handleLinkChange, handleSubmit } = useCoverLetterGenerator();

  return (
    <>
      <div>
        <span className="text-2xl bg-red-900 font-bold">hello</span>
        <LinkInput onLinkChange={handleLinkChange} />
        <UploadFile onFileSelect={handleFileSelect} />
        <button onClick={handleSubmit} className={`btn-success btn ${isLoading ? 'loading' : ''}`}>Generate Cover Letter</button>
        <span>
          {content}
        </span>
        <span>
          {error}
        </span>
      </div>
    </>
  );
}

export default GenerateCoverLetter;