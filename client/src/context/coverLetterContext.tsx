import { FC, ReactNode, createContext, useState } from 'react';

export type CoverLetter = {
  downloadUrl: string,
  downloadFileName: string,
  coverLetterContent: string
}

const initialCoverLetter: CoverLetter = {
  downloadUrl: '',
  downloadFileName: '',
  coverLetterContent: ''
};

type CoverLetterContextType = {
  coverLetter: CoverLetter,
  setCoverLetter: (coverLetter: CoverLetter) => void
}

export const CoverLetterContext = createContext<CoverLetterContextType>({
  coverLetter: initialCoverLetter,
  setCoverLetter: () => { }
});

export const CoverLetterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [coverLetter, setCoverLetter] = useState(initialCoverLetter);

  return (
    <CoverLetterContext.Provider value={{ coverLetter, setCoverLetter }}>
      {children}
    </CoverLetterContext.Provider>
  );
};