import React from 'react';

type GenerateButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
};

const GenerateButton: React.FC<GenerateButtonProps> = ({ disabled, isLoading, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="btn btn-ghost py-3 rounded-xl h-full w-full text-sky-600 bg-yellow-200 hover:text-yellow-200"
    >
      <span className="w-full flex flex-col items-center justify-center">
        {isLoading ? (
          <span className="loading loading-ring text-sky-100 w-1/2"></span>
        ) : (
          <span className="relative z-20 flex items-center text-lg">
            Generate
            <svg
              className="relative w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </span>
        )}
      </span>
    </button>
  );
};

export default GenerateButton;