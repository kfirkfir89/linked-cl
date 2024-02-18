import { renderHook, act, waitFor } from '@testing-library/react';
import useCoverLetterGenerator from './useCoverLetterGenerator'; 

global.fetch = jest.fn() as jest.Mock;

describe('useCoverLetterGenerator', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
    window.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets error on invalid LinkedIn URL', async () => {
    const { result } = renderHook(() => useCoverLetterGenerator());

    await act(async () => {
      result.current.generateCoverLetter('invalid-url', new File([''], 'document.pdf', { type: 'application/pdf' }));
    });

    expect(result.current.error).toBe('Please enter a valid LinkedIn URL.');
    expect(result.current.isLoading).toBeFalsy(); 
  });

  it('sets error for non-PDF file upload', async () => {
    const { result } = renderHook(() => useCoverLetterGenerator());
  
    const textFile = new File(['content'], 'document.txt', { type: 'text/plain' });
  
    await act(async () => {
      result.current.generateCoverLetter('https://www.linkedin.com/jobs/view/?currentJobId=3828037836/', textFile);
    });

    expect(result.current.error).toBe('Invalid file type. Please upload a PDF file.');
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles fetch error correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('api call failed'));
    
    const { result } = renderHook(() => useCoverLetterGenerator());
  
    await act(async () => {
      await result.current.generateCoverLetter('https://www.linkedin.com/jobs/view/?currentJobId=3828037836/', new File([''], 'document.pdf', { type: 'application/pdf' }));
    });
  
    await waitFor(() => 
    expect(result.current.error).toBe('api call failed'));
  
    expect(result.current.isLoading).toBeFalsy();
  });

  it('sets loading state correctly during cover letter generation', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
      headers: new Headers({
        'Cover-Letter-Data': 'cover letter content',
        'Content-Disposition': 'attachment; filename="cover_letter.pdf"',
      }),
      blob: async () => new Blob([], { type: 'application/pdf' })
    });
  
    const { result } = renderHook(() => useCoverLetterGenerator());
  
    act(() => {
      result.current.generateCoverLetter(
        'https://www.linkedin.com/jobs/view/?currentJobId=3828037836/', new File(['content'], 'CV.pdf', { type: 'application/pdf' }));
    });
    expect(result.current.isLoading).toBeTruthy()

    await act(async () => {
      await result.current.generateCoverLetter('https://www.linkedin.com/jobs/view/?currentJobId=3828037836/', new File(['content'], 'CV.pdf', { type: 'application/pdf' }));
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('successfully generates a cover letter', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: async () => new Blob(['test blob content'], { type: 'application/pdf' }),
      headers: new Headers({
        'Cover-Letter-Data': 'cover letter content',
        'Content-Disposition': 'attachment; filename="cover_letter.pdf"',
      }),
    });
  
    (global.URL.createObjectURL as jest.Mock).mockReturnValue('blob:http://localhost:3000/');
  
    const { result } = renderHook(() => useCoverLetterGenerator());
    let coverLetter;

    await act(async () => {
      coverLetter = await result.current.generateCoverLetter('https://www.linkedin.com/jobs/view/?currentJobId=3828037836/', new File(['content'], 'CV.pdf', { type: 'application/pdf' }));
    });
  
    expect(result.current.error).toBe('');
    expect(global.fetch).toHaveBeenCalled();
    expect(result.current.isLoading).toBeFalsy();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(coverLetter).toEqual({
      downloadUrl: 'blob:http://localhost:3000/',
      downloadFileName: 'cover_letter.pdf',
      coverLetterContent: 'cover letter content',
    });
  });
  
});
