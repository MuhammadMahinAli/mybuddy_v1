import { useState } from "react";
import {validateEmail, validatePass} from "../../utils/validation";
import {apiFetch} from "../../utils/apiFetch";
const SignUp = () => {
  const ID = Math.random().toString(36).substr(2, 9)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: {
      firstName: "",
      lastName: "",
    },
    phoneNumber: "",
    address: "",
    country: "",
    profession: "",
    profilePic: "",
    coverPic: "",
    role: "User",
    skills: [],
    interests: "",
    about: "",
    facebook: "",
    github: "",
    portfolio: "",
    linkedIn: "",
    twitter: "",
  });

  
 console.log(formData);

      const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === "firstName" || name === "lastName") {
          setFormData({
            ...formData,
            name: {
              ...formData.name,
              [name]: value,
            },
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailValid = validateEmail(formData?.email);
        const passValid = validatePass(formData?.password);
        if (!emailValid) {
          alert("Oops!", `Email is not valid`, "error");
        } else if (!passValid) {
          alert("Oops!", `Password is not valid`, "error");
        } else {
          const data = await apiFetch(`http://3.80.196.219/api/v1/user/sign-up`, "POST", formData);
          if (!data?.success) {
            console.log(data);
            alert("Ooops!", `Something Went wrong`, "error");
          }
          if (data?.success && data?.data) {
            alert("Congratulations!", `Account created successfully!`, "success");
            // navigate("/user/signin");
          }
        }}
    return (
        <div>
            <div className="flex justify-center items-center rounded-xl bg-gray filter:blur(2px) backdrop-filter:blur(20px) md:mx-10 xl:mx-20 py-10">
                  <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start ">
                    {/*********************** Left image **********************/}
                    {/* <div data-aos="fade-up-right" data-aos-duration="1200" className="lg:w-5/12 lg:h-[550px]">
                      <img className="lg:h-[530px]" alt="" src={HeroImage} />
                    </div> */}
                    {/*********************** Right form **********************/}
                    <div data-aos="fade-up-left" data-aos-duration="1200" className="lg:w-5/12  p-3">
                      <div
                        className="bg-[#d1fbf7] 
              mb-0 space-y-4 rounded-lg p-4 border shadow-lg "
                      >
                        <p className="text-center text-2xl font-medium py-2">{`Create an account as {USER} ! `}</p>

                        <form action="" className="space-y-3">
                          <input type="text" id="firstName" name="firstName" value={formData.name.firstName} onChange={handleInputChange} className="w-full bg-white shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px)  rounded-lg border-gray-200 p-4 pe-12  text-lg outline-none" placeholder="Enter first name" />
                          {/* // */}
                          <input type="text" id="lastName" name="lastName" value={formData?.name?.lastName} onChange={handleInputChange} className="w-full bg-white shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) rounded-lg border-gray-200 p-4 pe-12 text-lg outline-none" placeholder="Enter last name" />
                          {/*  */}
                          <input type="email" id="email" name="email" defaultValue={formData?.email} onChange={handleInputChange} className="w-full bg-white shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) rounded-lg border-gray-200 p-4 pe-12 text-lg outline-none" placeholder="Enter email address" />
                          {/*  */}
                          <input type="text" id="phoneNumber" name="phoneNumber" defaultValue={formData?.phoneNumber} onChange={handleInputChange} className="w-full bg-white shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) rounded-lg border-gray-200 p-4 pe-12 text-lg outline-none" placeholder="Enter mobile number" />
                          {/*  */}
                          <input type="password" id="password" name="password" defaultValue={formData?.password} onChange={handleInputChange} className="w-full bg-white shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) rounded-lg border-gray-200 p-4 pe-12 text-lg outline-none" placeholder="Enter password" />
                          <span>Password must contain at least 1 uppercase and lowercase alphabetical character, 1 numeric character, 1 special character & must be 8 characters or longer</span>
                          {/*  */}
                          <button type="submit" className="block w-full rounded-lg  bg-gray  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] hover:shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) px-5 py-3 text-xl font-medium text-gray-700" onClick={handleSubmit}>
                            Save
                          </button>
                        </form>
                        <p className="text-lg text-center py-0">
                          Already have an account?{" "}
                          <span className="hover:text-blue-500 hover:underline">
                           
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
    );
};

export default SignUp;