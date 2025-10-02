import React from "react";

const Analytics = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-700 mb-4">Analytics</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-500">User Growth</h3>
        <p className="text-2xl font-bold">+25%</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-500">Revenue Growth</h3>
        <p className="text-2xl font-bold">+15%</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-500">Active Campaigns</h3>
        <p className="text-2xl font-bold">5</p>
      </div>
    </div>
  </div>
);

export default Analytics;
