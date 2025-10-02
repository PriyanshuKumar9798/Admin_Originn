import React from "react";

const Content = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-700 mb-4">Content Management</h2>
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="font-bold">Blog Post 1</h3>
        <p className="text-gray-500">Published on 23 Sep 2025</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h3 className="font-bold">Blog Post 2</h3>
        <p className="text-gray-500">Draft</p>
      </div>
    </div>
  </div>
);

export default Content;
