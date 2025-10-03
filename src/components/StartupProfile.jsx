import React, { useState, useEffect } from "react";
import { Check, X, Building2, Mail, Phone, MapPin, Calendar, Users, Globe } from "lucide-react";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/admin"
    : "https://backend-new-originn.vercel.app/api/admin";

const StartupProfile = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${API_BASE}/company/pending`);
        const data = await res.json();
        console.log("Fetched companies:", data);
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleAccept = async (id) => {
    try {
      await fetch(`${API_BASE}/company/${id}/accept`, { method: "PATCH" });
      setCompanies(
        companies.map((c) =>
          c._id === id ? { ...c, status: "approved" } : c
        )
      );
    } catch (error) {
      console.error("Error approving company:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`${API_BASE}/company/${id}/reject`, { method: "PATCH" });
      setCompanies(
        companies.map((c) =>
          c._id === id ? { ...c, status: "rejected" } : c
        )
      );
    } catch (error) {
      console.error("Error rejecting company:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    const labels = {
      pending: "Pending Review",
      approved: "Approved",
      rejected: "Rejected",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading startup profiles...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
            Startup Profiles
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Review and manage startup applications
          </p>
        </div>

        <div className="grid gap-6">
          {companies.map((company) => {
            const startup = company.startupId || {};
            const founder = company.founderDetails?.[0] || {};
            const teamCount = company.teamDetails?.length || 0;

            return (
              <div key={company._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Building2 size={28} className="sm:w-8 sm:h-8" />
                      <div>
                        <h2 className="text-lg sm:text-2xl font-bold">{startup.companyName || "N/A"}</h2>
                        <p className="text-indigo-100 text-xs sm:text-sm">
                          Founder: {startup.founderTitle} {startup.founderName}
                        </p>
                        <p className="text-indigo-100 text-xs sm:text-sm">
                          Stage: {startup.stage}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(company.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Basic Info */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      {startup.founderMail && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                          <Mail size={18} className="text-indigo-600" /> {startup.founderMail}
                        </div>
                      )}
                      {startup.founderPhone && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                          <Phone size={18} className="text-indigo-600" /> {startup.founderPhone}
                        </div>
                      )}
                      {startup.instituteName && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                          <Building2 size={18} className="text-indigo-600" /> {startup.instituteName}
                        </div>
                      )}
                      {startup.address && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                          <MapPin size={18} className="text-indigo-600" /> {startup.address}
                        </div>
                      )}
                      {startup.companyWebsite && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                          <Globe size={18} className="text-indigo-600" />
                          <a href={startup.companyWebsite} target="_blank" className="underline text-indigo-600">{startup.companyWebsite}</a>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                        <Calendar size={18} className="text-indigo-600" /> Applied on: {new Date(company.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                        <Users size={18} className="text-indigo-600" /> Team Members: {teamCount}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                        <Building2 size={18} className="text-indigo-600" /> Category: {company.category || "N/A"}
                      </div>
                      {company.businessRegistrationNo && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                          <Building2 size={18} className="text-indigo-600" /> Business Reg #: {company.businessRegistrationNo}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* About */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{company.description || startup.about || "No description provided."}</p>
                  </div>

                  {/* Founder Details */}
                  {company.founderDetails?.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Founder Details</h3>
                      {company.founderDetails.map((f, idx) => (
                        <div key={idx} className="text-gray-700 text-sm sm:text-base mb-2">
                          {f.name} - {f.designation} ({f.institution})
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Team Details */}
                  {company.teamDetails?.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Team</h3>
                      {company.teamDetails.map((t, idx) => (
                        <div key={idx} className="text-gray-700 text-sm sm:text-base mb-1">
                          {t.name} - {t.designation} ({t.institution})
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  {company.status === "pending" && (
                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                      <button
                        onClick={() => handleAccept(company._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                      >
                        <Check size={18} /> Accept Application
                      </button>
                      <button
                        onClick={() => handleReject(company._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                      >
                        <X size={18} /> Reject Application
                      </button>
                    </div>
                  )}

                  {company.status === "approved" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
                      <p className="text-green-800 font-semibold text-sm sm:text-base">✓ This application has been approved</p>
                    </div>
                  )}

                  {company.status === "rejected" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-center">
                      <p className="text-red-800 font-semibold text-sm sm:text-base">✗ This application has been rejected</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
