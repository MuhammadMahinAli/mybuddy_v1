import { FaPlus } from "react-icons/fa";
import b from '../assets/icon/gradient-plus.png'

const PlusIcon = ({ theme }) => {
  return (
    <div>
      {theme === "light" ? (
        <div className="lg:text-sm xl:text-lg text-white font-semibold rounded-[7px] px-2 py-2 xl:px-2 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
          {/* <EditIcon /> */}
          <p className="text-lg capitalize">
            <FaPlus />
          </p>
        </div>
      ) : (
        <div className="p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-md">
          <div className="bg-[#333841] rounded-md md:p-1">
            {/* <svg
              className="w-8 md:w-5"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8.85818V11.1418C0 11.5899 0.363265 11.9531 0.811288 11.9531H6.73561C7.18367 11.9531 7.5469 12.3164 7.5469 12.7644V18.6887C7.5469 19.1368 7.91016 19.5 8.35818 19.5H10.6418C11.0899 19.5 11.4531 19.1367 11.4531 18.6887V12.7644C11.4531 12.3163 11.8164 11.9531 12.2644 11.9531H18.1887C18.6368 11.9531 19 11.5898 19 11.1418V8.85818C19 8.41012 18.6367 8.0469 18.1887 8.0469H12.2644C11.8163 8.0469 11.4531 7.68363 11.4531 7.23561V1.31129C11.4531 0.863226 11.0898 0.5 10.6418 0.5H8.35818C7.91012 0.5 7.5469 0.863265 7.5469 1.31129V7.23561C7.5469 7.68367 7.18363 8.0469 6.73561 8.0469H0.811288C0.363265 8.0469 0 8.41012 0 8.85818Z"
                fill="url(#paint0_linear_16_1486)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_16_1486"
                  x1="9.5"
                  y1="0.5"
                  x2="9.5"
                  y2="19.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4EEBFF" />
                  <stop offset="0.69" stopColor="#AA62F9" />
                  <stop offset="1" stopColor="#F857FF" />
                </linearGradient>
              </defs>
            </svg> */}
              <img className='w-5' src={b} loading="lazy" alt='' />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlusIcon;
