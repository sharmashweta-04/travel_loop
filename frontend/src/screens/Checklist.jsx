import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { CheckSquare, Trash2, Plus, ArrowLeft, Sparkles, Wand2 } from 'lucide-react';

const Checklist = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', category: 'General' });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [tripRes, itemsRes] = await Promise.all([
        api.get(`/trips/${id}`),
        api.get(`/checklist/${id}`)
      ]);
      setTrip(tripRes.data.data);
      setItems(itemsRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    try {
      const res = await api.post(`/checklist`, { ...newItem, tripId: id });
      setItems([...items, res.data.data]);
      setNewItem({ ...newItem, name: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (itemId, currentStatus) => {
    try {
      await api.patch(`/checklist/${itemId}/toggle`);
      setItems(items.map(item => item.id === itemId ? { ...item, isPacked: !currentStatus } : item));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/checklist/${itemId}`);
      setItems(items.filter(item => item.id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAutoGenerate = async () => {
    // Determine context based on trip data
    const month = trip?.startDate ? new Date(trip.startDate).getMonth() : new Date().getMonth();
    const isWinter = month >= 10 || month <= 1; // Nov, Dec, Jan, Feb
    const isMonsoon = month >= 5 && month <= 8; // Jun, Jul, Aug, Sep
    const places = trip?.stops?.map(s => s.cityName.toLowerCase()) || [];
    
    const isBeach = places.some(p => p.includes('goa') || p.includes('andaman') || p.includes('kerala') || p.includes('beach') || p.includes('mumbai') || p.includes('chennai'));
    const isMountain = places.some(p => p.includes('manali') || p.includes('leh') || p.includes('kashmir') || p.includes('shimla') || p.includes('darjeeling') || p.includes('uttarakhand'));

    let essentials = [
      { name: 'Passport / Aadhar', category: 'Documents' },
      { name: 'Flight/Train Tickets', category: 'Documents' },
      { name: 'Phone Charger', category: 'Electronics' },
      { name: 'Power Bank', category: 'Electronics' },
      { name: 'Toothbrush & Paste', category: 'Toiletries' },
      { name: 'Deodorant', category: 'Toiletries' },
      { name: 'Medications', category: 'Health' },
      { name: 'First Aid Kit', category: 'Health' }
    ];

    if (isBeach) {
      essentials.push(
        { name: 'Swimwear', category: 'Clothing' },
        { name: 'Sunscreen (SPF 50+)', category: 'Toiletries' },
        { name: 'Sunglasses', category: 'Accessories' },
        { name: 'Flip Flops', category: 'Clothing' }
      );
    }

    if (isMountain || isWinter) {
      essentials.push(
        { name: 'Heavy Jacket / Fleece', category: 'Clothing' },
        { name: 'Thermal Wear', category: 'Clothing' },
        { name: 'Woolen Socks', category: 'Clothing' },
        { name: 'Beanie & Gloves', category: 'Accessories' },
        { name: 'Moisturizer & Lip Balm', category: 'Toiletries' },
        { name: 'Trekking Shoes', category: 'Clothing' }
      );
    } else {
      essentials.push(
        { name: 'Light Cotton Clothes', category: 'Clothing' },
        { name: 'Comfortable Walking Shoes', category: 'Clothing' },
        { name: 'Cap / Hat', category: 'Accessories' }
      );
    }

    if (isMonsoon) {
      essentials.push(
        { name: 'Umbrella / Raincoat', category: 'Accessories' },
        { name: 'Waterproof Bag Cover', category: 'Accessories' },
        { name: 'Mosquito Repellent', category: 'Health' },
        { name: 'Quick-dry Towel', category: 'Toiletries' }
      );
    }

    setLoading(true);
    try {
      const promises = essentials.map(item => api.post(`/checklist`, { ...item, tripId: id }));
      const results = await Promise.all(promises);
      setItems([...items, ...results.map(r => r.data.data)]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearPacked = async () => {
    const packedItems = items.filter(i => i.isPacked);
    if (packedItems.length === 0) return;
    
    setLoading(true);
    try {
      const promises = packedItems.map(item => api.delete(`/checklist/${item.id}`));
      await Promise.all(promises);
      setItems(items.filter(i => !i.isPacked));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const packedCount = items.filter(i => i.isPacked).length;
  const progress = items.length === 0 ? 0 : Math.round((packedCount / items.length) * 100);

  // Group by category
  const categories = [...new Set(items.map(i => i.category))];
  if (categories.length === 0) categories.push('General');

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 pb-12">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to={`/trips/${id}/view`} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-100 text-gray-500 hover:text-primary-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Packing Checklist</h1>
            <p className="text-gray-500">
              {trip ? `Smart checklist for ${trip.name}` : "Don't forget the essentials."}
            </p>
          </div>
        </div>
        <div className="flex gap-2 ml-12 md:ml-0">
          {packedCount > 0 && (
            <button onClick={handleClearPacked} className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl font-medium transition shadow-sm text-sm">
              <Trash2 className="h-4 w-4" /> Clear Packed
            </button>
          )}
          {items.length === 0 && (
            <button onClick={handleAutoGenerate} disabled={loading} className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl font-bold transition shadow-sm hover:shadow-md text-sm disabled:opacity-70">
              {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Wand2 className="h-4 w-4" />}
              Auto-Generate
            </button>
          )}
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-3xl font-black text-primary-600">{progress}%</span>
            <span className="text-gray-500 font-medium ml-2 uppercase tracking-wide text-xs">Packed</span>
          </div>
          <p className="text-sm font-medium text-gray-500">{packedCount} of {items.length} items</p>
        </div>
        <div className="h-3 w-full bg-primary-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(cat => {
          const catItems = items.filter(i => i.category === cat);
          return (
            <div key={cat} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary-500" /> {cat}
                </h3>
                <span className="bg-white border border-gray-200 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {catItems.filter(i => i.isPacked).length}/{catItems.length}
                </span>
              </div>
              
              <div className="p-2">
                {catItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition group">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors ${item.isPacked ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
                        {item.isPacked && <CheckSquare className="h-4 w-4 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={item.isPacked} onChange={() => handleToggle(item.id, item.isPacked)} />
                      <span className={`text-sm font-medium transition-colors ${item.isPacked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                    </label>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {/* Add new to this category */}
                <form onSubmit={handleAdd} className="flex gap-2 p-2 mt-2">
                  <input
                    type="text"
                    placeholder={`Add to ${cat}...`}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-400 outline-none transition"
                    value={newItem.category === cat ? newItem.name : ''}
                    onChange={(e) => setNewItem({ name: e.target.value, category: cat })}
                  />
                  <button type="submit" className="bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-2 rounded-lg font-medium transition shadow-sm border border-primary-100">
                    <Plus className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Checklist;
