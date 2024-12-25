/* eslint-disable react/prop-types */
import { useState } from "react";
import { fileUpload } from "../../../utils/cloudinary";
const Images = ({ setImages, images,previewImage,setPreviewImage }) => {
  //const [images ,setImages] = useState([])
  const [loading, setLoading] = useState({
    imageOne: false,
    imageTwo: false,
    imageThree: false,
  });


  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.name;
      setLoading({
        ...loading,
        [name]: true,
      });
      const files = e.target.files;
      try {
        const urls = await Promise.all(Array.from(files).map(async (file) => {
          const imageUrl = await fileUpload(file); // Upload file to Cloudinary
          return imageUrl;
        }));
        setImages([...images, ...urls]);
        setLoading({
          imageOne: false,
          imageTwo: false,
          imageThree: false,
        });
        setPreviewImage({ ...previewImage, [name]: URL.createObjectURL(files[0]) });
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  console.log('image', images[0]);

  return (
    <div className="flex flex-col space-y-5 md:space-y-0 font-medium gray600">
    <div>
      <label className="text-[16px] md:text-xl capitalize font-bold">images (up to 3)</label>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      {/* image one   */}
      <div className="relative pt-2">
        {previewImage.imageOne  ? (
          <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100  custom-shadow">
            <img className="object-cover h-full rounded-md" src={previewImage.imageOne} alt="" />
          </div>
        ) : (
          <label required htmlFor="image-one" className="">
            <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow">
              {loading.imageOne ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                  <img src="/upload.svg" className="h-3 lg:h-5" />
                  <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a photo or</p>
                  <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
                </div>
              )}
            </div>
          </label>
        )}{" "}
        <input
          className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                        focus:outline-none  bg-white text-gray-900 hidden"
          type="file"
          name="imageOne"
          id="image-one"
          onChange={handlePreviewImage}
          accept="image/*"
          required
        />
      </div>
      {/* image two */}
      <div className="relative ">
        {previewImage.imageTwo ? (
          <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
            <img className="object-cover h-full rounded-md" src={previewImage.imageTwo} alt="" />
          </div>
        ) : (
          <label required htmlFor="image-two" className="">
            <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
              {loading.imageTwo ? (
                <span className="loading loading-spinner loading-xs">
                  
                </span>
              ) : (
                <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                 <img src="/upload.svg" className="h-3 lg:h-5" />
                 <p className="text-[10px] md:text-[12px] font-normal capitalize pt-1">Add anotner image (optional) </p>
                </div>
              )}
            </div>
          </label>
        )}{" "}
        <input
          className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                        focus:outline-none  bg-white text-gray-900 hidden"
          type="file"
          name="imageTwo"
          id="image-two"
          onChange={handlePreviewImage}
          accept="image/*"
          required
        />
      </div>
      {/* image three */}
      <div className="relative"> 
        {previewImage.imageThree  ? (
          <div className="flex justify-center items-center bg-red-500 rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px] box-border border-2 border-gray-100 custom-shadow">
            <img className="object-cover h-full rounded-md" src={previewImage.imageThree} alt="" />
          </div>
        ) : (
          <label required htmlFor="image-three" className="">
            <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
              {loading.imageThree ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
               <img src="/upload.svg" className="h-3 lg:h-5" />
                  <p className="text-[10px] md:text-[12px] font-normal capitalize pt-1">Add anotner image (optional) </p>
                </div>
              )}
            </div>
          </label>
        )}{" "}
        <input
          className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                        focus:outline-none  bg-white text-gray-900 hidden"
          type="file"
          name="imageThree"
          id="image-three"
          onChange={handlePreviewImage}
          accept="image/*"
          required
        />
      </div>
    </div>
  </div>
  );
};

export default Images;
// {/* image one */}
// <div className="relative ">
// {previewImage.imageOne !== "" ? (
//   <div className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 custom-shadow">
//     <img className="object-cover h-full rounded-md" src={previewImage.imageOne} alt="" />
//   </div>
// ) : (
//   <label required htmlFor="image-one" className="">
//     <div className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//       {loading.imageOne ? (
//         <span className="loading loading-spinner loading-xs"></span>
//       ) : (
//         <div className="flex flex-col justify-center items-center absolute top-8 xl:top-10 2xl:top-14 w-full">
//           <img src="/upload.svg" className="h-3" />
//           <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a photo or</p>
//           <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
//         </div>
//       )}
//     </div>
//   </label>
// )}{" "}
// <input
//   className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                 focus:outline-none  bg-white text-gray-900 hidden"
//   type="file"
//   name="imageOne"
//   id="image-one"
//   onChange={handlePreviewImage}
//   accept="image/*"
//   required
// />
//</div>
//{/* image two  */}
//<div className="relative ">
// {previewImage.imageTwo !== "" ? (
//   <div className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 custom-shadow">
//     <img className="object-cover h-full rounded-md" src={previewImage.imageTwo} alt="" />
//   </div>
// ) : (
//   <label required htmlFor="image-two" className="">
//     <div className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//       {loading.imageTwo ? (
//         <span className="loading loading-spinner loading-xs"></span>
//       ) : (
//         <div className="flex flex-col justify-center items-center absolute top-8 xl:top-10 2xl:top-14 w-full">
//           <img src="/upload.svg" className="h-3" />
//           <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a photo or</p>
//           <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
//         </div>
//       )}
//     </div>
//   </label>
// )}{" "}
// <input
//   className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                 focus:outline-none  bg-white text-gray-900 hidden"
//   type="file"
//   name="imageTwo"
//   id="image-two"
//   onChange={handlePreviewImage}
//   accept="image/*"
//   required
// />
//</div>
//{/* image three */}
//<div className="relative ">
// {previewImage.imageThree !== "" ? (
//   <div className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 custom-shadow">
//     <img className="object-cover h-full rounded-md" src={previewImage.imageThree} alt="" />
//   </div>
// ) : (
//   <label required htmlFor="image-three" className="">
//     <div className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//       {loading.imageThree ? (
//         <span className="loading loading-spinner loading-xs"></span>
//       ) : (
//         <div className="flex flex-col justify-center items-center absolute top-8 xl:top-10 2xl:top-14 w-full">
//           <img src="/upload.svg" className="h-3" />
//           <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a photo or</p>
//           <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
//         </div>
//       )}
//     </div>
//   </label>
// )}{" "}
// <input
//   className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                 focus:outline-none  bg-white text-gray-900 hidden"
//   type="file"
//   name="imageThree"
//   id="image-three"
//   onChange={handlePreviewImage}
//   accept="image/*"
//   required
// />
//</div>
//
