import GenerateCoverLetter from "./components/generate-cover-letter/generateCoverLetter.component";

const Instructions = () => {
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
}
const Title = () => {
  return (
    <div className="flex w-full  justify-center p-8">
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
};

const AppContent = () => {
  return (
    <div className="h-full w-full bg-slate-50">
      <div className="flex flex-col w-full h-full gap-4 items-center">
        <Title />
        <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-10 max-w-4xl mt-14 p-2">
          <div className="md:col-span-3 ">
            <Instructions />
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <GenerateCoverLetter />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AppContent;