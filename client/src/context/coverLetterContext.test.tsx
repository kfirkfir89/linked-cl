import { render, screen, fireEvent } from '@testing-library/react';
import { CoverLetterContext, CoverLetterProvider } from './coverLetterContext';
import { useContext } from 'react';

// mock component to test context functionality
const TestComponent = () => {
  const { coverLetter, setCoverLetter } = useContext(CoverLetterContext);

  return (
    <div>
      <div data-testid="content">{coverLetter.coverLetterContent}</div>
      <button onClick={() => setCoverLetter({
        ...coverLetter,
        coverLetterContent: 'updated cover letter content'
      })}>
        update context
      </button>
    </div>
  );
};

describe('CoverLetterContext', () => {
  test('provides and updates context values correctly', () => {
    render(
      <CoverLetterProvider>
        <TestComponent />
      </CoverLetterProvider>
    );

    expect(screen.getByTestId('content')).toHaveTextContent('');

    fireEvent.click(screen.getByText('update context'));

    expect(screen.getByTestId('content')).toHaveTextContent('updated cover letter content');
  });
});
