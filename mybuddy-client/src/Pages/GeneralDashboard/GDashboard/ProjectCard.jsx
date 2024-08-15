const ProjectCard = ({ p, i }) => {
  return (
    <div
      className={`pb-3 m-2 space-y-1 flex flex-col justify-start rounded-xl md:rounded-[25px] bg-skyblue  shadow-xl overflow-hidden`}
    >
      <div className="flex justify-center items-center h-[90px] ssm:h-[190px] md:h-[140px] xl:h-[180px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
        <img
          src={p.images[0]}
          className="rounded-2xl h-[90px] ssm:h-[190px] md:h-[140px] xl:h-[180px] w-full object-cover"
        />
      </div>

      <div className="px-2 xs-2 ssm:pt-1 lg:pt-0 3xl:pt-6 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
        <p className="text-lg 3xl:text-[22px] graish font-bold py-0 xs:py-3">
          {" "}
          {p.projectName.slice(0, 4)}..
        </p>

        <p className="hidden lg:hidden text-xl 3xl:text-[22px] graish font-bold py-2 xs:py-3">
          {p?.projectName.length > 10
            ? `${p.projectName.slice(0, 7)}...`
            : p.projectName}
        </p>
        <p className="hidden lg:block 2xl:hidden text-xl 3xl:text-[22px] graish font-bold py-0 xs:py-3 xl:py-0">
          {p?.projectName.slice(0, 7)}...
        </p>

        <p className="hidden 2xl:block text-xl 3xl:text-[22px] graish font-bold py-0">
          {p.projectName}
        </p>

        <div
          className="lg:hidden text-[13px]"
          dangerouslySetInnerHTML={{
            __html: p?.description.slice(0, 39),
          }}
        />
        <div
          className="hidden lg:hidden"
          dangerouslySetInnerHTML={{
            __html: p?.description.slice(0, 80),
          }}
        />
        <div
          className="hidden lg:block"
          dangerouslySetInnerHTML={{
            __html: p?.description.slice(0, 40),
          }}
        />
        <p className="pb-2 text-[14px] lg:text-[15px] xl:text-xl graish">
          {p.des}
        </p>
        <button
          className={`${i}

     w-full my-3 px-3 xs:px-6 py-1 md:px-8 lg:px-3 md:py-2 text-[11px] xs:text-[16px] md:text-xl lg:text-lg text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]`}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
