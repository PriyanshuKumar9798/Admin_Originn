import React, { useEffect, useState } from "react";
import { Check, X, Clock, Mail, Calendar, ExternalLink } from "lucide-react";
const API_BASE = process.env.API_BASE // adjust if different


const Startups = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await fetch(`${API_BASE}/startups/pending`)
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching startups:", err);
      }
    };
    fetchStartups();
  }, []);

  // Approve / Reject
  const handleStatusChange = async (id, action) => {
    try {
      await fetch(`${API_BASE}/startups/${id}/${action}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      setApplications(applications.map(app => {
        if (app._id === id) {
          const newStatus = action === "accept" ? "accepted" : "rejected";
          return { ...app, status: newStatus };
        }
        return app;
      }));
    } catch (err) {
      console.error(`Error updating status for ${id}:`, err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted": return <Check className="w-4 h-4" />;
      case "rejected": return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app =>
    filter === "all" ? true : app.status === filter
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    approved: applications.filter(app => app.status === "accepted").length,
    rejected: applications.filter(app => app.status === "rejected").length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Startup Register Admin Panel
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Review and manage startup applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <div className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Applications</div>
            <div className="text-xl sm:text-3xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 p-4 sm:p-6 rounded-xl shadow border border-yellow-200">
            <div className="text-yellow-700 text-xs sm:text-sm font-medium mb-1">Pending-Review</div>
            <div className="text-xl sm:text-3xl font-bold text-yellow-700">{stats.pending}</div>
          </div>
          <div className="bg-green-50 p-4 sm:p-6 rounded-xl shadow border border-green-200">
            <div className="text-green-700 text-xs sm:text-sm font-medium mb-1">Approved</div>
            <div className="text-xl sm:text-3xl font-bold text-green-700">{stats.approved}</div>
          </div>
          <div className="bg-red-50 p-4 sm:p-6 rounded-xl shadow border border-red-200">
            <div className="text-red-700 text-xs sm:text-sm font-medium mb-1">Rejected</div>
            <div className="text-xl sm:text-3xl font-bold text-red-700">{stats.rejected}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
          {["all", "pending", "accepted", "rejected"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition ${
                filter === type
                  ? (type === "pending" ? "bg-yellow-600 text-white" :
                     type === "accepted" ? "bg-green-600 text-white" :
                     type === "rejected" ? "bg-red-600 text-white" :
                     "bg-blue-600 text-white")
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredApplications.map(app => (
            <div key={app._id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{app.companyName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                  {app.about}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 break-all">
                    <Mail className="w-4 h-4" />
                    <span>{app.founderMail}</span>
                  </div>
                  <div>
                    <span className="font-medium">Founder:</span> {app.founderName}
                  </div>
                  <div>
                    <span className="font-medium">Institute:</span> {app.instituteName}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 mt-4">
                <button
                  onClick={() => handleStatusChange(app._id, "accept")}
                  disabled={app.status === "accepted"}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition ${
                    app.status === "accepted"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(app._id, "reject")}
                  disabled={app.status === "rejected"}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition ${
                    app.status === "rejected"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
                <a
                  href={`/startup-profile/${app._id}`}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Page
                </a>
              </div>
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 text-lg">No applications found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Startups;
