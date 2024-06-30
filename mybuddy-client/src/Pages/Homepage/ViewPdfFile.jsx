import { Worker, Viewer,SpecialZoomLevel } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ViewPdfFile = ({pdf}) => {
   

    return (
        <div className=' my-3 md:my-5  py-2 shadow-xl border'>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div className="hide-scrollbar min-h-[300px] w-[270px] sm:w-[340px] md:w-[540px] lg:w-[500px] xl:w-[650px] 4xl:w-[700px] max-h-[70vh] 3xl:max-h-[80vh] overflow-x-auto" >
            <Viewer fileUrl={pdf} defaultScale={SpecialZoomLevel.PageFit} />
            </div>
        </Worker>
        </div>
    );
};

export default ViewPdfFile;
