import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft, MapPin, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-pageBg px-6 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Animated Compass Icon Card */}
        <div className="w-24 h-24 mx-auto mb-6 bg-primary-50 border border-primary-200 rounded-3xl flex items-center justify-center shadow-card text-primary-600">
          <Compass className="w-12 h-12 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100/60 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <MapPin className="w-3.5 h-3.5" /> 404 Error
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-4">
          Lost in Transit?
        </h1>

        <p className="text-textSecondary text-base md:text-lg mb-8 leading-relaxed">
          The destination or route you're looking for doesn't exist or might have moved to a different coordinate.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white font-semibold rounded-full transition-transform hover:scale-[1.02] shadow-sm text-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-textPrimary border border-gray-200 font-semibold rounded-full transition-colors text-sm shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Page
          </button>
        </div>

        {/* Helpful links */}
        <div className="pt-8 border-t border-gray-200/60">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-3">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              to="/plan"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              Plan a New Trip
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/community"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              Explore Community
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/search"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium inline-flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" /> Search Places
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
