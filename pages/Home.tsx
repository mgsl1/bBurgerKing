import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const getRecommendations = async () => {
    if (!mood) return;
    setLoadingAI(true);
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood })
      });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full bg-[var(--color-charcoal)] overflow-hidden flex items-center pt-20">
        {/* Subtle flame background using radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(214,35,0,0.4)_0%,transparent_60%)] opacity-80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[15vw] sm:text-[12vw] lg:text-[8vw] leading-[0.8] mb-6 uppercase tracking-tighter"
            >
              Have It<br/><span className="text-[var(--color-flame)] block -mt-4">Your Way.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-2xl text-gray-300 mb-10 max-w-md font-medium"
            >
              Order online. Pick up flame-grilled perfection.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/order" className="bg-[var(--color-flame)] hover:bg-orange-700 text-white font-bold uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(214,35,0,0.3)]">
                Order Now <ArrowRight size={20} />
              </Link>
              <Link to="/find-a-burger-king" className="border-2 border-white hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 transition duration-300">
                <MapPin size={20} /> Find a Restaurant
              </Link>
            </motion.div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <motion.img 
              initial={{ opacity: 0, y: 60, rotate: -8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" 
              alt="Whopper Burger"
              className="w-full max-w-md lg:max-w-xl object-contain drop-shadow-2xl z-10 relative"
            />
          </div>
        </div>

        {/* Animated flame particles at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-flame)] to-transparent opacity-20 pointer-events-none" />
      </section>

      {/* FEATURED DEALS */}
      <section className="py-20 bg-[var(--color-cream)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <h2 className="text-5xl font-display uppercase tracking-tighter">Sizzling Deals</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-12 snap-x snap-mandatory hide-scrollbar">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="min-w-[300px] md:min-w-[400px] bg-white rounded-3xl p-6 shadow-xl snap-center shrink-0 group transform transition duration-300 hover:-translate-y-2">
              <div className="bg-orange-100 rounded-2xl h-48 mb-6 overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-[var(--color-flame)] text-white text-xs font-bold uppercase px-3 py-1 rounded-full z-10 shadow-lg">New Deal</div>
                <img src="https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=600&q=80" alt="Deal" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="text-2xl font-display leading-tight mb-2 uppercase">2 for $8 Mix & Match</h3>
              <p className="text-gray-600 mb-6 font-medium">Grab any two featured sandwiches for one sizzling price.</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-display text-[var(--color-flame)]">$8.00</span>
                <button className="bg-black hover:bg-[var(--color-flame)] text-white px-6 py-3 rounded-full font-bold uppercase text-sm transition-colors">Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI RECOMMENDATION WIDGET */}
      <section className="py-24 bg-[var(--color-charcoal)] text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black px-4 py-1.5 rounded-full font-bold uppercase text-xs tracking-wider mb-8">
            <Sparkles size={16} /> Powered by AI
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-6 leading-[0.9]">Not Sure What<br/>To Order?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Tell our AI Menu Wizard what you're craving, and we'll flaming-grill the perfect recommendation.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-16">
            <input 
              type="text" 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g. I need a massive burger with bacon..." 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-gold)] font-medium text-lg"
            />
            <button 
              onClick={getRecommendations}
              disabled={loadingAI || !mood}
              className="bg-[var(--color-gold)] text-black font-bold uppercase tracking-wider py-4 px-8 rounded-full hover:bg-yellow-400 transition disabled:opacity-50 flex items-center justify-center min-w-[160px]"
            >
              {loadingAI ? "Thinking..." : "Let AI Decide"}
            </button>
          </div>

          {recommendations.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
            >
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white text-black p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-[var(--color-gold)] rounded-full z-0 flex items-end justify-start pl-3 pb-3">
                    <span className="font-bold text-xs uppercase relative z-10">{rec.matchScore}%</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl uppercase mb-2 mr-6">{rec.name}</h3>
                    <p className="text-gray-600 text-sm font-medium mb-6 italic">"{rec.reason}"</p>
                    <button className="w-full bg-[var(--color-flame)] text-white py-3 rounded-xl font-bold uppercase text-sm hover:bg-orange-700 transition">Add to Cart</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </div>
      </section>

      {/* REWARDS BANNER */}
      <section className="bg-[var(--color-flame)] py-16 text-white text-center">
        <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter leading-[0.8] mb-6">Earn Points.<br/>Eat Free.</h2>
        <p className="text-xl font-medium mb-8">Join BK Rewards and get a free Whopper on your first purchase.</p>
        <button className="bg-white text-black font-bold uppercase tracking-wider py-4 px-10 rounded-full hover:bg-gray-100 transition shadow-xl">Join Now</button>
      </section>

    </div>
  );
}
