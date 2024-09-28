import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/apiFetch";

const FundSlider = ({ projectId }) => {
  // ------------ fund slider start

  const funds = [
    {
      image: "https://example-profile1.com",
      amount: 5.0,
    },
    {
      image: "https://example-profile2.com",
      amount: 5.0,
    },
    {
      image: "https://example-profile3.com",
      amount: 5.0,
    },
    {
      image: "https://example-profile4.com",
      amount: 5.0,
    },
    {
      image: "https://example-profile5.com",
      amount: 5.0,
    },
    {
      image: "https://example-profile6.com",
      amount: 5.0,
    },
    {
      image: "https://example-profile7.com",
      amount: 5.0,
    },
  ];
  const [fund, setFund] = useState([]);
  useEffect(() => {
    if (!projectId) {
      return;
    }
    const fetchData = async () => {
      const res = await apiFetch(
        `http://localhost:3000/api/v1/fund/getAll/${projectId}`,
        "GET"
      );
      setFund(res?.data ?? {});
      console.log(res?.data);
      console.log(fund);
    };
    fetchData();
  }, [projectId]);

  var settings = {
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
  // ------------ fund slider end
  return (
    <>
    {fund?.length !== 0 && (
      <div className="">
        {fund.length <= 3 ? (
          // Render individual boxes when fund length is less than or equal to 3
          <div className="flex space-x-2">
            {fund.map((f, index) => (
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
                        ? f.requestedBy?.profilePic
                        : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                    }
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600 object-cover"
                  />
                  <p className="font-semibold text-sm md:text-lg">
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
              {fund.map((f, index) => (
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
                          ? f.requestedBy?.profilePic
                          : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                      }
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600 object-cover"
                    />
                    <p className="font-semibold text-sm md:text-lg">
                      ${f?.amount}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    )}
  </>
  
  );
};

export default FundSlider;
