import PropTypes from "prop-types";

const TeamIcon = ({ theme, openTeam, openComponent }) => {
  const lightModeColor =
    openComponent === "team" && openTeam
      ? "#2ADBA4"
      : openTeam
      ? "#2ADBA4"
      : openComponent === "team"
      ? "#2ADBA4"
      : "#838DAA";
  return (
    <>
      {theme === "light" ? (
        <svg
          className="w-6 lg:w-7 xl:w-7 3xl:w-9"
          viewBox="0 0 34 22"
          fill={lightModeColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.94263 15.0023C9.93753 14.9502 9.92121 14.9023 9.92121 14.8503V14.4044C9.92121 14.1921 9.95588 13.983 10.0253 13.784C10.0253 13.784 11.1365 12.2963 11.662 10.5484C11.0865 9.33411 10.5641 7.82298 10.5641 6.32504C10.5641 5.9771 10.5896 5.64039 10.6253 5.30871C9.87536 4.52304 8.86211 4.07812 7.74273 4.07812C5.43156 4.07812 3.55617 5.96377 3.55617 8.89429C3.55617 11.2391 5.46428 13.7839 5.46428 13.7839C5.53161 13.9829 5.56635 14.1921 5.56635 14.4043V14.8502C5.56635 15.4063 5.24186 15.9124 4.73575 16.1441L1.70624 17.3818C1.00213 17.7063 0.501122 18.3532 0.361372 19.1143L0.309325 19.7806C0.282811 20.1276 0.401142 20.4694 0.637868 20.7235C0.87355 20.9796 1.20523 21.1235 1.55317 21.1235H6.50503L6.70806 18.5144L6.72132 18.444C6.96927 17.0757 7.87334 15.9124 9.13651 15.3308L9.94263 15.0023Z"
            fill={lightModeColor}
          />
          <path
            d="M33.6857 19.1143C33.5469 18.3532 33.0459 17.7062 32.3419 17.3818L29.3103 16.1441C28.8042 15.9124 28.4817 15.4063 28.4817 14.8502V14.4043C28.4817 14.1921 28.5154 13.9829 28.5848 13.7839C28.5848 13.7839 30.4919 11.2391 30.4919 8.89429C30.4919 5.96377 28.6174 4.07812 26.3022 4.07812C25.1849 4.07812 24.1717 4.52304 23.4196 5.31074C23.4564 5.64137 23.4819 5.97703 23.4819 6.32497C23.4819 7.82186 22.9605 9.33306 22.386 10.5473C22.9105 12.2952 24.0237 13.7839 24.0237 13.7839C24.091 13.9829 24.1268 14.1921 24.1268 14.4043V14.8502C24.1268 14.9022 24.1094 14.9502 24.1043 15.0022L24.8553 15.3084C26.1716 15.9104 27.0756 17.0736 27.3266 18.4419L27.3389 18.5133L27.541 21.1235H32.4949C32.8428 21.1235 33.1744 20.9796 33.4091 20.7235C33.6458 20.4694 33.7642 20.1276 33.7377 19.7806L33.6857 19.1143Z"
            fill={lightModeColor}
          />
          <path
            d="M24.3289 16.597L20.6617 15.0981C20.0494 14.8164 19.6587 14.2042 19.6587 13.5328V12.992C19.6587 12.7369 19.6995 12.4828 19.7842 12.241C19.7842 12.241 22.0903 9.16358 22.0903 6.32488C22.0903 2.77803 19.822 0.497559 17.0231 0.497559C14.2252 0.497559 11.9559 2.7781 11.9559 6.32488C11.9559 9.16358 14.264 12.241 14.264 12.241C14.3466 12.4828 14.3895 12.7369 14.3895 12.992V13.5328C14.3895 14.2042 13.9956 14.8164 13.3844 15.0981L9.71719 16.597C8.86517 16.9878 8.25804 17.7714 8.09073 18.6938L7.90194 21.1233H17.0231H26.1442L25.9575 18.6938C25.788 17.7715 25.1809 16.9878 24.3289 16.597Z"
            fill={lightModeColor}
          />
        </svg>
      ) : (
        <svg
          className="w-5 lg:w-6 xl:w-6 3xl:w-7"
          viewBox="0 0 34 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1161 15.1648C10.111 15.1128 10.0947 15.0648 10.0947 15.0128V14.5669C10.0947 14.3547 10.1293 14.1455 10.1988 13.9465C10.1988 13.9465 11.31 12.4588 11.8355 10.7109C11.2599 9.49664 10.7375 7.98551 10.7375 6.48757C10.7375 6.13963 10.7631 5.80293 10.7988 5.47125C10.0488 4.68558 9.03557 4.24066 7.9162 4.24066C5.60503 4.24066 3.72963 6.12631 3.72963 9.05682C3.72963 11.4016 5.63774 13.9464 5.63774 13.9464C5.70507 14.1454 5.73981 14.3546 5.73981 14.5668V15.0127C5.73981 15.5689 5.41532 16.075 4.90921 16.3066L1.8797 17.5443C1.1756 17.8688 0.674584 18.5157 0.534834 19.2769L0.482786 19.9432C0.456273 20.2901 0.574604 20.6319 0.81133 20.886C1.04701 21.1422 1.37869 21.286 1.72663 21.286H6.67849L6.88152 18.6769L6.89478 18.6065C7.14274 17.2382 8.0468 16.075 9.30998 15.4934L10.1161 15.1648Z"
            fill="url(#paint0_linear_16_644)"
          />
          <path
            d="M33.8591 19.2769C33.7204 18.5157 33.2194 17.8687 32.5153 17.5443L29.4838 16.3066C28.9777 16.075 28.6552 15.5689 28.6552 15.0127V14.5668C28.6552 14.3546 28.6889 14.1454 28.7583 13.9464C28.7583 13.9464 30.6653 11.4016 30.6653 9.05682C30.6653 6.12631 28.7909 4.24066 26.4757 4.24066C25.3584 4.24066 24.3451 4.68558 23.5931 5.47327C23.6299 5.80391 23.6553 6.13957 23.6553 6.48751C23.6553 7.9844 23.134 9.4956 22.5595 10.7098C23.0839 12.4577 24.1972 13.9464 24.1972 13.9464C24.2645 14.1454 24.3002 14.3546 24.3002 14.5668V15.0127C24.3002 15.0648 24.2828 15.1127 24.2778 15.1648L25.0287 15.4709C26.345 16.0729 27.2491 17.2361 27.5001 18.6044L27.5124 18.6759L27.7144 21.286H32.6683C33.0163 21.286 33.3479 21.1422 33.5826 20.886C33.8193 20.6319 33.9377 20.2901 33.9111 19.9432L33.8591 19.2769Z"
            fill="url(#paint1_linear_16_644)"
          />
          <path
            d="M24.5023 16.7596L20.8351 15.2607C20.2229 14.979 19.8321 14.3668 19.8321 13.6954V13.1546C19.8321 12.8995 19.8729 12.6454 19.9576 12.4036C19.9576 12.4036 22.2637 9.32618 22.2637 6.48748C22.2637 2.94063 19.9954 0.660156 17.1965 0.660156C14.3986 0.660156 12.1293 2.9407 12.1293 6.48748C12.1293 9.32618 14.4374 12.4036 14.4374 12.4036C14.5201 12.6454 14.5629 12.8995 14.5629 13.1546V13.6954C14.5629 14.3668 14.1691 14.979 13.5579 15.2607L9.89065 16.7596C9.03863 17.1504 8.4315 17.934 8.26419 18.8564L8.0754 21.2859H17.1965H26.3176L26.1309 18.8564C25.9615 17.9341 25.3543 17.1504 24.5023 16.7596Z"
            fill="url(#paint2_linear_16_644)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_644"
              x1="6.1573"
              y1="4.24066"
              x2="6.1573"
              y2="21.286"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.67" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_16_644"
              x1="28.2371"
              y1="4.24066"
              x2="28.2371"
              y2="21.286"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.67" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_16_644"
              x1="17.1965"
              y1="0.660156"
              x2="17.1965"
              y2="21.2859"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.67" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </>
  );
};

export default TeamIcon;
TeamIcon.propTypes = {
  theme: PropTypes.string.isRequired,
  openComponent: PropTypes.string.isRequired,
  openTeam: PropTypes.string.isRequired,
};
