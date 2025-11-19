import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, ArticleCategory } from '../types';
import { Calendar, User, ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
  post: BlogPost;
  featured?: boolean;
}

export const ArticleCard: React.FC<Props> = ({ post, featured = false }) => {
  const categoryColors: Record<string, string> = {
    [ArticleCategory.REVIEW]: 'bg-blue-100 text-blue-800',
    [ArticleCategory.NEWS]: 'bg-red-100 text-red-800',
    [ArticleCategory.GAMIFICATION]: 'bg-purple-100 text-purple-800',
    [ArticleCategory.PODCAST]: 'bg-amber-100 text-amber-800',
  };

  const badgeColor = categoryColors[post.category] || 'bg-gray-100 text-gray-800';

  if (featured) {
    return (
      <div className="relative group overflow-hidden rounded-xl shadow-lg h-[500px]">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white w-full md:w-2/3">
           <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider py-1 px-2 rounded ${badgeColor}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-300 flex items-center gap-1">
              <Calendar size={12} /> {post.date}
            </span>
           </div>
           <Link to={`/post/${post.id}`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 hover:text-babylon-500 transition-colors leading-tight">
              {post.title}
            </h2>
           </Link>
           <p className="text-gray-300 mb-6 line-clamp-2 text-lg">
             {post.excerpt}
           </p>
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-sm font-medium">
                <User size={16} /> {post.author}
             </div>
             {post.seoScore && (
               <div title="SEO Score" className="flex items-center gap-1 text-green-400 text-xs font-mono border border-green-400 rounded px-2 py-0.5 bg-green-400/10">
                 <CheckCircle size={10} /> SEO: {post.seoScore}/100
               </div>
             )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        {post.isMigrated && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded uppercase tracking-wide backdrop-blur-sm">
            Medium Archive
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded ${badgeColor}`}>
            {post.category}
          </span>
          <span className="text-gray-400 text-xs">{post.date}</span>
        </div>
        <Link to={`/post/${post.id}`} className="block flex-grow">
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 hover:text-babylon-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        </Link>
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">By {post.author}</span>
          <Link to={`/post/${post.id}`} className="text-babylon-500 hover:text-babylon-700 text-xs font-bold uppercase flex items-center gap-1 group">
            Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};