import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import PlanTrip from './screens/PlanTrip';
import ItineraryBuilder from './screens/ItineraryBuilder';
import MyTrips from './screens/MyTrips';
import Profile from './screens/Profile';
import Search from './screens/Search';
import ItineraryView from './screens/ItineraryView';
import Community from './screens/Community';
import Checklist from './screens/Checklist';
import AdminDashboard from './screens/AdminDashboard';
import Notes from './screens/Notes';
import Invoice from './screens/Invoice';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-pageBg">
      <div className="h-12 w-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col font-sans text-textPrimary bg-pageBg selection:bg-primary-100 selection:text-primary-800">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/plan" element={<ProtectedRoute><PlanTrip /></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          
          <Route path="/trips/:id/view" element={<ProtectedRoute><ItineraryView /></ProtectedRoute>} />
          <Route path="/trips/:id/build" element={<ProtectedRoute><ItineraryBuilder /></ProtectedRoute>} />
          <Route path="/trips/:id/checklist" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
          <Route path="/trips/:id/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/trips/:id/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
