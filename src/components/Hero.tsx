"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { 
  CheckCircle2, Truck, Leaf, Zap, Star, ShieldCheck, 
  Sparkles, Sliders, ArrowRight, HeartPulse, Flame 
} from 'lucide-react';
import { HIGHLIGHT_CATEGORIES } from '@/lib/menuData';

interface HeroProps {
  onOpenCheckout: (type: 'plan' | 'trial') => void;
  onSelectCategory?: (category: string) => void;
}

export default function Hero({ onOpenCheckout, onSelectCategory }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-brand-cream">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[45%] h-[45%] bg-brand-coral/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-brand-green/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy text-brand-cream text-xs font-black mb-6 tracking-wide uppercase shadow-sm">
              <Star size={14} className="text-brand-coral fill-brand-coral" />
              <span>Real Food | Real Balance | A Healthier Tomorrow</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-navy leading-[1.08] mb-6 tracking-tight">
              BALANCED MEALS <br />
              <span className="text-brand-coral relative inline-block">
                for a better you.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 15C50 5 150 5 295 15" stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Sub-headline / Tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span className="text-lg font-bold text-brand-navy/90 italic">
                &ldquo;Good Food, Real Balance&rdquo;
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
              <span className="text-sm sm:text-base font-extrabold text-brand-green uppercase tracking-wide">
                45+ Grams of Protein Per Meal
              </span>
            </div>

            <p className="text-lg sm:text-xl text-brand-navy/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Healthy eating made effortless. Chef-curated high-protein bowls, Indian plates, wraps, and salads cooked with zero preservatives and delivered fresh daily.
            </p>

            {/* Badges: Eat Clean, Stay Fit, Live Better */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/20 text-xs font-black uppercase tracking-wider">
                <Leaf size={14} />
                <span>Eat Clean</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-coral/10 text-brand-coral border border-brand-coral/20 text-xs font-black uppercase tracking-wider">
                <Zap size={14} />
                <span>Stay Fit</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-navy/10 text-brand-navy border border-brand-navy/20 text-xs font-black uppercase tracking-wider">
                <HeartPulse size={14} />
                <span>Live Better</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#plans"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-brand-navy text-brand-cream text-base font-black shadow-xl hover:bg-brand-navy/90 hover:scale-[1.02] transition-all"
              >
                Explore Plans <ArrowRight size={18} className="ml-2" />
              </a>

              <Button
                variant="outline"
                onClick={() => onOpenCheckout('trial')}
                className="text-base px-8 py-4 border-2 border-brand-coral text-brand-coral hover:bg-brand-coral hover:text-white shadow-md font-black"
              >
                Book Trial Meal • ₹229
              </Button>
            </div>

            {/* Micro-trust indicators */}
            <div className="mt-8 pt-6 border-t border-brand-navy/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-navy/60 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-brand-green" />
                <span>No Commitment Necessary</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={16} className="text-brand-coral" />
                <span>Free Delivery up to 6km</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-brand-navy" />
                <span>Max 2 Freezes Allowed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative z-10 w-full max-w-md mx-auto aspect-square rounded-[3rem] p-4 bg-white shadow-2xl border-4 border-white"
            >
              {/* Dish Visual */}
              <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=85"
                  alt="80isto20 Spanish Smoky Paprika Chicken Bowl"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-black uppercase tracking-widest text-brand-coral bg-brand-navy/60 px-3 py-1 rounded-full w-fit mb-2 backdrop-blur-sm">
                    Signature Lunch Bowl
                  </span>
                  <h3 className="text-2xl font-black leading-snug">
                    Spanish Smoky Paprika Chicken Bowl
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs font-bold">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Flame size={14} /> 48g Protein
                    </span>
                    <span>•</span>
                    <span className="opacity-80">620 kcal</span>
                    <span>•</span>
                    <span className="text-amber-300">₹229 Trial</span>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-brand-coral/20 flex items-center gap-2.5 font-bold text-brand-navy text-xs"
              >
                <div className="p-1.5 rounded-xl bg-brand-coral/10 text-brand-coral">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-brand-navy/50 font-bold uppercase">Macro Target</div>
                  <div className="font-black text-brand-coral">45+g Protein</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-brand-green/20 flex items-center gap-2.5 font-bold text-brand-navy text-xs"
              >
                <div className="p-1.5 rounded-xl bg-brand-green/10 text-brand-green">
                  <Truck size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-brand-navy/50 font-bold uppercase">Prompt Delivery</div>
                  <div className="font-black text-brand-green">Free &lt; 6km Radius</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-brand-navy/10 rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-brand-navy/5 rounded-full -z-10" />
          </div>
        </div>

        {/* USP Highlights Section */}
        <div className="mt-20 pt-12 border-t border-brand-navy/10">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-coral block mb-2">
              Why 80isto20
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              The 80isto20 Nutritional Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[2rem] bg-white border border-brand-navy/10 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf size={28} />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-3">
                Real Ingredients (No Preservatives)
              </h3>
              <p className="text-sm text-brand-navy/70 leading-relaxed font-medium">
                100% wholesome, unadulterated whole foods. Zero artificial coloring, chemical preservatives, or hidden fillers. Cooked fresh daily.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-brand-navy/10 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-brand-coral/10 text-brand-coral flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-3">
                Free Delivery Up to 6 kms Radius
              </h3>
              <p className="text-sm text-brand-navy/70 leading-relaxed font-medium">
                Temperature-controlled insulated delivery straight to your desk or doorstep within our dedicated 6-kilometer kitchen radius.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-brand-navy/10 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sliders size={28} />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-3">
                Customisations Available
              </h3>
              <p className="text-sm text-brand-navy/70 leading-relaxed font-medium">
                Tailor your meals according to allergies, dietary goals, or macro requirements. Just let us know in advance and our kitchen adapts.
              </p>
            </div>
          </div>
        </div>

        {/* Menu Highlights Quick Visual Tiles Carousel/Grid */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-coral block mb-1">
                Our Menu Highlights
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
                Crafted For Every Craving
              </h3>
            </div>
            <a
              href="#menu"
              className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1 group"
            >
              <span>Explore Full 20 Dishes</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {HIGHLIGHT_CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href="#menu"
                onClick={() => onSelectCategory?.(cat.name)}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-brand-navy/10 flex flex-col h-64 bg-white"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-black uppercase text-brand-cream bg-brand-navy/80 px-2 py-0.5 rounded-full">
                    {cat.protein}
                  </span>
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-black text-brand-navy text-sm group-hover:text-brand-coral transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-brand-coral font-bold mt-0.5">
                      {cat.tagline}
                    </p>
                  </div>
                  <div className="text-[10px] text-brand-navy/50 font-medium">
                    Tap to view items →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
