import twitterBlackIcon from "../assets/icon/twitter-black-icon.png";
import twitterWhiteIcon from "../assets/icon/twitter-white-icon.png";
import PropTypes from "prop-types";


const TwitterIcon = ({ theme }) => {
  return (
    <>
      {theme !== "light" ? (
        <img className="w-6" src={twitterBlackIcon} loading="lazy" alt="" />
      ) : (
        <img className="" src={twitterWhiteIcon} loading="lazy" alt="" />
      )}
    </>
  );
};

export default TwitterIcon;
TwitterIcon.propTypes = {
    theme: PropTypes.string.isRequired,
  };
