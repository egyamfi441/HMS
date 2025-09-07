import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Canceled</h2>
      <p className="mb-4">Your payment was canceled. You can try again later.</p>
      <Link to="/dashboard/payment" className="text-blue-500">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;
