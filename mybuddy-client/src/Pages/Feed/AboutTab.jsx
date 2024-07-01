const AboutTab = ({ theme }) => {
  return (
    <div className="px-1 md:px-3 lg:px-4 3xl:px-5 py-7">
      <h1
        className={`${
          theme === "light" ? "graish" : "text-white"
        } text-[16px] xl:text-[27px] font-semibold`}
      >
        Adam Smith
      </h1>
      <p
        className={` ${
          theme === "light" ? "text-gray-500" : "text-white"
        }  text-[16px] xl:text-[20px] pt-1`}
      >
        Lorem ipsum dolor sit amet
      </p>
      <h1
        className={` ${
          theme === "light" ? "graish" : "text-white"
        } text-[16px] xl:text-[23px] font-semibold pt-5`}
      >
        Description
      </h1>
      <p
        className={`${
          theme === "light" ? "text-gray-500" : "text-white"
        } text-[16px] xl:text-[20px] pt-2`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        aliquid eligendi consequatur facilis vero sed veniam esse ullam dolores
        libero nulla accusantium molestiae quasi fuga, corporis non tempore
        expedita dolor? consequatur facilis vero sed veniam esse ullam dolores
        libero nulla accusantium molestiae quasi fuga, corporis non tempore
        expedita dolor?
      </p>
    </div>
  );
};

export default AboutTab;
