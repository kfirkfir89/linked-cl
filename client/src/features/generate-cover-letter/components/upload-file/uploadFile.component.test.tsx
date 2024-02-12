import { render, fireEvent } from '@testing-library/react';
import UploadFile from './uploadFile.component';
import '@testing-library/jest-dom';
console.log(UploadFile);
describe('UploadFile component', () => {
  const mockOnFileSelect = jest.fn();
  const { getByRole } = render(<UploadFile fileName='chucknorris' onFileSelect={mockOnFileSelect} />);

  test('renders the input element', () => {
    const uploadInput = getByRole('uploadInput');
    expect(uploadInput).toBeInTheDocument();
  });

  test('triggers onChange when a file is selected', () => {
    const mockOnChange = jest.fn();

    const { getByRole } = render(<input role='uploadInput' type="file" onChange={mockOnChange} />);
    const uploadInput = getByRole('uploadInput');

    const file = new File(['(⌐□_□)'], 'chucknorris.pdf', { type: 'application/pdf' });
    fireEvent.change(uploadInput, { target: { files: [file] } });

    expect(file.type).toBe('application/pdf');
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('calls onFileSelect with the selected file', async () => {
    const { getByRole } = render(<UploadFile fileName='chucknorris' onFileSelect={mockOnFileSelect} type='file' accept='.pdf' />);
    const uploadInput = getByRole('uploadInput');

    const file = new File(['(⌐□_□)'], 'chucknorris.pdf', { type: 'application/pdf' });
    fireEvent.change(uploadInput, { target: { files: [file] } });

    expect(mockOnFileSelect).toHaveBeenCalled()
    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
  });
});