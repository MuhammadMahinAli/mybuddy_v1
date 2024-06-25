import { useState } from "react";

const Description = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };
  
    const descriptionPreview = text.slice(0, 120);
    const shouldShowToggle = text.length > 100;
  
    return (
      <div>
        <p className="text-start text-[14px] lg:text-[16px] px-1 md:px-3">
          {isExpanded ? text : `${descriptionPreview}...`}
          <span className="pl-2">
          {shouldShowToggle && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
          </span>
        </p>
        
      </div>
    );
  };
  
  export default Description;
  