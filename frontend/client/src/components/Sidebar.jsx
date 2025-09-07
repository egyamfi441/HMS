import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">HMS</div>
      <nav className="mt-10">
        <Link to="/dashboard/patients" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Patients</Link>
        <Link to="/dashboard/appointments" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Appointments</Link>
        <Link to="/dashboard/billing" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Billing</Link>
        <Link to="/dashboard/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Reports</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
