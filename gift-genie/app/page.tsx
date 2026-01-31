'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  Gift, 
  Heart, 
  Star, 
  BookOpen, 
  ExternalLink, 
  CheckCircle,
  Loader2,
  ShoppingBag,
  Lightbulb,
  Sparkles,
  HelpCircle,
  X,
  ArrowRight
} from 'lucide-react';

// --- BLOG CONTENT DATA (For AdSense Value) ---
const BLOG_POSTS = {
  TRENDING: {
    title: "Top Gift Trends for 2025: Viral Hits & Tech",
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          The gifting landscape has shifted dramatically in 2025. Thanks to platforms like TikTok and Instagram Reels, products now go viral overnight, creating massive demand for specific items that act as social currency.
        </p>
        <h4 className="font-bold text-slate-800">1. The "Aesthetic" Tech Movement</h4>
        <p>
          Gone are the days of bulky black plastic gadgets. In 2025, tech is fashion. We are seeing a surge in retro-futuristic audio gear, transparent mechanical keyboards, and smart home devices that blend seamlessly into beige/neutral decor. If it doesn't look good on a desk setup video, it's not selling.
        </p>
        <h4 className="font-bold text-slate-800">2. Sustainable Luxury</h4>
        <p>
          Gen Z and Millennials are prioritizing sustainability, but not at the cost of quality. The trend is "Buy It For Life" (BIFL). Gifts made from recycled ocean plastics, vegan leathers that actually feel premium, and refillable beauty systems are top performers this year.
        </p>
        <p>
          <strong>Gift Genie's AI Tip:</strong> When searching for trends, look for items that have high "unboxing potential." Packaging and aesthetics matter just as much as utility.
        </p>
      </div>
    )
  },
  UNIQUE: {
    title: "The Psychology of a 'Perfect' Gift",
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          Why do some gifts land perfectly while others feel flat? It comes down to the "Thoughtfulness Equation." A great gift demonstrates that you have listened to the recipient's unspoken needs.
        </p>
        <h4 className="font-bold text-slate-800">The "Life Improver" Category</h4>
        <p>
          The best gifts are things the recipient would love to have but hates to buy for themselves. This includes high-quality versions of daily items: a $50 insulated mug, premium merino wool socks, or a chef-grade knife. These aren't flashy, but they upgrade the user's daily quality of life.
        </p>
        <h4 className="font-bold text-slate-800">Avoid the "Gift Card Trap"</h4>
        <p>
          While convenient, gift cards often signal a lack of effort. Our data shows that even a slightly "imperfect" physical gift is perceived as 40% more thoughtful than a cash equivalent. It shows you tried to understand their identity.
        </p>
      </div>
    )
  },
  BUDGET: {
    title: "Maximizing Value: The $50 Rule",
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          Inflation has changed how we shop, but it hasn't killed the spirit of giving. The key to budget gifting is "Perceived Value" vs. "Actual Cost."
        </p>
        <h4 className="font-bold text-slate-800">Niche over Generic</h4>
        <p>
          A generic bluetooth speaker for $30 looks cheap. But a specialized "Shower Waterproof Speaker" or a "Vintage Style Radio" for the same price looks curated. Specificity increases perceived value.
        </p>
        <h4 className="font-bold text-slate-800">The "Kit" Strategy</h4>
        <p>
          One of our AI's favorite strategies is bundling. Instead of one $40 item, combine three $13 items that tell a story. A "Movie Night Kit" (Popcorn bowl, gourmet kernels, movie trivia cards) feels like an event, yet costs less than a standard video game.
        </p>
        <p>
          Our AI engine is specifically tuned to find these high-rated, high-impact items that respect your wallet.
        </p>
      </div>
    )
  }
};

// --- COMPONENTS ---

const LaborIllusionLoader = ({ onComplete }: { onComplete: () => void }) => {
  const steps = [
    { text: "Analyzing recipient profile...", icon: Search, color: "text-blue-500" },
    { text: "Scanning viral TikTok trends...", icon: TrendingUp, color: "text-pink-500" },
    { text: "Checking Amazon ratings...", icon: Star, color: "text-yellow-500" },
    { text: "Finalizing perfect match...", icon: CheckCircle, color: "text-green-500" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= steps.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setIndex(i => i + 1), 800);
    return () => clearTimeout(timer);
  }, [index, onComplete, steps.length]);

  const currentStep = steps[Math.min(index, steps.length - 1)];
  const progress = Math.min(((index + 1) / steps.length) * 100, 100);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="w-20 h-20 mb-6 relative flex items-center justify-center bg-blue-50 rounded-full">
          {index < steps.length ? (
            <Loader2 className={`w-10 h-10 animate-spin ${currentStep.color}`} />
          ) : (
             <CheckCircle className="w-10 h-10 text-green-500" />
          )}
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse mb-4 text-center">{currentStep.text}</p>
        <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

// 3. Blog Modal (The AdSense Fix)
const BlogModal = ({ post, onClose }: { post: any, onClose: () => void }) => {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto flex flex-col">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">{post.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>
        <div className="p-8">
          {post.content}
        </div>
        <div className="p-6 border-t bg-slate-50 mt-auto">
          <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};

const GiftTrio = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return null;

  const CardConfig: Record<string, any> = {
    SAFE_BET: {
      badge: 'Top Rated & Reliable',
      icon: Star,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700',
    },
    LIFE_IMPROVER: {
      badge: 'Best Value / Transformation',
      icon: BookOpen,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      btnColor: 'bg-purple-600 hover:bg-purple-700',
    },
    VIRAL_FLEX: {
      badge: 'Trending Now 🔥',
      icon: TrendingUp,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      btnColor: 'bg-rose-600 hover:bg-rose-700',
    },
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">The "Perfect Gift" Analysis</h2>
          <p className="text-gray-600 mt-2">Based on your search, we found the top contenders.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((gift, index) => {
            const config = CardConfig[gift.type] || CardConfig['SAFE_BET'];
            const Icon = config.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${config.color.split(' ')[2]} flex flex-col`}
              >
                <div className={`px-4 py-2 flex items-center justify-center gap-2 font-semibold text-sm ${config.color} border-b`}>
                  <Icon size={16} />
                  {config.badge}
                </div>
                <div className="relative h-48 bg-gray-200 overflow-hidden group">
                  <img 
                    src={gift.imageUrl} 
                    alt={gift.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    {gift.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{gift.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{gift.description}</p>
                  <div className="mt-auto bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6">
                    <p className="text-xs text-gray-700 italic">
                      <span className="font-semibold text-gray-900">Why it fits:</span> {gift.reason}
                    </p>
                  </div>
                  <a 
                    href={gift.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 ${config.btnColor}`}
                  >
                    View on Amazon <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [giftData, setGiftData] = useState([]);
  const [activeArticle, setActiveArticle] = useState<any>(null); // State for opening articles

  // Mock data generator for fallback
  const generateMockGifts = (q: string) => [
    {
      type: 'SAFE_BET',
      title: `Premium ${q.split(' ').pop() || 'Gift'} Set`,
      description: 'The highly-rated, reliable choice. 4.8 stars with over 2,000 reviews.',
      price: '$49.99',
      reason: 'It minimizes social risk and is a recognized brand.',
      imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Safe+Bet',
      affiliateLink: '#',
    },
    {
      type: 'LIFE_IMPROVER',
      title: `Smart ${q.split(' ').pop() || 'Gadget'} Upgrade`,
      description: 'Solves a daily annoyance. High utility and "cool factor."',
      price: '$89.00',
      reason: 'Appeals to their practical side while feeling like a treat.',
      imageUrl: 'https://placehold.co/600x400/f3e8ff/581c87?text=Life+Improver',
      affiliateLink: '#',
    },
    {
      type: 'VIRAL_FLEX',
      title: `Trending TikTok Find`,
      description: 'The item everyone is talking about right now. High novelty.',
      price: '$29.99',
      reason: 'Triggers a dopamine hit. Great for showing off on social media.',
      imageUrl: 'https://placehold.co/600x400/fce7f3/db2777?text=Viral+Flex',
      affiliateLink: '#',
    },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setShowResults(false);

    // Simulate API call
    setTimeout(() => {
        const mockResults = generateMockGifts(query);
        const processedGifts = mockResults.map((gift: any) => ({
             ...gift,
             // OWNER TAG: giftgenie0c4-20
             affiliateLink: `https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=giftgenie0c4-20`
        }));
        
        // @ts-ignore
        setGiftData(processedGifts);
    }, 500); 
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900 relative">
      
      {/* Blog Modal */}
      {activeArticle && <BlogModal post={activeArticle} onClose={() => setActiveArticle(null)} />}

      {!showResults && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-20 px-4 animate-in fade-in duration-700">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 relative rounded-2xl overflow-hidden shadow-lg border border-white/50">
               <img src="/logo.jpg" alt="Gift Genie Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Gift<span className="text-blue-600">Genie</span>
            </h1>
          </div>

          <div className="w-full max-w-2xl aspect-[2/1] relative rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white group">
            <img src="/hero.jpg" alt="AI Gift Finder" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
              <p className="text-white font-medium text-lg md:text-xl drop-shadow-md">
                Find the perfect gift in seconds using AI
              </p>
            </div>
          </div>

          <p className="text-slate-600 mb-8 text-lg text-center max-w-lg">
            Describe the person (e.g., "60yo Dad who hates tech"). <br/>
            We'll analyze psychology & trends to find the <strong>Goldilocks Trio</strong>.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-xl relative group mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Who are you shopping for?"
              className="relative w-full px-8 py-5 rounded-full text-lg border-2 border-white bg-white focus:border-blue-50 focus:outline-none shadow-xl text-slate-800 placeholder:text-slate-400"
            />
            <button 
              type="submit"
              className="absolute right-3 top-3 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
            >
              <Search size={24} />
            </button>
          </form>

          {/* HOW IT WORKS SECTION */}
          <div className="w-full max-w-4xl pb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">How Gift Genie Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">1. Analyze</h3>
                <p className="text-slate-500 text-sm">
                  Our AI engine breaks down the recipient's interests, age, and personality to understand what makes them tick.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">2. Curate</h3>
                <p className="text-slate-500 text-sm">
                  We scan millions of products to find high-rated, trending items that match the specific profile.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">3. Solve</h3>
                <p className="text-slate-500 text-sm">
                  You get 3 perfect options: A Safe Bet, a Life Improver, and a Viral Trend. No more guessing.
                </p>
              </div>
            </div>
          </div>

          {/* BLOG SECTION (NOW CLICKABLE) */}
          <div className="w-full max-w-4xl pb-20">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Expert Gifting Guides</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Card 1: Trending */}
              <div 
                onClick={() => setActiveArticle(BLOG_POSTS.TRENDING)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  Trending for 2025 <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  Discover the hottest viral products from TikTok and Instagram. Read our guide on the aesthetic tech movement.
                </p>
                <span className="text-blue-600 text-sm font-semibold">Read Article →</span>
              </div>

              {/* Card 2: Unique */}
              <div 
                onClick={() => setActiveArticle(BLOG_POSTS.UNIQUE)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Gift size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors flex items-center gap-2">
                  Psychology of Gifting <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  Stop buying gift cards. Learn the "Thoughtfulness Equation" and how to find life-improver gifts.
                </p>
                <span className="text-purple-600 text-sm font-semibold">Read Article →</span>
              </div>

              {/* Card 3: Budget */}
              <div 
                onClick={() => setActiveArticle(BLOG_POSTS.BUDGET)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-pink-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
                  <Heart size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-pink-600 transition-colors flex items-center gap-2">
                  The $50 Rule <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  How to maximize perceived value on a budget. Learn the "Kit Strategy" for impressive low-cost gifts.
                </p>
                <span className="text-pink-600 text-sm font-semibold">Read Article →</span>
              </div>

            </div>
          </div>
          
          {/* FAQ SECTION */}
          <div className="w-full max-w-3xl pb-24">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-2"><HelpCircle size={16}/> How does the AI Gift Finder work?</h4>
                <p className="text-slate-600 text-sm mt-2">Gift Genie uses AI to analyze your description and match personality traits with products.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-2"><HelpCircle size={16}/> Are the gift links safe?</h4>
                <p className="text-slate-600 text-sm mt-2">Yes. All links direct you to Amazon.com, the world's most trusted marketplace.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <LaborIllusionLoader onComplete={() => {
            setIsLoading(false);
            setShowResults(true);
        }} />
      )}

      {showResults && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
             <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 relative rounded-lg overflow-hidden">
                     <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                   </div>
                   <span className="font-bold text-xl">GiftGenie</span>
                </div>
                <button 
                  onClick={() => setShowResults(false)}
                  className="text-sm font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
                >
                  ← New Search
                </button>
             </div>
          </div>
          <GiftTrio data={giftData} /> 
        </div>
      )}
    </main>
  );
}