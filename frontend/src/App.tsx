import React, { useState } from 'react';
import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Search } from './components/Search';
import { Booking } from './components/Booking';
import { Payment } from './components/Payment';
import { PATHS, getAppPath, getApiPath } from '../constants/paths';
import { createPassword_reset, getData, login, updateData{id}, createRegister, register, createLogin, createData, deleteData{id}, logout } from './services/api';
type Screen = 'login' | 'dashboard' | 'search' | 'booking' | 'payment';
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const navigateToScreen = (screen: Screen, data?: any) => {
    if (data) {
      if (screen === 'booking') setSelectedHotel(data);
      if (screen === 'payment') setBookingDetails(data);
    }
    setCurrentScreen(screen);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {currentScreen === 'login' && <Login onNavigate={() => navigateToScreen('dashboard')} />}
      {currentScreen === 'dashboard' && <Dashboard onNavigate={() => navigateToScreen('search')} />}
      {currentScreen === 'search' && <Search onNavigate={(hotel) => navigateToScreen('booking', hotel)} />}
      {currentScreen === 'booking' && <Booking hotel={selectedHotel} onNavigate={(booking) => navigateToScreen('payment', booking)} />}
      {currentScreen === 'payment' && <Payment booking={bookingDetails} onNavigate={() => navigateToScreen('login')} />}
    </div>
  );
}
