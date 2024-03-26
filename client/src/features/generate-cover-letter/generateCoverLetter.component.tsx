import LinkInput from "./components/link-input/linkInput.component";
import UploadFile from "./components/upload-file/uploadFile.component";
import useCoverLetterGenerator from './hooks/useCoverLetterGenerator';
import ErrorAlert from "../../components/error-alert/errorAlert.component";
import { useCallback, useContext, useRef } from "react";
import useLinkInput from "./hooks/useLinkInput";
import useUploadFile from "./hooks/useUploadFile";
import { CoverLetterContext } from "../../context/coverLetterContext";
import Button from "../../components/button/button.component";
import { ReactComponent as GenerateIcon } from '../../assets/generateIcon.svg';


const GenerateCoverLetter = () => {
  const { setCoverLetter } = useContext(CoverLetterContext);
  const { error, isLoading, generateCoverLetter } = useCoverLetterGenerator();
  const { file, fileName, handleFileSelect } = useUploadFile();
  const { linkUrl, handleLinkChange } = useLinkInput();

  const uploadFileRef = useRef<HTMLInputElement>(null);
  const inputLinkRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    handleLinkChange('');
    handleFileSelect(null);
    if (uploadFileRef.current) {
      uploadFileRef.current.value = '';
    }
    if (inputLinkRef.current) {
      inputLinkRef.current.value = '';
    }
  }

  const handleSubmit = useCallback(async () => {
    if (file === null) return;

    const cl = await generateCoverLetter(linkUrl, file);

    if (cl) {
      setCoverLetter(cl);
      resetForm();
    }

  }, [file, linkUrl]);

  return (
    <div className="card px-4 w-full gap-5 mt-5 rounded-box place-items-center h-full">
      {error && <ErrorAlert error={error} />}
      <LinkInput
        ref={inputLinkRef}
        id="link-input"
        role="linkedInJobURL"
        type="text"
        className="input input-bordered w-full"
        value={linkUrl}
        onLinkChange={handleLinkChange}
        name="link"
        placeholder="www.linkedin.com/..."
      />
      <UploadFile
        ref={uploadFileRef}
        role='uploadInput'
        id='upload-input'
        className='opacity-0 absolute w-0'
        fileName={fileName}
        onFileSelect={handleFileSelect}
        type="file"
        accept=".pdf"
      />
      <Button
        className="btn btn-ghost py-3 rounded-xl w-full text-sky-600 bg-yellow-200 hover:text-yellow-200"
        disabled={!(linkUrl && file)}
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingClassName="loading w-8 loading-dots text-sky-500"
      >
        generate
        <GenerateIcon className="w-5" />
      </Button>
    </div>
  );
}

export default GenerateCoverLetter;
