
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({clientSecret}) => {
  const stripe = useStripe();
  const elements = useElements();
const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

  


    const {error} = await stripe.confirmPayment({
      //`Elemenent Element
      elements,
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
     },
      confirmParams: {
        return_url: 'https://img.freepik.com/free-photo/cup-man-achievement-success-honor_1150-1719.jpg',
      },
    });
      if (error) {
        console.log(error);
    //     // Handle error here
       } else  {
    //     // Handle successful payment here
         navigate('/success')
       }
  };

  return (
    <form onSubmit={handleSubmit}>
    <PaymentElement />
    <button disabled={!stripe}>Submit</button>

      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
 export default CheckoutForm;