import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useResetPasswordMutation, useUpdatePasswordMutation } from "../../features/auth/authApi";
import { validatePass } from "../../utils/validation";
import { AiOutlineEye } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";
import GoogleAdComponent from "../../GoogleAdComponent/GoogleAdComponent";

const ResetPassword = () => {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  // Extract query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const token = queryParams.get("token");
  const initialTimeRemaining = parseInt(queryParams.get("timeRemaining")) / 1000;
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);
  const [hasStarted, setHasStarted] = useState(false);
  //const [resetPassword] = useResetPasswordMutation();
  const [updatePassword] = useUpdatePasswordMutation()

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleConfirmPassword = () => {
    if (passwordConfirmType === "password") {
      setPasswordConfirmType("text");
      return;
    }
    setPasswordConfirmType("password");
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  useEffect(() => {
    if (!hasStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      setHasStarted(true);

      return () => clearInterval(timer);
    }

    if (timeRemaining <= 0) {
      Swal.fire({
        icon: "error",
        text: "Reset link has expired. Please request a new one.",
      });
      navigate("/login");
    }
  }, [timeRemaining]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "newPassword") {
      setIsPasswordValid(validatePass(value));
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Passwords do not match. Can you please try again ?",
      });
      return;
      
    }

      // Validate password strength before submission
      if (!isPasswordValid) {
        Swal.fire({
          icon: "error",
          title:"Password does not meet the required strength.",
          text: "Password must contain at least 1 uppercase and lowercase alphabetical character, 1 numeric character, 1 specialcharacter & must be 8 characters or longer.",
        });
        return;
      }

    setIsLoading(true);  
    console.log({userId: userId,  newPassword: formData.newPassword })
    updatePassword({  userId:userId, newPassword: formData.newPassword })
      .unwrap()
      .then((response) => {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          text: "Password has been reset successfully!",
        });
    navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text:
            error?.data?.message ||
            "An error occurred. Please try again later.",
        });
      });
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      Swal.fire({
        icon: "error",
        text: "Time has expired. Please request a new one.",
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  console.log('rem',initialTimeRemaining, timeRemaining);

  return (
    <div>
      <div>
        <div className="h-44 bg-[#49a133]"></div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center p-4 xl:p-7 3xl:p-10 mx-3 md:w-[600px] lg:w-[800px] xl:w-[900px] 3xl:w-[1000px]   rounded-lg shadow-2xl -mt-24 bg-white my-10">
            <p className="text-[#49a133] font-mono text-center font-bold py-3 text-3xl">
              Reset Your Password!!!
            </p>
            <img
              className="w-20 md:w-36 3xl:w-52  py-2"
              src="https://img.freepik.com/free-vector/padlock-unlocked-circle-with-check-mark_78370-4907.jpg"
              loading="lazy"
              alt="email"
            />
            <div>
              <form
                onSubmit={handleSubmit}
                className=" px-5 py-4 rounded-md w-96"
              >
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-700">
                    New Password
                  </label>
                  <div className="flex justify-between items-center border-b border px-3  rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <input
                      type={passwordType}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      required
                      className="w-full py-2 mt-1 outline-none"
                    />
                    {passwordType === "password" ? (
                      <AiOutlineEye
                        onClick={togglePassword}
                        className="text-gray-500 text-xl  "
                      />
                    ) : (
                      <GoEyeClosed
                        onClick={togglePassword}
                        className="text-gray-500 text-xl"
                      />
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  {/* <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  /> */}
                   <div className="flex justify-between items-center border-b border px-3  rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                   <input
                    type={passwordConfirmType}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                      className="w-full py-2 mt-1 outline-none"
                    />
                    {passwordConfirmType === "password" ? (
                      <AiOutlineEye
                        onClick={toggleConfirmPassword}
                        className="text-gray-500 text-xl  "
                      />
                    ) : (
                      <GoEyeClosed
                        onClick={toggleConfirmPassword}
                        className="text-gray-500 text-xl"
                      />
                    )}
                  </div>
                </div>
                {isPasswordFocused && (
                  <span className="text-red-600">
                    Password must contain at least 1 uppercase and lowercase
                    alphabetical character, 1 numeric character, 1 special
                    character & must be 8 characters or longer.
                  </span>
                )}
                <button
                  type="submit"
                  className="w-full py-2 mt-4 text-white bg-[#49a133] hover:bg-[#2dc70a] rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
