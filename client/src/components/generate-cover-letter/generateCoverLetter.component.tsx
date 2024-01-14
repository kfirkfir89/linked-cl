import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator, { CoverLetter } from '../../hooks/useCoverLetterGenerator';
import ErrorAlert from "../error-alert/errorAlert.component";
import GenerateButton from "../generate-button/generateButton.component";
import { memo, useRef, useState, useCallback } from "react";
import useLinkInput from "../../hooks/useLinkInput";
import useUploadFile from "../../hooks/useUploadFile";

const Instructions = memo(() => {
  return (
    <div className="card bg-teal-100 rounded-box place-items-center h-full">
      <div className="w-full flex flex-nowrap p-8 text-slate-800 items-center flex-col mx-auto space-y-4">
        <h1 className="font-bold leading-snug text-xl ">Create Your Cover Letter in 3 Easy Steps</h1>
        <div className="flex flex-col items-start gap-2 px-6 p-1 w-full max-w-sm">
          <p className="text-sm uppercase tracking-wide text-slate-600">1. Enter the LinkedIn Job URL</p>
          <p className="text-sm uppercase tracking-wide text-slate-600">2. Upload Your CV/Resume</p>
          <p className="text-sm uppercase tracking-wide text-slate-600">3. Click 'Generate'</p>
        </div>
      </div>
    </div>
  )
})
const Title = memo(() => {
  return (
    <div className="flex w-full  justify-center p-8">
      <h1 className="text-2xl font-extrabold uppercase drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)] tracking-widest text-sky-50">Linked Cover Letter</h1>
    </div>
  )
})
const Footer = memo(() => {
  return (
    <div className="flex flex-col w-full justify-end h-full">
      <p className="text-sm  text-gray-500">Created by
        <a href="#" target="_blank" className="underline text-blue-600 hover:text-blue-800">
          Kfir Avraham
        </a>
      </p>
    </div>
  )
});

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
  const [content, setContent] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = async () => {
    if (file === null) return;
    const cl = await generateCoverLetter(linkUrl, file);
    if (cl !== undefined) {
      setCoverLetter(cl);
      setContent(cl.coverLetterContent);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-full w-full bg-slate-50">
      <div className="flex flex-col w-full h-full gap-4 items-center">
        <Title />
        <ErrorAlert error={error} />

        <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-10 max-w-4xl mt-14">
          <div className="md:col-span-3 ">
            <Instructions />
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <LinkInput value={linkUrl} onLinkChange={handleLinkChange} />
            <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} type="file" accept=".pdf" />
            <div className="md:col-span-2 flex justify-center w-full">
              <GenerateButton disabled={!(linkUrl && file)} onClick={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>
        {
          coverLetter.coverLetterContent && (
            <div className="absolute z-50 h-full w-full bg-black bg-opacity-20 p-20">
              <div className="flex flex-col h-full w-full card rounded-box p-10 bg-slate-50">
                {
                  coverLetter.coverLetterContent && (
                    <textarea
                      className="textarea textarea-bordered h-full max-h-fit"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                  )
                }
                <a className="btn btn-primary rounded-xl w-full py-5 pb-8 my-4" href={coverLetter.downloadUrl} download={coverLetter.downloadFileName}>
                  Download Cover Letter
                </a>
              </div>
            </div>
          )
        }
        <Footer />
      </div>
    </div>
  );
}

export default GenerateCoverLetter;
