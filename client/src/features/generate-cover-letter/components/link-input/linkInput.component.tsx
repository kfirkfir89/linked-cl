import { memo } from "react";

interface LinkInputProps {
  value: string,
  onLinkChange: (url: string) => void;
}

const LinkInput = ({ onLinkChange, value }: LinkInputProps) => {

  return (
    <div className="card rounded-box place-items-center text-sm tracking-wide  p-6 pb-10 bg-slate-200 text-sky-600w-full ">
      <label className="label font-medium">
        <span className="label-text">LinkedIn Job URL</span>
      </label>
      <input
        id="link-input"
        value={value}
        className="input input-bordered w-full"
        name="link"
        type="text"
        placeholder="www.linkedin.com/..."
        onChange={(e) => onLinkChange(e.target.value)}
      />
    </div>
  );
};

export default memo(LinkInput);