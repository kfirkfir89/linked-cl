import { ButtonHTMLAttributes } from "react";

type ButtonqProps = {
  isLoading?: boolean;
  loadingClassName?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, icon, isLoading, loadingClassName, ...props }: ButtonqProps) => {
  const { className } = props;
  return (
    <button className={`${className}`} {...props}>
      <div className={`${isLoading ? loadingClassName : ''} flex items-center text-lg`}>
        {children}
        {icon}
      </div>
    </button>
  );
}

export default Button;
