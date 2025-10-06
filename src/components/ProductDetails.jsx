import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Check, X, Clock } from "lucide-react";

const API_BASE = "https://firstfound-platform-backend.vercel.app";

const ProductDetails = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await fetch(`${API_BASE}/startup/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load startup");
        setStartup(data.data || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartup();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await fetch(`${API_BASE}/startup/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      setStartup((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error(err);
      alert(err.message || "Status update failed");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-50 text-green-700 border-green-200";
      case "rejected": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <Check className="w-4 h-4" />;
      case "rejected": return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    );

  if (!startup)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Startup not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-blue-600 font-medium hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Startups
        </button>

        {/* Startup Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{startup.companyName}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(startup.status)}`}>
              {getStatusIcon(startup.status)}
              {startup.status.charAt(0).toUpperCase() + startup.status.slice(1)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-6">{startup.productDescription}</p>

          {/* Founder & Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Founder:</strong> {startup.founderName}</p>
              <p className="text-gray-700"><strong>Email:</strong> {startup.founderEmail}</p>
              <p className="text-gray-700"><strong>Stage:</strong> {startup.stage}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Address:</strong> {startup.address}</p>
              <p className="text-gray-700">
                <strong>Website:</strong>{" "}
                <a href={startup.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                  {startup.companyWebsite}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Pitch Deck:</strong>{" "}
                <a href={startup.pitchDeckUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                  View Deck
                </a>
              </p>
            </div>
          </div>

          {/* Approve / Reject Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => handleStatusChange("approved")}
              disabled={startup.status === "approved" || updating}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition ${
                startup.status === "approved"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              Approve
            </button>

            <button
              onClick={() => handleStatusChange("rejected")}
              disabled={startup.status === "rejected" || updating}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition ${
                startup.status === "rejected"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
