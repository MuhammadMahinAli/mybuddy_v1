import { useContext, useState } from "react";
import { useAddPayoneerFundInfoMutation } from "../../../features/payoneerfund/payoneerFundApi";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";

const FundByPayoneer = ({
  selectedProject,
  setSelectedProject,
  setIsPayModalOpen,
}) => {
  const { getUsersPayoneerLink, userId,user } = useContext(AuthContext);
 // console.log("getUsersPayoneerLink", getUsersPayoneerLink);
  const [addPayoneerFundInfo] = useAddPayoneerFundInfoMutation();
  
  console.log(selectedProject?.projectName);
  
  const [formData, setFormData] = useState({
    projectName: selectedProject?.projectName,
    fundingProject: selectedProject?._id,
    requestedTo: selectedProject?.user?._id,
    requestedBy: userId,
    status:"Pending",
    transactionId: "",
    payoneerEmail: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      { key: "transactionId", label: "Transaction ID" },
      { key: "payoneerEmail", label: "Payoneer Email" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },
    ];

    //01990028504 Initial emptyFields array to track empty required fields
    const emptyFields = [];

    // Check each required field if it's empty
    requiredFields.forEach(({ key, label }) => {
      const keys = key.split(".");
      let value = formData;
      keys.forEach((k) => {
        value = value[k];
      });
      if (!value) {
        emptyFields.push(label);
      }
    });

    // Show SweetAlert if there are any empty fields
    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete data",
        text: `Please fill in the following fields: ${emptyFields.join(", ")}`,
      });
      return; // Stop the function if there are empty fields
    }

    try {
      await addPayoneerFundInfo(formData);
      Swal.fire({
        title: "Success!",
        text: "Your Payoneer fund information has been submitted successfully.",
        icon: "success",
        button: "OK",
      });

      setFormData({
        transactionId: "",
        paypalEmail: "",
        amount: "",
        date: "",
      });
      setSelectedProject(null);
      setIsPayModalOpen(false);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2500);
    } catch (error) {
      console.log(error);
      // if (error) {
      //   Swal.fire({
      //     title: "Submission Failed",
      //     text: "There was an error submitting your Payoneer fund information. Please try again.",
      //     icon: "error",
      //     button: "Retry",
      //   });
      //}
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-lg space-y-4 text-gray-700"
      >
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
          className="payment-input w-full"
        />
        <input
          type="email"
          name="payoneerEmail"
          placeholder="Payoneer email"
          value={formData.payoneerEmail}
          onChange={handleChange}
          className="payment-input w-full"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="payment-input w-full text-gray-700"
        />
        <input
          type="date"
          name="date"
          placeholder="Transaction Date"
          value={formData.date}
          onChange={handleChange}
          className="payment-input w-full text-gray-700"
        />
        <button type="submit" className="fancy w-44">
          <span className="top-key"></span>
          <span className="text">Send</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      </form>
    </div>
  );
};

export default FundByPayoneer;
