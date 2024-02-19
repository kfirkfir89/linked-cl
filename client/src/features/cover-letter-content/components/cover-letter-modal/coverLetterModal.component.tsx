import { useContext, useState } from "react";
import { CoverLetterContext } from "../../../../context/coverLetterContext";
import { ReactComponent as CloseIcon } from '../../../../assets/modalClose.svg';
import CoverLetterContent from "../../coverLetterContent.component"
import Button from "../../../../components/button/button.component";

const CoverLetterModal = () => {
  const { coverLetter } = useContext(CoverLetterContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {
        coverLetter.coverLetterContent &&
        <>
          <div role="cover-letter-modal" className="grid grid-cols-1 md:grid-cols-7 w-full gap-6 max-w-5xl px-4">
            <div role="modal-cl-btn" className="md:col-start-4 md:col-span-4 flex flex-col gap-6">
              <Button className="btn btn-ghost py-3 rounded-xl w-full text-sky-600 bg-yellow-200 hover:text-yellow-200" onClick={() => { setIsOpen((prev) => !prev) }}>
                Cover Letter
              </Button>
            </div>
          </div>
          {
            isOpen &&
            <div role="dialog-modal" className="absolute right-0 top-0 z-50 h-full w-full bg-black bg-opacity-20 p-20">
              <div className="relative flex flex-col h-full w-full card rounded-box p-10 bg-slate-50">
                <Button role="modal-close-btn" onClick={() => setIsOpen((prev) => !prev)} className="absolute top-6 right-6">
                  <CloseIcon />
                </Button>
                <CoverLetterContent coverLetter={coverLetter} />
              </div>
            </div>
          }

        </>
      }
    </>
  )
}

export default CoverLetterModal;