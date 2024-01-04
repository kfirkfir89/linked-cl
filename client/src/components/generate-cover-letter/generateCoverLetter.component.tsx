import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator from '../../hooks/useCoverLetterGenerator';

const Instructions = () => {
  return (
    <div className="flex flex-col drop-shadow-[0_-5px_3px_rgba(0,0,0,0.1)] mt-4 bg-orange-100 items-center container">
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
    <div className="flex w-full shadow-inner justify-center">
      <h1 className="text-3xl p-4 font-extrabold uppercase tracking-wide opacity-25 drop-shadow-sm text-sky-700">Linked Cover Letter</h1>
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
    <div className="flex flex-col w-full h-full bg-slate-50  items-center container">

      <Title />
      <Instructions />
      <Error error={error} />
      <div className="flex flex-col gap-8 mt-14 w-full max-w-sm">
        <LinkInput value={url} onLinkChange={handleLinkChange} />
        <div className="flex">
          <div className="flex-1">
            <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} type="file" accept=".pdf" />
          </div>
          <div className="flex-none">
            <button disabled={!(url && file)} onClick={handleSubmit} className="relative cursor-pointer inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-amber-400 rounded-xl group">
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-amber-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gray-50"></span>
              </span>

              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-amber-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Generate Cover Letter
              </span>

            </button>
            <button disabled={!(url && file)} onClick={handleSubmit} className={`btn-info mt-20 w-full max-w-sm my-4 btn ${isLoading ? 'loading' : ''}`}>
              <span className="relative z-20 flex items-center text-sm">
                Generate Cover Letter
                <svg className="relative w-5 h-5 ml-2 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      {blobUrl && (
        <a className="btn-info w-full max-w-sm my-4 btn" href={blobUrl} download={downloadFileName}>
          Download Cover Letter
        </a>
      )}
      <Footer />
    </div>
  );
}

export default GenerateCoverLetter;