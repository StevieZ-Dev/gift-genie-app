'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Star, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  Loader2, 
  ExternalLink, 
  Smartphone, 
  Download, 
  X,
  Menu,
  Mail,
  Zap,
  ArrowRight,
  ChevronRight,
  User,
  Calendar
} from 'lucide-react';

// --- MOCK DATA GENERATORS ---

const generateMockResults = (query: string) => [
  {
    type: 'SAFE_BET',
    title: `Premium ${query.split(' ').pop() || 'Gift'} Set`,
    description: 'The "Can\'t Go Wrong" choice. High utility, 5-star build quality, and zero social risk.',
    price: '$49.99',
    reason: 'Solves the "what if they hate it" anxiety. It\'s practical, recognized, and universally loved.',
    rating: 4.9,
  },
  {
    type: 'LIFE_IMPROVER',
    title: `MasterClass: Advanced ${query.split(' ').pop() || 'Skills'}`,
    description: 'Don\'t just give a thing, give a new superpower. A complete video course to upgrade their life.',
    price: '$97.00',
    reason: 'Appeals to their growth mindset. Shows you pay attention to who they want to BECOME.',
  },
  {
    type: 'VIRAL_FLEX',
    title: `Trending "${query.split(' ').pop() || 'Cool'} Widget"`,
    description: 'The #1 viral gadget blowing up on TikTok right now. Pure dopamine in a box.',
    price: '$29.99',
    reason: 'Immediate "Wow" factor. Makes them feel trendy and gives them something to show off instantly.',
  },
];

const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "10 Gifts for the Dad Who Says He Wants 'Nothing'",
    excerpt: "Stop buying him socks. We analyzed 50,000 data points to find out what 60-year-old men actually want but won't ask for.",
    image: "https://placehold.co/800x400/1e293b/ffffff?text=Gifts+for+Dad",
    date: "Oct 24, 2025",
    author: "Genie AI",
    category: "Family"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Buying for 'Crunchy' Gen Z Teens",
    excerpt: "From moss decor to vintage cameras, here is the aesthetic guide to impressing the most difficult demographic on earth.",
    image: "https://placehold.co/800x400/0f172a/ffffff?text=Gen+Z+Guide",
    date: "Oct 22, 2025",
    author: "Sarah Jenkins",
    category: "Trends"
  },
  {
    id: 3,
    title: "Why 80% of Valentine's Gifts End up in the Trash",
    excerpt: "The psychology of 'Bad Gifting' is simple. Here are the 3 rules you need to follow to ensure your partner feels seen.",
    image: "https://placehold.co/800x400/334155/ffffff?text=Valentines+Failures",
    date: "Oct 20, 2025",
    author: "Dr. Gift",
    category: "Psychology"
  },
];

// --- AD COMPONENTS ---

const AdUnit = ({ format = "horizontal", label = "Sponsor" }) => {
  const isVertical = format === "vertical";
  const isSticky = format === "sticky";
  
  if (isSticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-2 flex justify-center animate-in slide-in-from-bottom-full duration-700">
        <div className="w-full max-w-[728px] h-[90px] bg-gray-100 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs">
          <span className="font-bold text-gray-500">STICKY FOOTER AD (High CPM)</span>
          <span>Google AdSense 728x90</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm font-medium p-2 relative overflow-hidden group ${isVertical ? 'h-[600px] w-full' : 'h-32 w-full my-6'}`}>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%,rgba(0,0,0,0.02)_100%)] bg-[length:20px_20px]"></div>
      <span className="z-10 font-bold text-gray-500 mb-1">ADVERTISEMENT ({label})</span>
      <span className="z-10 text-xs opacity-70">Automated by Google AdSense</span>
    </div>
  );
};

// --- LEAD MAGNET MODAL ---

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState('capture'); 
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep('download'), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full z-20">
              <X size={20} />
            </button>

            <div className="p-0">
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-10 text-center text-white relative overflow-hidden">
                <Smartphone className="mx-auto mb-4 drop-shadow-xl relative z-10" size={56} />
                <h3 className="text-3xl font-black mb-2 relative z-10">Get the Direct Link 📲</h3>
                <p className="text-blue-200 font-medium relative z-10">Enter your email to receive the direct download link for iOS/Android.</p>
              </div>

              <div className="p-8 bg-white">
                {step === 'capture' ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Where should we send the app?</label>
                        <input 
                          type="email" 
                          required
                          placeholder="name@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-lg bg-gray-50 focus:bg-white text-slate-900"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 text-lg group">
                        Unlock Download <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <div className="mt-6 flex justify-center gap-4 text-gray-400">
                        <Star size={16} className="fill-gray-300 text-gray-300"/>
                        <span className="text-xs font-medium">Trusted by 250,000+ users</span>
                        <Star size={16} className="fill-gray-300 text-gray-300"/>
                    </div>
                  </>
                ) : (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Check your Inbox! 🚀</h3>
                    <p className="text-gray-600 mb-8 text-sm">
                      We sent a secure link to <strong>{email}</strong>. Or download directly below:
                    </p>
                    <div className="space-y-3">
                      <button className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors font-bold shadow-lg border border-gray-800">
                        <span>Download on the <br/><span className="text-xs font-normal">App Store</span></span>
                      </button>
                      <button className="w-full bg-white text-slate-900 border-2 border-slate-200 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-bold shadow-lg">
                        <span>Get it on <br/><span className="text-xs font-normal">Google Play</span></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- BLOG COMPONENTS ---

const BlogCard = ({ post, onClick }: { post: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
  >
    <div className="h-48 overflow-hidden relative bg-gray-200">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wide">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
        <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
      </div>
    </div>
  </div>
);

const BlogPostView = ({ post, onBack, onOpenDownload }: { post: any; onBack: () => void; onOpenDownload: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 mb-6">
      <ChevronRight className="rotate-180" size={16} /> Back to Blog
    </button>

    <div className="flex flex-col lg:flex-row gap-12">
      {/* Main Article Content */}
      <article className="flex-1">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">AI</div>
              <span>By {post.author}</span>
           </div>
           <span>•</span>
           <span>{post.date}</span>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-lg bg-gray-200" />

        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="lead text-xl text-gray-900 font-medium mb-6">
            Finding the perfect gift is usually a nightmare. But thanks to our new AI analysis, we've broken down the exact psychology behind what makes a gift "perfect" for this specific demographic.
          </p>
          
          <AdUnit label="In-Article Top" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. The Psychology of the Recipient</h2>
          <p className="mb-6">
            Most people buy what <em>they</em> like, not what the recipient needs. Our data shows that 82% of gifts are returned because they don't align with the recipient's daily routine. The key is to find the intersection between utility and novelty.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. The Top 3 Recommendations</h2>
          <p className="mb-6">
            Based on our algorithm, here are the top 3 items that fit this profile perfectly:
          </p>

          {/* Embedded Product Cards */}
          <div className="grid gap-6 my-8 not-prose">
             {generateMockResults("Blog Context").map((gift, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                   <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                      <img src={`https://placehold.co/200x200?text=Product`} alt="Prod" className="w-full h-full object-cover"/>
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">{gift.type}</span>
                        <span className="font-bold text-gray-900">{gift.price}</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{gift.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{gift.description}</p>
                      <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
                        Check Price on Amazon <ExternalLink size={14}/>
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <AdUnit label="In-Article Middle" />
        </div>

        {/* Article CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Download size={32} />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Want the full list?</h3>
              <p className="text-blue-200 mb-4">Download the app to unlock the "Secret Vault" of gift ideas.</p>
              <button 
                onClick={onOpenDownload}
                className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Download App <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8 shrink-0">
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
            <h4 className="font-bold text-gray-900 mb-4">Trending Now</h4>
            <div className="space-y-4">
               {[1,2,3].map((_, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                     <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                        <img src={`https://placehold.co/100x100?text=Post+${i+1}`} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                        <h5 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Top 5 Gifts for Coffee Lovers</h5>
                        <span className="text-xs text-gray-400">4 min read</span>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="my-6 border-t border-gray-100 pt-6">
               <AdUnit format="vertical" label="Sidebar Ad" />
            </div>

            <button 
              onClick={onOpenDownload}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Get GiftGenie App
            </button>
         </div>
      </aside>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [view, setView] = useState('HOME'); // HOME, SEARCH_RESULTS, BLOG_LIST, BLOG_POST
  const [activePost, setActivePost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!query) return;
    setIsLoading(true);
    setView('SEARCH_RESULTS');
    
    setTimeout(() => {
       setResults(generateMockResults(query));
       setIsLoading(false);
    }, 2000);
  };

  const openBlog = () => setView('BLOG_LIST');
  
  const openPost = (post: any) => {
    setActivePost(post);
    setView('BLOG_POST');
    window.scrollTo(0,0);
  };

  const goHome = () => {
    setView('HOME');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden pb-24">
      
      {/* TOP AD BANNER */}
      <div className="bg-slate-900 text-white py-2 text-center text-xs font-bold tracking-widest uppercase">
         Launch Special: Get 50% Off Premium Features this week
      </div>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border-2 border-white bg-blue-600">
                 {/* Ensure logo.jpg is in your public folder */}
                 <img src="/logo.jpg" alt="Genie" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none">Gift<span className="text-blue-600">Genie</span></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Shopping Assistant</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={openBlog} className={`text-sm font-bold transition-colors ${view.includes('BLOG') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                Gift Guides (Blog)
              </button>
              <button className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">Success Stories</button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Download size={18} /> Get App
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
              <button onClick={() => {openBlog(); setIsMenuOpen(false)}} className="block w-full text-left font-bold text-gray-600">Blog</button>
              <button onClick={() => setIsModalOpen(true)} className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Download App</button>
           </div>
        )}
      </nav>

      {/* MAIN CONTENT SWITCHER */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: HOME */}
        {view === 'HOME' && (
           <div className="flex flex-col items-center animate-in fade-in duration-700">
              <div className="max-w-4xl w-full text-center py-16 md:py-24">
                 <div className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm rounded-full px-4 py-1.5 mb-8">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">AI Engine Online • v3.0</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
                   The Intelligent Way to <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Buy Gifts.</span>
                 </h1>
                 
                 {/* Search Box */}
                 <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group z-10">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
                       <input 
                         type="text" 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="Describe them (e.g. 30yo Chef who loves Sci-Fi)..." 
                         className="w-full px-6 py-4 text-lg font-medium outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
                       />
                       <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-colors">
                          Generate
                       </button>
                    </div>
                 </form>
              </div>
              
              <AdUnit label="Home Hero Banner" />

              {/* Latest Blog Posts Section on Home */}
              <div className="w-full mt-24">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900">Latest Gift Guides</h2>
                    <button onClick={openBlog} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                       View All <ArrowRight size={16} />
                    </button>
                 </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_BLOG_POSTS.map(post => (
                       <BlogCard key={post.id} post={post} onClick={() => openPost(post)} />
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* VIEW: SEARCH RESULTS */}
        {view === 'SEARCH_RESULTS' && (
           <div className="min-h-[60vh]">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                    <h3 className="text-xl font-bold animate-pulse text-slate-600">Consulting the Oracle...</h3>
                 </div>
              ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-8">
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-black text-slate-900">Results for: "{query}"</h2>
                       <button onClick={goHome} className="text-gray-500 font-bold hover:text-black">New Search</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                       {results.map((gift, i) => (
                          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                             <div className="bg-blue-50 text-blue-700 text-xs font-bold inline-block px-2 py-1 rounded mb-4">{gift.type}</div>
                             <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                                <img src={`https://placehold.co/400x300?text=${gift.title}`} className="object-cover w-full h-full" alt="Gift"/>
                             </div>
                             <h3 className="font-bold text-lg mb-2">{gift.title}</h3>
                             <p className="text-gray-600 text-sm mb-4">{gift.description}</p>
                             <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">Check Price</button>
                          </div>
                       ))}
                    </div>
                    <AdUnit label="Search Results Bottom" />
                 </div>
              )}
           </div>
        )}

        {/* VIEW: BLOG LIST */}
        {view === 'BLOG_LIST' && (
           <div className="animate-in fade-in">
              <div className="text-center py-12">
                 <h1 className="text-4xl font-black text-gray-900 mb-4">Gift Genie Blog</h1>
                 <p className="text-xl text-gray-500 max-w-2xl mx-auto">Expert guides, psychological analysis, and viral trends to help you become the best gift-giver in your circle.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {/* Duplicate mock posts to fill the grid */}
                 {[...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS].map((post, i) => (
                    <BlogCard key={i} post={post} onClick={() => openPost(post)} />
                 ))}
              </div>
              <div className="mt-12 text-center">
                 <button className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-3 rounded-full font-bold hover:border-blue-600 hover:text-blue-600 transition-colors">
                    Load More Articles
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: BLOG POST */}
        {view === 'BLOG_POST' && activePost && (
           <BlogPostView 
             post={activePost} 
             onBack={openBlog} 
             onOpenDownload={() => setIsModalOpen(true)} 
           />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-32 mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded bg-slate-900"></div>
               <span className="font-black text-xl">GiftGenie</span>
            </div>
            <div className="flex gap-8 mb-8 text-sm font-bold text-gray-500">
               <button onClick={openBlog} className="hover:text-blue-600">Blog</button>
               <button className="hover:text-blue-600">About</button>
               <button className="hover:text-blue-600">Contact</button>
               <button onClick={() => setIsModalOpen(true)} className="hover:text-blue-600">Download App</button>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Gift Genie AI. All rights reserved. Passive Income Engine.</p>
         </div>
      </footer>

      {/* STICKY FOOTER AD */}
      <AdUnit format="sticky" />

      {/* LEAD MAGNET MODAL */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}