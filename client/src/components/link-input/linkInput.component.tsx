interface LinkInputProps {
  onLinkChange: (url: string) => void;
}

const LinkInput = ({ onLinkChange }: LinkInputProps) => {
  return (
    <div className="link-input">
      <input
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