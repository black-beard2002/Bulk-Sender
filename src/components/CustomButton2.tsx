
const CustomButton2 = (props) => {
    return (
        <button 
        type={props.type}
        className="flex items-center justify-center gap-3 bg-[#1985a1] dark:bg-[#0630ad] text-white font-semibold rounded-md px-6 py-3 overflow-hidden whitespace-nowrap transition-all duration-300 hover:bg-[#115d6f] dark:hover:bg-[#011b69] group"
        >
          <span className="flex-shrink-0 w-6 h-6 relative text-[#7808d0] bg-white rounded-full grid place-items-center overflow-hidden transition-all duration-300 group-hover:text-black">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute transition-transform duration-300 group-hover:translate-x-[150%] group-hover:translate-y-[-150%]"
              width="10"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              ></path>
            </svg>
    
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute translate-x-[-150%] translate-y-[150%] transition-transform duration-300 delay-100 group-hover:translate-x-0 group-hover:translate-y-0"
              width="10"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          {props.text}
        </button>
      );
};

export default CustomButton2;
