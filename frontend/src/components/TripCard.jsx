import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Activity, Image as ImageIcon } from 'lucide-react';

const TripCard = ({ trip, onDelete }) => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden group flex flex-col relative h-full">
      {/* Cover Image */}
      <div className="h-56 relative overflow-hidden">
        <img 
          src={trip.coverPhoto || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'} 
          alt={trip.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${
            trip.status === 'upcoming' ? 'bg-primary-500/80 text-white border-primary-400' :
            trip.status === 'ongoing' ? 'bg-amber-500/80 text-white border-amber-400' :
            'bg-white/80 text-gray-800 border-white'
          }`}>
            {trip.status}
          </span>
          {trip.isPublic && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-fuchsia-500/80 backdrop-blur-md text-white shadow-sm border border-fuchsia-400">
              Public
            </span>
          )}
        </div>
        
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h3 className="font-bold text-2xl mb-1 leading-tight tracking-tight drop-shadow-md">{trip.name}</h3>
          <p className="text-sm text-gray-200 font-medium flex items-center gap-1.5 drop-shadow-sm">
            <Calendar className="h-3.5 w-3.5" /> 
            {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-white/50">
        <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-grow">{trip.description || 'No description provided.'}</p>
        
        <div className="flex items-center justify-between text-gray-500 text-sm font-medium mb-6 bg-white/80 rounded-2xl p-3 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 bg-primary-50 rounded-lg text-primary-600"><MapPin className="h-4 w-4" /></div>
            {trip.stops?.length || 0} stops
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 bg-fuchsia-50 rounded-lg text-fuchsia-600"><Activity className="h-4 w-4" /></div>
            Planned
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/trips/${trip.id}/view`} className="flex-1 bg-gray-900 hover:bg-black text-white text-center py-3 rounded-xl font-bold transition shadow-md hover:shadow-lg hover:-translate-y-0.5">
            View Details
          </Link>
          {onDelete && (
            <button 
              onClick={() => onDelete(trip.id)} 
              className="px-4 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl font-medium transition border border-red-100 hover:border-red-500 shadow-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
