/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./editor.css";
import {useState} from "react";

const DescriptionTextArea = ({handleDescriptionChange}) => {
  const [editorHtml, setEditorHtml] = useState("");
  const theme = "snow";

  const handleChange = (html) => {
    setEditorHtml(html);
    handleDescriptionChange(html);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorHtml;
  };

  return (
    <div className="bg-[#e9f2f9] shadow-xl my-5 3xl:py-10 h-60 rounded-xl border-gray-800 mt-2 w-56 xs:w-full">
      <ReactQuill theme={theme} name="description" onChange={handleChange} value={editorHtml} modules={DescriptionTextArea.modules} formats={DescriptionTextArea.formats} bounds=".app" className="react-quill-custom" />
    </div>
  );
};
DescriptionTextArea.modules = {
  toolbar: [
    // [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic"],
    [{list: "ordered"}, {list: "bullet"}],
  ],

  clipboard: {
    matchVisual: false,
  },
};

DescriptionTextArea.formats = ["font", "size", "bold", "italic", "underline", "strike", "list", "bullet", "indent", "link"];

export default DescriptionTextArea;


// /* eslint-disable react/prop-types */
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles
// import "./editor.css";
// import { useState } from "react";

// const DescriptionTextArea = ({onDescriptionChange}) => {
//   const [editorHtml, setEditorHtml] = useState("");
//   const theme = "snow";



//   const handleChange = (html) => {
//     setEditorHtml(html);
//     onDescriptionChange(html)
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = editorHtml;
//   };

//   return (
//     <div className="bg-[#c6e3f2] my-5 3xl:py-10 h-60 rounded-xl border-white mt-2">
//       <ReactQuill
//         theme={theme}
//         name='description'
//         onChange={handleChange}
//         value={editorHtml}
//         modules={DescriptionTextArea.modules}
//         formats={DescriptionTextArea.formats}
//         bounds=".app"
//         className="react-quill-custom"
//       />
//     </div>
//   );
// };
// DescriptionTextArea.modules = {
//   toolbar: [
//     // [{ size: ["small", false, "large", "huge"] }],
//     ["bold", "italic"],
//     [{ list: "ordered" }, { list: "bullet" }],
//   ],

//   clipboard: {
//     matchVisual: false,
//   },
// };

// DescriptionTextArea.formats = [
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "list",
//   "bullet",
//   "indent",
//   "link",
// ];

// export default DescriptionTextArea;
