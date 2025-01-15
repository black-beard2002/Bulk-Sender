import { faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Card = (props) => {


  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-[#93a8ac] dark:bg-gray-800 text-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">{props.cardTitle}</h2>
        <p className="mb-4 text-center">
        You can easily customize, delete, or use this template to send messages directly.
        </p>
        <div className="flex flex-wrap gap-10">

          <FontAwesomeIcon onClick={props.onClick} icon={faEye} color="white" className="w-6 h-6 cursor-pointer hover:text-blue-300 duration-500"/>
          <FontAwesomeIcon onClick={props.onDelete} icon={faTrashCan} color="white" className="w-6 h-6 cursor-pointer hover:text-red-500 duration-500"/>
        </div>

        <button onClick={props.onUse} className="bg-gradient-to-r mt-4 from-blue-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full animate-pulse">
          Use
        </button>
      </div>
    </div>
  );
};

export default Card;
