import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-64">
      <svg
        className="animate-spin h-8 w-8 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0114.64-4.64L14 12l4.64 4.64A8 8 0 014 12z"
        ></path>
      </svg>
    </div>
  );
};

export default Loader;
