
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Loader2, Building2, Globe, Linkedin, Instagram, Twitter, Users, TrendingUp, Clock } from 'lucide-react';

const API_URL = 'https://firstfound-platform-backend.vercel.app/featureProducts/all';

export default function AllStartupsPage() {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const result = await res.json();

      if (result.data) {
        setStartups(result.data);
        setFilteredStartups(result.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch startups. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      let filtered = [...startups];

      if (searchTerm) {
        filtered = filtered.filter(s =>
          s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(s => s.category === selectedCategory);
      }

      if (selectedProductType !== 'all') {
        filtered = filtered.filter(s => s.productType === selectedProductType);
      }

      if (selectedStatus !== 'all') {
        filtered = filtered.filter(s => s.status === selectedStatus);
      }

      setFilteredStartups(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory, selectedProductType, selectedStatus, startups]);

  const categories = [...new Set(startups.map(s => s.category).filter(Boolean))];
  const productTypes = [...new Set(startups.map(s => s.productType).filter(Boolean))];

  const statusCounts = {
    all: startups.length,
    pending: startups.filter(s => s.status === 'pending').length,
    approved: startups.filter(s => s.status === 'approved').length,
    rejected: startups.filter(s => s.status === 'rejected').length,
  };

  if (loading) return <Loading />;
  if (error) return <ErrorComponent message={error} onRetry={fetchStartups} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Startup Dashboard</h1>
              <p className="text-gray-600">Manage and review all startup applications</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">{filteredStartups.length}</p>
                <p className="text-sm text-gray-500">Total Startups</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatusCard
            label="All Startups"
            count={statusCounts.all}
            icon={<Building2 className="w-6 h-6" />}
            color="bg-gradient-to-br from-slate-500 to-slate-600"
            active={selectedStatus === 'all'}
            onClick={() => setSelectedStatus('all')}
          />
          <StatusCard
            label="Pending"
            count={statusCounts.pending}
            icon={<Clock className="w-6 h-6" />}
            color="bg-gradient-to-br from-amber-500 to-orange-600"
            active={selectedStatus === 'pending'}
            onClick={() => setSelectedStatus('pending')}
          />
          <StatusCard
            label="Approved"
            count={statusCounts.approved}
            icon={<TrendingUp className="w-6 h-6" />}
            color="bg-gradient-to-br from-emerald-500 to-green-600"
            active={selectedStatus === 'approved'}
            onClick={() => setSelectedStatus('approved')}
          />
          <StatusCard
            label="Rejected"
            count={statusCounts.rejected}
            icon={<Building2 className="w-6 h-6" />}
            color="bg-gradient-to-br from-rose-500 to-red-600"
            active={selectedStatus === 'rejected'}
            onClick={() => setSelectedStatus('rejected')}
          />
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white cursor-pointer transition"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white cursor-pointer transition"
              >
                <option value="all">All Product Types</option>
                {productTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {searchTerm || selectedCategory !== 'all' || selectedProductType !== 'all' || selectedStatus !== 'all' ? (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredStartups.length}</span> results
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedProductType('all');
                setSelectedStatus('all');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : null}

        {/* Startups Grid */}
        {filteredStartups.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No startups found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map(startup => (
              <StartupCard key={startup._id} startup={startup} onClick={() => navigate(`/startup-profile/${startup._id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCard({ label, count, icon, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${color} ${
        active ? 'ring-4 ring-white shadow-2xl scale-105' : 'shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
          <p className="text-4xl font-bold">{count}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
    </button>
  );
}
function StartupCard({ startup, onClick }) {
    const [imageError, setImageError] = useState(false);
  
    const getStatusStyles = (status) => {
      switch (status) {
        case 'approved':
          return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'rejected':
          return 'bg-rose-100 text-rose-700 border-rose-200';
        default:
          return 'bg-amber-100 text-amber-700 border-amber-200';
      }
    };
  
    return (
      <div
        onClick={onClick}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1"
      >
        {/* Cover Image */}
        <div className="h-48 bg-gray-200 relative overflow-hidden rounded-t-2xl">
          {startup.coverPhoto && !imageError ? (
            <img
              src={startup.coverPhoto}
              alt={startup.companyName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <Building2 className="w-16 h-16 text-gray-300" />
            </div>
          )}
          {/* Status Badge */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(
              startup.status
            )}`}
          >
            {startup.status.charAt(0).toUpperCase() + startup.status.slice(1)}
          </span>
        </div>
  
        {/* Logo & Details */}
        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
              {startup.logo ? (
                <img src={startup.logo} alt={startup.companyName} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-8 h-8 text-gray-400 m-auto" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{startup.companyName}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{startup.description}</p>
            </div>
          </div>
  
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {startup.category && (
              <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                {startup.category}
              </span>
            )}
            {startup.productType && (
              <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {startup.productType}
              </span>
            )}
          </div>
  
          {/* Metrics & Socials */}
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <div className="flex items-center gap-3">
              {startup.teamSize && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {startup.teamSize}
                </div>
              )}
              {startup.funding && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {startup.funding}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {startup.website && (
                <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {startup.linkedin && (
                <a href={startup.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {startup.instagram && (
                <a href={startup.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {startup.twitter && (
                <a href={startup.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  function ErrorComponent({ message, onRetry }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        )}
      </div>
    );
  }
  
