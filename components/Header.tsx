import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dice5, Mic, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path 
    ? "text-babylon-500 font-bold" 
    : "text-gray-600 hover:text-babylon-500 transition-colors";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-babylon-900 text-white p-2 rounded-lg group-hover:bg-babylon-500 transition-colors">
              <Dice5 size={28} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-2xl font-bold text-gray-900 leading-none tracking-tight">
                Boardgame<span className="text-babylon-500">Babylon</span>
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">Est. 2005 • Remastered</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/blog" className={isActive('/blog')}>Reviews & News</Link>
            <Link to="/gamification" className={isActive('/gamification')}>Gamification</Link>
            <Link to="/podcast" className={`flex items-center gap-1 ${isActive('/podcast')}`}>
              <Mic size={16} /> Podcast
            </Link>
            <button className="text-gray-400 hover:text-babylon-500">
              <Search size={20} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Reviews & News</Link>
            <Link to="/gamification" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Gamification</Link>
            <Link to="/podcast" className="block px-3 py-2 rounded-md text-base font-medium text-babylon-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Podcast</Link>
          </div>
        </div>
      )}
    </header>
  );
};