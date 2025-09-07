import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Receipt = ({ transaction }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/payments/receipt/${transaction.id}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt-${transaction.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  if (!transaction) {
    return null;
  }

  return (
    <div>
      <div ref={componentRef} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Receipt</h2>
        <p><strong>Transaction ID:</strong> {transaction.id}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Patient:</strong> {transaction.patient}</p>
        <p><strong>Service:</strong> {transaction.service}</p>
        <p className="text-lg font-bold mt-4">Amount Paid: ${transaction.amount}</p>
      </div>
      <div className="mt-4">
        <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Print Receipt
        </button>
        <button onClick={handleDownloadPdf} className="bg-green-500 text-white px-4 py-2 rounded">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Receipt;
