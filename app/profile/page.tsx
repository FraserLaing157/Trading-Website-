import Navigation from '../../components/Navigation';
import { UserCircleIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  // Mock user data - in a real app, this would come from your backend
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    tokens: 750,
    joinDate: 'January 2024',
    tradingStats: {
      totalTrades: 156,
      successRate: '68%',
      profitMargin: '12.5%',
      activeStrategies: 3,
    },
  };

  return (
    <main className="min-h-screen bg-primary-dark">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="bg-secondary rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-4">
              <UserCircleIcon className="h-16 w-16 text-accent" />
              <div>
                <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                <p className="text-gray-300">Member since {userData.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Info */}
            <div className="bg-secondary rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400">Email</label>
                  <p className="text-white">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Available Tokens</label>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-6 w-6 text-accent mr-2" />
                    <p className="text-2xl font-bold text-accent">{userData.tokens}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Stats */}
            <div className="bg-secondary rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Trading Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400">Total Trades</label>
                  <p className="text-2xl font-bold text-white">{userData.tradingStats.totalTrades}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Success Rate</label>
                  <p className="text-2xl font-bold text-accent">{userData.tradingStats.successRate}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Profit Margin</label>
                  <p className="text-2xl font-bold text-green-500">{userData.tradingStats.profitMargin}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Active Strategies</label>
                  <p className="text-2xl font-bold text-white">{userData.tradingStats.activeStrategies}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-md transition-colors">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              View Detailed Analytics
            </button>
            <button className="flex items-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white rounded-md transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 