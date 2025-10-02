import React from "react";

const Dashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-2xl font-bold">150</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-500">Total Startups</h3>
        <p className="text-2xl font-bold">25</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-500">Revenue</h3>
        <p className="text-2xl font-bold">$12,000</p>
      </div>
    </div>

    <div className="p-4 bg-white rounded-xl shadow">
      <h3 className="text-gray-700 font-bold mb-2">Recent Activities</h3>
      <ul className="divide-y divide-gray-200">
        <li className="py-2">User John signed up</li>
        <li className="py-2">Startup "TechNova" applied</li>
        <li className="py-2">Payment received: $500</li>
      </ul>
    </div>
  </div>
);

export default Dashboard;
