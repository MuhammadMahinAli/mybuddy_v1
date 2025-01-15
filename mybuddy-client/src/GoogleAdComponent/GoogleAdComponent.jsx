// import  { useEffect } from "react";

// const GoogleAdComponent = () => {
//   useEffect(() => {
//     // Initialize Google AdSense
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (e) {
//       console.error("AdSense error:", e);
//     }
//   }, []);

//   return (
//     <div>
        
//      <ins className="adsbygoogle"
//      style="display:block"
//      data-ad-client="ca-pub-4916888769432446"
//      data-ad-slot="4223961286"
//      data-ad-format="auto"
//      data-full-width-responsive="true"></ins>
//     </div>
//   );
// };

// export default GoogleAdComponent;

import { useEffect } from "react";

const GoogleAdComponent = () => {
  useEffect(() => {
    // Initialize the AdSense ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block"}} // Adjust size as needed
      data-ad-client="ca-pub-4916888769432446"
      data-ad-slot="4223961286"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAdComponent;
