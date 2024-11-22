import { useContext, useEffect, useState } from "react";
import { useAddPaypalFundInfoMutation } from "../../../features/paypalfund/paypalFundApi";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";

const FundByPaypal = ({
  selectedProject,
  setSelectedProject,
  setIsPayModalOpen,
}) => {
  const { getUsersPaypalLink, userId } = useContext(AuthContext);
  console.log(" getUsersPaypalLink", getUsersPaypalLink);
  const [addPaypalFundInfo] = useAddPaypalFundInfoMutation();
  const [formData, setFormData] = useState({
    projectName: selectedProject?.projectName,
    fundingProject: selectedProject?._id,
    requestedTo: selectedProject?.user?._id,
    requestedBy: userId,
    status: "Pending",
    transactionId: "",
    paypalEmail: "",
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
      { key: "paypalEmail", label: "Paypal Email" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },
    ];

    // Initial emptyFields array to track empty required fields
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
      await addPaypalFundInfo(formData);
      Swal.fire({
        title: "Success!",
        text: "Your Paypal fund information has been submitted successfully.",
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
      //  Swal.fire({
      //   title: "Submission Failed",
      //   text: "There was an error submitting your Paypal fund information. Please try again.",
      //   icon: "error",
      //   button: "Retry",
      // });
    }
  };

  // 


  const [adminInfo, setAdminInfo] = useState(null); // Store admin info here
  const adminId = "6736a6e54466ff850d99807e"; // Admin ID

  // Fetch admin info on component mount
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/paypal/getLink/${adminId}`,
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
      <p className="pb-5 text-gray-600">*** Please make the payment via PayPal using this link <strong>{adminInfo?.paypalLink}</strong> before entering the fund details. Verify your transaction ID and confirm the accuracy of the information provided.</p>
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
          name="paypalEmail"
          placeholder="Paypal email"
          value={formData.paypalEmail}
          onChange={handleChange}
          className="payment-input w-full text-gray-800"
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

export default FundByPaypal;
