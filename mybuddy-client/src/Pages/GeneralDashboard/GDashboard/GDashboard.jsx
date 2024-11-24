import dash from "../../../assets/dashboard1.png";
import Projects from "./Projects";
import Requests from "./Requests";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
const GDashboard = () => {
  //const { user } = useSelector((state) => state.auth);
  const { getAllProjectByUser, singleUser } = useContext(AuthContext);
  
  const [userData, setUserData] = useState({});

  const projects = getAllProjectByUser?.data;

  //  ******************** single user

  useEffect(() => {
    setUserData(singleUser);
  }, [singleUser]);


  return (     <div className="flex flex-col pb-3 justify-start space-y-16">
      {/* dashboard */}
      <div>
        <h1 className="gray600 text-[20px] lg:text-[28px] pt-5 md:pb-5 font-bold">
          DASHBOARD
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-center md:space-x-8 lg:space-x-0 xl:space-x-5 space-y-5 sm:space-y-0 md:space-y-0">
          {/* 1 */}
          <div className="hidden sm:block sm:w-7/12 md:w-7/12 lg:w-7/12 xl:w-7/12 lg:mr-5 rounded-[20px] md:rounded-[35px] bg-skyblue  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] overflow-hidden">
            <div className="flex justify-between items-center xl:space-x-20 py-3 md:py-5 ">
              <div className="p-3 lg:p-5 text-2xl gray500 md:space-y-1">
                <p className="text-[18px] md:text-[29px]">Welcome</p>
                <p className="text-[18px] md:text-[29px] font-semibold capitalize pt-1">
                  {userData?.data?.name?.firstName}{" "}
                  {userData?.data?.name?.lastName}
                </p>
              </div>
              <img
                src={dash}
                className="sm:h-36 md:h-28"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
          {/* 2 */}
          <div className="w-full sm:w-5/12 xl:w-5/12 sm:ml-6   rounded-[20px] md:rounded-[35px] bg-skyblue  shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] overflow-hidden">
            <div className="flex justify-between items-center lg:space-x-9 py-3 md:py-5">
              <div className="p-3 lg:p-5 text-2xl gray500 md:space-y-1">
                <p className="text-[26px] md:text-[29px]">Project</p>
                <p className="text-[26px] md:text-[29px] font-semibold">
                  {projects ? projects?.length : 0}
                </p>
              </div>
              <img src={dash} className="h-36 md:h-28" loading="lazy" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row  justify-center lg:justify-between items-center lg:items-start space-y-6 lg:space-y-0">
        {/* left */}
        <div className="lg:w-8/12 4xl:w-9/12 xl:space-y-10 pr-0 xl:pl-0 w-full">
          {/* project */}
          <Projects />
          {/* Request */}
          <Requests />
        </div>
        {/* right */}
        <div className="hidden  w-full">
          <h1 className="gray600 text-[20px] lg:text-[28px] pb-2 font-bold">
            MEETING
          </h1>
          <p className="text-gray-600 text-[16px] md:text-[18px]  lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`Coming Soon`}</p>
        </div>
        <div className="  p-3 xl:p-5 gray600 space-y-4 lg:w-60 xl:w-72 2xl:w-72 3xl:w-72 lg:h-[200px] xl:h-[300px] rounded-[15px] w-full bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] overflow-hidden">
          <h1 className="pl-2 gray500 text-[24px] md:text-[28px] font-bold">
            Meetings
          </h1>
          <p className="pl-2 text-[16px] md:text-[18px]  lg:text-[24px] font-semibold capitalize pb-3">
            Coming soon
          </p>
          {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:justify-start gap-7 ">
            {meetings.map((meeting, i) => (
              <div
                key={i}
                className={`${
                  i === 0
                    ? " border-[#5397ea] bg-[#b2d4f0]"
                    : i === 1
                    ? " border-[#ff6c6c] bg-[#e8d7e0]"
                    : i === 2
                    ? " border-[#00a0ff] bg-[#b2d4f0]"
                    : i === 3
                    ? " border-[#ffb13b] bg-[#ddd6bc]"
                    : " border-[#fd4deb] bg-[#d9c6f1]"
                } rounded-md space-y-2 border-s-[6px] p-2 xl:p-3 md:p-4`}
              >
                <strong className="text-xl font-medium">
                  {" "}
                  {meeting.title}
                </strong>

                <div className="flex justify-start md:items-center space-x-1">
                  <CiClock2 className="text-lg" />
                  <p className="text-sm">
                    {meeting?.startTime} To {meeting?.endTime}
                  </p>
                </div>
                <div className="flex items-center space-x-1 xl:space-x-2 ">
                  {meeting.users.map((member, i) => (
                    <img
                      key={i}
                      src={member}
                      className="h-8 w-8 md:h-10 md:w-10 lg:h-8 lg:w-8 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10  rounded-full border-2 border-gray-500"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GDashboard;
