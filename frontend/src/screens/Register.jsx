import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { Plane, User as UserIcon, Mail, Lock, Phone, MapPin, Globe, Camera } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    password: '',
    photo: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data.data.user, res.data.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-pageBg font-sans">
      {/* Left Panel - Beautiful Travel Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80" 
          alt="Taj Mahal" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-primary-900/30 mix-blend-multiply"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full text-white">
          <Link to="/" className="flex items-center gap-2 font-black text-3xl">
            <Plane className="h-8 w-8" />
            <span>Traveloop</span>
          </Link>
          
          <div className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-white/30">
              <span className="animate-pulse">✨</span> AI Itinerary Planner
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-6 drop-shadow-xl">
              Start your journey<br/>with us.
            </h1>
            <p className="text-white/90 text-lg max-w-md font-medium drop-shadow-md">
              Create your free account and get access to the best itinerary builder on the web.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto hide-scrollbar">
        <div className="w-full max-w-md my-auto pb-10 bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100 relative mt-8 sm:mt-0">
          <div className="lg:hidden flex items-center gap-2 text-primary-600 font-bold text-2xl mb-8 mt-4">
            <Plane className="h-8 w-8" />
            <span>Traveloop</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8">Sign up in just a few seconds.</p>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            


            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-4 w-4 text-gray-400" /></div>
                  <input type="text" name="firstName" required className="pl-9 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none transition-all" value={formData.firstName} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-4 w-4 text-gray-400" /></div>
                  <input type="text" name="lastName" required className="pl-9 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none transition-all" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-gray-400" /></div>
                <input type="email" name="email" required className="pl-9 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none transition-all" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-400" /></div>
                <input type="password" name="password" required className="pl-9 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none transition-all" value={formData.password} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City (Opt)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-4 w-4 text-gray-400" /></div>
                  <input type="text" name="city" className="pl-9 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none transition-all" value={formData.city} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country (Opt)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Globe className="h-4 w-4 text-gray-400" /></div>
                  <input type="text" name="country" className="pl-9 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none transition-all" value={formData.country} onChange={handleChange} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-70 mt-6 active:scale-[0.98]">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Already have an account? <Link to="/" className="text-primary-600 font-semibold hover:text-primary-700 transition">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
