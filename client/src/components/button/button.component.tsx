import { ButtonHTMLAttributes } from "react";

type ButtonqProps = {
  isLoading?: boolean;
  loadingClassName?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonqProps) => {
  const { className, isLoading, loadingClassName, icon } = props;
  return (
    <button className={`${className}`} {...props}>
      <p className={`${isLoading ? loadingClassName : ''} flex items-center text-lg`}>
        {children}
        {icon}
      </p>
    </button>
  );
}

export default Button;
