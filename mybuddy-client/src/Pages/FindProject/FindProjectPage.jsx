import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import FindProject from "./FindProject";
import Loading from "../Loading/Loading";

const stripePromise = loadStripe(
  "pk_test_51MA3ZzJzZa0chHCf36CZQuvoduuBQh9ex5rPHdTjLrsGI0vvusZ2PEBxB6w4mdlWhXgBkiySzafDjDC2lUukbkTF00aiPiDVZN"
);

const FindProjectPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [amounts, setAmounts] = useState(40);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const calculateSelectedTaskBudget = () => {
    const total = selectedTasks.reduce(
      (total, task) => total + Number(task.budget),
      0
    );
    setAmounts(total);
    return total;
  };

  console.log("c", clientSecret, "am", amounts);
  const fetchClientSecret = async () => {
    try {
      const response = await fetch(
        "http://3.80.196.219/api/v1/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amounts * 100,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch client secret");
      }

      const data = await response.json();
      console.log(data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error.message);
    }
  };

  useEffect(() => {
    calculateSelectedTaskBudget();
  }, [selectedTasks]);

  useEffect(() => {
    fetchClientSecret();
  }, []);
  console.log("c", clientSecret, "am", amounts);

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <FindProject
            selectedTasks={selectedTasks}
            setAmounts={setAmounts}
            amounts={amounts}
            setSelectedTasks={setSelectedTasks}
          />
        </Elements>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FindProjectPage;
