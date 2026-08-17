import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { Plane, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.data.user, res.data.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
              Plan your perfect<br/>journey today.
            </h1>
            <p className="text-white/90 text-lg max-w-md font-medium drop-shadow-md">
              Join thousands of travelers who use Traveloop to organize their multi-city itineraries effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100 relative">
          <div className="lg:hidden flex items-center gap-2 text-primary-600 font-bold text-2xl mb-12">
            <Plane className="h-8 w-8" />
            <span>Traveloop</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-11 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="pl-11 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2 active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
