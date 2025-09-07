import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BillingList = () => {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/billing');
      const data = await response.json();
      if (response.ok) {
        setInvoices(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/billing/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Refresh the list after deletion
          fetchInvoices();
        } else {
          console.error('Failed to delete invoice');
        }
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Billing</h2>
        <Link to="/dashboard/billing/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          New Invoice
        </Link>
      </div>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Invoice ID</th>
              <th className="px-4 py-2 text-left">Patient ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{invoice.id}</td>
                <td className="px-4 py-2">{invoice.patient_id}</td>
                <td className="px-4 py-2">${invoice.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{invoice.status}</td>
                <td className="px-4 py-2">{new Date(invoice.due_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(invoice.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingList;
