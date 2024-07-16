import PropTypes from "prop-types";

const TechnicalIcon = ({ theme }) => {
  return (
    <>
      {theme === "light" ? (
        <svg
          className="h-4 xl:h-6"
          viewBox="0 0 30 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.8001 14.3918C18.8001 12.6313 17.6916 11.1316 16.0941 10.5774V13.7072C16.0941 14.3918 15.6051 15.0112 14.8879 15.109C14.0728 15.2069 13.3556 14.5548 13.3556 13.7724V10.5774C11.6603 11.1642 10.5192 12.8595 10.6822 14.783C10.8126 16.3479 11.8885 17.6846 13.3556 18.2062V22.3141H16.0941V18.2062C17.6916 17.652 18.8001 16.1523 18.8001 14.3918Z"
            fill="#838DAA"
          />
          <path
            d="M29.2327 17.5215V11.4576H26.5593C26.2659 10.3491 25.8421 9.27327 25.2552 8.32781L27.1461 6.43691L22.8427 2.10086L20.9518 3.99177C19.9737 3.40493 18.9305 2.98111 17.822 2.68769V0.0143433H11.7255V2.68769C10.617 2.98111 9.54115 3.40493 8.5957 3.99177L6.67219 2.10086L2.36874 6.4043L4.25965 8.29521C3.67282 9.27327 3.24899 10.3165 2.95558 11.425H0.282227V17.5215H2.95558C3.24899 18.63 3.67282 19.7059 4.25965 20.6513L2.36874 22.5748L6.67219 26.8783L8.5631 24.9874C9.54115 25.5742 10.5844 25.998 11.6929 26.2914V28.9648H17.7894V26.2914C18.8979 25.998 19.9737 25.5742 20.9192 24.9874L22.8101 26.8783L27.1461 22.5748L25.2552 20.6839C25.8421 19.7059 26.2659 18.6626 26.5593 17.5541H29.2327V17.5215ZM14.7574 21.2055C11.0408 21.2055 8.04147 18.2062 8.04147 14.4896C8.04147 10.773 11.0408 7.77358 14.7574 7.77358C18.4741 7.77358 21.4734 10.773 21.4734 14.4896C21.4734 18.2062 18.4741 21.2055 14.7574 21.2055Z"
            fill="#838DAA"
          />
        </svg>
      ) : (
        <svg
          className="w-5 lg:w-5 xl:w-6 3xl:w-6"
          viewBox="0 0 26 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4281 12.3351C16.4281 10.8474 15.4914 9.5801 14.1415 9.11176V11.7566C14.1415 12.3351 13.7282 12.8585 13.1221 12.9412C12.4334 13.0238 11.8273 12.4728 11.8273 11.8117V9.11176C10.3947 9.60765 9.43042 11.0403 9.56816 12.6657C9.67836 13.9881 10.5875 15.1176 11.8273 15.5584V19.0297H14.1415V15.5584C15.4914 15.0901 16.4281 13.8228 16.4281 12.3351Z"
            fill="#57DEFE"
          />
          <path
            d="M25.2441 14.9799V9.85558H22.985C22.737 8.91888 22.3789 8.00973 21.883 7.21078L23.4809 5.61289L19.8443 1.94874L18.2464 3.54664C17.4199 3.05074 16.5383 2.69259 15.6016 2.44464V0.185547H10.4498V2.44464C9.51306 2.69259 8.60391 3.05074 7.80496 3.54664L6.17951 1.94874L2.54292 5.58534L4.14082 7.18323C3.64492 8.00973 3.28677 8.89133 3.03882 9.82803H0.779724V14.9799H3.03882C3.28677 15.9166 3.64492 16.8257 4.14082 17.6247L2.54292 19.2501L6.17951 22.8867L7.77741 21.2888C8.60391 21.7847 9.48551 22.1429 10.4222 22.3908V24.6499H15.574V22.3908C16.5107 22.1429 17.4199 21.7847 18.2188 21.2888L19.8167 22.8867L23.4809 19.2501L21.883 17.6522C22.3789 16.8257 22.737 15.9441 22.985 15.0074H25.2441V14.9799ZM13.0119 18.093C9.87121 18.093 7.33661 15.5584 7.33661 12.4177C7.33661 9.27703 9.87121 6.74243 13.0119 6.74243C16.1526 6.74243 18.6872 9.27703 18.6872 12.4177C18.6872 15.5584 16.1526 18.093 13.0119 18.093Z"
            fill="url(#paint0_linear_16_641)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_641"
              x1="13.0119"
              y1="0.185547"
              x2="13.0119"
              y2="24.6499"
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

export default TechnicalIcon;
TechnicalIcon.propTypes = {
  theme: PropTypes.string.isRequired,
};
