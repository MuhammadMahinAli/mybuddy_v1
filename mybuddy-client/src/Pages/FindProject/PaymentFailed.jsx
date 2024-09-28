import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex justify-center items-center pt-10 md:pt-14 lg:pt-20">
      <div className="flex flex-col border-2 border-black overflow-hidden p-2 rounded-xl shadow-large bg-rose-400 w-96">
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          <div className="items-center w-full justify-center grid grid-cols-1 text-left">
            <div>
              <h2 className="text-black font-bold text-lg lg:text-3xl text-center">
              Funding Unsuccessful !!!
              </h2>
              <p className="text-black tracking-tight xl:text-2xl mt-5 text-center">
              Unfortunately, your payment couldn’t be completed. Please check
                your payment details and try again. If the issue continues, feel
                free to reach out to our team for assistance.
              </p>
            </div>
            
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-between pb-8 px-6 sm:px-8 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full lg:px-8 lg:py-4 lg:text-xl px-4 py-2">
              <Link to="/find/project">GO BACK</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
