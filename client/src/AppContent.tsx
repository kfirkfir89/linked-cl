import Footer from "./components/footer/footer.component";
import Instructions from "./components/instructions/instuctions.component";
import Title from "./components/title/title.component";
import CoverLetterModal from "./components/cover-letter-modal/coverLetterModal.component";

const AppContent = () => {


  return (
    <div className="w-full md:h-full h-vhs flex flex-col items-center bg-gradient-to-b from-sky-700 from-10% via-[#0277B5] via-20%  to-teal-200 to-60%">
      <Title />
      <Instructions />
      <CoverLetterModal />
      <Footer />
    </div>
  )
}

export default AppContent;