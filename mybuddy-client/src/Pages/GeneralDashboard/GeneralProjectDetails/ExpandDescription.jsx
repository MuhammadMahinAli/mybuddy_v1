import { useState } from "react";
import "../GeneralAddProject/editor.css";
import "react-quill/dist/quill.core.css";
import PropTypes from "prop-types";


const ExpandDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 100;

  const modifiedDescription = description
    .replace(/<ul/g, '<ul class="custom-ul-list"')
    .replace(/<ol/g, '<ol class="custom-ol-list"');

    const truncatedDescription = modifiedDescription.slice(0, maxChars) + '  ....';


  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="text-[15px] graish xl:text-[17px] text-start">
      {expanded ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: modifiedDescription }} />
         
          {description.length > maxChars && (
            <button
              className="cursor-pointer text-indigo-500 font-medium hover:underline"
              onClick={toggleDescription}
            >
              Read Less
            </button>
          )}
        </>
      ) : (
        <>
        
          <div dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
        
          {description.length > maxChars && (
            <button
              className="cursor-pointer text-indigo-500 font-medium hover:underline"
              onClick={toggleDescription}
            >
              Read More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ExpandDescription;
ExpandDescription.propTypes = {
  description: PropTypes.string,
};
