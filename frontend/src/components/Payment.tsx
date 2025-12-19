import React, { useState } from 'react';
import { useState } from 'react';
import { CreditCard, Lock, Check, Calendar, User, Home, Mail, Phone, Shield, MessageCircle } from 'lucide-react';
import { createPassword_reset, getData, login, updateData{id}, createRegister, register, createLogin, createData, deleteData{id}, logout } from './services/api';
interface PaymentProps {
  booking: any;
  onNavigate: () => void;
}
export function Payment({ booking, onNavigate }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onNavigate();
      }, 3000);
    }, 2000);
  };
  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div 
          className="max-w-2xl w-full rounded-3xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #0DDC45 0%, #BD16D6 100%)',
            boxShadow: '0 20px 60px rgba(13, 220, 69, 0.4)'
          }}
        >
          <div 
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <Check className="text-white" size={48} />
          </div>
          <h1 className="text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Payment Successful! 🎉
          </h1>
          <p className="text-white text-xl mb-6" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
            Your booking has been confirmed. We've sent a confirmation email with all the details.
          </p>
          <div className="bg-white/20 rounded-2xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white opacity-90">Booking ID</span>
                <span className="text-white">BK-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white opacity-90">Hotel</span>
                <span className="text-white">{booking?.hotel || 'Grand Plaza Hotel'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white opacity-90">Total Paid</span>
                <span className="text-white">${booking?.totalPrice ? booking.totalPrice * 2 : 498}</span>
              </div>
            </div>
          </div>
          <p className="text-white opacity-90">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pb-12">
      {/* Payment Header Banner */}
      <div 
        className="py-8 px-6"
        style={{
          background: 'linear-gradient(135deg, #BD16D6 0%, #0DDC45 100%)',
          boxShadow: '0 10px 40px rgba(189, 22, 214, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Lock className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Secure Payment
              </h1>
              <p className="text-white opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Payment Method</h2>
              </div>
              <div className="bg-white rounded-b-2xl p-6" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'card' ? 'border-[#BD16D6]' : 'border-gray-200'
                    }`}
                    style={{
                      boxShadow: paymentMethod === 'card' ? '0 10px 30px rgba(189, 22, 214, 0.3)' : 'none'
                    }}
                  >
                    <CreditCard className={paymentMethod === 'card' ? 'text-[#BD16D6]' : 'text-gray-400'} size={32} />
                    <h3 className="text-gray-800 mt-3">Credit/Debit Card</h3>
                    <p className="text-gray-600">Pay with your card</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'paypal' ? 'border-[#BD16D6]' : 'border-gray-200'
                    }`}
                    style={{
                      boxShadow: paymentMethod === 'paypal' ? '0 10px 30px rgba(189, 22, 214, 0.3)' : 'none'
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white">P</span>
                    </div>
                    <h3 className="text-gray-800 mt-3">PayPal</h3>
                    <p className="text-gray-600">Pay with PayPal</p>
                  </button>
                </div>
              </div>
            </div>
            {/* Card Details Form */}
            {paymentMethod === 'card' && (
              <div>
                <div 
                  className="py-4 px-6 rounded-t-2xl"
                  style={{ background: '#BD16D6' }}
                >
                  <h2 className="text-white">Card Details</h2>
                </div>
                <div className="bg-white rounded-b-2xl p-6 space-y-4" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                  <div>
                    <label className="text-gray-700 mb-2 block">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">CVV</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">Cardholder Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Billing Information */}
            <div>
              <div 
                className="py-4 px-6 rounded-t-2xl"
                style={{ background: '#BD16D6' }}
              >
                <h2 className="text-white">Billing Information</h2>
              </div>
              <div className="bg-white rounded-b-2xl p-6 space-y-4" style={{ boxShadow: '0 10px 40px rgba(189, 22, 214, 0.2)' }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        placeholder=""
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">Address</label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">Zip Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#BD16D6]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-2xl p-6 sticky top-6"
              style={{
                background: 'linear-gradient(135deg, #C34E49 0%, #BD16D6 100%)',
                boxShadow: '0 10px 40px rgba(195, 78, 73, 0.4)'
              }}
            >
              <h2 className="text-white mb-6">Booking Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-white/10">
                  <h3 className="text-white mb-2">{booking?.hotel || 'Grand Plaza Hotel'}</h3>
                  <p className="text-white opacity-90">{booking?.room?.name || 'Deluxe Room'}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Check-in</span>
                    <span className="text-white">{booking?.checkIn || 'Dec 20, 2024'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Check-out</span>
                    <span className="text-white">{booking?.checkOut || 'Dec 23, 2024'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Guests</span>
                    <span className="text-white">{booking?.guests || 2}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Nights</span>
                    <span className="text-white">2</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Room Price</span>
                    <span className="text-white">${booking?.totalPrice || 249} × 2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Service Fee</span>
                    <span className="text-white">$25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white opacity-90">Tax (10%)</span>
                    <span className="text-white">${((booking?.totalPrice || 249) * 2 * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Total Amount</span>
                      <span className="text-white">${((booking?.totalPrice || 249) * 2 + 25 + (booking?.totalPrice || 249) * 2 * 0.1).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl text-white transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ background: '#BD16D6' }}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Complete Payment
                  </>
                )}
              </button>
              {/* Security Badge */}
              <div className="mt-6 p-4 rounded-xl bg-white/10">
                <div className="flex items-center gap-3">
                  <Shield className="text-white" size={24} />
                  <div>
                    <h3 className="text-white">Secure Payment</h3>
                    <p className="text-white opacity-90 text-sm">
                      256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
              {/* Support */}
              <div className="mt-4 p-4 rounded-xl bg-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-white" size={20} />
                  <span className="text-white">Questions?</span>
                </div>
                <p className="text-white opacity-90 text-sm">
                  Contact our 24/7 support team for assistance with your payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
