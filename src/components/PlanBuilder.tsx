"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  CheckCircle2, Calendar, LayoutGrid,
  Sparkles, ArrowRight, Leaf, Drumstick,
} from 'lucide-react';
import { PlanDuration, DietType, MealFrequency, PlanSelection } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PlanBuilderProps {
  onSelectPlan: (plan: PlanSelection) => void;
}

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
} as const;

/** Animated segmented control: a sliding pill (shared layoutId) tracks the active option. */
function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  layoutId,
  activeClassName,
}: {
  options: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string;
  activeClassName: string;
}) {
  return (
    <div className="bg-white p-1.5 rounded-full shadow-md border border-brand-navy/10 flex w-full sm:w-auto relative">
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-colors duration-200 relative z-10",
              isActive ? "text-white" : "text-brand-navy/60 hover:text-brand-navy"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className={cn("absolute inset-0 rounded-full -z-10", activeClassName)}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** Animated number: fades/slides in a new value whenever it changes. */
function AnimatedNumber({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn('relative inline-block overflow-hidden align-bottom', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function PlanBuilder({ onSelectPlan }: PlanBuilderProps) {
  const [duration, setDuration] = useState<PlanDuration>('monthly');
  const [frequency, setFrequency] = useState<MealFrequency>(1);

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
            <SegmentedControl
              layoutId="duration-pill"
              activeClassName="bg-brand-navy shadow-md"
              value={duration}
              onChange={setDuration}
              options={[
                {
                  value: 'monthly',
                  label: (
                    <>
                      Monthly Plan (26 Days)
                      <span className="ml-1 text-[10px] text-amber-300 font-extrabold hidden sm:inline">Save 15%</span>
                    </>
                  ),
                },
                { value: 'weekly', label: 'Weekly Plan (6 Days)' },
              ]}
            />
          </div>

          {/* Frequency Toggle (1 vs 2 Meals/Day) */}
          <div className="w-full sm:w-auto flex flex-col items-center gap-2">
            <span className="text-xs font-black text-brand-navy/50 uppercase tracking-widest flex items-center gap-1.5">
              <LayoutGrid size={14} /> Daily Meal Frequency
            </span>
            <SegmentedControl
              layoutId="frequency-pill"
              activeClassName="bg-brand-coral shadow-md"
              value={frequency}
              onChange={setFrequency}
              options={[
                { value: 1, label: '1 Meal / Day' },
                { value: 2, label: '2 Meals / Day (Lunch + Dinner)' },
              ]}
            />
          </div>
        </div>

        {/* Split Layout: Veg Plan vs Non-Veg Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* VEG PLAN (Green Theme) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-[2.8rem] bg-white border-2 border-brand-green/30 p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
          >
            {/* Corner Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-green text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Leaf size={13} />
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
                    ₹<AnimatedNumber value={vegData.price.toLocaleString()} />
                  </span>
                  <span className="text-sm font-bold text-brand-navy/60">
                    / {duration === 'monthly' ? 'month (26 Days)' : 'week (6 Days)'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-brand-green">
                  <AnimatedNumber value={`${vegData.meals} Fresh Meals Included`} />
                  <span>•</span>
                  <AnimatedNumber value={`₹${vegData.perMeal} per meal`} />
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
              className="w-full py-5 text-lg font-black shadow-lg bg-brand-green hover:bg-brand-green/90 text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <span>Select Veg Plan (₹{vegData.price.toLocaleString()})</span>
              <ArrowRight size={20} />
            </Button>
          </motion.div>

          {/* NON-VEG PLAN (Coral/Red Theme) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-[2.8rem] bg-white border-2 border-brand-coral/30 p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
          >
            {/* Corner Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-coral text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Drumstick size={13} />
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
                    ₹<AnimatedNumber value={nonVegData.price.toLocaleString()} />
                  </span>
                  <span className="text-sm font-bold text-brand-navy/60">
                    / {duration === 'monthly' ? 'month (26 Days)' : 'week (6 Days)'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-brand-coral">
                  <AnimatedNumber value={`${nonVegData.meals} Fresh Meals Included`} />
                  <span>•</span>
                  <AnimatedNumber value={`₹${nonVegData.perMeal} per meal`} />
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
              className="w-full py-5 text-lg font-black shadow-lg bg-brand-coral hover:bg-brand-coral/90 text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <span>Select Non-Veg Plan (₹{nonVegData.price.toLocaleString()})</span>
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>

        {/* Footnote on Policies */}
        <div className="mt-12 text-center text-xs text-brand-navy/50 max-w-xl mx-auto font-medium">
          Note: Monthly subscriptions are valid for 26 days and Weekly for 6 days. Advance payment required. Addresses must be within our 6km kitchen radius for free delivery.
        </div>
      </div>
    </section>
  );
}
