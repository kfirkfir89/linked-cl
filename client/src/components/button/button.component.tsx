import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingClassName?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

const Button = ({ children, icon, isLoading, loadingClassName, ...props }: ButtonProps) => {
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
