import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoverLetterContent from './coverLetterContent.component'; // Adjust the import path as necessary.

const mockCoverLetter = {
  coverLetterContent: 'this, is. a test, cover letter.',
  downloadUrl: 'http://example.com/download',
  downloadFileName: 'cover-letter.pdf',
};

describe('CoverLetterContent', () => {
  test('renders textarea and download link', () => {
    const { getByRole, getByText } = render(<CoverLetterContent coverLetter={mockCoverLetter} />);
    expect(getByRole('textarea-box')).toBeInTheDocument();
    expect(getByText('Download Cover Letter')).toBeInTheDocument();
    expect(getByText('Download Cover Letter')).toHaveAttribute('href', mockCoverLetter.downloadUrl);
  });

  test('formats content correctly', async () => {
    const { getByRole } = render(<CoverLetterContent coverLetter={mockCoverLetter} />);
    const textarea = getByRole('textarea-box') as HTMLTextAreaElement;
    await waitFor(() => {
      expect(textarea.value).toContain('this,\nis.\na test,\ncover letter.');
    });
  });

  test('updates content on user input', () => {
    const { getByRole } = render(<CoverLetterContent coverLetter={mockCoverLetter} />);
    const textarea = getByRole('textarea-box') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'new content' } });
    expect(textarea.value).toBe('new content');
  });

  test('download link has correct attributes', () => {
    const { getByText } = render(<CoverLetterContent coverLetter={mockCoverLetter} />);
    const downloadLink = getByText('Download Cover Letter');
    expect(downloadLink).toHaveAttribute('href', mockCoverLetter.downloadUrl);
    expect(downloadLink).toHaveAttribute('download', mockCoverLetter.downloadFileName);
  });
});
