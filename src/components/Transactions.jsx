import React from "react";

const Transactions = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-700 mb-4">Transactions</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">$500</td>
            <td className="px-4 py-2">25 Sep 2025</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">Jane Smith</td>
            <td className="px-4 py-2">$300</td>
            <td className="px-4 py-2">24 Sep 2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Transactions;
