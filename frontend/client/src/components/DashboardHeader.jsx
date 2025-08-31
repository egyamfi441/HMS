import React from 'react';

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* User profile, etc. can go here */}
    </header>
  );
};

export default DashboardHeader;
