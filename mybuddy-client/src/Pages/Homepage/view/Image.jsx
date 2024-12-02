import { useEffect } from "react";


const Image = ({image,i}) => {
  useEffect(() => {
    console.log("Rendering Image component at index:", i);
  }, [i]);
    return (
        <div className="flex justify-center items-center w-full">
        <div className="flex  max-h-[600px] justify-center items-center w-full">
       {
        image &&
        <img className="w-full max-h-[590px] object-cover rounded-lg" src={image} loading="lazy" alt="Post" />
       }
      </div>
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