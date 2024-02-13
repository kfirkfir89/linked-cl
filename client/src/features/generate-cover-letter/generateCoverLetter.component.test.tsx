import { render, fireEvent, waitFor, prettyDOM } from '@testing-library/react';
import GenerateCoverLetter from './generateCoverLetter.component';
import { CoverLetterContext } from '../../context/coverLetterContext';
import useCoverLetterGenerator from './hooks/useCoverLetterGenerator';
import useUploadFile from './hooks/useUploadFile';
import useLinkInput from './hooks/useLinkInput';
import * as useCoverLetterHook from './hooks/useCoverLetterGenerator';

jest.mock('./hooks/useCoverLetterGenerator');
jest.mock('./hooks/useUploadFile');
jest.mock('./hooks/useLinkInput');

describe('GenerateCoverLetter component', () => {
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
      <CoverLetterContext.Provider value={{ setCoverLetter: mockSetCoverLetter, coverLetter: { coverLetterContent: '', downloadFileName: '', downloadUrl: '' } }}>
        <GenerateCoverLetter />
      </CoverLetterContext.Provider>
    );
    const fileInput = getByRole('uploadInput');
    expect(fileInput).toBeInTheDocument();
    // Simulate link input change
    const linkInput = getByRole('linkedInJobURL');
    expect(linkInput).toBeInTheDocument();
    // Simulate submit button click
    const submitButton = getByText('generate');
    expect(submitButton).toBeInTheDocument();

  });

  test('handles submit when file is selected', async () => {
    const mockCoverLetter = 'Generated cover letter';
    (mockGenerateCoverLetter as jest.Mock).mockResolvedValue(mockCoverLetter);

    const { getByRole, getByText } = render(
      <CoverLetterContext.Provider value={{ setCoverLetter: mockSetCoverLetter, coverLetter: { coverLetterContent: '', downloadFileName: '', downloadUrl: '' } }}>
        <GenerateCoverLetter />
      </CoverLetterContext.Provider>
    );

    const fileInput = getByRole('uploadInput');
    fireEvent.change(fileInput, { target: { files: [new File(['(⌐□_□)'], 'chucknorris.pdf', { type: 'application/pdf' })] } });

    const linkInput = getByRole('linkedInJobURL');
    fireEvent.change(linkInput, { target: { value: 'https://example.com' } });

    const submitButton = getByText('generate');
    fireEvent.click(submitButton);

  });

  it('displays an error message when an error occurs', async () => {
    const mockError = 'Invalid file type. Please upload a PDF file.';

    (useCoverLetterHook as jest.Mocked<typeof useCoverLetterHook>).default.mockReturnValue({
      isLoading: false,
      error: mockError,
      generateCoverLetter: jest.fn(),
    });

    const { getByText, getByRole, container } = render(<GenerateCoverLetter />);

    const fileInput = getByRole('uploadInput') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [new File(['(⌐□_□)'], 'wrongfile.txt', { type: 'text/plain' })] } });

    const linkInput = getByRole('linkedInJobURL');
    fireEvent.change(linkInput, { target: { value: 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3807187072&eBP=CwEAAAGNo7HBrbGoP76S1JZJxlytOxZUa3-6zoru1v-zKfAQfdnPmrBRwvo7tOl75eduqx3VGWxlscLID9t7k8iD3DNluDy7bx3BCPx0C0CrarYQS5Vs3uuDj6lOUVrB027gRauAYx7EEQsM1ISSXPVYbXzUjUFAageOxDyQpW3CZOYuE-L_N1iyMlmjJaxVETh66Ii0Ibu5cOTxIgvVhw1KoHII6G1psgRQOxE4kiKOOpbBAUOe2LlAiNEv7k2OfECI0kvNlowqHovXAUBPu2SDloZR1smDUr-o4PlWseEovfMxzS7kGHz7fXojZPioo3y1jrTW6wjCvS6zu1GlokcFfkLBu1pETQtsHGGyYJ2IJUpK6DYhKWR2Qc0B1L5XJlg9HoCruDyR583hWENQhMqOUqNb12I&refId=%2B9aJrbd1%2FqKR2bdzpNuMkw%3D%3D&trackingId=GWXznGrz21Lla2VuLjkSqQ%3D%3D' } });

    const generateButton = getByText('generate');
    fireEvent.click(generateButton);

    await waitFor(() => {
      const alert = getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toBe(`Warning: ${mockError}`);
      console.log(prettyDOM(container));
    });
  });

  it('clears the input fields after a successful submission', async () => {
    const { getByText, getByRole } = render(
      <GenerateCoverLetter />
    );

    const fileInput = getByRole('uploadInput') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [new File(['(⌐□_□)'], 'chucknorris.pdf', { type: 'application/pdf' })] } });

    const linkInput = getByRole('linkedInJobURL');
    fireEvent.change(linkInput, { target: { value: 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3807187072&eBP=CwEAAAGNo7HBrbGoP76S1JZJxlytOxZUa3-6zoru1v-zKfAQfdnPmrBRwvo7tOl75eduqx3VGWxlscLID9t7k8iD3DNluDy7bx3BCPx0C0CrarYQS5Vs3uuDj6lOUVrB027gRauAYx7EEQsM1ISSXPVYbXzUjUFAageOxDyQpW3CZOYuE-L_N1iyMlmjJaxVETh66Ii0Ibu5cOTxIgvVhw1KoHII6G1psgRQOxE4kiKOOpbBAUOe2LlAiNEv7k2OfECI0kvNlowqHovXAUBPu2SDloZR1smDUr-o4PlWseEovfMxzS7kGHz7fXojZPioo3y1jrTW6wjCvS6zu1GlokcFfkLBu1pETQtsHGGyYJ2IJUpK6DYhKWR2Qc0B1L5XJlg9HoCruDyR583hWENQhMqOUqNb12I&refId=%2B9aJrbd1%2FqKR2bdzpNuMkw%3D%3D&trackingId=GWXznGrz21Lla2VuLjkSqQ%3D%3D' } });

    const generateButton = getByText('generate');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(linkInput.innerHTML).toBe('');
      expect(fileInput.value).toBe('');
    });
  });


});