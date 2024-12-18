// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useEffect, useState } from "react";
// import { apiFetch } from "../../utils/apiFetch";

// const FundSlider = ({ projectId }) => {
//   // ------------ fund slider start


//   const [paypalFund, setPaypalFund] = useState([]);
//   const [payoneerFund, setPayoneerFund] = useState([]);
//   const [bankFund, setBankFund] = useState([]);
//   const [stripeFund, setStripeFund] = useState([]);

//   const [fundData, setFundData] = useState({
//     paypalFund: [],
//     payoneerFund: [],
//     bankFund: [],
//     stripeFund: [],
//   });

//   useEffect(() => {
//     if (!projectId) {
//       return;
//     }

//     const fetchAllFunds = async () => {
//       try {
//         const urls = [
//           `https://test-two-22w0.onrender.com/api/v1/paypalFund/getFundByProject/${projectId}`,
//           `https://test-two-22w0.onrender.com/api/v1/payoneerFund/getFundByProject/${projectId}`,
//           `https://test-two-22w0.onrender.com/api/v1/bankTransferFund/getFundByProject/${projectId}`,
//           `https://test-two-22w0.onrender.com/api/v1/fund/getAll/${projectId}`,
//         ];

//         const [paypalRes, payoneerRes, bankRes, stripeRes] = await Promise.all(
//           urls.map((url) => fetch(url).then((res) => res.json()))
//         );

//         setFundData({
//           paypalFund: paypalRes?.data ?? [],
//           payoneerFund: payoneerRes?.data ?? [],
//           bankFund: bankRes?.data ?? [],
//           stripeFund: stripeRes?.data ?? [],
//         });
//       } catch (error) {
//         console.error("Error fetching funds:", error);
//       }
//     };

//     fetchAllFunds();
//   }, [projectId]);

//   console.log('lll', fundData);

//   useEffect(() => {
//     if (!projectId) {
//       return;
//     }
//     const fetchData = async () => {
//       const res = await apiFetch(
//         `https://test-two-22w0.onrender.com/api/v1/fund/getAll/${projectId}`,
//         "GET"
//       );
//       setStripeFund(res?.data ?? {});
//       console.log(res?.data);
     
//     };
//     fetchData();
//   }, [projectId]);

//   var settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   // ------------ fund slider end
//   return (
//     <>
//     {fundData?.length !== 0 && (
//       <div className="">
//         {fundData?.length <= 3 ? (
//           // Render individual boxes when fundData length is less than or equal to 3
//           <div className="flex space-x-2">
//             {fundData?.map((f, index) => (
//               <div key={index} className="p-2">
//                 <div
//                   className={`rounded-full shadow-md flex items-center justify-around px-2 py-2 space-x-2 
//                               ${
//                                 index % 3 === 0
//                                   ? "bg-[#FFDCF7]"
//                                   : index % 3 === 1
//                                   ? "bg-[#DEFAFF]"
//                                   : "bg-[#F8E9CC]"
//                               }`}
//                 >
//                   <img
//                     src={
//                       f?.requestedBy?.profilePic
//                         ? f?.requestedBy?.profilePic
//                         : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                     }
//                     className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600 object-cover"
//                   />
//                   <p className="font-semibold text-sm md:text-lg">
//                     ${f?.amount}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           // Render slider when fund length is greater than 3
//           <div className="slider-container md:w-[130px] lg:w-[350px] md:mr-5 lg:mr-8">
//             <Slider {...settings}>
//               {fundData?.map((f, index) => (
//                 <div key={index} className="p-2">
//                   <div
//                     className={`rounded-full shadow-md flex items-center justify-around px-1 py-2 space-x-0 
//                                 ${
//                                   index % 3 === 0
//                                     ? "bg-[#FFDCF7]"
//                                     : index % 3 === 1
//                                     ? "bg-[#DEFAFF]"
//                                     : "bg-[#F8E9CC]"
//                                 }`}
//                   >
//                     <img
//                       src={
//                         f?.requestedBy?.profilePic
//                           ? f?.requestedBy?.profilePic
//                           : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                       }
//                       className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600 object-cover"
//                     />
//                     <p className="font-semibold text-sm md:text-lg">
//                       ${f?.amount}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         )}
//       </div>
//     )}
//   </>
  
//   );
// };

// export default FundSlider;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const FundSlider = ({ projectId, theme }) => {
  const [fundData, setFundData] = useState([]);

  useEffect(() => {
    if (!projectId) return;

    const fetchAllFunds = async () => {
      try {
        const urls = [
          `https://test-two-22w0.onrender.com/api/v1/paypalFund/getFundByProject/${projectId}`,
          `https://test-two-22w0.onrender.com/api/v1/payoneerFund/getFundByProject/${projectId}`,
          `https://test-two-22w0.onrender.com/api/v1/bankTransferFund/getFundByProject/${projectId}`,
          `https://test-two-22w0.onrender.com/api/v1/fund/getAll/${projectId}`,
        ];

        const responses = await Promise.all(
          urls.map((url) =>
            fetch(url)
              .then((res) => res.json())
              .catch((error) => {
                console.error(`Error fetching data from ${url}:`, error);
                return { data: [] };
              })
          )
        );

        // Combine all fetched fund data into a single array
        const combinedFunds = responses.reduce((acc, res) => {
          return [...acc, ...(res?.data || [])];
        }, []);

        setFundData(combinedFunds);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };

    fetchAllFunds();
  }, [projectId]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {fundData?.length !== 0 && (
        <div>
          {fundData?.length <= 3 ? (
            // Render individual boxes when fundData length is less than or equal to 3
            <div className="flex space-x-2">
              {fundData?.map((f, index) => (
                <div key={index} className="p-2">
                  <div
                    className={`rounded-full shadow-md flex items-center justify-around px-2 py-2 space-x-2 
                                ${
                                  index % 3 === 0
                                    ? "bg-[#FFDCF7]"
                                    : index % 3 === 1
                                    ? "bg-[#DEFAFF]"
                                    : "bg-[#F8E9CC]"
                                }`}
                  >
                    <img
                      src={
                        f?.requestedBy?.profilePic
                          ? f?.requestedBy?.profilePic
                          : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                      }
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600 object-cover"
                    />
                    <p className={`graish font-semibold text-sm md:text-lg`}>
                      ${f?.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Render slider when fund length is greater than 3
            <div className="slider-container md:w-[130px] lg:w-[350px] md:mr-5 lg:mr-8">
              <Slider {...settings}>
                {fundData?.map((f, index) => (
                  <div key={index} className="p-2">
                    <div
                      className={`rounded-full shadow-md flex items-center justify-around px-1 py-2 space-x-0 
                                  ${
                                    index % 3 === 0
                                      ? "bg-[#FFDCF7]"
                                      : index % 3 === 1
                                      ? "bg-[#DEFAFF]"
                                      : "bg-[#F8E9CC]"
                                  }`}
                    >
                      <img
                        src={
                          f?.requestedBy?.profilePic
                            ? f?.requestedBy?.profilePic
                            : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                        }
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600 object-cover"
                      />
                      <p className="graish font-semibold text-sm md:text-lg">
                        ${f?.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      ) 
        }
    </>
  );
};

export default FundSlider;

