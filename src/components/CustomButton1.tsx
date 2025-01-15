import React from "react";

function CustomButton1(props) {
  return (
    <button
      type="button"
      className="group relative w-full h-full px-5 py-2 text-white font-bold text-sm bg-[#1985a1] dark:bg-[#006bb3] rounded-full shadow-lg transition-transform transform hover:scale-105 border-[3px] border-[#ffffff4d] overflow-hidden dark:hover:border-blue-700 hover:border-zinc-400 flex items-center justify-center gap-2"
      onClick={props.onClick}
    >
      {props.text}
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-10 h-10 transition-transform group-hover:translate-x-1"
      >
        <path
          clipRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          fillRule="evenodd"
        ></path>
      </svg>
      <div className="absolute inset-0 shine"></div>
    </button>
  );
}

export default CustomButton1;
