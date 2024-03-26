import { memo, InputHTMLAttributes, forwardRef } from "react";

interface LinkInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string,
  onLinkChange: (url: string) => void;
}

const LinkInput = forwardRef(({ onLinkChange, value, className, ...props }: LinkInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="card rounded-box place-items-center text-sm tracking-wide  p-6 pb-10 bg-slate-300 w-full ">
      <label className="label font-medium">
        <span className="label-text text-sky-600">LinkedIn Job URL</span>
      </label>
      <input
        ref={ref}
        className={`${className}`}
        onChange={(e) => onLinkChange(e.target.value)}
        {...props}
      />
    </div>
  );
});

export default memo(LinkInput);