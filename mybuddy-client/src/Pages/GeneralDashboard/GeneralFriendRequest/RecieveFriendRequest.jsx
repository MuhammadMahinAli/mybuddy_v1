const RecieveFriendRequest = ({
  getFriendRequest,
  requests,
  handleUpdateStatusAccept,
  handleUpdateStatusReject,
}) => {
  return (
    <div>
      <>
        {getFriendRequest?.data?.length === 0 && (
          <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not recieved any request yet.`}</p>
        )}
        {requests?.map((request, i) => (
          <div
            key={request._id}
            className=" p-3 md:p-7 mb-3 ssm:mb-5 xl:mb-6 w-full rounded-[20px] bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-x-0 md:space-x-4">
                <img
                  src={
                    request?.requestedBy?.profilePic ||
                    "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                  }
                  className="w-8 h-8 md:w-10 md:h-10 3xl:h-14 3xl:w-14 rounded-full"
                  loading="lazy"
                  alt=""
                />
                <div>
                  <p className="text-sm md:text-xl font-semibold text-gray-600 capitalize">
                    {request?.requestedBy?.name?.firstName}{" "}
                    {request?.requestedBy?.name?.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-0 md:space-x-4">
                <button
                  onClick={(e) => handleUpdateStatusAccept(e, i)}
                  className="mr-3 text-sm md:text-xl px-2 py-1 md:px-6 md:py-3 font-semibold rounded-[10px] bg-[#95bff6] text-white shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]"
                >
                  Confirm
                </button>
                <button
                  onClick={(e) => handleUpdateStatusReject(e, i)}
                  className="text-sm md:text-xl px-2 py-1 md:px-6 md:py-3 font-semibold bg-[#e7edf2] rounded-[10px] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default RecieveFriendRequest;
