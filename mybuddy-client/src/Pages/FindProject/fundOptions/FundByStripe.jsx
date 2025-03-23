import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const stripePromise = loadStripe(
  "pk_test_51Q2kJiGGKSeS74MyQwATubkvrfrB2w6nSam4Th7JXf3KAVCJMiVLtax06wgH2oYPBGEMhXC8O0PYWgcckpjqZZL500sqvvLOFL"
);

const FundByStripe = ({ setSelectedProject, userId, selectedProject,isPayModalOpen }) => {
  // const requestedBy = userId;
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);


  console.log(" projectName: project?.projectName",  selectedProject.projectName);
  const handlePayment = async (project) => {
    setSelectedProject(project);
    setLoading(true);
    //console.log("selected project", project);

    if (amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "0 is not acceptable!",
      });
      return; // Stop further execution
    }

    const paymentData = {
      projectName: selectedProject?.projectName,
      requestedBy: userId,
      requestedTo: project?.user?._id,
      projectId: project?._id,
      status: "Pending",
      amount: amount,
    };

    // console.log("Payment data being sent:", paymentData);

    try {
      if (!project?.user?._id || !project?._id) {
        console.error("Invalid data: Amount is not available or less than 0");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/fund/new-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Funding Failed",
          text: "Something went wrong. Please try again later.",
        });
      }
    
      const { sessionId } = await response.json();

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error in payment:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };
  return (
    <div className="flex flex-col pt-4">
      <p className="text-lg lg:text-xl font-bold mb-6">Enter an amount</p>
      <input
        value={amount}
        type="number"
        onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
        className="payment-input w-[200px] lg:w-[400px] mb-6"
        placeholder="Enter Amount"
      />
      <button
        onClick={() => handlePayment(selectedProject)}
        disabled={loading}
        className="fancy w-44"
      >
        <span className="top-key"></span>
        <span className="text"> {loading ? "Processing..." : "Pay Now"}</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
    </div>
  );
};

export default FundByStripe;
