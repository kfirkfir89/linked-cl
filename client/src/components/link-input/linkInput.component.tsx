interface LinkInputProps {
  value: string,
  onLinkChange: (url: string) => void;
}

const LinkInput = ({ onLinkChange, value }: LinkInputProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label font-medium">
        <span className="label-text">LinkedIn Job URL</span>
      </label>
      <input
        value={value}
        className="input input-bordered w-full max-w-xs"
        name="link"
        type="text"
        placeholder="www.linkedin.com/..."
        onChange={(e) => onLinkChange(e.target.value)}
      />
    </div>
  );
};

export default LinkInput;