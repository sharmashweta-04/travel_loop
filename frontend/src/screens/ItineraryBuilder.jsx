import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { ChevronRight, GripVertical, MapPin, Calendar, Plus, Trash2, Save, IndianRupee, Activity as ActivityIcon } from 'lucide-react';

const ItineraryBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const res = await api.get(`/trips/${id}`);
      setTrip(res.data.data);
      
      if (res.data.data.stops && res.data.data.stops.length > 0) {
        const loadedStops = res.data.data.stops.map(s => {
          const stopBudgets = {};
          if (res.data.data.budgets) {
            res.data.data.budgets.forEach(b => {
               if (b.description === s.id) {
                 stopBudgets[b.category] = b.amount;
               }
            });
          }
          return {
            ...s,
            activities: s.activities || [],
            activityText: s.activities.map(a => a.name).join('\n') || '',
            budgets: stopBudgets
          };
        });
        setStops(loadedStops.sort((a,b) => a.order - b.order));
      } else {
        // Init empty
        handleAddStop();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStop = () => {
    setStops([...stops, { 
      id: `temp-${Date.now()}`, 
      city: '', 
      arrivalDate: trip?.startDate ? trip.startDate.split('T')[0] : '', 
      departureDate: trip?.endDate ? trip.endDate.split('T')[0] : '', 
      order: stops.length,
      activityText: '',
      budgets: {}
    }]);
  };

  const handleStopChange = (index, field, value) => {
    const newStops = [...stops];
    newStops[index][field] = value;
    setStops(newStops);
  };

  const handleDeleteStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // allow drop
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    const newStops = [...stops];
    const draggedItem = newStops[draggedItemIndex];
    newStops.splice(draggedItemIndex, 1);
    newStops.splice(index, 0, draggedItem);
    
    // Re-assign order based on new array indices
    newStops.forEach((s, i) => s.order = i);
    
    setDraggedItemIndex(index);
    setStops(newStops);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Clean up existing budgets and stops to prevent duplication
      if (trip && trip.budgets) {
        for (let b of trip.budgets) {
          try { await api.delete(`/budget/${b.id}`); } catch(e) {}
        }
      }
      if (trip && trip.stops) {
        for (let s of trip.stops) {
          try { await api.delete(`/stops/${s.id}`); } catch(e) {}
        }
      }

      const stopPromises = stops.map(async (stop, idx) => {
        // Safe date parsing to prevent Prisma crashes
        const safeDate = (dateStr) => {
          if (!dateStr || dateStr === 'Invalid Date') return new Date();
          const d = new Date(dateStr);
          return isNaN(d.getTime()) ? new Date() : d;
        };

        // 1. Create stop
        const stopRes = await api.post(`/stops`, {
          cityName: stop.city || `Stop ${idx + 1}`,
          country: '',
          startDate: safeDate(stop.arrivalDate),
          endDate: safeDate(stop.departureDate),
          orderIndex: idx,
          tripId: id
        });
        const stopId = stopRes.data.data.id;

        // 2. Create activities
        if (stop.activityText) {
          const acts = stop.activityText.split('\n').filter(a => a.trim());
          for (let a of acts) {
            await api.post(`/activities`, {
              stopId,
              name: a,
              type: stop.activityType,
              cost: 0,
              duration: null
            });
          }
        }

        // 3. Add to budget
        if (stop.budgets) {
          for (const [type, amount] of Object.entries(stop.budgets)) {
            if (Number(amount) > 0) {
              await api.post(`/budget`, {
                tripId: id,
                category: type,
                amount: Number(amount),
                description: stopId
              });
            }
          }
        }
      });

      await Promise.all(stopPromises);
      navigate(`/trips/${id}/view`);
    } catch (err) {
      console.error(err);
      alert('Failed to save itinerary');
    } finally {
      setSaving(false);
    }
  };

  const totalBudget = stops.reduce((acc, stop) => {
    if (stop.budgets) {
      return acc + Object.values(stop.budgets).reduce((sum, val) => sum + (Number(val) || 0), 0);
    }
    return acc;
  }, 0);
  const types = ['sightseeing', 'food', 'transport', 'stay', 'adventure'];

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="h-10 w-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pb-32 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
          <Link to="/dashboard" className="hover:text-primary-600">Dashboard</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/trips" className="hover:text-primary-600">My Trips</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900">Build Itinerary</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{trip?.name}</h1>
      </div>

      {/* Builder Flow */}
      <div className="relative space-y-6">
        {/* Dashed background line */}
        <div className="absolute left-6 top-10 bottom-10 w-px border-l-2 border-dashed border-primary-200 z-0 hidden md:block"></div>

        {stops.map((stop, index) => (
          <div 
            key={stop.id} 
            className={`relative z-10 flex gap-4 md:gap-6 group transition-all duration-200 ${draggedItemIndex === index ? 'opacity-40 scale-[0.98]' : ''}`}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => e.preventDefault()}
          >
            
            {/* Number Indicator */}
            <div className="hidden md:flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-white border-2 border-primary-400 flex items-center justify-center text-primary-700 font-bold text-lg shadow-sm group-hover:bg-primary-50 transition-colors">
                {index + 1}
              </div>
            </div>

            {/* Card */}
            <div className="flex-1 bg-white rounded-2xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-l-primary-500">
              
              {/* Row 1: Location & Dates */}
              <div className="flex flex-col sm:flex-row gap-4 mb-5 items-start sm:items-center">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-gray-400" /></div>
                    <input 
                      type="text" 
                      placeholder="City or location name" 
                      className="pl-10 w-full px-3 py-2 border-b-2 border-gray-100 focus:border-primary-500 outline-none transition font-semibold text-lg text-gray-900 bg-transparent"
                      value={stop.city}
                      onChange={(e) => handleStopChange(index, 'city', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"><Calendar className="h-3 w-3 text-gray-400" /></div>
                    <input type="date" className="pl-7 w-full sm:w-36 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-400" value={stop.arrivalDate} onChange={(e) => handleStopChange(index, 'arrivalDate', e.target.value)} />
                  </div>
                  <span className="text-gray-400">—</span>
                  <div className="relative flex-1 sm:flex-none">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"><Calendar className="h-3 w-3 text-gray-400" /></div>
                    <input type="date" className="pl-7 w-full sm:w-36 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-400" value={stop.departureDate} onChange={(e) => handleStopChange(index, 'departureDate', e.target.value)} />
                  </div>
                </div>

                <div 
                  className="hidden sm:block cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 px-2"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <GripVertical className="h-5 w-5" />
                </div>
              </div>

              {/* Row 2: Activities Textarea */}
              <div className="mb-5 bg-gray-50 rounded-xl p-1 border border-gray-100 relative">
                <textarea 
                  rows="3"
                  className="w-full bg-transparent px-4 py-3 outline-none resize-none text-gray-700 text-sm"
                  placeholder="What will you do here? (E.g. Visit museum, dinner at Plaza...)"
                  value={stop.activityText}
                  onChange={(e) => handleStopChange(index, 'activityText', e.target.value)}
                ></textarea>
                <div className="absolute top-3 right-3 text-gray-300"><ActivityIcon className="h-5 w-5" /></div>
              </div>

              {/* Row 3: Budget & Tags */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100 relative">
                <div className="flex flex-wrap items-center gap-2 w-full pr-12">
                  {types.map(t => (
                    <div key={t} className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg px-2 py-1.5 focus-within:border-amber-300 focus-within:ring-1 focus-within:ring-amber-300 transition-all">
                      <span className="text-[10px] uppercase font-bold text-gray-500 w-16 truncate">{t}</span>
                      <IndianRupee className="h-3 w-3 text-gray-400" />
                      <input 
                        type="number"
                        placeholder="0"
                        className="w-12 sm:w-16 bg-transparent outline-none text-sm font-semibold text-gray-800 appearance-none m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        value={stop.budgets?.[t] || ''}
                        onChange={(e) => {
                          const newBudgets = { ...(stop.budgets || {}) };
                          newBudgets[t] = e.target.value;
                          handleStopChange(index, 'budgets', newBudgets);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute right-0 top-4">
                  <button onClick={() => handleDeleteStop(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete Stop">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Add Button */}
        <div className="relative z-10 flex gap-6 md:pl-16 mt-2">
          <button 
            onClick={handleAddStop}
            className="w-full border-2 border-dashed border-primary-200 text-primary-600 bg-primary-50/30 hover:bg-primary-50 hover:border-primary-400 rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold transition-all duration-200 group"
          >
            <div className="bg-primary-100 p-1 rounded-full group-hover:bg-primary-200 transition-colors">
              <Plus className="h-5 w-5" />
            </div>
            Add Another Stop
          </button>
        </div>
      </div>

      {/* Sticky Save Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom-full duration-500">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center max-w-5xl">
          <div className="flex gap-4 md:gap-6 items-center overflow-x-auto hide-scrollbar py-2">
            <div>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">Total Stops</p>
              <p className="text-base md:text-lg font-bold text-gray-900">{stops.length}</p>
            </div>
            <div className="h-8 md:h-10 w-px bg-gray-200"></div>
            
            <div className="flex items-center gap-4">
              <div className="bg-amber-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-amber-100 shadow-sm">
                <p className="text-[10px] text-amber-600/80 font-bold uppercase tracking-wider">Total Budget</p>
                <p className="text-base md:text-lg font-black text-amber-600 flex items-center"><IndianRupee className="h-3 md:h-4 w-3 md:w-4 mr-0.5" />{totalBudget}</p>
              </div>
              
              {Object.entries(stops.reduce((acc, stop) => {
                if (stop.budgets) {
                  Object.entries(stop.budgets).forEach(([t, val]) => {
                    if (val > 0) acc[t] = (acc[t] || 0) + Number(val);
                  });
                }
                return acc;
              }, {})).map(([type, amount]) => (
                <div key={type} className="hidden sm:block">
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider capitalize">{type}</p>
                  <p className="text-sm font-bold text-gray-700 flex items-center"><IndianRupee className="h-3 w-3 mr-0.5" />{amount}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleSave} 
            disabled={saving || stops.length === 0}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-md disabled:opacity-50 flex items-center gap-2 active:scale-95"
          >
            {saving ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <><Save className="h-5 w-5" /> Save Itinerary</>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ItineraryBuilder;
