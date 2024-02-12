import { render, fireEvent } from '@testing-library/react';
import LinkInput from './linkInput.component';
import '@testing-library/jest-dom';

describe('LinkInput component', () => {
  const mockOnLinkChange = jest.fn();
  const mockValue = 'www.linkedin.com/example';

  test('renders the input element', () => {
    const { getByRole } = render(<LinkInput onLinkChange={mockOnLinkChange} value={mockValue} />);
    const linkInput = getByRole('linkedInJobURL');
    expect(linkInput).toBeInTheDocument();
    expect(linkInput).toHaveValue(mockValue);
  });

  test('triggers onLinkChange when input value changes', () => {
    const { getByRole } = render(<LinkInput onLinkChange={mockOnLinkChange} value={mockValue} />);
    const linkInput = getByRole('linkedInJobURL');

    const newLink = 'www.linkedin.com/new-example';
    fireEvent.change(linkInput, { target: { value: newLink } });

    expect(mockOnLinkChange).toHaveBeenCalled();
    expect(mockOnLinkChange).toHaveBeenCalledWith(newLink);
  });
});