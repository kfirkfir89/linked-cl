import Button from "../button/button.component";
import { ReactComponent as CloseIcon } from '../../assets/modalClose.svg';

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
        <Button onClick={onClose} className="absolute top-6 right-6">
          <CloseIcon />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;