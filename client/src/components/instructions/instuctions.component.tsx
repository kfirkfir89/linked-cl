import letterImage from '../../assets/500px robot.jpeg';

const Instructions = () => {
  return (
    <div className='relative flex '>
      <div className="absolute z-10 flex">
        <img src={letterImage} className='w-44' />
      </div>
      <div className="card p-16 m-2 w-full rounded-box place-items-center h-full">
        <div className="w-full flex flex-nowrap p-4 text-slate-600 items-center flex-col mx-auto space-y-4">
          <div className='card bg-opacity-20 bg-white rounded-box place-items-center h-full w-full p-12'>
            <h1 className="flex flex-col px-4 justify-center font-bold leading-snug text-xl ">
              Create Your Cover Letter in 3 Easy Steps
            </h1>
            <div className="flex flex-col items-start gap-2  px-10 p-4 w-full max-w-sm">
              <p className="text-sm uppercase tracking-wide text-slate-600">1. Enter the LinkedIn Job URL</p>
              <p className="text-sm uppercase tracking-wide text-slate-600">2. Upload Your CV/Resume</p>
              <p className="text-sm uppercase tracking-wide text-slate-600">3. Click 'Generate'</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions;