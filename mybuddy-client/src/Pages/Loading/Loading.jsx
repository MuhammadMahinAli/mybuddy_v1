const Loading = () => {
  return (

    <div className="flex justify-center items-center mt-60">
      <div className="flex items-center justify-center space-x-2 lg:space-x-3">
        <div className="w-4 h-4 lg:h-7 lg:w-7 rounded-full animate-pulse bg-[#2adba4]"></div>
        <div className="w-4 h-4 lg:h-7 lg:w-7 rounded-full animate-pulse bg-[#2adba4]"></div>
        <div className="w-4 h-4 lg:h-7 lg:w-7 rounded-full animate-pulse bg-[#2adba4]"></div>
      </div>
    </div>
  );
};

export default Loading;
