import React from 'react';
import { Link } from 'react-router-dom';
import Receipt from '../components/Receipt';

const PaymentSuccess = () => {
  // In a real application, you would fetch the transaction details
  // based on a session ID from the URL.
  const mockTransaction = {
    id: 'cs_test_a1B2c3D4e5F6g7H8i9J0k1L2',
    date: new Date().toLocaleDateString(),
    patient: 'Alice Smith',
    service: 'Hospital Services',
    amount: '150.00',
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="p-6 text-center bg-green-100 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-2 text-green-800">Payment Successful!</h2>
          <p className="text-green-700">Thank you for your payment. Your receipt details are shown below.</p>
        </div>
        <Receipt transaction={mockTransaction} />
        <div className="text-center mt-6">
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
