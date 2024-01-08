import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator from '../../hooks/useCoverLetterGenerator';
import ErrorAlert from "../error-alert/errorAlert.component";
import GenerateButton from "../generate-button/generateButton.component";

const Instructions = () => {
  return (
    <div className="card bg-teal-100 rounded-box place-items-center">
      <div className="w-full flex flex-nowrap p-14 text-slate-800 items-center flex-col mx-auto space-y-4">
        <h1 className="font-bold leading-snug text-xl ">Create Your Cover Letter in 3 Easy Steps</h1>
        <div className="flex flex-col items-start gap-2 px-6 p-1 w-full max-w-sm">
          <p className="text-sm uppercase tracking-wide text-slate-600">1. Enter the LinkedIn Job URL</p>
          <p className="text-sm uppercase tracking-wide text-slate-600">2. Upload Your CV/Resume</p>
          <p className="text-sm uppercase tracking-wide text-slate-600">3. Click 'Generate'</p>
        </div>
      </div>
    </div>
  )
}
const Title = () => {
  return (
    <div className="flex w-full  justify-center">
      <h1 className="text-2xl font-extrabold uppercase drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)] tracking-widest text-sky-50">Linked Cover Letter</h1>
    </div>
  )
}
const Footer = () => {
  return (
    <div className="flex flex-col w-full justify-end h-full">
      <p className="text-sm  text-gray-500">Created by
        <a href="#" target="_blank" className="underline text-blue-600 hover:text-blue-800">
          Kfir Avraham
        </a>
      </p>
    </div>
  )
}

const GenerateCoverLetter = () => {
  const { error, isLoading, url, blobUrl, downloadFileName, file, fileInputRef, content, handleFileSelect, handleLinkChange, handleSubmit } = useCoverLetterGenerator();
  return (
    <div className="h-full w-full bg-slate-50 p-8">
      <div className="flex flex-col w-full h-full gap-4 items-center">
        <Title />
        <ErrorAlert error={error} />

        <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-10 max-w-4xl">
          <div className="md:col-span-5 ">
            <Instructions />
          </div>
          <div className="md:col-span-3 flex flex-col gap-8">
            <LinkInput value={url} onLinkChange={handleLinkChange} />
            <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} type="file" accept=".pdf" />
          </div>

          <div className="md:col-span-2 flex justify-center w-full">
            <GenerateButton disabled={!(url && file)} onClick={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
        {blobUrl && (
          <a className="btn btn-primary rounded-xl w-full py-5 pb-8 my-4" href={blobUrl} download={downloadFileName}>
            Download Cover Letter
          </a>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default GenerateCoverLetter;