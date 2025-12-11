import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import useRazorpay from "react-razorpay";

const Donate = () => {
  const [Razorpay] = useRazorpay();
  const [donationAmount, setDonationAmount] = useState('');
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createOrder = async (amount) => {
    try {
      // Call your backend to create order
      const response = await fetch('http://127.0.0.1:8000/api/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }) // Amount in paise
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!donationAmount || donationAmount < 1) {
      alert('Please enter a valid donation amount');
      return;
    }

    if (!donorDetails.name || !donorDetails.email || !donorDetails.phone) {
      alert('Please fill in all required details');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on backend
      const orderData = await createOrder(donationAmount);

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: donationAmount * 100, // Amount in paise
        currency: "INR",
        name: "Your NGO Name",
        description: "Donation for a good cause",
        image: "/logo.png", // Your NGO logo
        order_id: orderData.id,
        handler: async (response) => {
          // Payment successful
          console.log('Payment successful:', response);
          
          // Send payment details to backend for verification
          try {
            const verifyResponse = await fetch('http://127.0.0.1:8000/api/verify-payment/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: donationAmount,
                donor_details: donorDetails
              })
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              alert('Thank you for your donation! You will receive a confirmation email shortly.');
              // Reset form
              setDonationAmount('');
              setDonorDetails({
                name: '',
                email: '',
                phone: '',
                message: ''
              });
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment received but verification pending. We will contact you soon.');
          }
        },
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        notes: {
          message: donorDetails.message,
        },
        theme: {
          color: "#3B82F6", // Your brand color
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.on('payment.failed', function (response) {
        alert('Payment failed. Please try again.');
        console.error('Payment failed:', response.error);
      });
      
      rzpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference Today</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your donation helps us provide education, healthcare, and opportunities to those who need it most.
              Every contribution, big or small, creates lasting impact.
            </p>
          </div>
        </div>

        {/* Donation Form */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Donation Amount</h2>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount)}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      donationAmount === amount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">₹</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <hr className="my-6" />

              {/* Donor Details */}
              <h3 className="text-xl font-bold mb-4">Your Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={donorDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={donorDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={donorDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={donorDetails.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any message you'd like to share..."
                />
              </div>

              {/* Donate Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-4 rounded-lg font-bold text-white transition ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isProcessing ? 'Processing...' : `Donate ₹${donationAmount || '0'} via Razorpay`}
              </button>

              {/* Security Note */}
              <p className="text-sm text-gray-600 text-center mt-4">
                <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by Razorpay
              </p>
            </div>

            {/* Impact Section */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Your Impact</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹500</div>
                  <p className="text-gray-700">Provides books for 5 children</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹2,500</div>
                  <p className="text-gray-700">Sponsors a child's education for a month</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹10,000</div>
                  <p className="text-gray-700">Sets up a mini library</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;