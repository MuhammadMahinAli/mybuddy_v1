import GeneralRequestSent from "./GeneralRequestSent";

//const stripePromise = loadStripe("pk_test_51MA3ZzJzZa0chHCf36CZQuvoduuBQh9ex5rPHdTjLrsGI0vvusZ2PEBxB6w4mdlWhXgBkiySzafDjDC2lUukbkTF00aiPiDVZN");

const GeneralRequest = () => {
  //   const [clientSecret, setClientSecret] = useState('');

  //   const fetchClientSecret = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/v1/payment/create-payment-intent', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           amount: 1500*100
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch client secret');
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       setClientSecret(data.clientSecret);
  //     } catch (error) {
  //       console.error('Error fetching client secret:', error.message);
  //     }
  //   };

  //   // Fetch client secret on component mount
  //   useEffect(() => {
  //     fetchClientSecret();
  //   }, []);
  // console.log("c",clientSecret);
  // const options = {
  //   clientSecret: clientSecret
  // };

  return (
    <>
      <GeneralRequestSent />
    </>
  );
};

export default GeneralRequest;

//<>
//{clientSecret ? (
//<Elements stripe={stripePromise} options={options} >
//  <GeneralRequestSent   />
//</Elements>
//) : (
//<p>Loading...</p>
//)}
//</>
