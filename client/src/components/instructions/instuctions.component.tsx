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

export default Instructions;