import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator from '../../hooks/useCoverLetterGenerator';

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
const Error = ({ error }: { error: string }) => {
  return (
    <>
      {
        error && (
          <div role="alert" className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Warning: {error}</span>
          </div>
        )
      }
    </>

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
        <Error error={error} />

        <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-10 max-w-4xl">
          <div className="md:col-span-5 ">
            <Instructions />
          </div>
          <div className="md:col-span-3 flex flex-col gap-8">
            <LinkInput value={url} onLinkChange={handleLinkChange} />
            <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} type="file" accept=".pdf" />
          </div>

          <div className="md:col-span-2 flex justify-center w-full">
            <button disabled={!(url && file)} onClick={handleSubmit} className="btn btn-ghost rounded-xl h-full w-full text-sky-600 bg-yellow-200 hover:text-yellow-200">
              <span className="w-full flex flex-col items-center justify-center">
                {isLoading ?
                  <span className="loading loading-ring text-sky-100 w-1/2"></span>
                  :
                  <span className="relative z-20 flex items-center text-lg">
                    Generate
                    <svg className="relative w-5 h-5 ml-2 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </span>
                }
              </span>
            </button>
          </div>
        </div>
        {blobUrl && (
          <a className="btn-info w-full max-w-sm my-4 btn" href={blobUrl} download={downloadFileName}>
            Download Cover Letter
          </a>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default GenerateCoverLetter;