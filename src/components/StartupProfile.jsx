import React, { useState, useEffect } from 'react'
import { Check, X, Building2, Mail, Phone, MapPin, Calendar, Users } from 'lucide-react'

const API_BASE = process.env.API_BASE // adjust if different

const StartupProfile = () => {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch pending startups
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await fetch(`${API_BASE}/startups/pending`)
        const data = await res.json()
        console.log('res', data);
        
        setStartups(data)
      } catch (error) {
        console.error("Error fetching startups:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStartups()
  }, [])

  // Accept startup
  const handleAccept = async (id) => {
    try {
      await fetch(`${API_BASE}/startups/${id}/accept`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      })
      setStartups(startups.map(startup => 
        startup._id === id ? { ...startup, status: 'accepted' } : startup
      ))
    } catch (error) {
      console.error("Error accepting startup:", error)
    }
  }

  // Reject startup
  const handleReject = async (id) => {
    try {
      await fetch(`${API_BASE}/startups/${id}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      })
      setStartups(startups.map(startup => 
        startup._id === id ? { ...startup, status: 'rejected' } : startup
      ))
    } catch (error) {
      console.error("Error rejecting startup:", error)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      accepted: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    }
    const labels = {
      pending: 'Pending Review',
      accepted: 'Accepted',
      rejected: 'Rejected'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading startup profiles...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Startup Profiles</h1>
          <p className="text-gray-600 text-sm sm:text-base">Review and manage startup applications</p>
        </div>

        <div className="grid gap-6">
          {startups.map((startup) => (
            <div key={startup._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Building2 size={28} className="sm:w-8 sm:h-8" />
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold">{startup.companyName}</h2>
                      <p className="text-indigo-100 text-xs sm:text-sm">
                        Founded by {startup.founderTitle} {startup.founderName}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(startup.status)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {/* Left column */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base break-all">
                      <Mail size={18} className="text-indigo-600" />
                      <span>{startup.founderMail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Phone size={18} className="text-indigo-600" />
                      <span>{startup.founderPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <MapPin size={18} className="text-indigo-600" />
                      <span>{startup.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Building2 size={18} className="text-indigo-600" />
                      <span>Institute: {startup.instituteName}</span>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Calendar size={18} className="text-indigo-600" />
                      <span>Applied on: {new Date(startup.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Users size={18} className="text-indigo-600" />
                      <span>Team Members: {startup.teamMembers}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Building2 size={18} className="text-indigo-600" />
                      <span>Stage: {startup.stage}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {startup.about}
                  </p>
                </div>

                {/* Buttons */}
                {startup.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleAccept(startup._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <Check size={18} />
                      Accept Application
                    </button>
                    <button
                      onClick={() => handleReject(startup._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <X size={18} />
                      Reject Application
                    </button>
                  </div>
                )}

                {startup.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      ✓ This application has been accepted
                    </p>
                  </div>
                )}

                {startup.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-red-800 font-semibold text-sm sm:text-base">
                      ✗ This application has been rejected
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StartupProfile
