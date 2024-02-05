import LinkInput from "./components/link-input/linkInput.component";
import UploadFile from "./components/upload-file/uploadFile.component";
import useCoverLetterGenerator from './hooks/useCoverLetterGenerator';
import ErrorAlert from "../../components/error-alert/errorAlert.component";
import GenerateButton from "./components/generate-button/generateButton.component";
import { useCallback, useRef, useContext } from "react";
import useLinkInput from "./hooks/useLinkInput";
import useUploadFile from "./hooks/useUploadFile";
import { CoverLetterContext } from "../../context/coverLetterContext";



const GenerateCoverLetter = () => {
  const { setCoverLetter } = useContext(CoverLetterContext);
  const { error, isLoading, generateCoverLetter } = useCoverLetterGenerator();
  const { file, handleFileSelect } = useUploadFile();
  const { linkUrl, handleLinkChange } = useLinkInput();

  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = useCallback(async () => {
    console.log('handleSubmit');
    if (file === null) return;
    const cl = await generateCoverLetter(linkUrl, file);
    if (cl !== undefined) {
      setCoverLetter(cl);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [file, linkUrl]);

  return (
    <>
      <ErrorAlert error={error} />
      <LinkInput value={linkUrl} onLinkChange={handleLinkChange} />
      <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} type="file" accept=".pdf" />
      <GenerateButton disabled={!(linkUrl && file)} onClick={handleSubmit} isLoading={isLoading} />
    </>
  );
}

export default GenerateCoverLetter;
