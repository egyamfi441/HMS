import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">HMS</div>
      <nav className="mt-10">
        <a href="/dashboard/patients" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Patients</a>
        <a href="/dashboard/appointments" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Appointments</a>
        <a href="/dashboard/billing" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Billing</a>
        <a href="/dashboard/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Reports</a>
      </nav>
    </div>
  );
};

export default Sidebar;
