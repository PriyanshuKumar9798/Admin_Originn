import React, { useState } from "react";
import { Check, X, Clock, Mail, Calendar, ExternalLink } from "lucide-react";

const Startups = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "TechNova",
      email: "contact@technova.com",
      appliedDate: "25 Sep 2025",
      status: "pending",
      description: "AI-powered analytics platform for businesses",
      founder: "Sarah Johnson",
      profileUrl: "/startup-profile/1"
    },
    {
      id: 2,
      name: "InnoHub",
      email: "hello@innohub.com",
      appliedDate: "20 Sep 2025",
      status: "approved",
      description: "Co-working space management solution",
      founder: "Michael Chen",
      profileUrl: "/startup-profile/2"
    },
    {
      id: 3,
      name: "GreenTech Solutions",
      email: "info@greentech.io",
      appliedDate: "18 Sep 2025",
      status: "pending",
      description: "Sustainable energy monitoring system",
      founder: "Emma Williams",
      profileUrl: "/startup-profile/3"
    },
    {
      id: 4,
      name: "HealthSync",
      email: "team@healthsync.com",
      appliedDate: "15 Sep 2025",
      status: "rejected",
      description: "Healthcare appointment coordination app",
      founder: "David Martinez",
      profileUrl: "/startup-profile/4"
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <Check className="w-4 h-4" />;
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
    approved: applications.filter(app => app.status === "approved").length,
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

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <div className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Applications</div>
            <div className="text-xl sm:text-3xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 p-4 sm:p-6 rounded-xl shadow border border-yellow-200">
            <div className="text-yellow-700 text-xs sm:text-sm font-medium mb-1">Pending Review</div>
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
          {["all", "pending", "approved", "rejected"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition ${
                filter === type
                  ? (type === "pending" ? "bg-yellow-600 text-white" :
                     type === "approved" ? "bg-green-600 text-white" :
                     type === "rejected" ? "bg-red-600 text-white" :
                     "bg-blue-600 text-white")
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredApplications.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{app.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                  {app.description}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Applied: {app.appliedDate}</span>
                  </div>
                  <div className="flex items-center gap-1 break-all">
                    <Mail className="w-4 h-4" />
                    <span>{app.email}</span>
                  </div>
                  <div>
                    <span className="font-medium">Founder:</span> {app.founder}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 mt-4">
                <button
                  onClick={() => handleStatusChange(app.id, "approved")}
                  disabled={app.status === "approved"}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition ${
                    app.status === "approved"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(app.id, "rejected")}
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
                {/* ✅ Open Page Button */}
                <a
                  href={app.profileUrl}
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
