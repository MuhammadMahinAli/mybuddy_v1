import { useSelector } from "react-redux";


const Academic = () => {
    const theme = useSelector((state) => state.theme.theme);
    return (
        <div
        className={`${
          theme !== "light" &&
          "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
        }`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-white"
              : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
          } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] grid h-screen place-content-center`}
        >
  
        <h1 className={`${theme === 'light' ? "text-gray-600":"text-white"} uppercase tracking-widest  xl:text-3xl`}>COMING SOON</h1>
      </div>
      </div>
    );
};

export default Academic;