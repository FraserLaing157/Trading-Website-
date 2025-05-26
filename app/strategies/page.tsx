import Navigation from '../../components/Navigation';
import { PlusIcon, CogIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Strategies() {
  // Mock strategies data - in a real app, this would come from your backend
  const strategies = [
    {
      id: 1,
      name: 'Conservative Growth',
      description: 'Low-risk strategy focusing on stable growth',
      performance: '+5.2%',
      status: 'Active',
      type: 'Automated',
    },
    {
      id: 2,
      name: 'Aggressive Trading',
      description: 'High-risk strategy for maximum returns',
      performance: '+12.8%',
      status: 'Paused',
      type: 'Manual',
    },
    {
      id: 3,
      name: 'Balanced Portfolio',
      description: 'Mixed strategy with moderate risk',
      performance: '+8.5%',
      status: 'Active',
      type: 'Automated',
    },
  ];

  return (
    <main className="min-h-screen bg-primary-dark">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Trading Strategies
            </h1>
            <button className="flex items-center px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-md transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" />
              New Strategy
            </button>
          </div>

          {/* Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {strategy.name}
                    </h3>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      strategy.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {strategy.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {strategy.description}
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-400">Type: {strategy.type}</span>
                    <span className="text-lg font-semibold text-green-400">
                      {strategy.performance}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-md transition-colors">
                      <CogIcon className="h-5 w-5 mr-2" />
                      Configure
                    </button>
                    <button className="px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-md transition-colors">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Strategy Form */}
          <div className="mt-12 bg-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create New Strategy
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="strategyName" className="block text-sm text-gray-400 mb-2">
                  Strategy Name
                </label>
                <input
                  type="text"
                  id="strategyName"
                  className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter strategy name"
                />
              </div>
              <div>
                <label htmlFor="strategyType" className="block text-sm text-gray-400 mb-2">
                  Strategy Type
                </label>
                <select
                  id="strategyType"
                  className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="automated">Automated</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Describe your strategy..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-md transition-colors"
              >
                Create Strategy
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 