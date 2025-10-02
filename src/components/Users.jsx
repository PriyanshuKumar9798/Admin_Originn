import React from "react";

const Users = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-700 mb-4">User Management</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">john@example.com</td>
            <td className="px-4 py-2">Admin</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">Jane Smith</td>
            <td className="px-4 py-2">jane@example.com</td>
            <td className="px-4 py-2">User</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Users;
