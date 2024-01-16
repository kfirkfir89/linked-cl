import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator, { CoverLetter } from '../../hooks/useCoverLetterGenerator';
import ErrorAlert from "../error-alert/errorAlert.component";
import GenerateButton from "../generate-button/generateButton.component";
import { useRef, useState } from "react";
import useLinkInput from "../../hooks/useLinkInput";
import useUploadFile from "../../hooks/useUploadFile";
import CoverLetterContent from "../cover-letter-content/coverLetterContent.component";



const GenerateCoverLetter = () => {
  const [coverLetter, setCoverLetter] = useState<CoverLetter>(
    {
      coverLetterContent: '',
      downloadFileName: '',
      downloadUrl: ''
    }
  );

  const { error, isLoading, generateCoverLetter } = useCoverLetterGenerator();
  const { file, handleFileSelect } = useUploadFile();
  const { linkUrl, handleLinkChange } = useLinkInput();

  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = async () => {
    if (file === null) return;
    const cl = await generateCoverLetter(linkUrl, file);
    if (cl !== undefined) {
      setCoverLetter(cl);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <ErrorAlert error={error} />
      <LinkInput value={linkUrl} onLinkChange={handleLinkChange} />
      <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} type="file" accept=".pdf" />
      <GenerateButton disabled={!(linkUrl && file)} onClick={handleSubmit} isLoading={isLoading} />
      <CoverLetterContent coverLetter={coverLetter} />
    </>
  );
}

export default GenerateCoverLetter;
