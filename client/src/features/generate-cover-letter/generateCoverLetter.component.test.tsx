import { render, fireEvent, waitFor } from '@testing-library/react';
import GenerateCoverLetter from './generateCoverLetter.component';
import { CoverLetterContext } from '../../context/coverLetterContext';
import useCoverLetterGenerator from './hooks/useCoverLetterGenerator';
import useUploadFile from './hooks/useUploadFile';
import useLinkInput from './hooks/useLinkInput';

jest.mock('./hooks/useCoverLetterGenerator');
jest.mock('./hooks/useUploadFile');
jest.mock('./hooks/useLinkInput');

describe('GenerateCoverLetter component', () => {
  const mockCoverLetter = {
    coverLetterContent: '',
    downloadFileName: '',
    downloadUrl: ''
  };

  const mockSetCoverLetter = jest.fn();
  const mockGenerateCoverLetter = jest.fn();
  const mockHandleFileSelect = jest.fn();
  const mockHandleLinkChange = jest.fn();

  beforeEach(() => {
    (useCoverLetterGenerator as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      error: null,
      generateCoverLetter: (_url: string, _file: File) => Promise.resolve(undefined),
    }));

    (useUploadFile as jest.Mock).mockReturnValue({
      file: null,
      fileName: '',
      handleFileSelect: mockHandleFileSelect,
    });

    (useLinkInput as jest.Mock).mockReturnValue({
      linkUrl: '',
      handleLinkChange: mockHandleLinkChange,
    });
  });

  test('renders the component', () => {
    const { getByText, getByRole } = render(
      <CoverLetterContext.Provider value={{
        setCoverLetter: mockSetCoverLetter,
        coverLetter: mockCoverLetter
      }}>
        <GenerateCoverLetter />
      </CoverLetterContext.Provider>
    );
    const fileInput = getByRole('uploadInput');
    expect(fileInput).toBeInTheDocument();

    const linkInput = getByRole('linkedInJobURL');
    expect(linkInput).toBeInTheDocument();

    const submitButton = getByText('generate');
    expect(submitButton).toBeInTheDocument();

  });

  test('handles submit when file is selected', async () => {
    const { getByRole, getByText } = render(
      <CoverLetterContext.Provider value={{
        setCoverLetter: mockSetCoverLetter,
        coverLetter: mockCoverLetter
      }}>
        <GenerateCoverLetter />
      </CoverLetterContext.Provider>
    );

    const fileInput = getByRole('uploadInput');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.pdf',
          { type: 'application/pdf' })]
      }
    });

    const linkInput = getByRole('linkedInJobURL');
    fireEvent.change(linkInput, {
      target:
        { value: 'https://example.com' }
    });

    const submitButton = getByText('generate');
    fireEvent.click(submitButton);

  });

  it('displays an error message when an error occurs', async () => {
    const mockError = 'Invalid file type. Please upload a PDF file.';

    (useCoverLetterGenerator as jest.MockedFunction<typeof useCoverLetterGenerator>).mockImplementation(() => ({
      isLoading: false,
      error: mockError,
      generateCoverLetter: mockGenerateCoverLetter,
    }));


    const { getByText, getByRole } = render(<GenerateCoverLetter />);

    const fileInput = getByRole('uploadInput') as HTMLInputElement;
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['(⌐□_□)'], 'wrongfile.txt',
          { type: 'text/plain' })]
      }
    });

    const linkInput = getByRole('linkedInJobURL');
    fireEvent.change(linkInput, {
      target: {
        value:
          'https://www.linkedin.com/jobs/view/?currentJobId=3828037836/'
      }
    });

    const generateButton = getByText('generate');
    fireEvent.click(generateButton);

    await waitFor(() => {
      const alert = getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toBe(`Warning: ${mockError}`);
    });
  });

  it('clears the input fields after a successful submission', async () => {
    const { getByText, getByRole } = render(
      <GenerateCoverLetter />
    );

    const fileInput = getByRole('uploadInput') as HTMLInputElement;
    fireEvent.change(fileInput, {
      target:
      {
        files: [new File(['(⌐□_□)'], 'chucknorris.pdf',
          { type: 'application/pdf' })]
      }
    });

    const linkInput = getByRole('linkedInJobURL');
    fireEvent.change(linkInput, {
      target:
        { value: 'https://www.linkedin.com/jobs/view/?currentJobId=3828037836/' }
    });

    const generateButton = getByText('generate');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(linkInput.innerHTML).toBe('');
      expect(fileInput.value).toBe('');
    });
  });


});