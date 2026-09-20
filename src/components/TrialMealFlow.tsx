"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { 
  Sparkles, CheckCircle2, Truck, Flame, ArrowRight, 
  ShieldCheck, UtensilsCrossed, Clock 
} from 'lucide-react';
import { LUNCH_MENU, DINNER_MENU } from '@/lib/menuData';

interface TrialMealFlowProps {
  onBookTrial: (mealName: string, slot: 'Lunch' | 'Dinner') => void;
}

export default function TrialMealFlow({ onBookTrial }: TrialMealFlowProps) {
  const [selectedSlot, setSelectedSlot] = useState<'Lunch' | 'Dinner'>('Lunch');
  const [selectedMeal, setSelectedMeal] = useState('Spanish Smoky Paprika Chicken Bowl');

  // Curated popular trial options for Lunch and Dinner
  const trialOptions = {
    Lunch: [
      {
        name: 'Spanish Smoky Paprika Chicken Bowl',
        protein: '48g Protein',
        calories: '620 kcal',
        desc: 'Slow-roasted paprika chicken, brown rice & charred veggies',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Dhaba Smoky Chicken Bowl',
        protein: '46g Protein',
        calories: '640 kcal',
        desc: 'Char-grilled tandoori chicken, rustic gravy & kachumber',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mediterranean Tikka Bowl',
        protein: '49g Protein',
        calories: '580 kcal',
        desc: 'Lemon herb chicken skewers, couscous & garlic tahini',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      },
    ],
    Dinner: [
      {
        name: 'Afghani Chicken Shawarma',
        protein: '45g Protein',
        calories: '550 kcal',
        desc: 'Cashew-yogurt chicken in 100% whole wheat flatbread',
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Black Pepper Chicken Masala Plate',
        protein: '50g Protein',
        calories: '670 kcal',
        desc: 'Tellicherry black pepper chicken, 2 rotis & bean salad',
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Caesar Chicken Protein Salad',
        protein: '48g Protein',
        calories: '420 kcal',
        desc: 'Flame-grilled chicken breast, baby romaine & parmesan',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
      },
    ],
  };

  const handleSelectSlot = (slot: 'Lunch' | 'Dinner') => {
    setSelectedSlot(slot);
    setSelectedMeal(trialOptions[slot][0].name);
  };

  return (
    <section id="trial" className="py-24 sm:py-32 bg-brand-navy text-brand-cream relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-coral/10 blur-[140px] rounded-full translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-green/10 blur-[140px] rounded-full -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Callout Card */}
        <div className="bg-gradient-to-br from-brand-coral/20 via-brand-navy to-brand-navy rounded-[3rem] p-8 sm:p-12 lg:p-16 border-2 border-brand-coral/30 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-coral text-white text-xs font-black uppercase tracking-wider mb-4 shadow-md">
              <Sparkles size={14} />
              <span>Zero Risk Trial Meal</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              Want to try before you subscribe?
            </h2>
            <p className="text-brand-cream/80 text-lg sm:text-xl font-medium">
              Experience the 80isto20 taste, freshness, and macro balance for just <span className="text-brand-coral font-black underline underline-offset-4">₹229</span> before you commit. No subscription required!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slot & Dish Selection */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slot Switcher */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-brand-cream/60 block mb-2.5">
                  Step 1: Choose Meal Slot
                </label>
                <div className="flex gap-3">
                  {(['Lunch', 'Dinner'] as const).map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSelectSlot(slot)}
                      className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 ${
                        selectedSlot === slot
                          ? 'border-brand-coral bg-brand-coral text-white shadow-lg'
                          : 'border-white/10 bg-white/5 text-brand-cream/70 hover:bg-white/10'
                      }`}
                    >
                      <Clock size={16} />
                      <span>{slot} ({slot === 'Lunch' ? '12:30 PM - 2:00 PM' : '7:30 PM - 9:00 PM'})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dish Options Grid */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-brand-cream/60 block mb-2.5">
                  Step 2: Pick Your Trial Dish
                </label>
                <div className="space-y-3">
                  {trialOptions[selectedSlot].map((dish) => (
                    <button
                      key={dish.name}
                      onClick={() => setSelectedMeal(dish.name)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        selectedMeal === dish.name
                          ? 'border-brand-coral bg-white/10 shadow-lg scale-[1.01]'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-black text-white text-base truncate">
                            {dish.name}
                          </h4>
                          <span className="text-xs font-black text-brand-coral shrink-0">
                            {dish.protein}
                          </span>
                        </div>
                        <p className="text-xs text-brand-cream/60 truncate mt-0.5 font-medium">
                          {dish.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedMeal === dish.name ? 'border-brand-coral bg-brand-coral text-white' : 'border-white/20'
                      }`}>
                        {selectedMeal === dish.name && <span className="text-xs font-bold">✓</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trial Offer Callout Box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[2.5rem] p-8 text-brand-navy shadow-2xl relative">
                <div className="text-center mb-6">
                  <span className="text-xs font-black text-brand-navy/40 uppercase tracking-widest block mb-1">
                    Single Trial Booking
                  </span>
                  <div className="text-6xl font-black text-brand-coral tracking-tight">
                    ₹229
                  </div>
                  <span className="text-xs font-extrabold text-brand-green uppercase tracking-wider block mt-1">
                    Free Delivery (&lt; 6km radius)
                  </span>
                </div>

                <div className="space-y-3 py-4 border-y border-brand-navy/10 text-xs font-semibold text-brand-navy/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span>Selected: <strong>{selectedMeal}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span>Slot: <strong>{selectedSlot}</strong> Window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span>Freshly prepared with zero preservatives</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => onBookTrial(selectedMeal, selectedSlot)}
                    className="w-full py-4 text-base font-black shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    <span>Book Trial for ₹229</span>
                    <ArrowRight size={18} />
                  </Button>
                </div>

                <p className="text-[11px] text-center text-brand-navy/50 mt-4">
                  No subscription required • Instant confirmation via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
