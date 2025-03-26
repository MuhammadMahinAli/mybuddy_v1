/* eslint-disable react/no-unknown-property */
// SuccessPage.js

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      confirmPayment(sessionId);
    }
  }, [location]);

  const confirmPayment = async (sessionId) => {
    try {
      const response = await fetch(
        `https://test-two-22w0.onrender.com/api/v1/fund/confirm-payment?session_id=${sessionId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Payment confirmation failed");
      }

      const data = await response.json();
      console.log("Payment confirmed:", data);
      // You can now update the UI to show success or handle any further actions
    } catch (error) {
      console.error("Error confirming payment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center pt-20 items-center">
      <div class="flex flex-col border-2 border-black overflow-hidden p-2 rounded-xl shadow-large bg-yellow-200 w-96">
        <div class="px-6 py-8 sm:p-10 sm:pb-6">
          <div class="items-center w-full justify-center grid grid-cols-1 text-left">
            <div>
              <h2 class="text-black font-bold text-lg lg:text-3xl text-center">
                Heartfelt Thanks for Your Generous Contribution !!!
              </h2>
              <p class="text-black tracking-tight text-center xl:text-2xl mt-5">
                We’re deeply grateful for your support. We look forward to
                achieving great things together.
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-1 justify-between pb-8 px-6 sm:px-8 space-y-6">
          <div class="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/find/project"
              class="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full lg:px-8 lg:py-4 lg:text-xl px-4 py-1"
            >
              EXPLORE MORE PROJECT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
