import { useContext, useEffect, useState } from "react";
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
  const [adminInfo, setAdminInfo] = useState(null); // Store admin info here
  const adminId = "6736a6e54466ff850d99807e"; // Admin ID

  // Fetch admin info on component mount
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/payoneer/getLink/${adminId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching admin info: ${response.statusText}`
          );
        }

        const data = await response.json();
        setAdminInfo(data.data); // Assuming `data.data` contains the admin info
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchAdminInfo();
  }, []); 
  return (
    <div>
      <p className="pb-5 text-gray-600">*** Please make the payment via Payoneer using this link <strong>{adminInfo?.payoneerLink}</strong> before entering the fund details. Verify your transaction ID and confirm the accuracy of the information provided..</p>
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
