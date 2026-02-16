'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Music,
  Filter,
  Sparkles
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
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // Silent fail
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

// --- COMPONENT: MAGICAL LAMP LOADER ---
const MagicLampLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [loadingText, setLoadingText] = useState("Rubbing the Lamp...");
  const texts = ["Summoning the Genie...", "Consulting the Ancient Scrolls...", "Scanning the Stars...", "Granting Your 3 Wishes..."];

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => { if (step < texts.length) { setLoadingText(texts[step]); step++; } }, 800);
    const timer = setTimeout(onComplete, 3500); 
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
      <div className="relative">
        <div className="text-8xl animate-bounce mb-4 filter drop-shadow-lg">🧞‍♂️</div>
        <div className="absolute -top-4 -right-4 animate-ping text-yellow-400"><Sparkles size={32} /></div>
      </div>
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mt-6 animate-pulse text-center">{loadingText}</h3>
      <div className="w-64 h-2 bg-slate-800 rounded-full mt-6 overflow-hidden border border-slate-700">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[width_3.5s_ease-out_forwards] w-full" />
      </div>
    </div>
  );
};

// --- COMPONENT: BULLETPROOF VIDEO PLAYER ---
const YouTubeFacade = ({ videoId, title }: { videoId: string, title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-black shadow-md">
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    );
  }

  return (
    <div onClick={() => setIsPlaying(true)} className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-slate-900 shadow-md relative group cursor-pointer">
      <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><Play size={32} className="text-white fill-white ml-1" /></div></div>
      <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-white text-xs font-bold">Watch Review</div>
    </div>
  );
};

// --- COMPONENT: SECRET GAME ENGINE ---
const GenieGameModal = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem('genie_highscore');
      if (savedScore) setHighScore(parseInt(savedScore));
    }
  }, []);

  useEffect(() => {
    if (gameState === 'GAMEOVER') {
      if (score > highScore) {
        setHighScore(score);
        if (typeof window !== 'undefined') localStorage.setItem('genie_highscore', score.toString());
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
        body: JSON.stringify({ email, score, source: 'GenieRush_Game' }),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

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
      if (gameState === 'PLAYING') animationFrameId = window.requestAnimationFrame(loop);
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
               <img src="/genie-rush.jpg" alt="Genie's Gift Rush" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
            <div className="p-8 text-center -mt-10 relative z-10">
              <h2 className="text-3xl font-extrabold text-amber-400 drop-shadow-md mb-2">Genie's Gift Rush</h2>
              <p className="text-slate-300 mb-8 text-sm">Collect Gifts 🎁. Avoid Storms ⛈️.</p>
              <div className="bg-slate-800/50 p-4 rounded-xl mb-6 border border-slate-700"><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Current High Score</p><p className="text-2xl font-bold text-white">{highScore}</p></div>
              <button onClick={() => { setScore(0); setGameState('PLAYING'); }} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all text-xl shadow-lg shadow-amber-500/20 uppercase tracking-widest transform hover:scale-105 active:scale-95">PLAY NOW</button>
            </div>
          </div>
        )}
        {gameState === 'PLAYING' && <div className="p-4 w-full flex justify-center bg-slate-900"><canvas ref={canvasRef} width={350} height={500} className="bg-slate-800 rounded-xl cursor-pointer shadow-inner border border-slate-700" /></div>}
        {gameState === 'GAMEOVER' && (
          <div className="text-center py-8 px-6 w-full">
            <div className="mb-6"><Trophy size={64} className="text-amber-400 mx-auto mb-4 animate-bounce" /><h3 className="text-4xl font-black text-white mb-1">{score}</h3>{score >= highScore && score > 0 && <p className="text-green-400 font-bold uppercase tracking-widest text-xs">New Personal Best!</p>}</div>
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
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6"><p className="text-white font-bold mb-2">Join the Leaderboard?</p><input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 text-white mb-3 focus:border-amber-500 focus:outline-none" /><button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Submit Score'}</button></div>
            ) : (
              <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-xl mb-6 text-green-400 flex items-center justify-center gap-2"><CheckCircle size={20} /> Saved!</div>
            )}
            <GameAd />
            <div className="flex gap-3 mt-6"><button onClick={() => { setScore(0); setGameState('PLAYING'); setSubmitted(false); }} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">Retry</button><button onClick={onClose} className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors">Quit</button></div>
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
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-amber-500/50"><Trophy size={40} className="text-amber-500" /></div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">THE GOLDEN LAMP</h2>
        <p className="text-amber-400 font-mono text-xs uppercase tracking-[0.2em] mb-6">Level 99 Difficulty Active</p>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8 text-left space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">Welcome, Hunter. Enter the monthly draw for the <strong>$100 Amazon Spree</strong>.</p>
          <div className="space-y-4 mt-4">
            <div className="flex items-start gap-3"><span className="bg-slate-700 text-amber-400 text-xs font-bold px-2 py-1 rounded">KEY 1</span><p className="text-xs text-slate-400"><strong>YouTube:</strong> Answer the riddle in the Pinned Comment of the "Top 25" video.</p></div>
            <div className="flex items-start gap-3"><span className="bg-slate-700 text-amber-400 text-xs font-bold px-2 py-1 rounded">KEY 2</span><p className="text-xs text-slate-400"><strong>Amazon:</strong> Date of the "Top Critical Review" for the Ember Mug.</p></div>
            <div className="flex items-start gap-3"><span className="bg-green-700/50 text-green-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 min-w-fit"><Music size={10} /> KEY 3</span><div className="text-xs text-slate-400"><p className="mb-2"><strong>Spotify:</strong> Find "Add To Cart" by I Am Stevie Z.</p><div className="bg-black/30 p-2 rounded border border-slate-600 font-mono text-amber-100">(Sum of digits in Duration) x (Repeats) = <strong>KEY 3</strong></div><a href="https://open.spotify.com/artist/562UtYhTPT3qFQClGpmwaa?si=3g8CmYS4TJ6uL20zkhsbnQ" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline mt-2 block font-semibold">→ Listen & Solve on Spotify</a></div></div>
          </div>
        </div>
        <a href="https://forms.gle/QupjXDAJbS6q8uHd8" target="_blank" rel="noopener noreferrer" className="w-full block"><button className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 uppercase tracking-wider">Submit The Trinity Code</button></a>
        <p className="text-slate-500 text-xs mt-4 cursor-pointer hover:text-slate-400" onClick={onClose}>Give Up & Close</p>
      </div>
    </div>
  );
};

// --- GIFT TRIO (SAFE MODE) ---
const GiftTrio = ({ data }: { data: any[] }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  const CardConfig: Record<string, any> = {
    SAFE_BET: { badge: 'Top Rated & Reliable', icon: Star, headerStyle: 'bg-blue-50 text-blue-700', borderStyle: 'border-blue-200', btnColor: 'bg-blue-600 hover:bg-blue-700' },
    LIFE_IMPROVER: { badge: 'Best Value', icon: BookOpen, headerStyle: 'bg-purple-50 text-purple-700', borderStyle: 'border-purple-200', btnColor: 'bg-purple-600 hover:bg-purple-700' },
    VIRAL_FLEX: { badge: 'Trending Now 🔥', icon: TrendingUp, headerStyle: 'bg-rose-50 text-rose-700', borderStyle: 'border-rose-200', btnColor: 'bg-rose-600 hover:bg-rose-700' },
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-bounce mb-2">🧞‍♂️✨</span>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 mb-2">YOUR 3 WISHES GRANTED</h2>
            <p className="text-slate-500 font-medium">The Genie has spoken.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((gift, index) => {
            const config = CardConfig[gift.type] || CardConfig['SAFE_BET'];
            const Icon = config.icon;
            return (
              <div key={index} className={`relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${config.borderStyle} flex flex-col transition-all duration-300 hover:shadow-2xl`}>
                <div className={`px-4 py-2 flex items-center justify-center gap-2 font-semibold text-sm ${config.headerStyle} border-b`}><Icon size={16} />{config.badge}</div>
                <div className="relative h-48 bg-gray-200 overflow-hidden group">
                  <img src={gift.imageUrl} alt={gift.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">{gift.price}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{gift.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{gift.description}</p>
                  <a href={gift.affiliateLink} target="_blank" rel="noopener noreferrer" className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 ${config.btnColor}`}>View on Amazon <ExternalLink size={16} /></a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- LONG-FORM BLOG CONTENT (FULL) ---
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
        <p className="mb-6">Valentine's Day 2025 isn't about generic chocolates from the pharmacy. It's about "Aesthetic Love Languages." Thanks to TikTok trends like "Burnt Toast Theory" and the "Orange Peel Theory," acts of service and hyper-specific aesthetic gifts are winning. Below is the curated list of the top 25 most searched, wished-for, and viral gifts right now.</p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">❤️ The "Forever Flowers" Trend</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>1. <AmazonLink term="Lego Flower Bouquet">Lego Flower Bouquet</AmazonLink>:</strong> The #1 viral couple's activity. Building it together is the date night.</li>
          <li><strong>2. <AmazonLink term="Preserved Rose in Glass Dome">Preserved 'Beauty & Beast' Rose</AmazonLink>:</strong> Real roses treated to last 3-5 years. High romantic impact.</li>
          <li><strong>3. <AmazonLink term="Jellycat Amuseable Flower">Jellycat Plush Plants</AmazonLink>:</strong> For the partner who loves cute/soft aesthetics over realism.</li>
        </ul>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🏠 The "Cozy Core" Aesthetic</h4>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>4. <AmazonLink term="Shark FlexStyle">Shark FlexStyle Air Styler</AmazonLink>:</strong> The viral Dyson dupe every girl wants.</li>
          <li><strong>5. <AmazonLink term="Ember Smart Mug 2">Ember Smart Mug 2</AmazonLink>:</strong> Keeps coffee at the exact perfect temperature forever. A tech-luxury staple.</li>
          <li><strong>6. <AmazonLink term="UGG Tasman Slippers">UGG Tasman Slippers</AmazonLink>:</strong> The internet's favorite slipper. Constantly sold out, huge flex if you get them.</li>
          <li><strong>7. <AmazonLink term="Hatch Restore 2">Hatch Restore 2 Alarm</AmazonLink>:</strong> A sunrise alarm clock that upgrades sleep hygiene. Highly aesthetic.</li>
          <li><strong>8. <AmazonLink term="Barefoot Dreams Blanket">Barefoot Dreams Blanket</AmazonLink>:</strong> The 'Kardashian Blanket'. Softness is unmatched.</li>
          <li><strong>9. <AmazonLink term="Candle Warmer Lamp">Aesthetic Candle Warmer Lamp</AmazonLink>:</strong> Safer than fire, makes candles last longer, looks like a luxury hotel item.</li>
        </ol>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">📸 Analog & Retro Vibes</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>10. <AmazonLink term="Fujifilm Instax Mini 12">Fujifilm Instax Mini 12</AmazonLink>:</strong> Instant memories. Get the matching film pack.</li>
          <li><strong>11. <AmazonLink term="Kodak Ektar H35">Kodak Ektar H35 Half Frame</AmazonLink>:</strong> A reusable film camera that saves money. Very trendy.</li>
          <li><strong>12. <AmazonLink term="Audio-Technica LP60X Turntable">Audio-Technica Turntable</AmazonLink>:</strong> Vinyl is outselling CDs. A great entry-level player for music lovers.</li>
          <li><strong>13. <AmazonLink term="Custom Mix Tape USB">Custom 'Mixtape' USB Drive</AmazonLink>:</strong> Retro look, modern utility. Put a playlist on it.</li>
        </ul>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🍔 Viral Kitchen & Wellness</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>14. <AmazonLink term="Ninja Creami Ice Cream Maker">Ninja CREAMi</AmazonLink>:</strong> The internet's favorite kitchen gadget for protein ice cream.</li>
          <li><strong>15. <AmazonLink term="Owala FreeSip Water Bottle">Owala FreeSip Bottle</AmazonLink>:</strong> The bottle that dethroned the Hydroflask.</li>
          <li><strong>16. <AmazonLink term="Laneige Lip Sleeping Mask">Laneige Lip Sleeping Mask</AmazonLink>:</strong> A cult classic beauty staple. Guaranteed win.</li>
          <li><strong>17. <AmazonLink term="Theragun Mini">Theragun Mini Massager</AmazonLink>:</strong> Perfect for the partner with back pain or gym soreness.</li>
          <li><strong>18. <AmazonLink term="Cosori Air Fryer">Cosori Aesthetic Air Fryer</AmazonLink>:</strong> White/Gold colorway matches the 'Clean Girl' kitchen.</li>
        </ul>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8 border-b pb-2">🎁 For Him (The Impossible Shop)</h4>
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
        <div className="bg-rose-50 p-6 rounded-xl border-l-4 border-rose-500 mt-8"><strong>Stevie Z's Pro Tip:</strong> Don't just hand over the box. The "unboxing" is part of the gift. Add a handwritten note or a specific "Why I bought this for you" explanation to increase the perceived value by 100%.</div>
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
        <p className="mb-6">Why is gifting so stressful? Psychologists call it "The Asymmetry of Information." You know what you <em>want</em> to say ("I love you," "I appreciate you," "I know you"), but you have to translate that complex emotion into a physical object. If the object misses the mark, we fear the recipient will think we don't actually <em>know</em> them.</p>
        <p className="mb-6">The secret to mastering this anxiety isn't spending more money. It's using the <strong>"Thoughtfulness Equation."</strong><br/><em>Thoughtfulness = (Observation + Effort) / Cost</em></p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">1. The "Daily Driver Upgrade"</h4>
        <p className="mb-4">This is the single most effective strategy for difficult people. Look at what they use <em>every single day</em>, and buy them the "Rolls Royce" version of it.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>The Mug:</strong> <AmazonLink term="Ember Smart Mug">Ember Smart Mug</AmazonLink>.</li>
          <li><strong>The Socks:</strong> <AmazonLink term="Darn Tough Merino Wool Socks">Darn Tough Vermont Merino Wool socks</AmazonLink>.</li>
          <li><strong>The Pen:</strong> <AmazonLink term="Machine Turned Brass Pen">brass machine-turned pen</AmazonLink>.</li>
        </ul>
        {/* --- CLUE INJECTION --- */}
        <div className="my-6 p-4 bg-slate-100 border border-slate-300 rounded-lg text-sm font-mono text-slate-600">
          <p><strong>🕵️‍♂️ HUNT CLUE #2:</strong> If you are looking for the Golden Lamp, you need the second key. The second digit of the code is the <strong>Item Weight</strong> (in ounces) of the Ember Mug 2 listed on Amazon. <AmazonLink term="Ember Smart Mug 2">Click here to find it.</AmazonLink></p>
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">2. Solving the "Unspoken Complaint"</h4>
        <p className="mb-4">People constantly broadcast their problems. Tune your frequency.</p>
        <p className="mb-4"><em>"My phone is always dying by 2 PM."</em> &rarr; <strong>Gift:</strong> <AmazonLink term="MagSafe Battery Pack">MagSafe battery pack</AmazonLink>.<br/><em>"It's so cold here."</em> &rarr; <strong>Gift:</strong> <AmazonLink term="Heated Desk Pad">heated desk pad</AmazonLink>.<br/><em>"I can never find my keys."</em> &rarr; <strong>Gift:</strong> An <AmazonLink term="Apple AirTag">AirTag</AmazonLink> in a leather keychain.</p>
        <p className="mb-6">When you solve a friction point in their life, the gift stops being an "object" and starts being a "solution." You are gifting them <strong>relief</strong>. That generates a much deeper emotional bond than a generic candle ever could.</p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">3. The Death of the Gift Card</h4>
        <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500 mb-6"><strong>The "Lazy Tax":</strong> When you give a gift card, you are essentially saying, "I have $50, but I don't have the time or energy to think about you." It transfers the labor of shopping onto the recipient.</div>
        <p className="mb-4">If you absolutely must give money (which teens often prefer), wrap it in an experience. Don't just hand over a check. Put the cash inside a puzzle box they have to solve. Or pair the Amazon Gift Card with a specific list of "AI Recommended Books" you think they'd like. Re-inject the effort that the gift card removed.</p>
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
        <p className="mb-6">There is a secret in the luxury retail world: <strong>Weight = Value.</strong> Humans are biologically wired to associate heaviness with quality. Cheap things are plastic and light; expensive things are glass, metal, stone, and wood.</p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">1. The "Top Shelf" Grocery Hack</h4>
        <p className="mb-4">If you buy a $40 bottle of premium, <AmazonLink term="Brightland Olive Oil">cold-pressed olive oil</AmazonLink>, it feels like a royal gift. The recipient would never buy it for themselves because it feels "too extravagant." That is the sweet spot.</p>
        <p className="mb-6"><strong>Examples:</strong> <AmazonLink term="Manuka Honey">Manuka Honey</AmazonLink>, <AmazonLink term="Truffle Salt">Truffle Salt</AmazonLink>, Single-Origin Coffee Beans, imported French Butter cookies in a metal tin.</p>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">2. The "Kit" Strategy (Bundling)</h4>
        <p className="mb-4">A single $30 item looks lonely. But three $10 items packaged together look like a "Curated Experience." This is how you beat the system.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>The Movie Night Kit:</strong> A <AmazonLink term="Reusable Popcorn Tub">reusable popcorn tub</AmazonLink>, <AmazonLink term="Amish Country Popcorn Kernels">gourmet kernels</AmazonLink>, and a "Movie Trivia" card deck.</li>
          <li><strong>The Spa Night Kit:</strong> A real eucalyptus branch, a high-end <AmazonLink term="Da Bomb Bath Bomb">bath bomb</AmazonLink>, a specific face mask, and a small candle.</li>
        </ul>
        <h4 className="text-xl font-bold text-slate-800 mb-3 mt-8">3. Material Science: Glass, Wood, Metal</h4>
        <p className="mb-4">Avoid plastic at all costs. Plastic signals "disposable."</p>
        <div className="bg-pink-50 p-6 rounded-xl border-l-4 border-pink-500 mb-6"><strong>The "Decanter" Cheat Code:</strong> <AmazonLink term="Crystal Whiskey Decanter">Crystal-style glass decanter</AmazonLink> on Amazon for $25. It looks like a $200 piece.</div>
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
  const [showGame, setShowGame] = useState(false); 
  const [giftData, setGiftData] = useState([]);
  
  // Mounted Check
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  // Mock data generator
  // FOUNDER OVERRIDE: Inject Dream Journal for specific keywords
  const generateMockGifts = (q: string) => {
    const lowerQ = q.toLowerCase();
    const isDreamTrigger = ['dream', 'journal', 'writing', 'spiritual', 'mindful', 'anxiety'].some(k => lowerQ.includes(k));
    
    return [
      { 
        type: 'SAFE_BET', 
        title: `Premium ${q.split(' ').pop() || 'Gift'} Set`, 
        description: 'The highly-rated, reliable choice. 4.8 stars with over 2,000 reviews.', 
        price: '$49.99', 
        imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Safe+Bet', 
        affiliateLink: '#' 
      },
      { 
        type: 'LIFE_IMPROVER', 
        title: isDreamTrigger ? 'The Illosophy Dream Journal' : `Smart ${q.split(' ').pop() || 'Gadget'} Upgrade`, 
        description: isDreamTrigger ? "Editor's Choice: The tool I use daily to unlock creativity and subconscious power." : 'Solves a daily annoyance. High utility and "cool factor."', 
        price: isDreamTrigger ? '$15.99' : '$89.00', 
        imageUrl: 'https://placehold.co/600x400/f3e8ff/581c87?text=Life+Improver', 
        affiliateLink: isDreamTrigger ? 'https://a.co/d/052g9oH6?tag=giftgenie0c4-20' : '#' 
      },
      { 
        type: 'VIRAL_FLEX', 
        title: `Trending TikTok Find`, 
        description: 'The item everyone is talking about right now. High novelty.', 
        price: '$29.99', 
        imageUrl: 'https://placehold.co/600x400/fce7f3/db2777?text=Viral+Flex', 
        affiliateLink: '#' 
      },
    ];
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Reset States
    setShowSecret(false);
    setShowGame(false);
    setShowResults(false);

    const lowerQ = query.trim().toLowerCase();
    if (lowerQ === 'golden lamp') { setShowSecret(true); return; }
    if (lowerQ === 'magic carpet' || lowerQ === 'play game') { setShowGame(true); return; }

    setIsLoading(true);

    setTimeout(() => {
        try {
            const mockResults = generateMockGifts(query);
            const processedGifts = mockResults.map((gift: any) => ({
                ...gift,
                // Only override link if it wasn't already set (like the Dream Journal)
                affiliateLink: gift.affiliateLink !== '#' ? gift.affiliateLink : `https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=giftgenie0c4-20`
            }));
            // @ts-ignore
            setGiftData(processedGifts);
            setIsLoading(false);
            setShowResults(true);
        } catch (error) {
            console.error("Search Error", error);
            setIsLoading(false);
        }
    }, 3500); 
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900 relative">
      {showSecret && <SecretVaultModal onClose={() => setShowSecret(false)} />}
      {showGame && <GenieGameModal onClose={() => setShowGame(false)} />}

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
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Who are you shopping for?" className="relative w-full px-8 py-5 rounded-full text-lg border-2 border-white bg-white focus:border-blue-50 focus:outline-none shadow-xl text-slate-800 placeholder:text-slate-400" />
            <button type="submit" className="absolute right-3 top-3 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"><Search size={24} /></button>
          </form>

          {/* NEW PRICE FILTER PILLS */}
          <div className="flex gap-2 justify-center mb-10 overflow-x-auto px-4 w-full">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1 whitespace-nowrap"><Filter size={12}/> Under $25</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">Under $50</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">Under $100</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">Luxury ✨</button>
          </div>

          {/* VISIBLE BLOG FEED */}
          <div className="w-full max-w-4xl pb-20">
            <div className="flex items-center gap-2 mb-8 justify-center"><BookOpen className="text-blue-600" /><h2 className="text-2xl font-bold text-slate-800">Gift Genie Magazine</h2></div>
            <div className="space-y-12">
              {BLOG_ARTICLES.map((article) => (
                <article key={article.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${article.color}`}><article.icon size={24} /></div>
                    <div><span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Expert Guide</span><h3 className="text-xl md:text-2xl font-bold text-slate-900">{article.title}</h3></div>
                  </div>
                  {article.videoId && <YouTubeFacade videoId={article.videoId} title={article.title} />}
                  <div className="prose prose-slate text-slate-600 leading-relaxed max-w-none">{article.content}</div>
                </article>
              ))}
            </div>
          </div>
          
          <div className="w-full max-w-3xl pb-24">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200"><h4 className="font-bold text-slate-900 flex items-center gap-2"><HelpCircle size={16}/> How does the AI Gift Finder work?</h4><p className="text-slate-600 text-sm mt-2">Gift Genie uses AI to analyze your description and match personality traits with products.</p></div>
              <div className="bg-white p-5 rounded-xl border border-slate-200"><h4 className="font-bold text-slate-900 flex items-center gap-2"><HelpCircle size={16}/> Are the gift links safe?</h4><p className="text-slate-600 text-sm mt-2">Yes. All links direct you to Amazon.com, the world's most trusted marketplace.</p></div>
            </div>
          </div>

          <footer className="w-full py-8 border-t border-slate-200 mt-auto text-center">
             <div className="flex justify-center gap-6 text-sm text-slate-500 mb-4"><button className="hover:text-slate-800 underline">Privacy Policy</button><span>•</span><button className="hover:text-slate-800 underline">Terms of Service</button><span>•</span><span>Contact: support@giftgenie-ai.com</span></div>
             <p className="text-xs text-slate-400">© 2025 Illosophy Multimedia. All rights reserved.</p>
          </footer>
        </div>
      )}

      {isLoading && <MagicLampLoader onComplete={() => { setIsLoading(false); setShowResults(true); }} />}
      
      {showResults && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
             <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-8 h-8 relative rounded-lg overflow-hidden"><img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" /></div><span className="font-bold text-xl">GiftGenie</span></div>
                <button onClick={() => setShowResults(false)} className="text-sm font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1">← New Search</button>
             </div>
          </div>
          <GiftTrio data={giftData} /> 
        </div>
      )}
    </main>
  );
}