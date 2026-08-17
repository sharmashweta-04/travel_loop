import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import TripCard from '../components/TripCard';
import { Compass, MapPin, Sparkles, TrendingUp, Calendar, ArrowRight, Plane, Navigation, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data.data.slice(0, 3)); // Only show top 3 on dashboard
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const destinations = [
    { name: 'Manali, Himachal', label: 'Trending', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
    { name: 'Jaipur, Rajasthan', label: 'Culture', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Goa Beaches', label: 'Relax', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Munnar, Kerala', label: 'Nature', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Mesh Gradient Hero Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl shadow-primary-900/10 border border-white/50 mesh-bg min-h-[500px] flex flex-col md:flex-row items-center">
        {/* Decorative Blur Orbs */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-fuchsia-300/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-violet-300/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none animate-pulse delay-1000"></div>
        
        <div className="relative z-10 px-10 md:px-16 py-20 w-full md:w-3/5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-primary-700 font-bold text-sm mb-6 border border-white">
            <Sparkles className="h-4 w-4" /> <span>Welcome back to Traveloop</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6 leading-[1.1]">
            Where are we <br className="hidden lg:block"/>
            <span className="text-gradient">going next, {user?.firstName}?</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-xl font-medium leading-relaxed">
            Your personalized AI-driven travel command center. Let's build itineraries that feel like magic, track budgets effortlessly, and explore the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/plan" className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3">
              <Compass className="h-5 w-5" /> Start Planning
            </Link>
            <Link to="/community" className="glass-panel text-gray-900 hover:bg-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3">
              Explore Community <ArrowRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Hero Right Visuals - Aesthetic Polaroid Scatter */}
        <div className="relative z-10 hidden md:flex w-full md:w-1/2 justify-center items-center p-4 lg:p-10 h-full">
          <div className="relative w-full max-w-md h-[450px]">
            
            {/* Polaroid 1 (Left, back) */}
            <div className="absolute top-4 left-0 w-48 bg-white p-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] transform -rotate-12 hover:rotate-[-6deg] hover:z-30 hover:scale-105 transition-all duration-500 border border-gray-100 z-10 group cursor-pointer">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80" alt="Kerala" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="px-2 pb-2">
                <p className="font-black text-gray-800 text-sm">Munnar, Kerala</p>
                <p className="text-[11px] text-gray-500 font-bold mt-0.5 uppercase tracking-wide">Tea Gardens</p>
              </div>
            </div>

            {/* Polaroid 2 (Right, back) */}
            <div className="absolute top-16 -right-4 w-52 bg-white p-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] transform rotate-12 hover:rotate-[6deg] hover:z-30 hover:scale-105 transition-all duration-500 border border-gray-100 z-10 group cursor-pointer">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80" alt="Goa" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="px-2 pb-2">
                <p className="font-black text-gray-800 text-sm">Vagator, Goa</p>
                <p className="text-[11px] text-gray-500 font-bold mt-0.5 uppercase tracking-wide">Sunset Beach</p>
              </div>
            </div>

            {/* Polaroid 3 (Center, front) */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-72 bg-white p-4 rounded-[1.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 border border-gray-100 z-20 group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80" alt="Jaipur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 flex items-center gap-1.5 shadow-lg border border-white">
                  <Sparkles className="h-3 w-3" /> AI Top Pick
                </div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-end">
                <div>
                  <p className="font-black text-gray-900 text-xl tracking-tight">Jaipur, Rajasthan</p>
                  <p className="text-xs text-gray-500 font-bold mt-1 flex items-center gap-1.5 uppercase tracking-wide"><MapPin className="h-3 w-3 text-primary-500" /> Hawa Mahal</p>
                </div>
                <div className="h-10 w-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shadow-inner group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  <Navigation className="h-4 w-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Inspiration Cards */}
      <div className="mb-20">
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary-500" /> Discover Magic
            </h2>
            <p className="text-gray-500 font-medium mt-1">Curated spots for your next big adventure.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <div key={i} className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className="glass-panel px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg uppercase tracking-wider backdrop-blur-md bg-white/20">
                  {dest.label}
                </span>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{dest.name}</h3>
                <p className="text-gray-300 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <MapPin className="h-4 w-4" /> Tap to explore
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trips Section */}
      <div>
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <Calendar className="h-8 w-8 text-fuchsia-500" /> Your Active Journeys
            </h2>
          </div>
          <Link to="/trips" className="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-1 group">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-[2rem] p-16 text-center flex flex-col items-center justify-center max-w-3xl mx-auto">
            <div className="bg-primary-50 p-6 rounded-full mb-6 border-8 border-white shadow-sm">
              <Compass className="h-16 w-16 text-primary-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">No upcoming trips</h3>
            <p className="text-gray-500 mb-8 text-lg max-w-md">Your travel canvas is blank. Time to start painting your next masterpiece.</p>
            <Link to="/plan" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold transition shadow-xl hover:-translate-y-1">
              Create an Itinerary
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
