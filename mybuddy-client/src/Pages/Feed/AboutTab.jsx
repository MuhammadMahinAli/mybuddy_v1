const AboutTab = ({ theme, user, userPersonalInfo }) => {
  console.log("s",userPersonalInfo);
  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const firstName = capitalize(user?.name?.firstName || "");
  const lastName = capitalize(user?.name?.lastName || "");

  const defaultAboutMessage = `${firstName} ${lastName} has not added anything about him/her.`;

  const userAbout =
    (
      user?.about?.trim() ||
      userPersonalInfo?.about?.trim() ||
      defaultAboutMessage
    ).trim() === ""
      ? defaultAboutMessage
      : user?.about || userPersonalInfo?.about || defaultAboutMessage;

  //console.log('ab',userAbout);
  return (
    <div className="px-1 md:px-3 lg:px-4 3xl:px-5 py-7">
      <h1
        className={`${
          theme === "light" ? "graish" : "text-white"
        } text-[18px] md:text-[20px] xl:text-[27px] font-semibold capitalize`}
      >
        {user?.name?.firstName} {user?.name?.lastName}
   
      </h1>
      <p
        className={` ${
          theme === "light" ? "text-gray-500" : "text-white"
        }  text-[16px] xl:text-[19px] pt-0 capitalize`}
      >
        {user?.role}
        {/* Lorem ipsum dolor sit amet */}
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
        {userAbout}
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        aliquid eligendi consequatur facilis vero sed veniam esse ullam dolores
        libero nulla accusantium molestiae quasi fuga, corporis non tempore
        expedita dolor? consequatur facilis vero sed veniam esse ullam dolores
        libero nulla accusantium molestiae quasi fuga, corporis non tempore
        expedita dolor? */}
      </p>
    </div>
  );
};

export default AboutTab;
