import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { generateFullArticle, generateInitialPosts } from '../services/gemini';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Share2, Tag, RefreshCw } from 'lucide-react';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // In a real app, we'd fetch the specific post from an API/Store.
      // Here, we regenerate the list to find the "metadata" (simulated cache)
      // or create a dummy one if not found to allow deep linking demo.
      const posts = await generateInitialPosts();
      const found = posts.find(p => p.id === id) || posts[0]; // Fallback to first for demo if refresh happens
      
      if (found) {
        setPost(found);
        // Generate the full content on the fly
        const generatedContent = await generateFullArticle(found.title, found.category);
        setContent(generatedContent);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
       <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <RefreshCw className="animate-spin text-babylon-500 mb-4" size={48} />
          <p className="text-gray-600 font-serif text-lg animate-pulse">Restoring from Archive...</p>
          <p className="text-gray-400 text-sm mt-2">Generating SEO-optimized content via Gemini</p>
       </div>
    );
  }

  if (!post) return <div>Post not found</div>;

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-5xl mx-auto">
            <div className="mb-4">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium mb-6">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-babylon-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {post.category}
                    </span>
                    {post.isMigrated && (
                        <span className="bg-gray-700 text-gray-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Migrated from Medium
                        </span>
                    )}
                </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm md:text-base text-gray-200">
                <div className="flex items-center gap-2">
                    <div className="bg-gray-600 rounded-full p-1">
                         <User size={16} />
                    </div>
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
         <div className="bg-white rounded-t-2xl p-8 md:p-12 shadow-sm border border-gray-100">
             
             {/* SEO Score Widget (Simulated) */}
             <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-8">
                 <div className="flex gap-4">
                    <button className="text-gray-500 hover:text-babylon-500"><Share2 size={20} /></button>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">SEO Score</p>
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{width: `${post.seoScore}%`}}></div>
                        </div>
                        {post.seoScore}/100
                    </div>
                 </div>
             </div>

             {/* Markdown Content */}
             <div className="prose prose-lg prose-babylon max-w-none text-gray-700 font-serif">
                <ReactMarkdown>{content}</ReactMarkdown>
             </div>

             {/* Tags */}
             <div className="mt-12 pt-8 border-t border-gray-100">
                 <div className="flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                            <Tag size={14} /> {tag}
                        </span>
                    ))}
                 </div>
             </div>
         </div>
      </div>
    </article>
  );
};