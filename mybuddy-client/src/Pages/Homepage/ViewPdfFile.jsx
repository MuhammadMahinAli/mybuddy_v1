// import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const ViewPdfFile = ({ pdf }) => {
//   return (
//     <div className=" my-3 md:my-5  py-2 shadow-xl border">
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//         <div className="hide-scrollbar min-h-[300px] w-[270px] sm:w-[340px] md:w-[540px] lg:w-[500px] xl:w-[650px] 4xl:w-[700px] max-h-[70vh] 3xl:max-h-[80vh] overflow-x-auto">
//           <Viewer fileUrl={pdf} defaultScale={SpecialZoomLevel.PageFit} />
//         </div>
//       </Worker>
//     </div>
//   );
// };

// export default ViewPdfFile;
/* eslint-disable react/prop-types */
import  { useEffect, useRef } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ViewPdfFile = ({ pdf }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.LazyLoad) {
      const lazyLoadInstance = new window.LazyLoad({
        elements_selector: ".lazy"
      });

      return () => {
        lazyLoadInstance.destroy();
      };
    }
  }, []);
//defaultScale={SpecialZoomLevel.PageFit}
  return (
    <div
      ref={containerRef}
      className="lazy my-3 md:my-1 py-2 shadow-xl border w-full"
      data-src="your-url-to-trigger-load"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="hide-scrollbar min-h-[300px] w-[270px] sm:w-[340px] md:w-[540px] lg:w-[500px] xl:w-full max-h-[70vh] 3xl:max-h-[80vh] overflow-x-auto">
          <Viewer fileUrl={pdf}  />
        </div>
      </Worker>
    </div>
  );
};

export default ViewPdfFile;


{/* <div
ref={containerRef}
className="lazy my-3 md:my-5 py-2 shadow-xl border bg-red-500 w-full"
data-src="your-url-to-trigger-load"
>
<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
  <div className="hide-scrollbar min-h-[300px] w-[270px] sm:w-[340px] md:w-[540px] lg:w-[500px] xl:w-[650px] 4xl:w-[700px] max-h-[70vh] 3xl:max-h-[80vh] bg-red-500 overflow-x-auto">
    <Viewer fileUrl={pdf} defaultScale={SpecialZoomLevel.PageFit} />
  </div>
</Worker>
</div> */}