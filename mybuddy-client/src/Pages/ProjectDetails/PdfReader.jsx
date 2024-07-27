/* eslint-disable react/prop-types */
import FileViewer from "react-file-viewer";

const PdfReader = ({ item }) => {
  return <FileViewer fileType="pdf" filePath={item} />;
};

export default PdfReader;
