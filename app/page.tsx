'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { ArrowRightIcon, ChartBarIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      title: 'Custom Trading Strategies',
      description: 'Create and customize your own trading strategies with our intuitive interface',
      icon: CogIcon,
    },
    {
      title: 'Real-time Analytics',
      description: 'Monitor your trading performance with advanced analytics and insights',
      icon: ChartBarIcon,
    },
    {
      title: 'Secure Trading',
      description: 'Your trades are protected with enterprise-grade security measures',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B0B1E] via-[#0F1A33] to-[#0B0B1E]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                <span className="text-white">Unique solutions &</span><br />
                <span className="text-[#3DB8F5]">Innovative approach</span><br />
                <span className="text-white">to trading</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-xl">
                Stay on top of the market with our innovative technology, extensive
                product access, personalized education, and award-winning service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/access"
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-[#3DB8F5] hover:bg-[#2CA8E5] transition-colors"
                >
                  Get Early access
                </Link>
                <button
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-transparent border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/trading-interface.png"
                alt="Trading Interface"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg bg-secondary hover:bg-secondary-light transition-colors"
              >
                <feature.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who are already using our platform
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent-light transition-colors"
          >
            View Pricing
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
} 