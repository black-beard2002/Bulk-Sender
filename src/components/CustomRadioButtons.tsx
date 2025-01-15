import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FIcon from '@fortawesome/free-solid-svg-icons';

const RadioTileGroup = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection=(value)=>{
    setSelectedOption(value)
    props.onSelect(value)
  }
  const radioOptions = [
    { 
      id: 'none', 
      label: 'None', 
      icon: <FontAwesomeIcon icon={FIcon.faStop} size="1x" />
    },
    { 
      id: 'TEXT', 
      label: 'Text', 
      icon: <FontAwesomeIcon icon={FIcon.faT} size="1x" />
    },
    { 
      id: 'MEDIA', 
      label: 'Media', 
      icon: <FontAwesomeIcon icon={FIcon.faImage} size="1x" />
    },
    { 
      id: 'LOCATION', 
      label: 'Location', 
      icon: <FontAwesomeIcon icon={FIcon.faLocationDot} size="1x" />
    },
  ];

  return (
      <div className="flex flex-wrap justify-around gap-4 w-full h-auto ">
        {radioOptions.map((option) => (
          <div key={option.id} className="input-container relative h-14 w-20 m-2">
            <input 
              id={option.id}
              type="radio"
              name="radio"
              className="radio-button opacity-0 absolute top-0 left-0 h-full w-full m-0 cursor-pointer"
              checked={selectedOption === option.id}
              onChange={()=>handleSelection(option.id)}
            />
            <div 
              className={`radio-tile flex flex-col items-center justify-center w-full h-full border-2 border-[#079ad9] rounded-md p-4 transition-transform duration-300 
              ${selectedOption === option.id ? 'bg-[#14526c] text-white scale-110 border-gray-200' : 'text-gray-500'}`}
            >
              <div 
                className={`icon mb-2 
                ${selectedOption === option.id ? '[&>*]:stroke-white' : ''}`}
              >
                {option.icon}
              </div>
              <label 
                htmlFor={option.id} 
                className={`radio-tile-label text-center text-xs font-semibold uppercase 
                ${selectedOption === option.id ? 'text-white' : 'text-gray-500'}`}
              >
                {option.label}
              </label>
            </div>
          </div>
        ))}
      </div>
  );
};

export default RadioTileGroup;