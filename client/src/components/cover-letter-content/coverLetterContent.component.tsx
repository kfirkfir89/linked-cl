import { useState } from "react";
import { CoverLetter } from "../../hooks/useCoverLetterGenerator";

const CoverLetterContent = ({ coverLetter }: { coverLetter: CoverLetter }) => {
  const [content, setContent] = useState<string>('');

  if (coverLetter.coverLetterContent !== content) {
    setContent(coverLetter.coverLetterContent);
  }

  return (
    <>
      {
        coverLetter.coverLetterContent && (
          <div className="absolute right-0 top-0 z-50 h-full w-full bg-black bg-opacity-20 p-20">
            <div className="flex flex-col h-full w-full card rounded-box p-10 bg-slate-50">
              {
                coverLetter.coverLetterContent && (
                  <textarea
                    className="textarea textarea-bordered h-full max-h-fit"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                )
              }
              <a className="btn btn-primary rounded-xl w-full py-5 pb-8 my-4" href={coverLetter.downloadUrl} download={coverLetter.downloadFileName}>
                Download Cover Letter
              </a>
            </div>
          </div>
        )
      }
    </>
  )
}

export default CoverLetterContent;