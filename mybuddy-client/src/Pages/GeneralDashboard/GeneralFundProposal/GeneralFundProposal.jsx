import { useState } from "react";
import GeneralSentPaypalFundProposal from "./Paypal/GeneralSentPaypalFundProposal";
import GeneralPaypalRecieveFundProposal from "./Paypal/GeneralPaypalRecieveFundProposal";
import GeneralPayoneerSentFundProposal from "./Payoneer/GeneralPayoneerSentFundProposal";
import GeneralPayoneerRecieveFundProposal from "./Payoneer/GeneralPayoneerRecieveFundProposal";
import GeneralStripeSentFundProposal from "./Stripe/GeneralStripeSentFundProposal";
import GeneralStripeStripeRecieveFundProposal from "./Stripe/GeneralStripeStripeRecieveFundProposal";
import GeneralBankSentFundProposal from "./Bank/GeneralBankSentFundProposal";
import GeneraBanklRecieveFundProposal from "./Bank/GeneraBanklRecieveFundProposal";

const FundTypeSelector = () => {
  const [fundType, setFundType] = useState("paypal");
  const [action, setAction] = useState("sent"); // "sent" or "receive"
  //const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleFundTypeChange = (type) => {
    setFundType(type);
    setAction(""); // Reset action when fund type changes
    //  setDropdownVisible(true); 01677084904
  };

  const handleActionChange = (actionType) => {
    setAction(actionType);
    //setDropdownVisible(false);
  };

  const renderComponent = () => {
    if (fundType === "paypal" && action === "sent") {
      return <GeneralSentPaypalFundProposal />;
    }
    if (fundType === "paypal" && action === "receive") {
      return <GeneralPaypalRecieveFundProposal />;
    }
    if (fundType === "payoneer" && action === "sent") {
      return <GeneralPayoneerSentFundProposal />;
    }
    if (fundType === "payoneer" && action === "receive") {
      return <GeneralPayoneerRecieveFundProposal />;
    }
    if (fundType === "stripe" && action === "sent") {
      return <GeneralStripeSentFundProposal />;
    }
    if (fundType === "stripe" && action === "receive") {
      return <GeneralStripeStripeRecieveFundProposal />;
    }
    if (fundType === "bank" && action === "sent") {
      return <GeneralBankSentFundProposal />;
    }
    if (fundType === "bank" && action === "receive") {
      return <GeneraBanklRecieveFundProposal />;
    }
    return null; // Default case
  };

  return (
    <div>
      {/* Fund Type Dropdown */}
      <div className="md:space-x-3">
        <select
          className="h-8 bg-transparent outline-none shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] rounded-[10px] mb-4"
          onChange={(e) => handleFundTypeChange(e.target.value)}
          value={fundType}
        >
          <option value="">Select Fund Type</option>
          <option value="paypal">PayPal</option>
          <option value="payoneer">Payoneer</option>
          <option value="stripe">Stripe</option>
          <option value="bank">Bank Transfer</option>
        </select>

        {/* Request Type Dropdown */}

        <select
          className="h-8 bg-transparent outline-none shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] rounded-[10px]"
          onChange={(e) => handleActionChange(e.target.value)}
          value={action}
        >
          <option value="">Select Request Type</option>
          <option value="sent">Sent Request</option>
          <option value="receive">Receive Request</option>
        </select>
      </div>

      {/* Render Components */}
      <div>{renderComponent()}</div>
      {(fundType === "stripe" ||
        fundType === "bank" ||
        fundType === "payoneer" ||
        fundType === "paypal") &&
        action === "" && <p className="text-xl pt-5">Select a Request Type</p>}
    </div>
  );
};

export default FundTypeSelector;
