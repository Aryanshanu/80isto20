"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';
import { MenuItem, MenuType } from '@/lib/types';
import { LUNCH_MENU, DINNER_MENU, CATEGORIES } from '@/lib/menuData';
import { cn } from '@/lib/utils';
import { DietDot } from './DietDot';
import DishQuickView from './DishQuickView';

interface MenuExplorerProps {
  onSelectTrialDish: (dishName: string, slot: 'Lunch' | 'Dinner') => void;
  initialCategory?: string;
}

export default function MenuExplorer({ onSelectTrialDish, initialCategory = 'All' }: MenuExplorerProps) {
  const [menuType, setMenuType] = useState<MenuType>('Lunch');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  const currentMenu = menuType === 'Lunch' ? LUNCH_MENU : DINNER_MENU;
  const filteredMenu = activeCategory === 'All'
    ? currentMenu
    : currentMenu.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 sm:py-32 bg-brand-navy text-brand-cream relative">
      {/* Background radial dot grid — clipped to its own layer so it never constrains the sticky sub-nav below */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-coral/20 text-brand-coral text-xs font-black uppercase tracking-widest mb-4 border border-brand-coral/30">
            <Sun size={14} />
            <span>Interactive Menu Explorer</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-cream mb-4 tracking-tight">
            Explore Our <span className="text-brand-coral">Daily Menus</span>
          </h2>
          <p className="text-brand-cream/70 text-base sm:text-lg font-medium">
            {menuType === 'Lunch'
              ? 'Balanced Bowls for a Brighter Day • High-energy, wholesome lunches crafted for sustained focus'
              : 'Hearty Meals for a Better Tomorrow • Restorative, protein-packed dinners for recovery and wellness'}
          </p>
        </div>
      </div>

      {/* Sticky sub-nav: menu type tabs + horizontal-scroll category chips */}
      <div className="sticky top-[110px] z-30 bg-brand-navy/95 backdrop-blur-md border-y border-white/5 py-4 mb-10 sm:mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-1.5 rounded-full flex gap-2 border border-white/10 shadow-xl">
              <button
                onClick={() => {
                  setMenuType('Lunch');
                  setActiveCategory('All');
                }}
                className={cn(
                  "flex items-center gap-2.5 px-6 sm:px-12 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all duration-300",
                  menuType === 'Lunch'
                    ? "bg-brand-coral text-white shadow-xl scale-105"
                    : "text-brand-cream/70 hover:text-white"
                )}
              >
                <Sun size={16} className="inline mr-2 -mt-0.5" />
                Lunch ({LUNCH_MENU.length})
              </button>

              <button
                onClick={() => {
                  setMenuType('Dinner');
                  setActiveCategory('All');
                }}
                className={cn(
                  "flex items-center gap-2.5 px-6 sm:px-12 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all duration-300",
                  menuType === 'Dinner'
                    ? "bg-brand-coral text-white shadow-xl scale-105"
                    : "text-brand-cream/70 hover:text-white"
                )}
              >
                <Moon size={16} className="inline mr-2 -mt-0.5" />
                Dinner ({DINNER_MENU.length})
              </button>
            </div>
          </div>

          {/* Horizontal-scroll category carousel (Zomato/Swiggy pattern) */}
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1 -mx-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 snap-start px-5 py-2 rounded-full text-xs font-black transition-all border whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-brand-cream text-brand-navy border-brand-cream shadow-md"
                    : "border-white/15 text-brand-cream/70 hover:border-white/40 hover:text-white bg-white/5"
                )}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dishes Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <DishCard
                key={item.id}
                item={item}
                onOpenQuickView={() => setQuickViewItem(item)}
                onSelectTrial={() => onSelectTrialDish(item.name, menuType)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20 text-brand-cream/40 italic">
            No dishes found under {activeCategory} for {menuType}. Select another category to view dishes.
          </div>
        )}

        {/* Bottom Banner Trigger */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-3xl backdrop-blur-md">
            <div className="text-left">
              <div className="font-black text-white text-base">
                Like any dish you see?
              </div>
              <div className="text-xs text-brand-cream/70 font-medium">
                Try it today with no subscription commitment for just ₹229 (Free Delivery).
              </div>
            </div>
            <button
              onClick={() => onSelectTrialDish(currentMenu[0].name, menuType)}
              className="py-3 px-6 rounded-2xl bg-brand-coral hover:bg-brand-coral/90 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              Order Trial Dish • ₹229
            </button>
          </div>
        </div>
      </div>

      <DishQuickView
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onSelectTrial={(mealName, slot) => {
          setQuickViewItem(null);
          onSelectTrialDish(mealName, slot);
        }}
      />
    </section>
  );
}

function DishCard({
  item,
  onOpenQuickView,
  onSelectTrial,
}: {
  item: MenuItem;
  onOpenQuickView: () => void;
  onSelectTrial: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="rounded-[2.4rem] overflow-hidden bg-brand-cream text-brand-navy shadow-2xl border-4 border-white flex flex-col justify-between group hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-shadow duration-300 cursor-pointer"
      onClick={onOpenQuickView}
    >
      <div>
        {/* Dish Photography */}
        <div className="relative h-52 w-full overflow-hidden bg-brand-navy/10">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges on Image */}
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

          <div className="absolute bottom-3 right-4 flex items-center gap-1 bg-brand-coral text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
            <Flame size={13} />
            <span>{item.protein} Protein</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2.5">
            <DietDot diet={item.diet} />
            <h3 className="text-xl font-black text-brand-navy group-hover:text-brand-coral transition-colors leading-snug">
              {item.name}
            </h3>
          </div>

          <p className="text-xs text-brand-navy/70 leading-relaxed font-medium mb-4 line-clamp-2">
            {item.description}
          </p>

          {/* Nutrition Stats Chips */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white border border-brand-navy/5 text-center text-xs">
            <div>
              <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Energy</span>
              <span className="font-black text-brand-navy">{item.calories} kcal</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Carbs</span>
              <span className="font-black text-brand-navy">{item.carbs}</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-navy/40 font-bold block uppercase">Healthy Fats</span>
              <span className="font-black text-brand-navy">{item.fats}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-6 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectTrial();
          }}
          className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-coral text-white text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg"
        >
          <span>Try This In Trial (₹229)</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
