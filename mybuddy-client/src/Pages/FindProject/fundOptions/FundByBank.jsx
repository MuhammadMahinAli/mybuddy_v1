import { useEffect, useState } from "react";
import { useAddBankTransferFundInfoMutation} from "../../../features/banktransferfund/bankTransferFundApi";
import Swal from "sweetalert2";

const FundByBank = ({ selectedProject, userId,setSelectedProject,setIsPayModalOpen }) => {
  const [addBankTransferFundInfo] = useAddBankTransferFundInfoMutation();
  
  const [formData, setFormData] = useState({
    
    accountName: "",
    bankAccountNumber: "",
    bankName: "",
    branchName: "",
    requestedBy: userId,
    projectName: selectedProject?.projectName,
    requestedTo: selectedProject?.user?._id,
    fundingProject: selectedProject?._id,
    status:"Pending",
    transactionId: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form3", formData);

    const Fields = [ 
      { key: "accountName", label: "Account Name" },
      { key: "bankAccountNumber", label: "Bank Account Number" },
      { key: "bankName", label: "Bank Name" },
      { key: "branchName", label: "Branch Name" },
      { key: "transactionId", label: "Transaction ID" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },
    ];

    const emptyFields = [];
  
    // Check each  field if it's empty
    Fields.forEach(({ key, label }) => {
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
        text: `Please fill in the following fields: ${emptyFields.join(", ")}`
      });
      return; // Stop the function if there are empty fields
    }

    try {
      addBankTransferFundInfo(formData);
      Swal.fire({
        icon: "success",
        title: "Hurry !",
        text: "Your funding data is saved successfully !",
      });
      setFormData({
        accountName: "",
        bankAccountNumber: "",
        bankName: "",
        branchName: "",
        transactionId: "",
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
    }
  };
  const [adminInfo, setAdminInfo] = useState(null); // Store admin info here
  const adminId = "67396ba011eb8789052c3cfd"; // Admin ID

  // Fetch admin info on component mount
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          `https://test-two-22w0.onrender.com/api/v1/adminBankInfo/getAdminBankInfo/${adminId}`,
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
  console.log(adminInfo); 

  return (
    <div>
      <div>
      <p className=" text-gray-600">*** Please make the payment via Bank using the following bank details before entering the fund details. Verify your transaction ID and confirm the accuracy of the information provided.</p>
      <ul className="py-5 space-y-1">
        <li className="text-gray-600"><strong>Account Holder:</strong> {adminInfo?.accountName}</li>
        <li className="text-gray-600"><strong>Bank:</strong> {adminInfo?.bankName}</li>
        <li className="text-gray-600"><strong>Branch:</strong> {adminInfo?.branchName}</li>
        <li className="text-gray-600 "><strong>A/C:</strong> {adminInfo?.bankAccountNumber}</li>
      </ul>
      </div>
      <form
        onSubmit={handleSubmit}
        className="border p-4 cursor-green-600 rounded-lg space-y-4 text-gray-700"
      >
        <input
          type="text"
          name="accountName"
          placeholder="Account Holder Name"
          value={formData.accountName}
          onChange={handleChange}
          className="payment-input w-full"
          
        />

        <input
          type="text"
          name="bankAccountNumber"
          placeholder="Bank Account Number"
          value={formData.bankAccountNumber}
          onChange={handleChange}
          className="payment-input w-full"
          
        />

        <input
          type="text"
          name="bankName"
          placeholder="Bank Name "
          value={formData.bankName}
          onChange={handleChange}
          className="payment-input w-full"
          
        />
        <input
          type="text"
          name="branchName"
          placeholder="Branch Name"
          value={formData.branchName}
          onChange={handleChange}
          className="payment-input w-full"
          
        />

        <input
          type="text"
          name="transactionId"
          placeholder="Transaction Reference or ID"
          value={formData.transactionId}
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

export default FundByBank;
