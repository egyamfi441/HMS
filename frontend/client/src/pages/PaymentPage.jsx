import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe once, outside the component
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const handleClick = async () => {
    try {
      // Get Stripe.js instance
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe failed to initialize. Check your publishable key.");
        return;
      }

      // Call your backend to create the Checkout Session
      const response = await fetch('http://localhost:5000/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 150, currency: 'usd' }) // Example amount
      });

      const session = await response.json();

      if (!session.id) {
        console.error("No session ID returned from backend:", session);
        return;
      }

      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <p className="mb-4">
          Click the button below to proceed to our secure payment gateway.
        </p>
        <button
          role="link"
          onClick={handleClick}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
