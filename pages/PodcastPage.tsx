import React from 'react';
import { Mic, Play, Clock, Calendar } from 'lucide-react';

export const PodcastPage: React.FC = () => {
  const episodes = [
    { id: 1, title: "The Renaissance of Eurogames", date: "May 20, 2025", duration: "45 min", desc: "We discuss the latest wave of medium-heavy euros and why beige is beautiful again." },
    { id: 2, title: "Gamification Failures to Avoid", date: "May 13, 2025", duration: "38 min", desc: "Why your leaderboard isn't working and what psychology says about intrinsic motivation." },
    { id: 3, title: "Interview: The Designer of 'Voidfall'", date: "May 06, 2025", duration: "52 min", desc: "A deep dive into 4X mechanics without the luck of the dice." },
  ];

  return (
    <div className="bg-babylon-50 min-h-screen">
      <div className="bg-babylon-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block p-4 bg-babylon-700 rounded-full mb-6 border-4 border-babylon-500 shadow-2xl">
                <Mic size={48} className="text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">The Podcast Returns</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Join us for weekly conversations about the golden age of board games, the industry business, and how games change the way we learn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-accent hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg transform hover:-translate-y-1">
                    Subscribe on Apple
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-gray-600">
                    Listen on Spotify
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 -mt-10">
        <div className="space-y-6">
            {episodes.map(ep => (
                <div key={ep.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-gray-100">
                    <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 text-babylon-500">
                        <Play size={24} fill="currentColor" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 uppercase tracking-wide font-bold">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {ep.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {ep.duration}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{ep.title}</h3>
                        <p className="text-gray-600 text-sm">{ep.desc}</p>
                    </div>
                    <button className="text-babylon-500 font-bold text-sm border border-babylon-500 px-4 py-2 rounded hover:bg-babylon-50 transition-colors whitespace-nowrap">
                        Play Episode
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};