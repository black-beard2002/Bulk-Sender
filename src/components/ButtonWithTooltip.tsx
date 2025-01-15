import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonWithTooltip(props) {
  return (
    /* From Uiverse.io by EcheverriaJesus */
    <section onClick={props.onClick} className="relative flex justify-center items-center cursor-pointer">
      <div className="group flex justify-center items-center transition-all rounded-full bg-gray-200 p-1">
        <FontAwesomeIcon className="text-zinc-700" icon={faPlusCircle}/>
        <span className={`absolute w-20 opacity-0 group-hover:opacity-100 group-hover:${props.spanDirection} duration-500 text-sm`}>
          add variable
        </span>
      </div>
    </section>
  );
}

export default ButtonWithTooltip;
