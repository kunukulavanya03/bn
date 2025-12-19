import React, { useState } from 'react';
import { useState } from 'react';
import { LogIn, Mail, Lock, MessageCircle } from 'lucide-react';
import { createPassword_reset, getData, login, updateData{id}, createRegister, register, createLogin, createData, deleteData{id}, logout } from './services/api';
interface LoginProps {
  onNavigate: () => void;
}
export function Login({ onNavigate }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Welcome Message */}
        <div 
          className="rounded-3xl p-12 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #BD16D6 0%, #0DDC45 100%)',
            boxShadow: '0 20px 60px rgba(189, 22, 214, 0.4)'
          }}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MessageCircle size={48} className="text-white" />
              <h1 className="text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Hotel Booking Pro
              </h1>
            </div>
            <p className="text-white text-xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              Welcome back! We're excited to help you find your perfect stay. 
              Book hotels with ease and manage your reservations all in one place.
            </p>
            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <span className="text-white">✓</span>
                </div>
                <div>
                  <h3 className="text-white">Real-time Availability</h3>
                  <p className="text-white opacity-90">Instant room availability updates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <span className="text-white">✓</span>
                </div>
                <div>
                  <h3 className="text-white">Secure Payments</h3>
                  <p className="text-white opacity-90">Your data is safe with us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right side - Login Form */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(189, 22, 214, 0.3)' }}>
          <div className="space-y-8">
            <div>
              <h2 className="text-gray-800 mb-2">
                {isLogin ? "Let's get you signed in!" : "Create your account"}
              </h2>
              <p className="text-gray-600">
                {isLogin ? "Enter your credentials to continue" : "Join us to start booking amazing hotels"}
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder=""
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6] transition-all"
                  />
                </div>
              </div>
              {null}
              <button
                onClick={onNavigate}
                className="w-full py-4 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                style={{ 
                  background: '#BD16D6',
                  boxShadow: '0 10px 30px rgba(189, 22, 214, 0.4)'
                }}
              >
                <LogIn size={20} />
                {isLogin ? "Sign In" : "Create Account"}
              </button>
              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#BD16D6] hover:underline"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
            {/* User Role Selector */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-3">Select your role:</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="py-3 px-4 rounded-xl text-white transition-all duration-300"
                  style={{ background: '#C34E49' }}
                >
                  Guest User
                </button>
                <button 
                  className="py-3 px-4 rounded-xl text-white transition-all duration-300"
                  style={{ background: '#C34E49' }}
                >
                  Hotel Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
