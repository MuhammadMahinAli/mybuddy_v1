import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const VerificationSuccess = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    console.log('token',token);
    const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '' });
    const [userName, setUserName] = useState('');
    //const [verificationStatus, setVerificationStatus] = useState(null);
    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/v1/member/verify-email?token=${token}`);
            console.log(response);
            setUserDetails(response.data); // Adjust this according to your backend response structure
          } catch (error) {
            console.error('Failed to fetch user details', error);
          }
        };
    
        
          fetchUserDetails();
        
      }, [token]);


console.log( 'name', token);

  return (
    <div>
      <div>
        {/* <p className="text-red-500">You must complete the Email verification.</p> */}
        <div className="h-40 bg-purple-400"></div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center p-4 xl:p-7 3xl:p-10 mx-3 md:w-[600px] lg:w-[800px] xl:w-[900px] 3xl:w-[1000px]   rounded-lg shadow-2xl -mt-24 bg-white my-10">
            <p className="text-purple-800 font-mono text-center font-bold py-3 text-3xl">
              WELCOME!!!
            </p>

            <p className="text-purple-800 font-semibold text-[18px] md:text-xl 3xl:text-[22px] py-3 capitalize">{`We're glad to have you with us !`}</p>
            <p className="text-purple-700 text-center text-[15px] md:text-[17px] 3xl:text-[20px] tracking-wide">{`Thank you for signing up! To ensure your account is secure and fully activated, we need you to confirm your email address. Please click the button below to be redirected to your mailbox. From there, open the account activation email we sent and click "Verify your email" to complete the process.`}</p>
            <a href="https://mail.google.com" target="blank">
              <button className="my-5 px-6 py-1 md:px-8 md:py-3 text-[16px] md:text-xl  text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[6px] [background:linear-gradient(-20.24deg,#B95CF4,#D397F8)] hover:[background:linear-gradient(-500.24deg,#B95CF4,#D397F8)]">
                Confirm Your Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
