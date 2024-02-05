type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 z-50 h-full w-full bg-black bg-opacity-20 p-20">
      <div className="relative flex flex-col h-full w-full card rounded-box p-10 bg-slate-50">
        <button onClick={onClose} className="absolute top-6 right-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;