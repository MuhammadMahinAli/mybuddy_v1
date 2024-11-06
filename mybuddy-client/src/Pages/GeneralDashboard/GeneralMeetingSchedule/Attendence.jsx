import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { apiFetch } from "../../../utils/apiFetch";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Attendence = () => {
  const [otp, setOtp] = useState(""); //
 // const { userId } = useContext(AuthContext);
  const queryParams = new URLSearchParams(location.search);
  const meeting = queryParams.get("meeting");
  const meetingId = queryParams.get("meetingId");
  const otps = queryParams.get("otp");
  const dateString = queryParams.get("date");
  console.log(otps, meetingId, dateString);


  // const date = new Date(meeting?.meetingTime);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
   // const dateString = "2024-10-07T02:45:00.000Z"; // Your date string here
    const date = new Date(dateString);

    if (!isNaN(date.getTime())) {
      // Format the date
      const optionsDate = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
      setFormattedDate(formattedDate);

      // Format the time
      const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
      const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);
      setFormattedTime(formattedTime);
    } else {
      console.error("Invalid date:", dateString);
    }
  }, []);

  // get otp

  const [fund, setFund] = useState([]);
  useEffect(() => {
    if (!meetingId) {
      return;
    }
    const fetchData = async () => {
      const res = await apiFetch(
        `http://localhost:3000/api/v1/meeting/getMeetingById/${meetingId}`,
        "GET"
      );
      setFund(res?.data ?? {});
      console.log(res?.data);
      console.log(fund);
    };
    fetchData();
  }, [meetingId]);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
 console.log(userId); 
  const handleOtpChange = (event) => {
    setOtp(event.target.value); // Update the OTP state as the user types
  };
console.log("ot",fund?.attendenceLink );
  //http://localhost:5173/attendance?otp=384128&meetingId=66fe38de724207f81ec75cc3&date=2024-10-03
  const handleAttendClick = async () => {
    // Log meeting details for debugging
    console.log({
      meetingId,
      meetingTime:dateString,
      otp,
      memberId: userId,
    });
  
    //Check if the provided OTP matches the attendance link
    if (fund?.attendenceLink === otp) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/meeting/updateAttendance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingId,
              meetingTime:dateString,
              otp,
              memberId: userId,
            }),
          }
        );
  
        const data = await response.json();
  
        // Check if the attendance was successfully updated
        if (data.success) {
          console.log("Attendance successfully updated.");
          Swal.fire({
            icon: "success",
            title:"Attendance successfully updated..",
          });
        } else {
          console.log("Failed to update attendance:", data.message);
          Swal.fire({
            icon: "error",
            title:data.message
          });
        }
      } catch (error) {
        console.error("Error updating attendance:", error.message);
      }
    } else {
  
      Swal.fire({
        icon: "error",
        title:"Invalid OTP. Please try again."
      });
      
   }
  };
  

  return (
    <div className="fixed top-0 left-0  flex justify-center items-center bg-black/40 bg-opacity-50 w-screen h-screen overflow-y-scroll">
      <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] 3xl:w-[800px] cursor-pointer">
        <div className="flex justify-center items-center py-10">
          <div className="flex flex-col border-2 border-black overflow-hidden p-2 rounded-xl shadow-large bg-rose-400 w-[500px]">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="items-center w-full justify-center grid grid-cols-1 text-left">
                <div>
                  <h2 className="text-black font-bold text-lg lg:text-3xl text-center pb-5">
                    Make your Attendence !!!
                  </h2>
                  <div className="space-y-3">
                    <input
                      // value={meeting}
                      value={meeting}
                      className="bg-white h-10 w-full text-center rounded-lg capitalize"
                      readOnly
                    />
                    <input
                      value={formattedDate}
                      className="bg-white h-10 w-full text-center rounded-lg"
                      readOnly
                    />
                    <input
                      value={formattedTime}
                      className="bg-white h-10 w-full text-center rounded-lg"
                      readOnly
                    />
                    <input
                      name="otp"
                      placeholder="Enter the OTP"
                      onChange={handleOtpChange}
                      className="bg-white h-10 w-full text-center rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-between pb-8 px-6 sm:px-8 space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleAttendClick}
                  className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full lg:px-8 lg:py-4 lg:text-xl px-4 py-2"
                >
                  {"Attend"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
