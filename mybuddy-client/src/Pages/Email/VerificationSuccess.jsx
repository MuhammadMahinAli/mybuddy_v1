import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import barcode from "../../assets/barcode.png";
import qrcode from "../../assets/qrcode.png";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Context/UserContext";
import Loading from "../Loading/Loading";

const VerificationSuccess = () => {
  const { token } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const {loading} = useContext(AuthContext);
  

 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/member/verify-email?token=${token}`
        );
        const first = response?.data?.data?.firstName;
        const last = response?.data?.data?.lastName;
        const emaill = response?.data?.data?.email;
        const phone = response?.data?.data?.phoneNumber;

        setFirstName(first);
        setLastName(last);
        setPhoneNumber(phone);
        setEmail(emaill);
        //console.log("Res:", firstName, lastName, email, phoneNumber);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (token) {
      fetchUserDetails();
    } else {
      Swal.fire("Error", "No verification token provided.", "error");
    }
  }, [token]);

  if(loading){
    return <Loading/>
  }

  console.log("Res2:", firstName, lastName, email, phoneNumber);

 

  return (
    <div>
      <div>
        <div className="h-40 bg-green-500"></div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center p-4 xl:p-7 3xl:p-10 mx-6 md:w-[650px] lg:w-[800px] xl:w-[900px] 3xl:w-[1000px] rounded-lg shadow-2xl -mt-24 bg-white my-10">
            <p className="text-green-800  font-mono text-center font-bold py-4 text-2xl md:text-3xl">
              Congratulations !
            </p>
            {email ? (
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 items-center">
                {/*  id card front part*/}
                <div className="w-[280px] md:w-[300px] h-[450px]  bg-white shadow-2xl rounded-lg overflow-hidden relative border border-gray-300">
                  <div className="flex justify-center items-center mt-4">
                    <img src="/logo.png" loading="lazy" alt="Company Logo" className="h-14" />
                  </div>

                  <div className="relative mt-16">
                    <div className="w-full h-24 bg-green-700  absolute top-7 left-0 transform -skew-y-12 origin-top-left"></div>
                    <div className="flex justify-center -mt-12 relative">
                      <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1rTLeQraa9s-Rkj2_KMPOzh30CwK1G2D85A&s"
                          loading="lazy" alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* User Information */}
                  <div className="text-center mt-4">
                    <h2 className="text-xl  font-bold text-green-800">
                      {firstName} {lastName}
                    </h2>
                    {/* <p className="text-green-700">Graphic Designer</p> */}
                  </div>
                  <div className="py-5 px-3 space-y-1 text-left">
                    <p className="text-[15px] tracking-wide text-green-700">
                      <span className="font-semibold ">ID NO:</span>{" "}
                      {token.slice(0, 16)}
                    </p>
                    <p className="text-sm tracking-wide text-green-700">
                      <span className="font-semibold ">EMAIL:</span>{" "}
                      {email}
                    </p>
                    <p className="text-sm tracking-wide text-green-700">
                      <span className="font-semibold ">PHONE:</span>{" "}
                      {phoneNumber}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center py-2">
                    <div className="bg-green-700 font-medium text-center text-white px-2 py-1 mb-3 rounded w-32">
                      <p>Scan for Info</p>
                    </div>
                    <img
                      src={barcode} // Replace with your logo URL
                      loading="lazy" alt="Company Logo"
                      className="w-44 self-center"
                    />
                  </div>
                </div>

                {/* id card back part  */}
                <div className="flex flex-col items-center">
                  <div className="bg-white  rounded-lg w-[280px] md:w-[300px] h-[450px] shadow-2xl border border-gray-300p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 mx-auto mb-2">
                        <img
                          src="/logo.png"
                          loading="lazy" alt="Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-green-800  text-2xl font-bold">
                        {" "}
                        Research Buddy
                      </p>
                      <div className="py-3 flex justify-center items-center">
                        <img
                          src={qrcode}
                          loading="lazy" alt="Logo"
                          className="w-20 object-cover"
                        />
                      </div>

                      <p className="text-green-600">support@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src="https://img.freepik.com/free-vector/high-five-hands-concept-illustration_114360-11529.jpg?size=338&ext=jpg"
                loading="lazy" alt="Logo"
                className="w-32 md:w-60 object-cover"
              />
            )}

            <p className="text-green-700 font-semibold text-[19px] md:text-xl 3xl:text-[22px] py-4 mt-5 capitalize text-center">{` Your email verification is complete !`}</p>
            <p className="text-green-700 px-5 font-normal text-center  text-[16px] md:text-[17px] 3xl:text-[20px] tracking-wide">
              {`You can now start using all our services without any limitations. Explore our features and discover what we have in store for you. Should you need any support, don't hesitate to contact us.`}
            </p>
            <a href="/" target="blank">
              <button className="my-5 px-6 py-1 md:px-8 md:py-3 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[6px] [background:linear-gradient(-1110.24deg,#6cd894,#298e4e)] hover:[background:linear-gradient(-1000.24deg,#298e4e,#6cd894)]">
                Login To Your Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
