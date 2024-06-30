import React from "react";

const BtmResearcherIcon = ({ theme,isPageActive }) => {
    const lightModeColor = isPageActive  ? '#2ADBA4'  : '#838DAA';
  return (
    <>
      {theme === "light" ? (
        <svg
          className="w-6"
          viewBox="0 0 30 23"
          fill={lightModeColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.5143 0.627741C14.3115 -0.183916 15.6797 -0.0679649 17.0132 0.964C18.8104 2.34382 19.1351 4.91793 17.7553 6.71517C16.3754 8.51241 13.8709 8.74432 12.0041 7.45726C9.61549 5.81075 8.75746 2.95836 8.98936 0.98719C10.1489 1.46259 11.3779 1.13793 12.5143 0.627741ZM27.2169 20.8032V18.519H22.115V19.4466H19.6569C18.0219 19.4466 16.6885 18.1132 16.6885 16.4783C16.6885 14.8433 18.0219 13.5099 19.6569 13.5099H20.4685L22.1614 15.8637L21.57 16.2927L22.1266 17.058L25.5588 14.5883L25.0022 13.823L24.4108 14.2404L20.6424 8.98781L20.1554 9.33567L18.9611 7.67757L17.6741 8.60517L18.8684 10.2633L18.393 10.6111L19.4945 12.1417C17.5697 12.2228 15.9696 13.5447 15.4826 15.3303H12.6534C12.5259 13.2664 12.3172 11.2605 11.9461 10.0546C11.4591 8.44284 10.3924 6.86591 8.53715 6.71517C6.46163 6.55284 4.71076 8.14137 3.6788 10.2053C1.42935 14.681 0.837999 19.9104 0.733643 22.6353H12.7926C12.7926 22.6353 12.8041 21.5105 12.7926 19.8988H9.63868C8.25887 19.8988 7.12255 18.7741 7.12255 17.3827V13.4983C7.12255 13.2432 7.33126 13.0461 7.57476 13.0461C7.81825 13.0461 8.02696 13.2548 8.02696 13.4983V17.3827C8.02696 18.2639 8.74586 18.9828 9.62709 18.9828H16.0856C16.8045 19.9916 17.9408 20.6873 19.2394 20.8148H16.0276V22.6353H29.9533V20.8148H27.2169V20.8032Z" />
        </svg>
      ) : (
        <svg
          className="w-6"
          viewBox="0 0 30 23"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.5143 0.627741C14.3115 -0.183916 15.6797 -0.0679649 17.0132 0.964C18.8104 2.34382 19.1351 4.91793 17.7553 6.71517C16.3754 8.51241 13.8709 8.74432 12.0041 7.45726C9.61549 5.81075 8.75746 2.95836 8.98936 0.98719C10.1489 1.46259 11.3779 1.13793 12.5143 0.627741ZM27.2169 20.8032V18.519H22.115V19.4466H19.6569C18.0219 19.4466 16.6885 18.1132 16.6885 16.4783C16.6885 14.8433 18.0219 13.5099 19.6569 13.5099H20.4685L22.1614 15.8637L21.57 16.2927L22.1266 17.058L25.5588 14.5883L25.0022 13.823L24.4108 14.2404L20.6424 8.98781L20.1554 9.33567L18.9611 7.67757L17.6741 8.60517L18.8684 10.2633L18.393 10.6111L19.4945 12.1417C17.5697 12.2228 15.9696 13.5447 15.4826 15.3303H12.6534C12.5259 13.2664 12.3172 11.2605 11.9461 10.0546C11.4591 8.44284 10.3924 6.86591 8.53715 6.71517C6.46163 6.55284 4.71076 8.14137 3.6788 10.2053C1.42935 14.681 0.837999 19.9104 0.733643 22.6353H12.7926C12.7926 22.6353 12.8041 21.5105 12.7926 19.8988H9.63868C8.25887 19.8988 7.12255 18.7741 7.12255 17.3827V13.4983C7.12255 13.2432 7.33126 13.0461 7.57476 13.0461C7.81825 13.0461 8.02696 13.2548 8.02696 13.4983V17.3827C8.02696 18.2639 8.74586 18.9828 9.62709 18.9828H16.0856C16.8045 19.9916 17.9408 20.6873 19.2394 20.8148H16.0276V22.6353H29.9533V20.8148H27.2169V20.8032Z" />
        </svg>
      )}
    </>
  );
};

export default BtmResearcherIcon;
