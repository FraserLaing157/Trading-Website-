import Navigation from '../../components/Navigation';
import { EnvelopeIcon, PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <main className="min-h-screen bg-primary-dark">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our trading bot platform? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-secondary rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-secondary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-secondary rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-6 w-6 text-accent mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">support@tradingbot.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-accent mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ChatBubbleLeftIcon className="h-6 w-6 text-accent mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Live Chat</p>
                      <p className="text-white">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">
                      How do I get started?
                    </h3>
                    <p className="text-gray-300">
                      Purchase tokens from our shop and start creating your custom trading strategies.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">
                      What payment methods do you accept?
                    </h3>
                    <p className="text-gray-300">
                      We accept all major credit cards, PayPal, and cryptocurrency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 