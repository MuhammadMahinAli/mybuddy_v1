import FileViewer from "react-file-viewer";
import PropTypes from "prop-types";

const PdfReader = ({ item }) => {
  return <FileViewer fileType="pdf" filePath={item} />;
};

export default PdfReader;
PdfReader.propTypes = {
  item: PropTypes.string,
};
