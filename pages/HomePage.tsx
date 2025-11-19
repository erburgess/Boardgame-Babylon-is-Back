import React, { useEffect, useState } from 'react';
import { Mic, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateInitialPosts } from '../services/gemini';
import { BlogPost, ArticleCategory } from '../types';
import { ArticleCard } from '../components/ArticleCard';

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await generateInitialPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 0 ? posts.slice(1) : [];

  return (
    <div className="min-h-screen bg-babylon-50">
      {/* Podcast Hero Notification */}
      <div className="bg-babylon-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent text-white p-2 rounded-full animate-pulse">
              <Mic size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">The Boardgame Babylon Podcast is Back!</h3>
              <p className="text-xs text-gray-300">New episodes dropping weekly. Subscribe now.</p>
            </div>
          </div>
          <Link to="/podcast" className="bg-white text-babylon-900 hover:bg-gray-200 text-xs font-bold py-2 px-4 rounded-full transition-colors uppercase tracking-wide">
            Listen Now
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                The Art of Board Games & <br/><span className="text-babylon-500 italic">Serious Fun</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
                We've remastered the classic Boardgame Babylon archives and migrated our best content from Medium. 
                Dive into SEO-optimized reviews, industry analysis, and gamification strategies.
            </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <RefreshCw className="animate-spin text-babylon-500 mb-4" size={48} />
            <p className="text-gray-500 font-mono text-sm">Consulting the Oracle (Gemini AI)...</p>
          </div>
        ) : (
          <>
             {/* Featured Post */}
             {featuredPost && (
                <div className="mb-12">
                   <ArticleCard post={featuredPost} featured={true} />
                </div>
             )}

             {/* Categories / Filter Tabs (Visual only for now) */}
             <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
               <button className="text-babylon-700 font-bold border-b-2 border-babylon-500 pb-4 -mb-4.5 px-2">Latest</button>
               <button className="text-gray-500 hover:text-gray-700 font-medium px-2 transition-colors">Reviews</button>
               <button className="text-gray-500 hover:text-gray-700 font-medium px-2 transition-colors">News</button>
               <button className="text-gray-500 hover:text-gray-700 font-medium px-2 transition-colors flex items-center gap-1">
                  <Sparkles size={14} /> Gamification
               </button>
             </div>

             {/* Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {regularPosts.map(post => (
                 <ArticleCard key={post.id} post={post} />
               ))}
             </div>
             
             {/* View All / Pagination */}
             <div className="mt-16 text-center">
               <Link to="/blog" className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-babylon-50 hover:border-babylon-500 transition-all shadow-sm">
                 View All Archives <ArrowRight size={18} />
               </Link>
             </div>
          </>
        )}
      </main>
      
      {/* SEO / Gamification Teaser Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded mb-4 uppercase tracking-wide">From the Medium Archive</div>
                    <h3 className="font-serif text-3xl font-bold text-gray-900 mb-6">Why Gamification Matters</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        We have transferred our complete library of gamification case studies from Medium. 
                        Learn how game mechanics are transforming education, corporate training, and productivity apps.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {['Behavioral Economics', 'Player Types & Motivation', 'Enterprise Loyalty Programs'].map(item => (
                            <li key={item} className="flex items-center gap-2 text-gray-700 font-medium">
                                <CheckCircle size={18} className="text-babylon-500" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/gamification" className="text-babylon-700 font-bold hover:underline decoration-2 underline-offset-4">
                        Explore the Collection
                    </Link>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-babylon-500 rounded-2xl transform rotate-3 opacity-10"></div>
                    <img 
                        src="https://picsum.photos/600/400?grayscale" 
                        alt="Gamification Concept" 
                        className="relative rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const CheckCircle = ({size, className}: {size:number, className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);