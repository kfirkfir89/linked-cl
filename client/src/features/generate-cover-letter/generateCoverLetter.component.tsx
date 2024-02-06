import LinkInput from "./components/link-input/linkInput.component";
import UploadFile from "./components/upload-file/uploadFile.component";
import useCoverLetterGenerator from './hooks/useCoverLetterGenerator';
import ErrorAlert from "../../components/error-alert/errorAlert.component";
import { useCallback, useRef, useContext } from "react";
import useLinkInput from "./hooks/useLinkInput";
import useUploadFile from "./hooks/useUploadFile";
import { CoverLetterContext } from "../../context/coverLetterContext";
import Button from "../../components/button/button.component";
import { ReactComponent as GenerateIcon } from '../../assets/generateIcon.svg';


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
      <Button className="btn btn-ghost py-3 rounded-xl w-full text-sky-600 bg-yellow-200 hover:text-yellow-200" disabled={!(linkUrl && file)} onClick={handleSubmit} isLoading={isLoading} loadingClassName="loading w-8 loading-dots text-sky-500" >
        generate
        <GenerateIcon />
      </Button>
    </>
  );
}

export default GenerateCoverLetter;
