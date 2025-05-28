import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B1E] pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0D1225]/50 backdrop-blur-lg rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-gray-400">Email: {user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trading Stats Card */}
          <div className="bg-[#0D1225]/50 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Trading Stats</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Total Trades</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div>
                <p className="text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-green-500">0%</p>
              </div>
            </div>
          </div>

          {/* Active Bots Card */}
          <div className="bg-[#0D1225]/50 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Active Bots</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Running</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div>
                <p className="text-gray-400">Total Profit</p>
                <p className="text-2xl font-bold text-green-500">$0.00</p>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-[#0D1225]/50 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Account Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Subscription</p>
                <p className="text-2xl font-bold text-primary">Free Trial</p>
              </div>
              <div>
                <p className="text-gray-400">Days Remaining</p>
                <p className="text-2xl font-bold">30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 