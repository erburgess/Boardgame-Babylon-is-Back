import React from 'react';
import { Twitter, Facebook, Instagram, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-babylon-900 text-gray-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-serif text-xl font-bold mb-4">Boardgame Babylon</h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              The premier destination for board game reviews, industry news, and deep dives into gamification. Preserving the legacy since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-babylon-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-babylon-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-babylon-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Latest Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gamification Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Podcast Episodes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medium Archive</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Eurogames</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ameritrash</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wargames</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crowdfunding News</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Newsletter</h4>
            <p className="text-xs text-gray-400 mb-4">Get the latest SEO-optimized board game content delivered to your inbox.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-babylon-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-babylon-500 transition-colors"
              />
              <button className="bg-babylon-500 hover:bg-babylon-400 text-white text-sm font-bold py-2 px-4 rounded transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Boardgame Babylon. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of Service</a>
             <button onClick={scrollToTop} className="flex items-center gap-1 hover:text-white group">
               Top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};