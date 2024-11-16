import { useState } from "react";
import GeneralSentPaypalFundProposal from "./Paypal/GeneralSentPaypalFundProposal";
import GeneralPaypalRecieveFundProposal from "./Paypal/GeneralPaypalRecieveFundProposal";
import GeneralPayoneerSentFundProposal from "./Payoneer/GeneralPayoneerSentFundProposal";
import GeneralPayoneerRecieveFundProposal from "./Payoneer/GeneralPayoneerRecieveFundProposal";
import GeneralStripeStripeRecieveFundProposal from "./Stripe/GeneralStripeStripeRecieveFundProposal";
import GeneralStripeSentFundProposal from "./Stripe/GeneralStripeSentFundProposal";
import GeneralBankSentFundProposal from "./Bank/GeneralBankSentFundProposal";
import GeneraBanklRecieveFundProposal from "./Bank/GeneraBanklRecieveFundProposal";

const FundTypeFilter = ({
  setShowFilterOption,
  showFilterOption,
  isOpenPaypal,
  isOpenPayoneer,
  isOpenStripe,
  isOpenBank,
}) => {
  const [isOpenPaypalSentRequest, setIsOpenPaypalSentRequest] = useState(true);
  const [isOpenPaypalRecieveRequest, setIsOpenPaypalRecieveRequest] =
    useState(false);
  const [isOpenPayoneerSentRequest, setIsOpenPayoneerSentRequest] =
    useState(true);
  const [isOpenPayoneerRecieveRequest, setIsOpenPayoneerRecieveRequest] =
    useState(false);
  const [isOpenStripeSentRequest, setIsOpenStripeSentRequest] = useState(true);
  const [isOpenStripeRecieveRequest, setIsOpenStripeRecieveRequest] =
    useState(false);
  const [isOpenBankSentRequest, setIsOpenBankSentRequest] = useState(true);
  const [isOpenBankRecieveRequest, setIsOpenBankRecieveRequest] =
    useState(false);

  const toggleSentPaypal = () => {
    setIsOpenPaypalSentRequest(true);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };
  const toggleRecievePaypal = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(true);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };
  const toggleSentPayoneer = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(true);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };
  const toggleRecievePayoneer = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(true);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };
  const toggleSentStripe = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(true);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };
  const toggleRecieveStripe = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(true);
    setShowFilterOption(false);
  };
  const toggleSentBank = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(true);
    setIsOpenBankRecieveRequest(false);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };
  const toggleRecieveBank = () => {
    setIsOpenPaypalSentRequest(false);
    setIsOpenPaypalRecieveRequest(false);
    setIsOpenPayoneerSentRequest(false);
    setIsOpenPayoneerRecieveRequest(false);
    setIsOpenBankSentRequest(false);
    setIsOpenBankRecieveRequest(true);
    setIsOpenStripeSentRequest(false);
    setIsOpenStripeRecieveRequest(false);
    setShowFilterOption(false);
  };

  return (
    <div>
      <button onClick={() => setShowFilterOption(!showFilterOption)}>
        Typing
      </button>
      {setShowFilterOption === true && (
        <ul className="w-40 absolute top-20 left-1  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
          {isOpenPaypal && (
            <>
              <li
                onClick={toggleSentPaypal}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Sent Request
              </li>
              <li
                onClick={toggleRecievePaypal}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Recieve Request
              </li>
            </>
          )}
          {isOpenPayoneer && (
            <>
              <li
                onClick={toggleSentPayoneer}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Sent Request
              </li>
              <li
                onClick={toggleRecievePayoneer}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Recieve Request
              </li>
            </>
          )}
          {isOpenBank && (
            <>
              <li
                onClick={toggleSentBank}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Sent Request
              </li>
              <li
                onClick={toggleRecieveBank}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Recieve Request
              </li>
            </>
          )}
          {isOpenStripe && (
            <>
              <li
                onClick={toggleSentStripe}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Sent Request
              </li>
              <li
                onClick={toggleRecieveStripe}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Recieve Request
              </li>
            </>
          )}
        </ul>
      )}

      {isOpenPaypalSentRequest && <GeneralSentPaypalFundProposal />}
      {isOpenPaypalRecieveRequest && <GeneralPaypalRecieveFundProposal />}
      {isOpenPayoneerSentRequest && <GeneralPayoneerSentFundProposal />}
      {isOpenPayoneerRecieveRequest && <GeneralPayoneerRecieveFundProposal />}
      {isOpenStripeSentRequest && <GeneralStripeStripeRecieveFundProposal />}
      {isOpenStripeRecieveRequest && <GeneralStripeSentFundProposal />}
      {isOpenBankSentRequest && <GeneralBankSentFundProposal />}
      {isOpenBankRecieveRequest && <GeneraBanklRecieveFundProposal />}
    </div>
  );
};

export default FundTypeFilter;
