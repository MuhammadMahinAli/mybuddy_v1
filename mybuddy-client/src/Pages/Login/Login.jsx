import { MdOutlineEmail } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { useContext,  useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useLoginMutation } from "../../features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/UserContext";
import { useSelector } from "react-redux";

const Login = () => {
  const [login, { data: responseData,  error: responseError }] =
    useLoginMutation();
    const { user } = useSelector((state) => state.auth);
    const{addSocialInfo} = useContext(AuthContext);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const socialData = {
    twitter: "",
    github: "",
    linkedIn: "",
    instagram: "",
    personalWebsite: "",
    youtube: "",
    tiktok: "",
    pinterest: "",
    facebook: "",
  };
  const infoData={
    user:user?._id,
    socialData
  }
  //setting form data to add service
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // hide password
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Assuming login returns a promise that resolves with the response data
       const response = await login(formData);
       console.log("r",response);
       if (response?.data?.message === "User logged in successfully!") {
         console.log(response);
         Swal.fire({
          icon:"success",
          text:"You have been logged in successfully!"});

        // social
          addSocialInfo(infoData);
         navigate("/user/edit-profile");
       } else {
         // Handle unexpected response format
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Please enter correct Email/Password !",
         });
       }
    } catch (error) {
       // Handle login error
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Please enter correct Email/Password!",
         footer: '<a href="#">Why do I have this issue?</a>'
       });
    }
   };
   //bg-[url('https://i.ibb.co/jkHs6rF/page-1.png')]
  return (
    <div className="flex justify-center items-center  bg-no-repeat bg-cover min-h-screen">
      <div className="py-5 md:py-0 md:mx-10 lg:mx-20 w-full flex flex-col md:flex-row justify-between items-center   rounded-[20px]  shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray">
        {/* left */}
        <div className="p-5 space-y-4 md:space-y-0 md:w-6/12">
          <div className="md:hidden w-[350px] rounded-[20px] shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray">
            <img src="https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg" className="p-7 w-[250px]" alt="" />
          </div>
          <div className="flex justify-center items-center p-8 hidden md:block">
            <img
              src="https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg"
              className="w-[280px] lg:w-[850px] xl:w-[900px]"
              alt=""
            />
          </div>
        </div>
        {/* right */}
        <form
          onSubmit={handleSubmit}
          className="-mt-14 ml-16 md:ml-0  py-6 px-3  md:px-5 md:py-16 xl:py-24 space-y-3 lg:space-y-6 flex flex-col h-full w-9/12 md:w-7/12 lg:w-6/12 bg-gray-50 md:mt-8 rounded-tl-[30px] rounded-br-[30px] md:rounded-tl-[60px] md:rounded-br-[0px]"
        >
          <h1 className="text-blue-500 text-xl md:text-2xl font-bold pl-5">
            Login Your Account
          </h1>
          <div className="flex justify-between items-center border-b">
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={formData?.email}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              className="h-12 w-11/12 outline-none  p-4"
            />
            <MdOutlineEmail className="text-gray-500 text-xl" />
          </div>
          <div className="flex justify-between items-center border-b">
            <input
              type={passwordType}
              id="password"
              name="password"
              defaultValue={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter a Password"
              className="h-12 w-11/12 outline-none  p-4"
            />
            {/* <GoEyeClosed className="text-gray-500 text-xl" /> */}
            {passwordType === "password" ? (
              <AiOutlineEye onClick={togglePassword} className="text-gray-500 text-xl" />
            ) : (
              <GoEyeClosed onClick={togglePassword}  className="text-gray-500 text-xl" />
            )}
          </div>
          <button className="text-xl md:text-2xl text-white font-semibold bg-blue-500 py-1 md:py-2 rounded-[30px]">
            Login
          </button>
          <p className="text-center">
            {"Don't have any account ? "}
            <Link to='/sign' className="text-blue-600 font-semibold cursor-pointer">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
