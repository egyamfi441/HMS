import React from 'react';

const DashboardHeader = () => {
  return (
    <header
      className="flex justify-between items-center p-4 text-white"
      style={{ backgroundImage: `url(/assest/dashboard-bg4.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex items-center">
        <img src="/assest/hms-logo2.jpg" alt="Logo" className="w-12 h-12 mr-4" />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      {/* User profile, etc. can go here */}
    </header>
  );
};

export default DashboardHeader;
