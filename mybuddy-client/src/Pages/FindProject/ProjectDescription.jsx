import  { useState } from "react";
import "../GeneralDashboard/GeneralAddProject/editor.css";
import "react-quill/dist/quill.core.css";
import PropTypes from "prop-types";


const ProjectDescription = ({ description,theme }) => {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 500;

  const modifiedDescription = description
    .replace(/<ul/g, '<ul class="custom-ul-list"')
    .replace(/<ol/g, '<ol class="custom-ol-list"');

    const truncatedDescription = modifiedDescription.slice(0, maxChars) + '  ....';


  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${theme === 'light' ? "graish":"text-white"} text-[16px] xl:text-[20px] text-start w-full lg:w-6/12 lg:pl-6 xl:pl-0`}>
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

export default ProjectDescription;
ProjectDescription.propTypes = {
  description: PropTypes.string,
};
