const HoveredText = ({ text, theme }) => {
  return (
    <div className="flex items-center -space-x-1" style={{zIndex:9999}}>
      <svg
        className="w-3 z-50"
        viewBox="0 0 7 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.701233 4.37316L6.50624 0.151367V9.65038L0.701233 4.37316Z"
          fill={`${theme === 'light' ? "#2adba4":"#63666a"}`}
        />
      </svg>
      <p className={`${theme === 'light' ? "bg-[#2adba4]":"bg-[#63666a]"} tracking-wider text-white text-[16px] py-1 px-4 text-center rounded-md`}>
        {text}
      </p>
    </div>
  );
};

export default HoveredText;
