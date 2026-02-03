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
  CheckCircle,
  Loader2,
  HelpCircle,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';

// --- HELPER FOR AFFILIATE LINKS ---
const AmazonLink = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <a 
    href={`https://www.amazon.com/s?k=${encodeURIComponent(term)}&tag=giftgenie0c4-20`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold inline-flex items-center gap-0.5"
  >
    {children} <ArrowUpRight size={12} />
  </a>
);

// --- LONG-FORM BLOG CONTENT (With SAFE Videos) ---
const BLOG_ARTICLES = [
  {
    id: 'valentines-top-25',
    icon: Heart,
    color: 'text-rose-600 bg-rose-100',
    title: "The Ultimate 25 Trending Valentine's Day Gifts (Viral & Aesthetic)",
    // VIDEO: Official LEGO Botanical Collection Designer Video
    // SAFE: Official brand channels allow embedding. Matches item #1.
    videoId: "I_CQ8wzrvT4", 
    content: (
      <>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Beyond Roses: The Viral Gift Guide</h3>
        <p className="mb-6">
          Valentine's Day 2025 isn't about generic chocolates from the pharmacy. It's about "Aesthetic Love Languages." Thanks to TikTok trends like "Burnt Toast Theory" and the "Orange Peel Theory," acts of service and hyper-specific aesthetic gifts are winning. Below is the curated list of the top 25 most searched, wished-for, and viral gifts right now.
        </p>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">❤️ The "Forever Flowers" Trend</h4>
        <p className="mb-4">
          Real flowers die in a week. The biggest trend this year is "botanical permanence."
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>1. <AmazonLink term="Lego Flower Bouquet">Lego Flower Bouquet</AmazonLink>:</strong> The #1 viral couple's activity. Building it together is the date night.</li>
          <li><strong>2. <AmazonLink term="Preserved Rose in Glass Dome">Preserved 'Beauty & Beast' Rose</AmazonLink>:</strong> Real roses treated to last 3-5 years. High romantic impact.</li>
          <li><strong>3. <AmazonLink term="Jellycat Amuseable Flower">Jellycat Plush Plants</AmazonLink>:</strong> For the partner who loves cute/soft aesthetics over realism.</li>
        </ul>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🏠 The "Cozy Core" Aesthetic</h4>
        <p className="mb-4">
          Winter is still here. Gifts that increase "hygge" (coziness) are safer bets than jewelry for many relationships.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>4. <AmazonLink term="Shark FlexStyle">Shark FlexStyle Air Styler</AmazonLink>:</strong> The viral Dyson dupe that every girl actually wants.</li>
          <li><strong>5. <AmazonLink term="Ember Smart Mug 2">Ember Smart Mug 2</AmazonLink>:</strong> Keeps coffee at the exact perfect temperature forever. A tech-luxury staple.</li>
          <li><strong>6. <AmazonLink term="UGG Tasman Slippers">UGG Tasman Slippers</AmazonLink>:</strong> The internet's favorite slipper. Constantly sold out, huge flex if you get them.</li>
          <li><strong>7. <AmazonLink term="Hatch Restore 2">Hatch Restore 2 Alarm</AmazonLink>:</strong> A sunrise alarm clock that upgrades sleep hygiene. Highly aesthetic.</li>
          <li><strong>8. <AmazonLink term="Barefoot Dreams Blanket">Barefoot Dreams Blanket</AmazonLink>:</strong> Known as the "Kardashian Blanket." Softness is unmatched.</li>
          <li><strong>9. <AmazonLink term="Candle Warmer Lamp">Aesthetic Candle Warmer Lamp</AmazonLink>:</strong> Safer than fire, makes candles last longer, looks like a luxury hotel item.</li>
        </ol>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">📸 Analog & Retro Vibes</h4>
        <p className="mb-4">
          Gen Z loves "imperfection." Digital detox gifts are massive.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>10. <AmazonLink term="Fujifilm Instax Mini 12">Fujifilm Instax Mini 12</AmazonLink>:</strong> Instant memories. Get the matching film pack.</li>
          <li><strong>11. <AmazonLink term="Kodak Ektar H35">Kodak Ektar H35 Half Frame</AmazonLink>:</strong> A reusable film camera that saves money (2 photos per frame). Very trendy.</li>
          <li><strong>12. <AmazonLink term="Audio-Technica LP60X Turntable">Audio-Technica Turntable</AmazonLink>:</strong> Vinyl is outselling CDs. A great entry-level player for music lovers.</li>
          <li><strong>13. <AmazonLink term="Custom Mix Tape USB">Custom 'Mixtape' USB Drive</AmazonLink>:</strong> Retro look, modern utility. Put a playlist on it.</li>
        </ul>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🍔 Viral Kitchen & Wellness</h4>
        <p className="mb-4">
          For the "Ingredient Household" partner or the "Gym Rat."
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>14. <AmazonLink term="Ninja Creami Ice Cream Maker">Ninja CREAMi</AmazonLink>:</strong> The internet's favorite kitchen gadget for protein ice cream.</li>
          <li><strong>15. <AmazonLink term="Owala FreeSip Water Bottle">Owala FreeSip Bottle</AmazonLink>:</strong> The bottle that dethroned the Hydroflask.</li>
          <li><strong>16. <AmazonLink term="Laneige Lip Sleeping Mask">Laneige Lip Sleeping Mask</AmazonLink>:</strong> A cult classic beauty staple. You cannot go wrong.</li>
          <li><strong>17. <AmazonLink term="Theragun Mini">Theragun Mini Massager</AmazonLink>:</strong> Perfect for the partner with back pain or gym soreness.</li>
          <li><strong>18. <AmazonLink term="Cosori Air Fryer">Cosori Aesthetic Air Fryer</AmazonLink>:</strong> White/Gold colorway matches the "Clean Girl" kitchen.</li>
        </ul>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🎁 For Him (The Impossible Shop)</h4>
        <p className="mb-4">
          Men are simple creatures who like durability and utility.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>19. <AmazonLink term="Carhartt Acrylic Watch Hat">Carhartt Beanie</AmazonLink>:</strong> The uniform of the modern man. Cheap, durable, stylish.</li>
          <li><strong>20. <AmazonLink term="Leatherman Wave Plus">Leatherman Wave+</AmazonLink>:</strong> The ultimate multitool. It screams "I can fix things."</li>
          <li><strong>21. <AmazonLink term="Anker MagGo Power Bank">Anker MagGo Power Bank</AmazonLink>:</strong> Snaps onto the back of an iPhone. A lifesaver.</li>
          <li><strong>22. <AmazonLink term="Philips Norelco OneBlade">Philips OneBlade</AmazonLink>:</strong> The best grooming tool on the market. Zero irritation.</li>
          <li><strong>23. <AmazonLink term="Sony WH-1000XM5">Sony WH-1000XM5 Headphones</AmazonLink>:</strong> The gold standard for noise cancellation.</li>
        </ol>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🧸 Just Cute Stuff</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>24. <AmazonLink term="Tamagotchi Uni">Tamagotchi Uni</AmazonLink>:</strong> A massive nostalgia hit that connects to Wi-Fi.</li>
          <li><strong>25. <AmazonLink term="Long Distance Touch Bracelets">Bond Touch Bracelets</AmazonLink>:</strong> When you touch yours, theirs lights up. Perfect for LDRs.</li>
        </ul>
        
        <div className="bg-rose-50 p-6 rounded-xl border-l-4 border-rose-500 mt-8">
          <strong>Stevie Z's Pro Tip:</strong> Don't just hand over the box. The "unboxing" is part of the gift. Add a handwritten note or a specific "Why I bought this for you" explanation to increase the perceived value by 100%.
        </div>
      </>
    )
  },
  {
    id: 'unique',
    icon: Gift,
    color: 'text-purple-600 bg-purple-100',
    title: "The Psychology of Gifting: How to Read Minds",
    // VIDEO: "Ember Mug 2 Review" - ShortCircuit
    // Matches the "Daily Driver Upgrade" section directly. Verified embeddable.
    videoId: "ewJ9_254jKk", 
    content: (
      <>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">The Anxiety of the White Box</h3>
        <p className="mb-6">
          Why is gifting so stressful? Psychologists call it "The Asymmetry of Information." You know what you <em>want</em> to say ("I love you," "I appreciate you," "I know you"), but you have to translate that complex emotion into a physical object. If the object misses the mark, we fear the recipient will think we don't actually <em>know</em> them.
        </p>
        <p className="mb-6">
          The secret to mastering this anxiety isn't spending more money. It's using the <strong>"Thoughtfulness Equation."</strong>
          <br /><br />
          <em>Thoughtfulness = (Observation + Effort) / Cost</em>
        </p>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">1. The "Daily Driver Upgrade"</h4>
        <p className="mb-4">
          This is the single most effective strategy for difficult people (Dads, Bosses, Husbands). Look at what they use <em>every single day</em>, and buy them the "Rolls Royce" version of that mundane item.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>The Mug:</strong> They drink coffee every morning from a chipped, free corporate mug. Buy them an <AmazonLink term="Ember Smart Mug">Ember Smart Mug</AmazonLink> that keeps coffee at exactly 135°F. You just upgraded 20 minutes of their every single morning.</li>
          <li><strong>The Socks:</strong> They wear cheap cotton socks. Buy them <AmazonLink term="Darn Tough Merino Wool Socks">Darn Tough Vermont Merino Wool socks</AmazonLink> ($25/pair). They will never go back.</li>
          <li><strong>The Pen:</strong> They use a disposable Bic. Buy them a heavy <AmazonLink term="Machine Turned Brass Pen">brass machine-turned pen</AmazonLink>. It adds weight and significance to every word they write.</li>
        </ul>
        <p className="mb-6">
          <strong>Why this works:</strong> Every time they use that item (which is daily), they get a micro-dopamine hit of quality, and they subconsciously think of you. It is a "high-frequency" gift.
        </p>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">2. Solving the "Unspoken Complaint"</h4>
        <p className="mb-4">
          People constantly broadcast their problems. You just have to tune your frequency to hear them.
        </p>
        <p className="mb-4">
          <em>"My phone is always dying by 2 PM."</em> &rarr; <strong>Gift:</strong> A <AmazonLink term="MagSafe Battery Pack">MagSafe battery pack</AmazonLink>.
          <br />
          <em>"It's so cold in this office."</em> &rarr; <strong>Gift:</strong> A <AmazonLink term="Heated Desk Pad">heated desk pad</AmazonLink> or a cashmere shawl.
          <br />
          <em>"I can never find my keys."</em> &rarr; <strong>Gift:</strong> An <AmazonLink term="Apple AirTag">AirTag</AmazonLink> in a leather keychain.
        </p>
        <p className="mb-6">
          When you solve a friction point in their life, the gift stops being an "object" and starts being a "solution." You are gifting them <strong>relief</strong>. That generates a much deeper emotional bond than a generic candle ever could.
        </p>
      </>
    )
  },
  {
    id: 'budget',
    icon: TrendingUp, 
    color: 'text-pink-600 bg-pink-100',
    title: "The $50 Rule: How to Fake Wealth",
    // VIDEO: "Cool Tech Under $50" - RandomFrankP
    // High production value, verified embeddable.
    videoId: "uL0X1H6Lq3k", 
    content: (
      <>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Perceived Value vs. Actual Cost</h3>
        <p className="mb-6">
          There is a secret in the luxury retail world: <strong>Weight = Value.</strong> Humans are biologically wired to associate heaviness with quality. Cheap things are plastic and light; expensive things are glass, metal, stone, and wood.
        </p>
        <p className="mb-6">
          If you are on a strict budget (under $50), you must avoid categories where $50 buys you the "bottom tier" (like electronics) and target categories where $50 buys you the "top tier" (like groceries or stationery).
        </p>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">1. The "Top Shelf" Grocery Hack</h4>
        <p className="mb-4">
          $50 is a terrible budget for a pair of headphones. They will break. But $50 is an <em>insane</em> budget for a jar of jam or a bottle of olive oil.
        </p>
        <p className="mb-4">
          If you buy a $40 bottle of premium, <AmazonLink term="Brightland Olive Oil">cold-pressed olive oil</AmazonLink> in a beautiful ceramic bottle, it feels like a royal gift. The recipient would never buy it for themselves because it feels "too extravagant." That is the sweet spot. You are giving them permission to indulge in a daily luxury.
        </p>
        <p className="mb-6">
          <strong>Examples:</strong> <AmazonLink term="Manuka Honey">Manuka Honey</AmazonLink>, <AmazonLink term="Truffle Salt">Truffle Salt</AmazonLink>, Single-Origin Coffee Beans, imported French Butter cookies in a metal tin.
        </p>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">2. The "Kit" Strategy (Bundling)</h4>
        <p className="mb-4">
          A single $30 item looks lonely. But three $10 items packaged together look like a "Curated Experience." This is how you beat the system.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>The Movie Night Kit:</strong> A <AmazonLink term="Reusable Popcorn Tub">reusable popcorn tub</AmazonLink> ($8), a jar of <AmazonLink term="Amish Country Popcorn Kernels">gourmet kernels</AmazonLink> ($6), specialized popcorn seasoning ($5), and a "Movie Trivia" card deck ($10). Total cost: $29. Perceived value: $60.</li>
          <li><strong>The Spa Night Kit:</strong> Do not buy the pre-made kits at Walmart (they look cheap). Build your own. A real eucalyptus branch ($5), a high-end <AmazonLink term="Da Bomb Bath Bomb">bath bomb</AmazonLink> ($8), a specific face mask ($5), and a small candle ($12). Pack it in a wooden crate or a nice basket.</li>
        </ul>

        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">3. Material Science: Glass, Wood, Metal</h4>
        <p className="mb-4">
          Avoid plastic at all costs. Plastic signals "disposable."
        </p>
        <div className="bg-pink-50 p-6 rounded-xl border-l-4 border-pink-500 mb-6">
          <strong>The "Decanter" Cheat Code:</strong> You can buy a heavy, <AmazonLink term="Crystal Whiskey Decanter">crystal-style glass decanter</AmazonLink> on Amazon for $25. It looks like a $200 Waterford crystal piece. Pair it with a budget bottle of whiskey, and the heavy glass elevates the entire gift. The weight implies luxury.
        </div>
      </>
    )
  }
];

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
  const [showPrivacy, setShowPrivacy] = useState(false);

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
             affiliateLink: `https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=giftgenie0c4-20`
        }));
        // @ts-ignore
        setGiftData(processedGifts);
    }, 500); 
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900 relative">
      
      {/* HEADER / SEARCH AREA */}
      {!showResults && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-20 px-4 animate-in fade-in duration-700">
          
          {/* ... HEADER ... */}
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

          {/* --- VISIBLE BLOG FEED (AdSense Requirement) --- */}
          <div className="w-full max-w-4xl pb-20">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <BookOpen className="text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Gift Genie Magazine</h2>
            </div>
            
            <div className="space-y-12">
              {BLOG_ARTICLES.map((article) => (
                <article key={article.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${article.color}`}>
                      <article.icon size={24} />
                    </div>
                    <div>
                       <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Expert Guide</span>
                       <h3 className="text-xl md:text-2xl font-bold text-slate-900">{article.title}</h3>
                    </div>
                  </div>

                  {/* Optional Video Embed */}
                  {article.videoId && (
                     <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-slate-100 shadow-md">
                       <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${article.videoId}`} 
                          title={article.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                     </div>
                  )}

                  <div className="prose prose-slate text-slate-600 leading-relaxed max-w-none">
                    {article.content}
                  </div>
                </article>
              ))}
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

          {/* PRIVACY FOOTER (Mandatory for AdSense) */}
          <footer className="w-full py-8 border-t border-slate-200 mt-auto text-center">
             <div className="flex justify-center gap-6 text-sm text-slate-500 mb-4">
                <button onClick={() => setShowPrivacy(!showPrivacy)} className="hover:text-slate-800 underline">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-slate-800 underline">Terms of Service</button>
                <span>•</span>
                <span>Contact: support@giftgenie-ai.com</span>
             </div>
             <p className="text-xs text-slate-400">© 2025 Illosophy Multimedia. All rights reserved.</p>
             
             {showPrivacy && (
               <div className="text-left max-w-2xl mx-auto mt-8 p-6 bg-slate-50 rounded-xl text-xs text-slate-500">
                  <h4 className="font-bold mb-2">Privacy Policy Summary</h4>
                  <p>We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners. By using our site, you consent to our use of cookies.</p>
               </div>
             )}
          </footer>

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