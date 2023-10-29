import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import UploadFile from './components/upload-file/uploadFile.component';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span className="text-2xl  bg-red-900 font-bold ">hello</span>
      <UploadFile />
    </div>
  );
}

export default App;
