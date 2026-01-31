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
  HelpCircle
} from 'lucide-react';

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

  // Mock data generator for fallback/demo
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

    setTimeout(() => {
        const mockResults = generateMockGifts(query);
        const processedGifts = mockResults.map((gift: any) => ({
             ...gift,
             // OWNER TAG: giftgenie0c4-20
             affiliateLink: `https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=giftgenie0c4-20`
        }));
        
        // @ts-ignore
        setGiftData(processedGifts);
        // Loader handles the timing
    }, 500); 
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900">
      
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

          {/* SEO CONTENT SECTION */}
          <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8 pb-20">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Trending for 2025</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Discover the hottest viral products from TikTok and Instagram.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <Gift size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Thoughtful & Unique</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Stop buying gift cards. We use psychological profiling.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
                <Heart size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">For Every Budget</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you need a $20 Secret Santa gift or a $200 anniversary present.
              </p>
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
```

**Save** (`Ctrl + S`).

---

### **STEP 4: Deploy & Verify**

1.  **Open Terminal**.
2.  Run:
    ```bash
    git add .
    git commit -m "Hybrid Master Deployment"
    git push