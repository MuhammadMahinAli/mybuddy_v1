import { FaPlus } from "react-icons/fa";
import b from "../assets/icon/gradient-plus.png";
import PropTypes from "prop-types";

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
            <img className="w-5" src={b} loading="lazy" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlusIcon;
PlusIcon.propTypes = {
  theme: PropTypes.string.isRequired,
};
