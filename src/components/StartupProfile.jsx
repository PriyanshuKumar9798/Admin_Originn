import React, { useState } from 'react'
import { Check, X, Building2, Mail, Phone, MapPin, Globe, Calendar, Users, DollarSign } from 'lucide-react'

const StartupProfile = () => {
  const [startups, setStartups] = useState([
    {
      id: 1,
      name: "TechVenture AI",
      founder: "Sarah Johnson",
      email: "sarah@techventure.ai",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "www.techventure.ai",
      foundedDate: "2023",
      industry: "Artificial Intelligence",
      teamSize: "15-20",
      fundingStage: "Seed",
      description: "Building next-generation AI tools for enterprise automation and workflow optimization.",
      status: "pending"
    },
    {
      id: 2,
      name: "GreenEnergy Solutions",
      founder: "Michael Chen",
      email: "michael@greenenergy.io",
      phone: "+1 (555) 987-6543",
      location: "Austin, TX",
      website: "www.greenenergy.io",
      foundedDate: "2022",
      industry: "Clean Energy",
      teamSize: "25-30",
      fundingStage: "Series A",
      description: "Developing sustainable energy solutions for residential and commercial applications.",
      status: "pending"
    }
  ])

  const handleAccept = (id) => {
    setStartups(startups.map(startup => 
      startup.id === id ? { ...startup, status: 'accepted' } : startup
    ))
  }

  const handleReject = (id) => {
    setStartups(startups.map(startup => 
      startup.id === id ? { ...startup, status: 'rejected' } : startup
    ))
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Startup Profiles</h1>
          <p className="text-gray-600 text-sm sm:text-base">Review and manage startup applications</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6">
          {startups.map((startup) => (
            <div 
              key={startup.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header Gradient */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Building2 size={28} className="sm:w-8 sm:h-8" />
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold">{startup.name}</h2>
                      <p className="text-indigo-100 text-xs sm:text-sm">Founded by {startup.founder}</p>
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
                      <span>{startup.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Phone size={18} className="text-indigo-600" />
                      <span>{startup.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <MapPin size={18} className="text-indigo-600" />
                      <span>{startup.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base break-all">
                      <Globe size={18} className="text-indigo-600" />
                      <span>{startup.website}</span>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Calendar size={18} className="text-indigo-600" />
                      <span>Founded: {startup.foundedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Building2 size={18} className="text-indigo-600" />
                      <span>Industry: {startup.industry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Users size={18} className="text-indigo-600" />
                      <span>Team Size: {startup.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <DollarSign size={18} className="text-indigo-600" />
                      <span>Stage: {startup.fundingStage}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {startup.description}
                  </p>
                </div>

                {/* Buttons & Status */}
                {startup.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleAccept(startup.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <Check size={18} />
                      Accept Application
                    </button>
                    <button
                      onClick={() => handleReject(startup.id)}
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

