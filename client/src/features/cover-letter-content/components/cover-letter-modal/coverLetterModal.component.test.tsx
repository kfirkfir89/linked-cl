import { render, fireEvent, waitFor } from '@testing-library/react';
import { CoverLetterContext } from '../../../../context/coverLetterContext';
import CoverLetterModal from './coverLetterModal.component';

describe('CoverLetterModal component', () => {
  const mockCoverLetter = {
    coverLetterContent: 'cover letter content',
    downloadFileName: 'cover_letter.pdf',
    downloadUrl: 'https://example.com/cover_letter.pdf',
  };
  const mockSetCoverLetter = jest.fn();

  test('renders the component with cover letter content', () => {
    const { getByRole } = render(
      <CoverLetterContext.Provider value={{
        setCoverLetter: mockSetCoverLetter,
        coverLetter: mockCoverLetter
      }}>
        <CoverLetterModal />
      </CoverLetterContext.Provider>
    );

    const coverLetterModal = getByRole('cover-letter-modal');
    const closeButton = getByRole('modal-close-btn');
    const coverLetterButton = getByRole('modal-cl-btn');

    expect(coverLetterModal).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(coverLetterButton).toBeInTheDocument();
  });

  test('toggles the modal when cover letter button is clicked', () => {
    const { getByRole, queryByRole } = render(
      <CoverLetterContext.Provider value={{
        setCoverLetter: mockSetCoverLetter,
        coverLetter: mockCoverLetter
      }}>
        <CoverLetterModal />
      </CoverLetterContext.Provider>
    );

    const modal = queryByRole('dialog-modal');
    const closeButton = getByRole('modal-close-btn');
    const coverLetterButton = getByRole('modal-cl-btn');

    expect(modal).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();

    fireEvent.click(coverLetterButton);
    waitFor(() => expect(modal).toBeInTheDocument());

  });

  test('closes the modal when close button is clicked', async () => {

    const { getByRole, queryByRole } = render(
      <CoverLetterContext.Provider value={{
        setCoverLetter: mockSetCoverLetter,
        coverLetter: mockCoverLetter
      }}>
        <CoverLetterModal />
      </CoverLetterContext.Provider>
    );

    const modal = queryByRole('dialog-modal');
    const closeButton = getByRole('modal-close-btn');

    expect(modal).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });
});