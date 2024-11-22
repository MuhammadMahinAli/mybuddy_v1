import { useState } from "react";
import FileViewer from "react-file-viewer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

const OpenPdf = ({ pdfFiles, showPdfList,setShowPdfList }) => {
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePdfButtonClick = (index) => {
    setSelectedPdfIndex(index);
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedPdfIndex(null);
    setIsOpen(false);
    setShowPdfList(false)
  };

  return (
    <>
      {pdfFiles?.length > 0 && (
        <div className="relative">
          {showPdfList && (
            <ul className=" absolute left-0 space-y-3 text-center mt-2 p-2 lg:p-3  font-bold bg-white hover:bg-gray-100  shadow-lg rounded-md w-16 md:w-20">
              {pdfFiles?.map((item, index) => (
                <li key={index} className="xl:text-[17px] graish">
                  <a target="blank" href={item} >
                    {`PDF ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Popup Modal */}
      {/* {selectedPdfIndex !== null && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide"
            onClose={closePopup}
          >
            <div className="flex items-center justify-center min-h-screen scrollbar-hide">
              <Dialog.Overlay className="fixed inset-0 bg-white opacity-30 scrollbar-hide" />

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="bg-white rounded-xl p-6 w-full scrollbar-hide">
                  <button
                    type="button"
                    className="mb-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                  <FileViewer
                    className="ml-20"
                    fileType="pdf"
                    filePath={pdfFiles[selectedPdfIndex]}
                  />
                  <div className="mt-4"></div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )} */}
    </>
  );
};

export default OpenPdf;
OpenPdf.propTypes = {
  pdfFiles: PropTypes.array.isRequired,
  showPdfList: PropTypes.bool.isRequired,
  setShowPdfList: PropTypes.bool.isRequired,
};