import { useEffect } from "react";


const Image = ({image,i}) => {
  useEffect(() => {
    console.log("Rendering Image component at index:", i);
  }, [i]);
    return (
        <div className="flex justify-center items-center  ">
       {
        image &&
        <img className=" w-7/12 md:w-8/12 lg:w-9/12  object-center rounded-lg" src={image} alt="Post" />
       }
      </div>
    );
};

export default Image;