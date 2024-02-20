import Footer from "./components/footer/footer.component";
import Instructions from "./components/instructions/instuctions.component";
import Title from "./components/title/title.component";
import GenerateCoverLetter from "./features/generate-cover-letter/generateCoverLetter.component";
import CoverLetterModal from "./features/cover-letter-content/components/cover-letter-modal/coverLetterModal.component";

const AppContent = () => {


  return (
    <div className="h-full w-full">
      <div className="h-full w-full bg-gradient-to-b from-[#0277B5] from-20%  to-teal-200 to-60%">
        <div className="flex flex-col w-full h-full gap-8 items-center">
          <Title />
          <div className="grid grid-cols-1 md:grid-cols-5 w-full h-full  max-w-5xl px-4">
            <div className="md:col-span-3 ">
              <Instructions />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6 h-full justify-center ">
              <GenerateCoverLetter />
            </div>
          </div>
          <CoverLetterModal />
          <div className="h-8 flex w-full">
            <Footer />
          </div>

        </div>
      </div>
    </div>
  )
}

export default AppContent;