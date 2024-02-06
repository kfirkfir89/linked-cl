import { useContext, useState } from "react";
import { CoverLetterContext } from "../../../context/coverLetterContext";
import Modal from "../../../components/modal/modal.component";
import CoverLetterContent from "../coverLetterContent.component"
import Button from "../../../components/button/button.component";

const CoverLetterModal = () => {
  const { coverLetter } = useContext(CoverLetterContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {
        coverLetter.coverLetterContent &&
        <>
          <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-6 max-w-5xl px-4">
            <div className="md:col-start-4 md:col-span-4 flex flex-col gap-6">
              <Button className="btn btn-ghost py-3 rounded-xl w-full text-sky-600 bg-yellow-200 hover:text-yellow-200" onClick={() => { setIsOpen((prev) => !prev) }}>
                Cover Letter
              </Button>
            </div>
          </div>
          <Modal onClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
            <CoverLetterContent coverLetter={coverLetter} />
          </Modal>
        </>
      }
    </>
  )
}

export default CoverLetterModal;