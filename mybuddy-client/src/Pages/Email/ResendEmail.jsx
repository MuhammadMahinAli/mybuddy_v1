import { useState } from 'react';
import axios from 'axios';

const ResendEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    try {
      const response = await axios.post('https://test-two-22w0.onrender.com/api/v1/member/resend-verification-email', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleResendEmail}>Send</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResendEmail;
