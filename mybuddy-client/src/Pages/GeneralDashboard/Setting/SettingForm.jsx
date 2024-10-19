import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/UserContext';

const SettingForm = () => {
  const {userId} = useContext(AuthContext); 
  const [paypalLink, setPaypalLink] = useState('');
  const [payoneerLink, setPayoneerLink] = useState('');

  const handlePaypalSubmit = async (e) => {
    e.preventDefault();
    console.log({
        memberId: userId,
        paypalLink,
      });
    try {
      const response = await fetch('http://localhost:3000/api/v1/paypalPayo/add-paypal-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member: userId,
          paypalLink,
        }),
      });

      if (response.ok) {
        alert('PayPal link saved successfully!');
      } else {
        alert('Failed to save PayPal link. Please try again.');
      }
    } catch (error) {
      console.error('Error saving PayPal link:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handlePayoneerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/paypalPayo/add-payoneer-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member: userId,
          payoneerLink,
        }),
      });

      if (response.ok) {
        alert('Payoneer link saved successfully!');
      } else {
        alert('Failed to save Payoneer link. Please try again.');
      }
    } catch (error) {
      console.error('Error saving Payoneer link:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 min-h-screen">
      {/* PayPal Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] mb-10">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal Logo"
            className="w-32"
          />
        </div>
        <form onSubmit={handlePaypalSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your paypal.me link"
              value={paypalLink}
              onChange={(e) => setPaypalLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </form>
      </div>

      {/* Payoneer Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <div className="flex justify-center mb-6">
          <img
            src="https://seeklogo.com/images/P/payoneer-new-2021-logo-A7168B16B5-seeklogo.com.png"
            alt="Payoneer Logo"
            className="w-32"
          />
        </div>
        <form onSubmit={handlePayoneerSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your Payoneer ID"
              value={payoneerLink}
              onChange={(e) => setPayoneerLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingForm;




// const SettingForm = () => {
//     return (

//         <div className="flex flex-col justify-center items-center mt-10  min-h-screen ">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
//           <div className="flex justify-center mb-6">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
//               alt="PayPal Logo"
//               className="w-32"
//             />
//           </div>
//           <form>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Enter your paypal.me link"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Save
//             </button>
      
//           </form>
//         </div>

//         <div className="flex items-start mt-10 justify-center min-h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
//         <div className="flex justify-center mb-6">
//           <img
//             src="https://seeklogo.com/images/P/payoneer-new-2021-logo-A7168B16B5-seeklogo.com.png"
//             alt="Payoneer Logo"
//             className="w-32"
//           />
//         </div>
//         <form>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Enter your Payoneer ID"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
//           >
//             Save
//           </button>
       
//         </form>
//       </div>
//     </div>
//       </div>
//     );
// };

// export default SettingForm;