'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ArrowUpRight,
  Play,
  Trophy,
  Gamepad2,
  X,
  Mail,
  Music
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

// --- COMPONENT: GAME AD UNIT (AdSense) ---
const GameAd = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      // Safety check to ensure ad script doesn't crash app if blocked
      const ads = (window as any).adsbygoogle || [];
      ads.push({});
    } catch (err) {
      // Silent fail for ad blockers
    }
  }, []);

  return (
    <div className="my-6 flex justify-center bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '300px', height: '250px' }}
        data-ad-client="ca-pub-6068418321673019"
        data-ad-slot="5336115674" 
      ></ins>
    </div>
  );
};

// --- COMPONENT: BULLETPROOF VIDEO PLAYER ---
const YouTubeFacade = ({ videoId, title }: { videoId: string, title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-black shadow-md">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
          title={title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsPlaying(true)}
      className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-slate-900 shadow-md relative group cursor-pointer"
    >
      <img 
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
        alt={title}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play size={32} className="text-white fill-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-white text-xs font-bold">
        Watch Review
      </div>
    </div>
  );
};

// --- COMPONENT: SECRET GAME ENGINE (Genie's Gift Rush) ---
const GenieGameModal = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load High Score safely (Client Side Only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem('genie_highscore');
      if (savedScore) {
        setHighScore(parseInt(savedScore));
      }
    }
  }, []);

  // Update High Score
  useEffect(() => {
    if (gameState === 'GAMEOVER') {
      if (score > highScore) {
        setHighScore(score);
        if (typeof window !== 'undefined') {
          localStorage.setItem('genie_highscore', score.toString());
        }
      }
    }
  }, [gameState, score, highScore]);

  const handleSubmit = async () => {
    if (!email.includes('@')) return; 
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          score: score,
          source: 'GenieRush_Game'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Network error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Game Loop Logic
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;
    let genieY = 150;
    let velocity = 0;
    const gravity = 0.5;
    const jumpStrength = -8;
    let obstacles: { x: number, y: number, type: 'cloud' | 'gift' }[] = [];
    const speed = 3;

    const loop = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#93c5fd');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      velocity += gravity;
      genieY += velocity;
      if (genieY > canvas.height - 40) setGameState('GAMEOVER');
      if (genieY < 0) { genieY = 0; velocity = 0; }

      ctx.font = '40px Arial';
      ctx.fillText('🧞‍♂️', 50, genieY);

      if (frameCount % 100 === 0) {
        const type = Math.random() > 0.3 ? 'cloud' : 'gift';
        const y = Math.random() * (canvas.height - 100) + 50;
        obstacles.push({ x: canvas.width, y, type });
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= speed;
        if (obs.type === 'cloud') {
          ctx.fillText('⛈️', obs.x, obs.y);
          if (50 < obs.x + 30 && 50 + 30 > obs.x && genieY < obs.y + 30 && genieY + 30 > obs.y) setGameState('GAMEOVER');
        } else {
          ctx.fillText('🎁', obs.x, obs.y);
          if (50 < obs.x + 30 && 50 + 30 > obs.x && genieY < obs.y + 30 && genieY + 30 > obs.y) {
            setScore(s => s + 10);
            obstacles.splice(i, 1);
            continue; 
          }
        }
        if (obs.x < -50) obstacles.splice(i, 1);
      }

      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`Score: ${score}`, 20, 40);

      if (gameState === 'PLAYING') {
        animationFrameId = window.requestAnimationFrame(loop);
      }
    };
    loop();

    const handleJump = () => { velocity = jumpStrength; };
    const handleTouch = (e: TouchEvent) => { e.preventDefault(); handleJump(); };
    window.addEventListener('mousedown', handleJump);
    window.addEventListener('touchstart', handleTouch, { passive: false });
    window.addEventListener('keydown', (e) => { if(e.code === 'Space') handleJump() });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleJump);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [gameState, score]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in-95 duration-300">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden flex flex-col items-center max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-white z-10 bg-black/50 rounded-full p-1 hover:bg-black/70"><X size={20} /></button>
        {gameState === 'START' && (
          <div className="w-full relative">
            <div className="w-full h-64 relative bg-slate-800">
               <img 
                 src="/genie-rush.jpg" 
                 alt="Genie's Gift Rush" 
                 className="w-full h-full object-cover"
                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
            <div className="p-8 text-center -mt-10 relative z-10">
              <h2 className="text-3xl font-extrabold text-amber-400 drop-shadow-md mb-2">Genie's Gift Rush</h2>
              <p className="text-slate-300 mb-8 text-sm">Collect Gifts 🎁. Avoid Storms ⛈️.</p>
              <div className="bg-slate-800/50 p-4 rounded-xl mb-6 border border-slate-700">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Current High Score</p>
                <p className="text-2xl font-bold text-white">{highScore}</p>
              </div>
              <button onClick={() => { setScore(0); setGameState('PLAYING'); }} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all text-xl shadow-lg shadow-amber-500/20 uppercase tracking-widest transform hover:scale-105 active:scale-95">PLAY NOW</button>
            </div>
          </div>
        )}
        {gameState === 'PLAYING' && (
          <div className="p-4 w-full flex justify-center bg-slate-900">
             <canvas ref={canvasRef} width={350} height={500} className="bg-slate-800 rounded-xl cursor-pointer shadow-inner border border-slate-700" />
          </div>
        )}
        {gameState === 'GAMEOVER' && (
          <div className="text-center py-8 px-6 w-full">
            <div className="mb-6">
              <Trophy size={64} className="text-amber-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-4xl font-black text-white mb-1">{score}</h3>
              {score >= highScore && score > 0 && <p className="text-green-400 font-bold uppercase tracking-widest text-xs">New Personal Best!</p>}
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 text-left">
              <h4 className="text-slate-400 text-xs font-bold uppercase mb-3 flex items-center gap-2"><Trophy size={12}/> Leaderboard</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-amber-400 font-bold"><span>1. GenieMaster</span><span>2,450</span></div>
                <div className="flex justify-between text-slate-300"><span>2. GiftHunter99</span><span>1,800</span></div>
                <div className="flex justify-between text-slate-300"><span>3. Sarah_Xo</span><span>1,240</span></div>
                <div className="flex justify-between text-white border-t border-slate-600 pt-2 mt-2 bg-slate-700/50 p-2 rounded"><span>YOU</span><span>{Math.max(score, highScore)}</span></div>
              </div>
            </div>
            {!submitted ? (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
                <p className="text-white font-bold mb-2">Join the Leaderboard?</p>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 text-white mb-3 focus:border-amber-500 focus:outline-none" />
                <button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Submit Score'}</button>
              </div>
            ) : (
              <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-xl mb-6 text-green-400 flex items-center justify-center gap-2"><CheckCircle size={20} /> Saved!</div>
            )}
            <GameAd />
            <div className="flex gap-3 mt-6">
                <button onClick={() => { setScore(0); setGameState('PLAYING'); setSubmitted(false); }} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">Retry</button>
                <button onClick={onClose} className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors">Quit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SECRET VAULT MODAL (Audio Math Riddle) ---
const SecretVaultModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in-95 duration-300" onClick={onClose}>
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-lg p-8 text-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-amber-500/50">
          <Trophy size={40} className="text-amber-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">THE GOLDEN LAMP</h2>
        <p className="text-amber-400 font-mono text-xs uppercase tracking-[0.2em] mb-6">Level 99 Difficulty Active</p>
        
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8 text-left space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Welcome, Hunter. To enter the monthly draw for the <strong>$100 Amazon Spree</strong>, you must solve the Trinity Code.
          </p>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start gap-3">
              <span className="bg-slate-700 text-amber-400 text-xs font-bold px-2 py-1 rounded">KEY 1</span>
              <p className="text-xs text-slate-400">
                Go to our "Top 25 Gifts" Video on YouTube. The key is the <strong>answer to the riddle in the Pinned Comment</strong>.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-slate-700 text-amber-400 text-xs font-bold px-2 py-1 rounded">KEY 2</span>
              <p className="text-xs text-slate-400">
                Find the <strong>Ember Mug</strong> in our Psychology Article. Click through to Amazon. The key is the <strong>Date of the "Top Critical Review"</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-green-700/50 text-green-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 min-w-fit"><Music size={10} /> KEY 3</span>
              <div className="text-xs text-slate-400">
                <p className="mb-1"><strong>The Audio Math Riddle:</strong></p>
                <p className="mb-2">Go to Spotify. Find <strong>"Add To Cart" by I Am Stevie Z</strong>. Find the Track Duration (M:SS).</p>
                <div className="bg-black/30 p-2 rounded border border-slate-600 font-mono text-amber-100">
                  (Sum of all digits in Duration) x (Number of times the beat repeats) = <strong>KEY 3</strong>
                </div>
                <div className="mt-1 text-[10px] text-slate-500 italic">Hint: The song is ~2:48</div>
                <a 
                   href="https://open.spotify.com/artist/562UtYhTPT3qFQClGpmwaa?si=3g8CmYS4TJ6uL20zkhsbnQ" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-green-400 hover:text-green-300 underline mt-2 block font-semibold"
                >
                   → Listen & Solve on Spotify
                </a>
              </div>
            </div>
          </div>
        </div>

        <a 
          href="https://forms.gle/QupjXDAJbS6q8uHd8" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full block"
        >
          <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 uppercase tracking-wider">
            Submit The Trinity Code
          </button>
        </a>
        
        <p className="text-slate-500 text-xs mt-4 cursor-pointer hover:text-slate-400" onClick={onClose}>
          Give Up & Close
        </p>
      </div>
    </div>
  );
};

// --- LONG-FORM BLOG CONTENT ---
const BLOG_ARTICLES = [
  {
    id: 'valentines-top-25',
    icon: Heart,
    color: 'text-rose-600 bg-rose-100',
    title: "The Ultimate 25 Trending Valentine's Day Gifts (Viral & Aesthetic)",
    videoId: "T62FXUVzRFI", 
    content: (
      <>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Beyond Roses: The Viral Gift Guide</h3>
        <p className="mb-6">
          Valentine's Day 2025 isn't about generic chocolates from the pharmacy. It's about "Aesthetic Love Languages." Below is the curated list of the top 25 most searched, wished-for, and viral gifts right now.
        </p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">❤️ The "Forever Flowers" Trend</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>1. <AmazonLink term="Lego Flower Bouquet">Lego Flower Bouquet</AmazonLink>:</strong> The #1 viral couple's activity. Building it together is the date night.</li>
          <li><strong>2. <AmazonLink term="Preserved Rose in Glass Dome">Preserved 'Beauty & Beast' Rose</AmazonLink>:</strong> Real roses treated to last 3-5 years. High romantic impact.</li>
          <li><strong>3. <AmazonLink term="Jellycat Amuseable Flower">Jellycat Plush Plants</AmazonLink>:</strong> For the partner who loves cute/soft aesthetics over realism.</li>
        </ul>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🏠 The "Cozy Core" Aesthetic</h4>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>4. <AmazonLink term="Shark FlexStyle">Shark FlexStyle Air Styler</AmazonLink>:</strong> The viral Dyson dupe that every girl actually wants.</li>
          <li><strong>5. <AmazonLink term="Ember Smart Mug 2">Ember Smart Mug 2</AmazonLink>:</strong> Keeps coffee at the exact perfect temperature forever. A tech-luxury staple.</li>
        </ol>
        <div className="bg-rose-50 p-6 rounded-xl border-l-4 border-rose-500 mt-8">
          <strong>Stevie Z's Pro Tip:</strong> Don't just hand over the box. The "unboxing" is part of the gift.
        </div>
      </>
    )
  },
  {
    id: 'unique',
    icon: Gift,
    color: 'text-purple-600 bg-purple-100',
    title: "The Psychology of Gifting: How to Read Minds",
    videoId: "bsIAi2N8Tao", 
    content: (
      <>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">The Anxiety of the White Box</h3>
        <p className="mb-6">Why is gifting so stressful? Psychologists call it "The Asymmetry of Information." You know what you <em>want</em> to say ("I love you," "I appreciate you," "I know you"), but you have to translate that complex emotion into a physical object. If the object misses the mark, we fear the recipient will think we don't actually <em>know</em> them.
        </p>
        <p className="mb-6">
          The secret to mastering this anxiety isn't spending more money. It's using the <strong>"Thoughtfulness Equation."</strong>
          <br /><br />
          <em>Thoughtfulness = (Observation + Effort) / Cost</em>
        </p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">1. The "Daily Driver Upgrade"</h4>
        <p className="mb-4">This is the single most effective strategy for difficult people. Look at what they use <em>every single day</em>, and buy them the "Rolls Royce" version of it.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>The Mug:</strong> <AmazonLink term="Ember Smart Mug">Ember Smart Mug</AmazonLink>.</li>
        </ul>
        {/* --- CLUE INJECTION --- */}
        <div className="my-6 p-4 bg-slate-100 border border-slate-300 rounded-lg text-sm font-mono text-slate-600">
          <p><strong>🕵️‍♂️ HUNT CLUE #2:</strong> If you are looking for the Golden Lamp, you need the second key. The second digit of the code is the <strong>Item Weight</strong> (in ounces) of the Ember Mug 2 listed on Amazon. <AmazonLink term="Ember Smart Mug 2">Click here to find it.</AmazonLink></p>
        </div>
        {/* ---------------------- */}
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
      </>
    )
  },
  {
    id: 'budget',
    icon: TrendingUp, 
    color: 'text-pink-600 bg-pink-100',
    title: "The $50 Rule: How to Fake Wealth",
    // NO VIDEO ID HERE
    content: (
      <>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Perceived Value vs. Actual Cost</h3>
        <p className="mb-6">There is a secret in the luxury retail world: <strong>Weight = Value.</strong></p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">1. The "Top Shelf" Grocery Hack</h4>
        <p className="mb-4">If you buy a $40 bottle of premium, <AmazonLink term="Brightland Olive Oil">cold-pressed olive oil</AmazonLink>, it feels like a royal gift.</p>
      </>
    )
  }
];

// --- MAIN PAGE ---

export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSecret, setShowSecret] = useState(false); 
  const [showGame, setShowGame] = useState(false); // Game State
  const [giftData, setGiftData] = useState([]);

  // Mock data generator
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

    // Reset States
    setShowSecret(false);
    setShowGame(false);
    setShowResults(false);

    const lowerQ = query.trim().toLowerCase();
    
    if (lowerQ === 'golden lamp') {
      setShowSecret(true);
      return; 
    }

    if (lowerQ === 'magic carpet' || lowerQ === 'play game') {
      setShowGame(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
        const mockResults = generateMockGifts(query);
        const processedGifts = mockResults.map((gift: any) => ({
             ...gift,
             affiliateLink: `https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=giftgenie0c4-20`
        }));
        // @ts-ignore
        setGiftData(processedGifts);
        setIsLoading(false);
        setShowResults(true);
    }, 500); 
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900 relative">
      
      {/* OVERLAYS */}
      {showSecret && <SecretVaultModal onClose={() => setShowSecret(false)} />}
      {showGame && <GenieGameModal onClose={() => setShowGame(false)} />}

      {/* HEADER / SEARCH AREA */}
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
                  {/* Facade */}
                  {article.videoId && (
                     <YouTubeFacade videoId={article.videoId} title={article.title} />
                  )}
                  <div className="prose prose-slate text-slate-600 leading-relaxed max-w-none">
                    {article.content}
                  </div>
                </article>
              ))}
            </div>
          </div>
          
          {/* FAQ */}
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

          <footer className="w-full py-8 border-t border-slate-200 mt-auto text-center">
             <div className="flex justify-center gap-6 text-sm text-slate-500 mb-4">
                <button className="hover:text-slate-800 underline">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-slate-800 underline">Terms of Service</button>
                <span>•</span>
                <span>Contact: support@giftgenie-ai.com</span>
             </div>
             <p className="text-xs text-slate-400">© 2025 Illosophy Multimedia. All rights reserved.</p>
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