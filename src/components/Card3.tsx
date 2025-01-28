
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Card3 = ({ group, onClick, isSelected }) => {
  const navigate = useNavigate();
  const id= group.id;
  const handleSeeMoreClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    navigate("/contactsgroups",{state:{id}});
  };

  return (
    <div 
      onClick={onClick}
      className={`w-40 h-56 rounded-3xl cursor-pointer active:scale-110 transform duration-200 
        ${isSelected ? 'bg-green-500' : 'dark:bg-neutral-800 bg-slate-400'} 
        text-neutral-300 p-2 flex flex-col items-start justify-center gap-3 
        ${!isSelected && 'dark:hover:bg-gray-900 hover:bg-slate-500'} 
        hover:shadow-lg hover:shadow-sky-400 transition-shadow`}
    >
      <div className="w-full h-20 bg-sky-300 rounded-2xl bg-cover">
        {group.groupCoverImage ? (
          <img
            src={group.groupCoverImage}
            alt={group.name}
            className="w-full h-full max-w-full max-h-full rounded-2xl"
          />
        ) : (
          <span className="flex-1 inline-flex justify-center items-center">
            <FontAwesomeIcon className="text-slate-50 w-5 h-5" icon={faImage}/>
          </span>
        )}
      </div>
      <div>
        <p className="font-extrabold">{group.name}</p>
        <p className="font-bold text-sm">Members: {group.groupMembers}</p>
      </div>
      <button
        onClick={handleSeeMoreClick}
        className="bg-sky-700 text-sm font-bold p-2 px-4 rounded-xl hover:bg-sky-500 transition-colors"
      >
        See more
      </button>
    </div>
  );
};

export default Card3;