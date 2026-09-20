"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import { DietDot } from './DietDot';

interface DishQuickViewProps {
  item: MenuItem | null;
  onClose: () => void;
  onSelectTrial: (mealName: string, slot: 'Lunch' | 'Dinner') => void;
}

export default function DishQuickView({ item, onClose, onSelectTrial }: DishQuickViewProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brand-navy/80 backdrop-blur-md p-0 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-3">
              <div className="w-10 h-1.5 rounded-full bg-brand-navy/15" />
            </div>

            <div className="relative h-64 w-full overflow-hidden bg-brand-navy/10">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-brand-navy shadow-md transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-brand-navy/80 backdrop-blur-md text-brand-cream px-3 py-1 rounded-full border border-white/10">
                  {item.category}
                </span>
                {item.isPopular && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-brand-navy px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Sparkles size={11} /> Bestseller
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <DietDot diet={item.diet} size={16} />
                  <h3 className="text-2xl font-black text-brand-navy leading-tight">{item.name}</h3>
                </div>
              </div>

              <p className="text-sm text-brand-navy/70 leading-relaxed font-medium mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-4 gap-2 p-4 rounded-2xl bg-brand-cream border border-brand-navy/5 text-center mb-6">
                <div>
                  <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Protein</span>
                  <span className="font-black text-brand-coral text-sm">{item.protein}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Energy</span>
                  <span className="font-black text-brand-navy text-sm">{item.calories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Carbs</span>
                  <span className="font-black text-brand-navy text-sm">{item.carbs}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Fats</span>
                  <span className="font-black text-brand-navy text-sm">{item.fats}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectTrial(item.name, item.menuType)}
                className="w-full py-4 px-6 rounded-2xl bg-brand-coral hover:bg-brand-coral/90 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Flame size={18} />
                <span>Try This In Trial • ₹229</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-center text-[11px] text-brand-navy/50 mt-3">
                No subscription required • Free delivery within 6 km
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
