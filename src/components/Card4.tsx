import { useNavigate } from "react-router-dom";

function Card4({template,onClick}) {

    const navigate = useNavigate();
  return (
    <div  className="flex items-center  justify-center cursor-pointer">
      <div tabIndex="0" onClick={onClick} className="flex flex-col justify-center items-center active:scale-110 transform duration-200 focus:bg-green-500 dark:bg-gray-800 bg-[#93a8ac] text-white rounded-lg shadow-lg p-4 w-60">
        <p className="text-xl font-bold mb-4 text-center break-words">
          {template.name}
        </p>
        <p className="mb-4 text-center">
            Use this template for your message.
        </p>

        <button
          onClick={()=>navigate("/templates")}
          className="bg-gradient-to-r mt-4 from-blue-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
        >
          See more
        </button>
      </div>
    </div>
  );
}

export default Card4;
