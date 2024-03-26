import { HTMLAttributes } from "react";

interface InstructionsCardProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
};
const InstructionsCard = ({ children, icon }: InstructionsCardProps) => {
  return (
    <div className='card items-center w-full h-full p-12 bg-white bg-opacity-30'>
      {icon}
      {children}
    </div>
  )
}

export default InstructionsCard;