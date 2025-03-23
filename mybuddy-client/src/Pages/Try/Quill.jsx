/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css"; // Import Quill styles
//import "../GeneralDashboard/GeneralAddProject/editor.css";
import "./quilledit.css";
import { useEffect, useState } from "react";

const Quill = ({  handleTodoDesciption,formData }) => {
  const [editorHtml, setEditorHtml] = useState("");
  const theme = "snow";

  useEffect(() => {
    if (formData?.description !== editorHtml) {
      setEditorHtml(formData.description || ""); // Load existing description
    }
  }, [formData?.description]); // Runs when formData.description changes
   // Runs when formData.description changes

  const handleChange = (html) => {
    setEditorHtml(html);
    handleTodoDesciption(html);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorHtml;
  };

//   const handleChange = (html) => {
//     setEditorHtml(html);
//     handleTodoDesciption(html);
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = editorHtml;
//   };

  return (
    <div className="reactQuill border-2 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] md:my-5   h-[265px] xs:h-[242px] ssm:h-[217px] md:h-[245px] lg:h-[259px]  mt-2 xs:w-full w-full">
      <ReactQuill
        theme={theme}
        name="description"
        onChange={handleChange}
        value={editorHtml}
        modules={Quill.modules}
        formats={Quill.formats}
        bounds=".app"
        className="react-quill-custom"
      />
    </div>
  );
};
Quill.modules = {
  toolbar: [
    // [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }],
    [{ align: [] }], // text direction
    ["clean"],
  ],

  clipboard: {
    matchVisual: false,
  },
};

Quill.formats = [
  "font",
  "clean",
  "header",
  "link",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "check",
  "indent",
  "direction",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
];

export default Quill;

{
  /* <h1>mhv</h1>
<h3>hcjhgc</h3>
<h4>jhgx</h4> 
<h5>hcjhgc</h5>
<h6>jhgx</h6>
<p><strong>Note by supplying your own HTML</strong></p>
<p><em> element, Quill searches for particular</em></p>
<p><u> input elements, but your own inputs</u></p>
<p><s> that have nothing to do with </s></p>
<ol><li>Quill can still be added and styled and coexist.</li><li>Note by supplying your own HTML</li></ol>
<ul><li> element, Quill searches for particular</li><li> input elements, but your own inputs</li></ul>
<ul data-checked="false"><li> that have nothing to do with </li><li>Quill can still be added and styled and coexist.</li></ul>
<p class="ql-indent-1">Note by supplying your own HTML</p>
<p class="ql-indent-1"> element, Quill searches for particular</p>
<p class="ql-direction-rtl ql-align-center"> input elements, but your own inputs</p>
<p class="ql-direction-rtl ql-align-center"> that have nothing to do with </p>
<p class="ql-align-right">Quill can still be added and styled and coexist.</p>
<p><a href="https://google.com" rel="noopener noreferrer" target="_blank">Click</a></p> */
}
