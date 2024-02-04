import Footer from "./components/footer/footer.component";
import Instructions from "./components/instructions/instuctions.component";
import Title from "./components/title/title.component";
import GenerateCoverLetter from "./features/generate-cover-letter/generateCoverLetter.component";

const AppContent = () => {
  return (
    <div className="h-full w-full bg-slate-50">
      <div className="flex flex-col w-full h-full gap-4 items-center">
        <Title />
        <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-10 max-w-4xl mt-14 p-2">
          <div className="md:col-span-3 ">
            <Instructions />
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <GenerateCoverLetter />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AppContent;