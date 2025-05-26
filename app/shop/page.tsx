import Navigation from '../../components/Navigation';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const tokenPackages = [
  {
    name: 'Starter Pack',
    tokens: 100,
    price: 9.99,
    features: [
      'Basic trading strategies',
      'Manual trading',
      'Basic analytics',
    ],
  },
  {
    name: 'Pro Pack',
    tokens: 500,
    price: 39.99,
    features: [
      'Advanced trading strategies',
      'Automated trading',
      'Real-time analytics',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise Pack',
    tokens: 2000,
    price: 149.99,
    features: [
      'Custom trading strategies',
      'Advanced automation',
      'Premium analytics',
      '24/7 dedicated support',
      'API access',
    ],
  },
];

export default function Shop() {
  return (
    <main className="min-h-screen bg-primary-dark">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Purchase Trading Tokens
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Choose the package that best suits your trading needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {tokenPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="bg-secondary rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-accent">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-400 ml-2">USD</span>
                  </div>
                  <p className="text-lg text-accent mb-6">
                    {pkg.tokens} Tokens
                  </p>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <svg
                          className="h-5 w-5 text-accent mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-light transition-colors"
                  >
                    <CreditCardIcon className="h-5 w-5 mr-2" />
                    Purchase Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-gray-300 mb-8">
              Contact us for custom token packages tailored to your specific needs
            </p>
            <button
              className="inline-flex items-center px-6 py-3 border border-accent text-base font-medium rounded-md text-accent hover:bg-accent hover:text-white transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 