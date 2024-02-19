import { memo, useState, useEffect } from "react";
import { CoverLetter } from "../../context/coverLetterContext";

function formatContent(content: string) {
  // find the first and last comma
  let firstCommaIndex = content.indexOf(',');
  let lastCommaIndex = content.lastIndexOf(',');

  // add a line break after the first comma
  if (firstCommaIndex !== -1) {
    content = content.slice(0, firstCommaIndex + 1) + '\n' + content.slice(firstCommaIndex + 1);
    lastCommaIndex++; // Adjust the last comma index because we added a character
  }

  // add a line break after the last comma
  if (lastCommaIndex !== -1) {
    content = content.slice(0, lastCommaIndex + 1) + '\n' + content.slice(lastCommaIndex + 1);
  }

  // add a line break after each period and trim leading spaces on each line
  let formattedContent = content
    .replace(/\. +/g, '.\n')
    .split('\n')
    .map(line => line.trim())
    .join('\n')

  return formattedContent;
}

const CoverLetterContent = ({ coverLetter }: { coverLetter: CoverLetter }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (coverLetter.coverLetterContent) {
      const formattedContent = formatContent(coverLetter.coverLetterContent);
      setContent(formattedContent);
    }
  }, [coverLetter.coverLetterContent]);

  return (
    <>
      <textarea
        className="textarea textarea-bordered h-full m-6 max-h-fit"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        role="textarea-box"
      />
      <a className="btn btn-primary rounded-xl w-full py-5 pb-8 my-4" href={coverLetter.downloadUrl} download={coverLetter.downloadFileName}>
        Download Cover Letter
      </a>
    </>
  );
}
export default memo(CoverLetterContent);