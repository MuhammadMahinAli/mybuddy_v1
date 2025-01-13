import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Image = ({ image, i }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    console.log(index);
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    console.log("Rendering Image component at index:", i);
  }, [i]);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  useEffect(() => {
    // Ensure Swiper finds the custom buttons after they are rendered
    if (nextButtonRef.current && prevButtonRef.current) {
      document.querySelector(".swiper-button-next").classList.add("hidden"); // Hide default button
      document.querySelector(".swiper-button-prev").classList.add("hidden"); // Hide default button
    }
  }, []);
  return (
    <div className="flex justify-center items-center w-full">
      <>
        <div className="flex  max-h-full justify-center items-center w-full">
          {/* image 1 */}
        {image?.length === 1 && (
          <img
            onClick={() => openModal(0)}
            className="w-full max-h-full object-cover rounded-lg"
            src={image[0]}
            loading="lazy"
            alt="Post"
          />
        )}
          {/* 2 image */}
          {image.length === 2 && (
            <div className="grid grid-cols-2">
              <img
                onClick={() => openModal(0)}
                src={image[0]}
                alt={`Image ${index + 1}`}
                className="w-12/12 h-full p-1 object-cover rounded-lg shadow-lg"
              />
              <img
                onClick={() => openModal(2)}
                src={image[1]}
                alt={`Image ${index + 1}`}
                className="w-12/12 h-full p-1 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* 3 image */}
          {image?.length === 3 && (
            <div className="grid grid-cols-3">
              <img
                onClick={() => openModal(0)}
                src={image[0]}
                alt={`Image`}
                className="w-12/12 p-1 col-span-2 h-full object-cover rounded-lg shadow-lg"
              />
              <div className="grid grid-rows-2">
                <img
                  src={image[1]}
                  onClick={() => openModal(1)}
                  alt={`Image`}
                  className="w-12/12 p-1 h-full object-cover rounded-lg shadow-lg"
                />
                <img
                  src={image[2]}
                  onClick={() => openModal(2)}
                  alt={`Image`}
                  className="w-12/12 p-1 h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
          {/* 4 image */}
          {image.length === 4 && (
            <div className="grid grid-cols-3 w-full bg-red-300 ">
              <img
                onClick={() => openModal(0)}
                src={image[0]}
                alt={`Image`}
                className="w-12/12 col-span-2 p-1 h-full object-cover rounded-lg shadow-lg"
              />
              <div className="grid  w-12/12">
                <img
                  onClick={() => openModal(1)}
                  src={image[1]}
                  alt={`Image`}
                  className="w-12/12 p-1  object-cover rounded-lg shadow-lg"
                />
                <img
                  onClick={() => openModal(2)}
                  src={image[2]}
                  alt={`Image`}
                  className="w-12/12 p-1  object-cover rounded-lg shadow-lg"
                />
                <img
                  onClick={() => openModal(3)}
                  src={image[3]}
                  alt={`Image`}
                  className="w-12/12 p-1  object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
        {/* 1 image */}
       
      </>
      {isOpen && (
        <div className="z-50 fixed top-0 left-0 flex justify-center items-center bg-black/40 w-full h-full">
          <div className="relative transform overflow-hidden rounded-2xl bg-white p-6 text-left transition-all w-[90%] max-w-[1000px] h-[90%] max-h-[650px]">
            <IoIosCloseCircleOutline
              onClick={closeModal}
              className="text-2xl absolute right-5 top-5 cursor-pointer"
            />
            <div className="flex justify-center items-center h-full mt-5 pb-3">
              <Swiper
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                modules={[Navigation]}
                initialSlide={activeIndex}
                className="mySwiper w-full h-full"
              >
                {image?.map((im, i) => (
                  <SwiperSlide
                    key={i}
                    className="flex justify-center items-center"
                  >
                    <img
                      src={im}
                      className="w-full max-h-full object-contain rounded-lg"
                      loading="lazy"
                      alt={`Slide ${i + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Custom Navigation Buttons */}
              <button
                ref={prevButtonRef}
                className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 border shadow-2xl text-gray-800 hover:text-white px-2 py-2 rounded-full hover:bg-gray-600 z-10"
              >
                <MdArrowBackIos className="text-xl" />
              </button>
              <button
                ref={nextButtonRef}
                className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 border shadow-2xl text-gray-800 hover:text-white px-2 py-2 rounded-full hover:bg-gray-600 z-10"
              >
                <MdArrowForwardIos className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="flex  max-h-full justify-center items-center w-full">
       {
        image &&
        <img className="w-full max-h-full object-cover rounded-lg" src={image} loading="lazy" alt="Post" />
       }
      </div> */}
    </div>
  );
};

export default Image;

//<div className="flex justify-center items-center ">
//<div className="flex justify-center items-center ">
//{
//image &&
//<img className="w-7/12 md:w-full object-center rounded-lg" src={image} loading="lazy" alt="Post" />
//}
//</div>
//</div>
