import { useState } from "react";
import FileViewer from "react-file-viewer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const OpenDocx = ({ documents, showDocuments }) => {
  const [selectedDocxIndex, setSelectedDocxIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDocxButtonClick = (index) => {
    setSelectedDocxIndex(index);
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedDocxIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      {documents?.length > 0 && (
        <div className="relative">
          {showDocuments && (
            <ul className="absolute left-0 space-y-3 font-medium text-center mt-2 p-2 lg:p-3 bg-white shadow-lg rounded-md w-24 md:w-28">
              {documents?.map((item, index) => (
                <li key={index} className="text-sm">
                  <button onClick={() => handleDocxButtonClick(index)}>
                    {`Document ${index + 1}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Popup Modal */}
      {selectedDocxIndex !== null && (
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
                    fileType="docx"
                    filePath={documents[selectedDocxIndex]}
                  />
                  <div className="mt-4"></div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default OpenDocx;
