import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const ImageSliders = ({ images }) => {
  return (
    <div className="md:hidden w-[250px]">
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images?.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="flex justify-center items-center px-4">
              <img className="rounded-lg" src={image} alt="Project" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSliders;
