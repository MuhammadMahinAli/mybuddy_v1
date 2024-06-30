import b from '../assets/icon/gradient-edit.png'
const UploadIcon2 = ({ theme }) => {
  return (
    <div>
      {theme === "light" ? (
         <div className="lg:text-sm xl:text-lg text-white font-semibold rounded-[7px] px-2 py-2 xl:px-2 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
        <svg
        className="w-4"
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.86279 21.125V15.588L15.1509 1L20.2378 5.36574L6.94966 19.5278L1.86279 21.125Z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M13.3764 6.53566L14.1162 7.20846L15.4618 5.72881L14.722 5.05601L13.3764 6.53566ZM11.9515 5.23982L13.3764 6.53566L14.722 5.05601L13.2971 3.76018L11.9515 5.23982Z"
            fill="#fff"
          />
          <path
            d="M0.112793 24.625H18.2199M19.6128 24.625H21.1128"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
        </div>
      ) : (
        <div className="p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-md">
        <div className="bg-[#333841] rounded-md p-1">
        {/* <svg
      className="w-4"
          viewBox="0 0 25 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.3125 24.7568V18.4288L17.4989 1.75684L23.3125 6.74625L8.12606 22.9314L2.3125 24.7568Z"
            stroke="url(#paint0_linear_36_136)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M15.567 7.97762L16.3068 8.65042L17.6524 7.17077L16.9126 6.49797L15.567 7.97762ZM13.9385 6.49666L15.567 7.97762L16.9126 6.49797L15.2841 5.01701L13.9385 6.49666Z"
            fill="#4EEBFF"
          />
          <path
            d="M0.3125 28.7568H21.0064M22.5982 28.7568H24.3125"
            stroke="url(#paint1_linear_36_136)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_36_136"
              x1="12.8125"
              y1="1.75684"
              x2="12.8125"
              y2="24.7568"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.705" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_36_136"
              x1="-0.502969"
              y1="28.7568"
              x2="24.3125"
              y2="28.7568"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.705" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
          </defs>
        </svg> */}
        <img className='w-4' src={b} alt='' />
        </div>
        </div>
      )}
    </div>
  );
};

export default UploadIcon2;
