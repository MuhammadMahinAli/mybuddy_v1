export const fileUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nn648eww");
    let fileUrl = null;
   
    const response = await fetch("https://api.cloudinary.com/v1_1/dv51da0o9/image/upload", {
       method: 'POST',            
       body: formData
    });
   
    if (response.ok) {
       const data = await response.json();
       if (data && data.secure_url) {
         fileUrl = data.secure_url;
       }
    } else {
       throw new Error('Upload failed');
    }
   
    return fileUrl;
   };

   // // ......................................................................
//    import axios from "axios";
// import FormData from "form-data";

// export const fileUpload = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "nn648eww"); // Your Cloudinary upload preset
//   let fileUrl = null;
  
//   try {
//     const response = await axios.post("https://api.cloudinary.com/v1_1/dv51da0o9/raw/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
    
//     if (response.data && response.data.secure_url) {
//       fileUrl = response.data.secure_url;
//     }
//   } catch (error) {
//     console.error("Error uploading file:", error);
//   }

//   return fileUrl;
// };
// https://res.cloudinary.com/demo/image/upload/long_multi_page_pdf
