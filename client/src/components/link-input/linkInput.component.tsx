interface LinkInputProps {
  value: string,
  onLinkChange: (url: string) => void;
}

const LinkInput = ({ onLinkChange, value }: LinkInputProps) => {
  return (
    <div className="form-control w-full">
      <label className="label font-medium">
        <span className="label-text">LinkedIn Job URL</span>
      </label>
      <input
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

export default LinkInput;