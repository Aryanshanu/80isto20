"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { 
  CheckCircle2, Calendar, Utensils, LayoutGrid, TrendingDown, 
  Sparkles, Truck, ShieldCheck, Zap, ArrowRight 
} from 'lucide-react';
import { PlanDuration, DietType, MealFrequency, PlanSelection } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PlanBuilderProps {
  onSelectPlan: (plan: PlanSelection) => void;
}

export default function PlanBuilder({ onSelectPlan }: PlanBuilderProps) {
  const [duration, setDuration] = useState<PlanDuration>('monthly');
  const [frequency, setFrequency] = useState<MealFrequency>(1);

  // Pricing matrix strictly according to PRD
  const PRICING = {
    monthly: {
      veg: {
        1: { price: 4999, meals: 26, perMeal: 192 },
        2: { price: 8499, meals: 52, perMeal: 163 },
      },
      nonveg: {
        1: { price: 4999, meals: 26, perMeal: 192 },
        2: { price: 8499, meals: 52, perMeal: 163 },
      },
    },
    weekly: {
      veg: {
        1: { price: 1199, meals: 6, perMeal: 199 },
        2: { price: 2199, meals: 12, perMeal: 183 },
      },
      nonveg: {
        1: { price: 1199, meals: 6, perMeal: 199 },
        2: { price: 2199, meals: 12, perMeal: 183 },
      },
    },
  };

  const vegData = PRICING[duration].veg[frequency];
  const nonVegData = PRICING[duration].nonveg[frequency];

  const handleChoosePlan = (diet: DietType) => {
    const data = diet === 'veg' ? vegData : nonVegData;
    onSelectPlan({
      duration,
      diet,
      frequency,
      price: data.price,
      mealsCount: data.meals,
    });
  };

  return (
    <section id="plans" className="py-24 sm:py-32 bg-brand-cream relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-navy/5 skew-x-12 translate-x-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy text-brand-cream text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-amber-400" />
            <span>Transparent Subscription Pricing</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy mb-6 tracking-tight">
            Choose Your <span className="text-brand-coral">Subscription Plan</span>
          </h2>
          <p className="text-brand-navy/70 text-base sm:text-lg font-medium leading-relaxed">
            Consistent nutrition without the grocery shopping, meal prep, or guesswork. Pick your schedule and dietary preference with guaranteed 45+ grams of protein per meal.
          </p>
        </div>

        {/* Global Controls: Duration & Daily Meals Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 max-w-2xl mx-auto">
          {/* Duration Toggle (Monthly vs Weekly) */}
          <div className="w-full sm:w-auto flex flex-col items-center gap-2">
            <span className="text-xs font-black text-brand-navy/50 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar size={14} /> Plan Duration
            </span>
            <div className="bg-white p-1.5 rounded-full shadow-md border border-brand-navy/10 flex w-full sm:w-auto">
              <button
                onClick={() => setDuration('monthly')}
                className={cn(
                  "flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 relative",
                  duration === 'monthly'
                    ? "bg-brand-navy text-white shadow-md"
                    : "text-brand-navy/60 hover:text-brand-navy"
                )}
              >
                Monthly Plan (26 Days)
                <span className="ml-1 text-[10px] text-amber-300 font-extrabold hidden sm:inline">Save 15%</span>
              </button>
              <button
                onClick={() => setDuration('weekly')}
                className={cn(
                  "flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300",
                  duration === 'weekly'
                    ? "bg-brand-navy text-white shadow-md"
                    : "text-brand-navy/60 hover:text-brand-navy"
                )}
              >
                Weekly Plan (6 Days)
              </button>
            </div>
          </div>

          {/* Frequency Toggle (1 vs 2 Meals/Day) */}
          <div className="w-full sm:w-auto flex flex-col items-center gap-2">
            <span className="text-xs font-black text-brand-navy/50 uppercase tracking-widest flex items-center gap-1.5">
              <LayoutGrid size={14} /> Daily Meal Frequency
            </span>
            <div className="bg-white p-1.5 rounded-full shadow-md border border-brand-navy/10 flex w-full sm:w-auto">
              <button
                onClick={() => setFrequency(1)}
                className={cn(
                  "flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300",
                  frequency === 1
                    ? "bg-brand-coral text-white shadow-md"
                    : "text-brand-navy/60 hover:text-brand-navy"
                )}
              >
                1 Meal / Day
              </button>
              <button
                onClick={() => setFrequency(2)}
                className={cn(
                  "flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300",
                  frequency === 2
                    ? "bg-brand-coral text-white shadow-md"
                    : "text-brand-navy/60 hover:text-brand-navy"
                )}
              >
                2 Meals / Day (Lunch + Dinner)
              </button>
            </div>
          </div>
        </div>

        {/* Split Layout: Veg Plan vs Non-Veg Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* VEG PLAN (Green Theme) */}
          <div className="relative rounded-[2.8rem] bg-white border-2 border-brand-green/30 p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            {/* Corner Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-black uppercase tracking-wider border border-brand-green/20">
                <span className="w-2 h-2 rounded-full bg-brand-green inline-block"></span>
                Veg Plan
              </span>
            </div>

            <div>
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-navy/40 block mb-1">
                  100% Vegetarian Protein
                </span>
                <h3 className="text-3xl font-black text-brand-navy">
                  Pure Clean Veg
                </h3>
                <p className="text-sm text-brand-navy/60 font-medium mt-1">
                  Paneer, high-grade soy, lentils, quinoa, wholesome grains & nuts.
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-6 rounded-2xl bg-brand-green/5 border border-brand-green/15 mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-brand-navy tracking-tight">
                    ₹{vegData.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-brand-navy/60">
                    / {duration === 'monthly' ? 'month (26 Days)' : 'week (6 Days)'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-brand-green">
                  <span>{vegData.meals} Fresh Meals Included</span>
                  <span>•</span>
                  <span>₹{vegData.perMeal} per meal</span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <span><strong>40g - 45g Protein</strong> balanced vegetarian meals</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <span><strong>Free Delivery</strong> up to 6 kms kitchen radius</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <span>Flexible delivery slot: Lunch, Dinner, or Both</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <span><strong>Max 2 Freezes</strong> allowed during subscription</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <span>Zero preservatives & 100% natural cold-pressed oils</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => handleChoosePlan('veg')}
              className="w-full py-5 text-lg font-black shadow-lg bg-brand-green hover:bg-brand-green/90 text-white flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
            >
              <span>Select Veg Plan (₹{vegData.price.toLocaleString()})</span>
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* NON-VEG PLAN (Coral/Red Theme) */}
          <div className="relative rounded-[2.8rem] bg-white border-2 border-brand-coral/30 p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            {/* Corner Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-black uppercase tracking-wider border border-brand-coral/20">
                <span className="w-2 h-2 rounded-full bg-brand-coral inline-block"></span>
                Non-Veg Plan
              </span>
            </div>

            <div>
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-navy/40 block mb-1">
                  High-Protein Lean Cuts
                </span>
                <h3 className="text-3xl font-black text-brand-navy">
                  Lean Meat & Eggs
                </h3>
                <p className="text-sm text-brand-navy/60 font-medium mt-1">
                  Chicken breast, farm eggs, shawarma cuts, roasted tikka & salads.
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-6 rounded-2xl bg-brand-coral/5 border border-brand-coral/15 mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-brand-navy tracking-tight">
                    ₹{nonVegData.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-brand-navy/60">
                    / {duration === 'monthly' ? 'month (26 Days)' : 'week (6 Days)'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-brand-coral">
                  <span>{nonVegData.meals} Fresh Meals Included</span>
                  <span>•</span>
                  <span>₹{nonVegData.perMeal} per meal</span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-coral shrink-0 mt-0.5" />
                  <span><strong>45g - 50g+ Protein</strong> per chicken/egg meal</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-coral shrink-0 mt-0.5" />
                  <span><strong>Free Delivery</strong> up to 6 kms kitchen radius</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-coral shrink-0 mt-0.5" />
                  <span>Flexible delivery slot: Lunch, Dinner, or Both</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-coral shrink-0 mt-0.5" />
                  <span><strong>Max 2 Freezes</strong> allowed during subscription</span>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-brand-navy/80">
                  <CheckCircle2 size={18} className="text-brand-coral shrink-0 mt-0.5" />
                  <span>Zero preservatives, high-grade olive & cold-pressed oils</span>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => handleChoosePlan('nonveg')}
              className="w-full py-5 text-lg font-black shadow-lg bg-brand-coral hover:bg-brand-coral/90 text-white flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
            >
              <span>Select Non-Veg Plan (₹{nonVegData.price.toLocaleString()})</span>
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>

        {/* Footnote on Policies */}
        <div className="mt-12 text-center text-xs text-brand-navy/50 max-w-xl mx-auto font-medium">
          Note: Monthly subscriptions are valid for 26 days and Weekly for 6 days. Advance payment required. Addresses must be within our 6km kitchen radius for free delivery.
        </div>
      </div>
    </section>
  );
}
