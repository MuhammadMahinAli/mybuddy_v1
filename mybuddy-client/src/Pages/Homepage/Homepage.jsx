import { useEffect, useState } from "react";
import { fileUpload } from "../../utils/cloudinary";
import { useCreatePostMutation } from "../../features/post/postApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";
import Swal from "sweetalert2";
import ViewPosts from "./ViewPosts";


const Homepage = () => {
  
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);
  
//   useEffect(() => {
//     if (!responseData?.status) {
// console.log(responseData?.message);
//     }
//     if (responseError?.data) {
//       console.log(responseError.data);
//     }
//     if (responseData?.success && responseData?.data) {
//       console.log(responseData);
//       Swal.fire({
//         icon: "success",
//         title: "Hurry !",
//         text: "Your post has been published !",
//       });
//     }
//   }, [responseData, responseError]);

  return (
    <section className="space-y-7 text-gray-800">
    <Posts theme={theme} />
    <ViewPosts theme={theme} />
    
    </section>
  );
};

export default Homepage;