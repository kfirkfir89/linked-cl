import { ReactComponent as UploadIcon } from '../../assets/upload.svg';
import { ReactComponent as LinkIcon } from '../../assets/www.svg';
import { ReactComponent as RocketIcon } from '../../assets/9035573_rocket_outline_icon.svg';

const Instructions = () => {
  return (
    <div className='flex items-center self-center flex-col container md:px-16 px-2 mb-14'>
      <p className='px-6 pb-14 font-light text-xl md:pb-24 tracking-wide max-w-3xl'>
        Accelerate your job application process with precision-engineered cover letters,
        crafted by our AI-powered technology.
        <br />
        Stand out with letters that reflect your unique experiences and align with job requirements,
        all with minimal effort on your part.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-slate-600 text-center font-semibold tracking-tight'>
        <div className='card items-center w-full h-full p-12 bg-white bg-opacity-30'>
          <UploadIcon className='w-14 mb-8  text-slate-500' />
          Simply upload your resume or link your LinkedIn profile. Our AI starts here, analyzing your professional history to understand your skills, achievements, and career goals.
        </div>
        <div className='card items-center w-full h-full p-12 bg-white bg-opacity-30'>
          <LinkIcon className='w-14 mb-8 text-slate-500' />
          Enter the URL of the job listing you’re applying for. Our system meticulously examines the job description to grasp the qualifications and traits sought by employers.
        </div>
        <div className='card items-center w-full h-full p-12 bg-white bg-opacity-30'>
          <RocketIcon className='w-14 mb-8 text-slate-500' />
          With the click of a button, receive a bespoke cover letter tailored to both your profile and the job. Each letter is crafted to highlight why you’re the ideal candidate.
        </div>
      </div>
    </div>
  )
}

export default Instructions;