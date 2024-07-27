/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import UploadIcon2 from "../../../icons/UploadIcon2";

const UserProfileAboutEM = ({setIsOpenAboutModal,userAbout}) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div
      className={`${
        theme !== "light" &&
        "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-xl w-full   mx-0 "
      }`}
    >
      <div
        className={`${
          theme === "light"
            ? "bg-white rounded-2xl shadow-xl pb-5"
            : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px]"
        } rounded-xl lg:rounded-3xl  shadow-2xl`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-[#edfaff] rounded-t-xl"
              : "rounded-xl bg-[#13688a]"
          } flex justify-between items-center p-3 md:p-5 `}
        >
          <div>
            <p
              className={`${
                theme === "light" ? "graish" : "text-white"
              } text-lg md:text-xl font-semibold`}
            >
              About
            </p>
          </div>
          <button onClick={()=>setIsOpenAboutModal(true)}>
          <UploadIcon2 theme={theme} />
          </button>
        
        </div>
        <div className="p-3">
          <p
            className={`${
              theme === "light" ? "graish" : "text-white"
            } text-[13px] md:text-[16px] capitalize`}
          >
           {userAbout}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAboutEM;
