

const HelpMore = () => {
    return (
        <section
        className={`pb-5 lg:pb-10`}
      >
        <div
          className={` py-7 px-10 md:py-14 md:px-20  space-y-3 xl:space-y-5`}
        >
          <h1 className="m-0 text-center text-gray-700  text-xl md:text-3xl xl:text-4xl capitalize font-bold ">
          need more help?
          </h1>

          <div className="lg:px-48 text-center text-gray-700 xl:leading-[50px]  text-sm md:text-xl xl:text-xl  relative capitalize ">
          explore other resources or reach out to us  for assistance.
          </div>
          </div>

            <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 lg:px-10 xl:px-20">

              
              
              <div className=" shadow-[3px_3px_12px_3px_rgba(0,_0,_0,_0.15)] rounded-lg bg-white border-lightgray border-[1px] border-solid box-border flex flex-col items-start justify-start">
                <div className="flex flex-col items-end justify-center p-3">
                  <div className="self-stretch flex flex-col items-start justify-start gap-4">
                    <div className="self-stretch flex flex-row items-center justify-start gap-2 md:gap-4 mq450:flex-wrap">
                      <img
                        className="h-[38px] w-[38px] relative"
                        loading="lazy"
                        alt=""
                        src="/more1.png"
                      />
                      <b className="flex-1 relative capitalize inline-block">
                        join our LinkedIn community
                      </b>
                    </div>
                    <div className="relative text-2xs leading-[20px] text-gray-600 capitalize text-slategray pb-2">
                      connect with thousand of researchers and professionals in
                      our linkedin community.
                    </div>
                  </div>
                  <button className="cursor-pointer [border:none] py-[7px] px-[15px] bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)] rounded-lg [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
                    <div className="relative text-mini capitalize font-semibold font-nunito text-dimgray-200 text-left">
                      join now
                    </div>
                  </button>
                </div>
              </div>
              <div className="shadow-[1px_1px_9px_1px_rgba(0,_0,_0,_0.15)] p-3 rounded-lg bg-white border-lightgray border-[1px] border-solid box-border flex flex-col items-start justify-start ">
                <div className="self-stretch flex flex-col items-end justify-center">
                  <div className="self-stretch flex flex-col items-start justify-start gap-4">
                    <div className="self-stretch flex flex-row items-center justify-start gap-2 md:gap-4 mq450:flex-wrap">
                      <div className="h-[38px] w-[38px] relative">
                        <img
                          className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                          alt=""
                          src="/more2.png"
                        />
                      
                      </div>
                      <b className="flex-1 relative capitalize inline-block min-w-[96px]">
                        read our blog
                      </b>
                    </div>
                    <div className="relative text-2xs leading-[20px] text-gray-600 capitalize text-slategray pb-2">
                      discover helpful articles, guides and insights to make the
                      most of research buddy.
                    </div>
                  </div>
                  <button className="cursor-pointer [border:none] py-[7px] px-1.5 bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)] rounded-lg [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
                    <div className="relative text-mini capitalize font-semibold font-nunito text-dimgray-200 text-left inline-block min-w-[90px]">
                      explore now
                    </div>
                  </button>
                </div>
              </div>
              <div className=" shadow-[1px_1px_9px_1px_rgba(0,_0,_0,_0.15)] p-3 rounded-lg bg-white border-lightgray border-[1px] border-solid box-border flex flex-col items-start justify-start ">
                <div className="self-stretch flex flex-col items-end justify-center">
                  <div className="self-stretch flex flex-col items-start justify-start gap-4">
                    <div className="self-stretch flex flex-row items-center justify-start gap-2 md:gap-4 ">
                      <div className="flex flex-row items-center justify-start  relative">
                      <img
                        className="h-[38px] w-[38px] relative"
                        loading="lazy"
                        alt=""
                        src="/more3.png"
                      />
                       
                      </div>
                      <b className="flex-1 relative capitalize inline-block min-w-[121px]">
                        submit a request
                      </b>
                    </div>
                    <div className="relative text-2xs leading-[20px] text-gray-600 capitalize text-slategray pb-2">
                      contact our support team for help. we will get back to you
                      as soon as possible.
                    </div>
                  </div>
                  <button className="cursor-pointer [border:none] py-[7px] px-1.5 bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)] rounded-lg [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
                    <div className="relative text-mini capitalize font-semibold font-nunito text-dimgray-200 text-left">
                      submit request
                    </div>
                  </button>
                </div>
              </div>


            </footer>

      
      </section>
    );
};

export default HelpMore;