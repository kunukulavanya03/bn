import React, { useState } from 'react';
import { useState } from 'react';
import { Calendar, Users, Bed, Check, MapPin, Star, Wifi, Coffee, Dumbbell, ParkingCircle, UtensilsCrossed, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { createPassword_reset, getData, login, updateData{id}, createRegister, register, createLogin, createData, deleteData{id}, logout } from './services/api';
interface BookingProps {
  hotel: any;
  onNavigate: (booking: any) => void;
}
export function Booking({ hotel, onNavigate }: BookingProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setrooms] = useState([]);
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
},
  ];
  const handleBooking = () => {
    onNavigate({
      hotel: hotel?.name || 'Grand Plaza Hotel',
      room: selectedRoomData,
      checkIn,
      checkOut,
      guests,
      totalPrice: selectedRoomData?.price || 249
    });
  };
  return (
    <div className="min-h-screen pb-12">
      {/* Hotel Header Banner */}
      <div 
        className="py-8 px-6"
        style={{
          background: 'linear-gradient(135deg, #BD16D6 0%, #0DDC45 100%)',
          boxShadow: '0 10px 40px rgba(189, 22, 214, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {hotel?.name || 'Grand Plaza Hotel'}
              </h1>
              <div className="flex items-center gap-4 text-white mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                    {hotel?.location || 'Manhattan, New York'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="fill-white" size={20} />
                  <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                    {hotel?.rating || 4.8} ({hotel?.reviews || 320} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Room Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Image */}
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
              <ImageWithFallback
                src={hotel?.image || 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1080'}
                alt={hotel?.name || 'Hotel'}
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Amenities Section */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Hotel Amenities</h2>
              </div>
              <div className="bg-white rounded-b-2xl p-6" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#f8f4ff' }}>
                    <Wifi className="text-[#BD16D6]" size={24} />
                    <span className="text-gray-800">Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#f8f4ff' }}>
                    <Dumbbell className="text-[#BD16D6]" size={24} />
                    <span className="text-gray-800">Fitness Center</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#f8f4ff' }}>
                    <UtensilsCrossed className="text-[#BD16D6]" size={24} />
                    <span className="text-gray-800">Restaurant</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#f8f4ff' }}>
                    <ParkingCircle className="text-[#BD16D6]" size={24} />
                    <span className="text-gray-800">Parking</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#f8f4ff' }}>
                    <Coffee className="text-[#BD16D6]" size={24} />
                    <span className="text-gray-800">Breakfast</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#f8f4ff' }}>
                    <MessageCircle className="text-[#BD16D6]" size={24} />
                    <span className="text-gray-800">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Room Selection */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Choose Your Room</h2>
              </div>
              <div className="bg-white rounded-b-2xl p-6 space-y-4" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedRoom === room.id ? 'border-[#BD16D6]' : 'border-gray-200'
                    }`}
                    style={{
                      boxShadow: selectedRoom === room.id ? '0 10px 30px rgba(189, 22, 214, 0.3)' : '0 4px 15px rgba(189, 22, 214, 0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-800">{room.name}</h3>
                          {selectedRoom === room.id && (
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: '#0DDC45' }}
                            >
                              <Check className="text-white" size={16} />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{room.description}</p>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Bed size={16} />
                            <span>{room.capacity} Guests</span>
                          </div>
                          <span>•</span>
                          <span>{room.size}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div 
                          className="px-4 py-2 rounded-xl mb-2"
                          style={{
                            background: 'linear-gradient(135deg, #0DDC45 0%, #C34E49 100%)',
                          }}
                        >
                          <span className="text-white">${room.price}</span>
                          <span className="text-white opacity-80">/night</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full text-white"
                          style={{ background: '#C34E49' }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-2xl p-6 sticky top-6"
              style={{
                background: 'linear-gradient(135deg, #C34E49 0%, #BD16D6 100%)',
                boxShadow: '0 10px 40px rgba(195, 78, 73, 0.4)'
              }}
            >
              <h2 className="text-white mb-6">Complete Your Booking</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-white mb-2 block">Check-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-white/20 rounded-xl bg-white/10 text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white mb-2 block">Check-out Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-white/20 rounded-xl bg-white/10 text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white mb-2 block">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-white/20 rounded-xl bg-white/10 text-white focus:outline-none focus:border-white/40 appearance-none"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Price Summary */}
              {selectedRoom && (
                <div className="p-4 rounded-xl bg-white/10 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white opacity-90">Room Price</span>
                    <span className="text-white">${rooms.find(r => r.id === selectedRoom)?.price}/night</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white opacity-90">Nights</span>
                    <span className="text-white">2</span>
                  </div>
                  <div className="border-t border-white/20 my-3"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Total</span>
                    <span className="text-white">${(rooms.find(r => r.id === selectedRoom)?.price || 0) * 2}</span>
                  </div>
                </div>
              )}
              <button
                onClick={handleBooking}
                disabled={!selectedRoom || !checkIn || !checkOut}
                className="w-full py-4 rounded-xl text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl"
                style={{ background: '#BD16D6' }}
              >
                Proceed to Payment
              </button>
              {/* Help */}
              <div className="mt-6 p-4 rounded-xl bg-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-white" size={20} />
                  <span className="text-white">Need Help?</span>
                </div>
                <p className="text-white opacity-90 text-sm">
                  Our support team is available 24/7 to assist you with your booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
