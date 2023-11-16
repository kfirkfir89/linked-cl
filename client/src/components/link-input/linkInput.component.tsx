interface LinkInputProps {
  value: string,
  onLinkChange: (url: string) => void;
}

const LinkInput = ({ onLinkChange, value }: LinkInputProps) => {
  return (
    <div className="link-input">
      <input
        value={value}
        className="input-primary"
        name="link"
        type="text"
        placeholder="LinkedIn Job URL"
        onChange={(e) => onLinkChange(e.target.value)}
      />
    </div>
  );
};

export default LinkInput;