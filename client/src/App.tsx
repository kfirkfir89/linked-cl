import AppContent from './AppContent';
import { CoverLetterProvider } from './context/coverLetterContext';

function App() {
  return (
    <CoverLetterProvider>
      <AppContent />
    </CoverLetterProvider>
  );
}

export default App;