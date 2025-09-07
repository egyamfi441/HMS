import React from 'react';
import AdmissionsLineChart from '../../components/charts/LineChart';
import RevenueBarChart from '../../components/charts/BarChart';
import OccupancyPieChart from '../../components/charts/PieChart';

const ReportsPage = () => {
  const admissionsData = [
    { name: 'Jan', admissions: 30 },
    { name: 'Feb', admissions: 45 },
    { name: 'Mar', admissions: 60 },
    { name: 'Apr', admissions: 50 },
    { name: 'May', admissions: 70 },
    { name: 'Jun', admissions: 80 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
  ];

  const occupancyData = [
    { name: 'Occupied', value: 80 },
    { name: 'Available', value: 20 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Admissions Over Time</h3>
          <AdmissionsLineChart data={admissionsData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue Per Month</h3>
          <RevenueBarChart data={revenueData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Bed Occupancy</h3>
          <OccupancyPieChart data={occupancyData} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
