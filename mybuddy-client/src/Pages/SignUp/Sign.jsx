import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { GoEyeClosed } from "react-icons/go";
import heroImg from "../../assets/object.png";
import { useEffect, useState } from "react";
import { validateEmail, validatePass } from "../../utils/validation";
import { useSignUpMutation } from "../../features/auth/authApi.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineEye } from "react-icons/ai";
const Sign = () => {
  const [signUp, { data: responseData, isLoading, error: responseError }] =
    useSignUpMutation();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

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
    role: "",
    about: "",
  });

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = validateEmail(formData?.email);
    const passwordValid = validatePass(formData?.password);
    if (!emailValid) {
      alert(`Email is not valid`, "error");
    } else if (!passwordValid) {
      alert(`Password is not valid`, "error");
    } else {
      signUp(formData);
    }
  };
  useEffect(() => {
    if (!responseData?.status) {
      console.log(responseData?.message);
    }
    if (responseError?.data) {
      console.log(responseError.data);
    }
    if (responseData?.message === "User created successfully!") {
      Swal.fire("Account has been created successfully!");
      navigate("/login");
    }
  }, [responseData, responseError]);

  return (
    <div className="flex justify-center items-center bg-[url('https://i.ibb.co/jkHs6rF/page-1.png')] bg-no-repeat bg-cover min-h-screen">
      <div className="py-5 lg:my-9 md:py-0 md:mx-10 lg:mx-20 w-full flex flex-col md:flex-row justify-between items-center   rounded-[20px] bg-[#c7ecf9] shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray">
        {/* left */}
        <div className="p-5 space-y-4 md:space-y-0 md:w-6/12">
          <p className="text-gray-600 text-xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            optio.
          </p>
          <div className="md:hidden w-[250px] rounded-[20px] bg-[#c7ecf9] shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray">
            <img src={heroImg} className="p-7 w-[250px]" alt="" />
          </div>
          <div className="flex justify-center items-center p-8 hidden md:block">
            <img src={heroImg} className="w-[280px] lg:w-[400px]" alt="" />
          </div>
        </div>
        {/* right */}
        <form
          onSubmit={handleSubmit}
          className="-mt-48 ml-10 md:ml-0  px-3 md:px-5 py-9 space-y-3 lg:space-y-4 flex flex-col h-full w-9/12 md:w-7/12 lg:w-6/12 bg-white md:mt-8 rounded-tl-[30px] rounded-br-[30px] md:rounded-tl-[60px] md:rounded-br-[0px]"
        >
          <h1 className="text-blue-500 text-2xl font-bold pl-5">
            Create Account
          </h1>
          <div className="flex justify-between items-center border-b">
            <input
              type="text"
              name="firstName"
              value={formData.name.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              className="h-12 w-11/12 outline-none  p-4"
            />
            <FiUser className="text-gray-500 text-xl" />
          </div>
          <div className="flex justify-between items-center border-b">
            <input
              type="text"
              name="lastName"
              value={formData.name.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              className="h-12 w-11/12 outline-none  p-4"
            />
            <FiUser className="text-gray-500 text-xl" />
          </div>
          <div className="flex justify-between items-center border-b">
            <input
              type="email"
              name="email"
              defaultValue={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              className="h-12 w-11/12 outline-none  p-4"
            />
            <MdOutlineEmail className="text-gray-500 text-xl" />
          </div>
          <div className="flex justify-between items-center border-b">
            <input
              type="text"
              name="phoneNumber"
              defaultValue={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              className="h-12 w-11/12 outline-none  p-4"
            />
            <TiPhoneOutline className="text-gray-500 text-xl" />
          </div>
          <div className="flex justify-between items-center border-b">
            <input
              type={passwordType}
              name="password"
              defaultValue={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a Password"
              className="h-12 w-11/12 outline-none  p-4"
            />
            {/* <GoEyeClosed className="text-gray-500 text-xl" /> */}
            {passwordType === "password" ? (
              <AiOutlineEye
                onClick={togglePassword}
                className="text-gray-500 text-xl"
              />
            ) : (
              <GoEyeClosed
                onClick={togglePassword}
                className="text-gray-500 text-xl"
              />
            )}
          </div>
          <span className="text-red-600">
            Password must contain at least 1 uppercase and lowercase
            alphabetical character, 1 numeric character, 1 special character &
            must be 8 characters or longer
          </span>
          <div className="flex space-x-2 pt-2 pb-4">
            <input type="checkbox" />
            <p>
              I accept the <span className="text-blue-600">Terms of Use</span>{" "}
              and <span className="text-blue-600">Privacy Policy</span>{" "}
            </p>
          </div>
          <button className="text-xl md:text-2xl text-white font-semibold bg-blue-500 py-2 rounded-[30px]">
            Sign Up
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login">
              <span className="text-blue-600 font-semibold cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sign;
