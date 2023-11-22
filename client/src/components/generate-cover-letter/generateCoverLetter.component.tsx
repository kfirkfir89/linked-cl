import LinkInput from "../link-input/linkInput.component";
import UploadFile from "../upload-file/uploadFile.component";
import useCoverLetterGenerator from '../../hooks/useCoverLetterGenerator';

const GenerateCoverLetter = () => {
  const { error, isLoading, url, file, fileInputRef, content, handleFileSelect, handleLinkChange, handleSubmit } = useCoverLetterGenerator();

  return (
    <div className="flex flex-col w-full h-full bg-slate-50  items-center container">

      <div className="flex w-full shadow-inner justify-center">
        <h1 className="text-sm p-4 font-semibold uppercase tracking-wide opacity-80 text-sky-700">Linked Cover Letter</h1>
      </div>
      <div className="flex flex-col drop-shadow-[0_-5px_3px_rgba(0,0,0,0.1)] mt-4 bg-orange-100 gap-6 p-4 items-center container">
        <div className="w-full flex flex-nowrap text-slate-800 items-center flex-col mx-auto space-y-4 mt-2">
          <h1 className="font-bold leading-snug text-2xl ">Create Your Cover Letter in 3 Easy Steps</h1>
          <div className="flex flex-col items-start gap-2 w-full max-w-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-600">1. Enter the LinkedIn Job URL</p>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-600">2. Upload Your CV/Resume</p>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-600">3. Click 'Generate'</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-14">
        <LinkInput value={url} onLinkChange={handleLinkChange} />
        <UploadFile ref={fileInputRef} onFileSelect={handleFileSelect} />
      </div>
      <button disabled={(url && file)} onClick={handleSubmit} className={`btn-info mt-20 w-full max-w-sm my-4 btn ${isLoading ? 'loading' : ''}`}>
        <span className="relative z-20 flex items-center text-sm">
          Generate Cover Letter
          <svg className="relative w-5 h-5 ml-2 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </span>
      </button>
      <span>
        {content}
      </span>
      <span>
        {error}
      </span>
      <div className="flex flex-col w-full justify-end h-full">
        <p className="text-sm  text-gray-500">Created by
          <a href="#" target="_blank" className="underline text-blue-600 hover:text-blue-800">
            Kfir Avraham
          </a>
        </p>
      </div>
    </div>
  );
}

export default GenerateCoverLetter;