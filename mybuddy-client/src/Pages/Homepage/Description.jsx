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
      <p className="text-start text-[14px] lg:text-[16px] 2xl:text-[18px] px-1 md:px-3">
        {isExpanded ? text : `${descriptionPreview} `}
        {shouldShowToggle && isExpanded === false && (
          <span className=""> .... </span>
        )}
        <span className="">
          {shouldShowToggle && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:underline pl-2"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </span>
      </p>
    </div>
  );
};

export default Description;
