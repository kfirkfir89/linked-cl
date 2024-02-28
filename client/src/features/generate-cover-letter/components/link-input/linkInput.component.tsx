import { memo, InputHTMLAttributes } from "react";

type LinkInputProps = {
  value: string,
  onLinkChange: (url: string) => void;
} & InputHTMLAttributes<HTMLInputElement>

const LinkInput = ({ onLinkChange, value, className, ...props }: LinkInputProps) => {
  return (
    <div className="card rounded-box place-items-center text-sm tracking-wide  p-6 pb-10 bg-slate-200 text-sky-600 w-full ">
      <label className="label font-medium">
        <span className="label-text">LinkedIn Job URL</span>
      </label>
      <input
        className={`${className}`}
        onChange={(e) => onLinkChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default memo(LinkInput);