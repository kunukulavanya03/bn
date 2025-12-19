import React, { useState } from 'react';
import { Search, Calendar, MessageCircle, User, Bell, Hotel, MapPin, Star, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { createPassword_reset, getData, login, updateData{id}, createRegister, register, createLogin, createData, deleteData{id}, logout } from './services/api';
interface DashboardProps {
  onNavigate: () => void;
}
export function Dashboard({ onNavigate }: DashboardProps) {
  const [recentBookings, setrecentBookings] = useState([]);
  const [notifications, setnotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        setData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Banner with gradient */}
      <div 
        className="py-8 px-6"
        style={{
          background: 'linear-gradient(135deg, #BD16D6 0%, #0DDC45 100%)',
          boxShadow: '0 10px 40px rgba(189, 22, 214, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Welcome back, John! 👋
              </h1>
              <p className="text-white opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                Ready to plan your next adventure?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                <Bell className="text-white" size={20} />
              </button>
              <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                <User className="text-white" size={20} />
              </button>
            </div>
          </div>
          {/* Quick Search Card */}
          <div 
            className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
            onClick={onNavigate}
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Search className="text-[#BD16D6]" size={24} />
              <h3 className="text-gray-800">Start a new search</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <MapPin size={20} className="text-[#BD16D6]" />
                <div>
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="text-gray-800">Where to?</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Calendar size={20} className="text-[#BD16D6]" />
                <div>
                  <p className="text-xs text-gray-500">Check-in / Check-out</p>
                  <p className="text-gray-800">Add dates</p>
                </div>
              </div>
              <button 
                className="py-3 px-6 rounded-xl text-white transition-all duration-300 hover:shadow-lg"
                style={{ background: '#BD16D6' }}
              >
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Recent */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Your Booking Stats</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4 p-6 bg-white rounded-b-2xl" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                <div 
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #C34E49 0%, #BD16D6 100%)',
                    boxShadow: '0 5px 20px rgba(195, 78, 73, 0.3)'
                  }}
                >
                  <TrendingUp className="text-white mb-2" size={32} />
                  <h3 className="text-white">12</h3>
                  <p className="text-white opacity-90">Total Bookings</p>
                </div>
                <div 
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #0DDC45 0%, #C34E49 100%)',
                    boxShadow: '0 5px 20px rgba(13, 220, 69, 0.3)'
                  }}
                >
                  <Hotel className="text-white mb-2" size={32} />
                  <h3 className="text-white">3</h3>
                  <p className="text-white opacity-90">Active Bookings</p>
                </div>
                <div 
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #BD16D6 0%, #0DDC45 100%)',
                    boxShadow: '0 5px 20px rgba(189, 22, 214, 0.3)'
                  }}
                >
                  <Star className="text-white mb-2" size={32} />
                  <h3 className="text-white">8</h3>
                  <p className="text-white opacity-90">Favorite Hotels</p>
                </div>
              </div>
            </div>
            {/* Recent Bookings */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Recent Bookings</h2>
              </div>
              <div className="bg-white rounded-b-2xl p-6 space-y-4" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-xl border-2 border-gray-100 hover:border-[#BD16D6] transition-all cursor-pointer"
                    style={{ boxShadow: '0 4px 15px rgba(189, 22, 214, 0.1)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-gray-800 mb-1">{booking.hotel}</h3>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{booking.date}</span>
                          </div>
                        </div>
                      </div>
                      <span 
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ background: booking.status === 'Confirmed' ? '#0DDC45' : '#C34E49' }}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column - Chat & Notifications */}
          <div className="space-y-8">
            {/* Chat Support */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(135deg, #C34E49 0%, #BD16D6 100%)',
                boxShadow: '0 10px 40px rgba(195, 78, 73, 0.3)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="text-white" size={32} />
                <h2 className="text-white">Need Help?</h2>
              </div>
              <p className="text-white opacity-90 mb-6">
                Chat with our support team anytime. We're here to make your booking experience smooth!
              </p>
              <button 
                className="w-full py-3 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
              >
                Start Chat
              </button>
            </div>
            {/* Notifications */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Notifications</h2>
              </div>
              <div className="bg-white rounded-b-2xl p-6 space-y-4" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 rounded-xl"
                    style={{ background: '#f8f4ff' }}
                  >
                    <p className="text-gray-800 mb-2">{notif.message}</p>
                    <p className="text-gray-500">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Button */}
      <button
        onClick={onNavigate}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #BD16D6 0%, #0DDC45 100%)',
          boxShadow: '0 10px 40px rgba(189, 22, 214, 0.5)'
        }}
      >
        <Search className="text-white" size={24} />
      </button>
    </div>
  );
}
