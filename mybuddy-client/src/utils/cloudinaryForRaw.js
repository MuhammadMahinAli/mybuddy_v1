export const rawFileUpload = async (file, type = "raw") => {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("upload_preset", "nn648eww"); // Your upload preset
   formData.append("resource_type", type); // Use "raw" for non-image files like PDFs
 
   try {
     const response = await fetch("https://api.cloudinary.com/v1_1/dv51da0o9/auto/upload", {
       method: "POST",
       body: formData,
     });
 
     if (response.ok) {
       const data = await response.json();
       return data.secure_url; // Return the uploaded file's URL
     } else {
       throw new Error("Upload failed");
     }
   } catch (error) {
     console.error("Error uploading file:", error);
     throw error;
   }
 };
 

//    // // ......................................................................
// import axios from "axios";
// import FormData from "form-data";

// export const rawFileUpload = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "awer24s"); // Your Cloudinary upload preset
//   let fileUrl = null;
  
//   try {
//     const response = await axios.post("https://api.cloudinary.com/v1_1/dhxjnryqk/raw/upload", formData, {
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
