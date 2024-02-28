import RobotImage from '../../assets/robot.webp';
const Title = () => {
  return (
    <div className=" flex flex-col justify-center items-center p-4 ">
      <div className='relative flex flex-col '>
        <div className="absolute md:left-24  rotate-12 md:top-16 top-10 -left-4 z-10 flex ">
          <img src={RobotImage} className='md:w-28 w-16' />
        </div>
        <div className=" flex flex-col md:p-16 p-6 font-bold font-sans whitespace-nowrap">
          <h1 className="md:text-sm text-xs font-thin font-mono uppercase tracking-widest text-slate-800 opacity-50 md:pl-28  leading-3">Linked Cover Letter</h1>
          <h1 className="md:text-7xl text-4xl font-thin leading-[3rem] mb-0 self-end md:pr-20">AI-Powered</h1>
          <h1 className="  uppercase font-sans md:text-8xl text-4xl  text-amber-300 drop-shadow-md tracking-tighter">Cover Letter</h1>
          <h1 className=" pl-10 md:text-6xl text-3xl font-medium font-sans text-slate-700">Generator</h1>
        </div>
      </div>
    </div>
  )
}

export default Title;