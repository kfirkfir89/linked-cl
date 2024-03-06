import { fireEvent, render, waitFor } from '@testing-library/react';
import { CoverLetterContext } from '../../context/coverLetterContext';
import CoverLetterModal from './coverLetterModal.component';

describe('CoverLetterModal component', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  const mockCoverLetter = {
    coverLetterContent: 'cover letter content',
    downloadFileName: 'cover_letter.pdf',
    downloadUrl: 'https://example.com/cover_letter.pdf',
  };
  const mockSetCoverLetter = jest.fn();

  const mockCoverLetterContent = {
    setCoverLetter: mockSetCoverLetter,
    coverLetter: mockCoverLetter
  }


  test('toggles the modal when generate cover letter button is clicked', () => {
    const { getByRole, queryByRole } = render(
      <CoverLetterContext.Provider value={mockCoverLetterContent}>
        <CoverLetterModal />
      </CoverLetterContext.Provider>
    );

    const coverLetterButton = getByRole('modal-cl-btn');
    const modal = queryByRole('dialog-modal');

    expect(coverLetterButton).toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();

    fireEvent.click(coverLetterButton);

    waitFor(() => {
      const closeButton = getByRole('modal-close-btn');
      expect(closeButton).toBeInTheDocument();
      expect(modal).toBeInTheDocument();
    });
  });

  test('renders the component with cover letter content', () => {
    const { getByRole } = render(
      <CoverLetterContext.Provider value={mockCoverLetterContent}>
        <CoverLetterModal />
      </CoverLetterContext.Provider>
    );

    const coverLetterModal = getByRole('cover-letter-modal');
    const coverLetterButton = getByRole('modal-cl-btn');
    expect(coverLetterModal).toBeInTheDocument();
    expect(coverLetterButton).toBeInTheDocument();

    fireEvent.click(coverLetterButton);

    waitFor(() => {
      const coverLetterContent = getByRole('textarea-box');
      const closeButton = getByRole('modal-close-btn');
      expect(closeButton).toBeInTheDocument();
      expect(coverLetterContent).toHaveValue();
    });

  });


  test('closes the modal when close button is clicked', async () => {

    const { getByRole, queryByRole } = render(
      <CoverLetterContext.Provider value={mockCoverLetterContent}>
        <CoverLetterModal />
      </CoverLetterContext.Provider>
    );

    const coverLetterButton = getByRole('modal-cl-btn');
    const modal = queryByRole('dialog-modal');

    expect(coverLetterButton).toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();

    fireEvent.click(coverLetterButton);

    waitFor(() => {
      const closeButton = getByRole('modal-close-btn');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
      expect(modal).not.toBeInTheDocument();
    });

  });
});