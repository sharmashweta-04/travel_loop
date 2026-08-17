import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { MapPin, Calendar, FileText, Image as ImageIcon, Sparkles, Navigation } from 'lucide-react';

const PlanTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverPhoto: '',
    startDate: '',
    endDate: '',
    isPublic: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/trips', formData);
      navigate(`/trips/${res.data.data.id}/build`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary-100 text-primary-600 rounded-full mb-4 shadow-inner border border-white">
          <Navigation className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Craft Your Next Journey</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg font-medium">Define the core parameters of your trip, and we'll help you build the perfect itinerary step by step.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Form Container */}
        <div className="flex-1 glass-card p-8 md:p-10 rounded-[2rem]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Trip Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-primary-400" /></div>
                <input type="text" name="name" required placeholder="E.g. Summer in Tokyo" className="pl-12 w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition text-lg font-medium shadow-sm" value={formData.name} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                  <input type="date" name="startDate" required className="pl-12 w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition font-medium text-gray-700 shadow-sm" value={formData.startDate} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                  <input type="date" name="endDate" required className="pl-12 w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition font-medium text-gray-700 shadow-sm" value={formData.endDate} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Photo URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><ImageIcon className="h-5 w-5 text-gray-400" /></div>
                <input type="url" name="coverPhoto" placeholder="https://images.unsplash.com/..." className="pl-12 w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition font-medium shadow-sm" value={formData.coverPhoto} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none"><FileText className="h-5 w-5 text-gray-400" /></div>
                <textarea name="description" rows="3" placeholder="What is the goal of this trip?" className="pl-12 w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition font-medium resize-none shadow-sm" value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/50 border border-gray-200 p-4 rounded-2xl shadow-sm">
              <input type="checkbox" name="isPublic" id="isPublic" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" checked={formData.isPublic} onChange={handleChange} />
              <label htmlFor="isPublic" className="text-sm font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2">
                Make this trip public to the community
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 flex justify-center items-center gap-2 mt-4">
              {loading ? <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                <><Sparkles className="h-5 w-5" /> Initialize Trip Workspace</>
              )}
            </button>
          </form>
        </div>

        {/* Suggestion Panel */}
        <div className="w-full lg:w-1/3">
          <div className="glass-panel p-8 rounded-[2rem] sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-fuchsia-500" /> Need Inspiration?
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Tokyo, Japan', desc: 'Neon lights and cherry blossoms.', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80' },
                { name: 'Swiss Alps', desc: 'Snow-capped peaks and cozy chalets.', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80' },
                { name: 'Amalfi Coast', desc: 'Cliffside views and pasta.', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80' }
              ].map((loc, i) => (
                <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-white/60 transition cursor-pointer group border border-transparent hover:border-gray-200">
                  <img src={loc.img} alt={loc.name} className="h-16 w-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="font-bold text-gray-900">{loc.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{loc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                By creating a trip, you get access to our drag-and-drop itinerary builder, dynamic budget tracking, and automated PDF invoice generation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlanTrip;
