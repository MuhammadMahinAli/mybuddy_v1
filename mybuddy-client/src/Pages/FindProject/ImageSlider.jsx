import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";

const ImageSlider = ({ images }) => {
  console.log(images);

  return (
    <div className="w-[100px] h-[180px] xs:w-[280px] xs:h-[240px] md:h-[350px] md:w-[400px] xl:w-[400px] 3xl:h-[300px] md:pt-5">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {images?.map((im, i) => (
          <SwiperSlide className="" key={i}>
            <img
              src={im}
              className="object-center w-[100px] h-[180px] xs:w-[280px] xs:h-[240px] md:h-[300px] md:w-[390px] xl:w-[400px] 3xl:h-[300px] rounded-[10px]"
              alt="hero"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
