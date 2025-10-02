import React from "react";

const Campaigns = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Campaign Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold">Campaign A</h3>
          <p className="text-gray-500">Active</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold">Campaign B</h3>
          <p className="text-gray-500">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
