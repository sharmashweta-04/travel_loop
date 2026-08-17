import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-[12px] border-b border-black/5 ${
        scrolled ? 'shadow-nav' : ''
      }`}>
        <div className="w-full px-6 md:px-12 h-[72px] flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <MapPin className="h-6 w-6 text-primary-600" />
            <span className="text-[18px] font-bold font-sans text-textPrimary tracking-tight">
              Traveloop
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[14px] font-medium text-textPrimary hover:text-primary-600 transition">Dashboard</Link>
            <Link to="/trips" className="text-[14px] font-medium text-textPrimary hover:text-primary-600 transition">My Trips</Link>
            <Link to="/search" className="text-[14px] font-medium text-textPrimary hover:text-primary-600 transition">Search</Link>
            <Link to="/community" className="text-[14px] font-medium text-textPrimary hover:text-primary-600 transition">Community</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/plan" className="bg-[#1A1A1A] hover:bg-black text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition hover:scale-105">
              + Plan Trip
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Link to="/profile" className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold overflow-hidden border border-primary-200">
                  {user.photo ? <img src={user.photo} alt="Avatar" className="w-full h-full object-cover"/> : user.firstName.charAt(0)}
                </Link>
                <button onClick={logout} className="text-textMuted hover:text-red-500 transition">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[14px] font-medium text-textPrimary ml-2">Log In</Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-textPrimary" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 pb-6 flex flex-col">
          <div className="space-y-6 flex-grow">
            <Link to="/" onClick={()=>setMobileMenu(false)} className="block text-2xl font-bold text-textPrimary border-b border-gray-100 pb-4">Dashboard</Link>
            <Link to="/trips" onClick={()=>setMobileMenu(false)} className="block text-2xl font-bold text-textPrimary border-b border-gray-100 pb-4">My Trips</Link>
            <Link to="/community" onClick={()=>setMobileMenu(false)} className="block text-2xl font-bold text-textPrimary border-b border-gray-100 pb-4">Community</Link>
            <Link to="/plan" onClick={()=>setMobileMenu(false)} className="block text-2xl font-bold text-primary-600 border-b border-gray-100 pb-4">Plan Trip</Link>
            {user ? (
              <>
                <Link to="/profile" onClick={()=>setMobileMenu(false)} className="block text-2xl font-bold text-textPrimary border-b border-gray-100 pb-4">Profile</Link>
                <button onClick={() => { logout(); setMobileMenu(false); }} className="w-full text-left text-2xl font-bold text-red-500 mt-4">Log Out</button>
              </>
            ) : (
              <Link to="/login" onClick={()=>setMobileMenu(false)} className="block text-2xl font-bold text-textPrimary pb-4">Log In</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
