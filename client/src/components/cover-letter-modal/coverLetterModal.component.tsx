import { useContext } from "react";
import { CoverLetterContext } from "../../context/coverLetterContext";
import CoverLetterContent from "../../features/cover-letter-content/coverLetterContent.component"
import Button from "../button/button.component";
import GenerateCoverLetter from "../../features/generate-cover-letter/generateCoverLetter.component";

const CoverLetterModal = () => {
  const { coverLetter } = useContext(CoverLetterContext);

  return (
    <div role="cover-letter-modal" className="flex items-center w-full h-full max-w-lg">
      <div className="w-full mx-2">
        <Button
          role="modal-cl-btn"
          className="btn btn-ghost py-3 rounded-xl w-full text-sky-600 uppercase bg-yellow-200 hover:text-yellow-200"
          onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}
        >
          generate
        </Button>
      </div>

      <dialog role='dialog-modal' id="my_modal_2" className="modal ">
        <div className="modal-box h-full w-11/12 max-w-7xl flex justify-center bg-opacity-85">
          <form method="dialog">
            <Button role='modal-close-btn' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Button>
          </form>
          <div className="flex flex-col lg:flex-row gap-6 h-full container">
            <div className="lg:max-w-sm max-w-lg w-full self-center lg:self-start mt-1">
              <GenerateCoverLetter />
            </div>
            <div className="h-full lg:w-full">
              <CoverLetterContent coverLetter={coverLetter} />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default CoverLetterModal;