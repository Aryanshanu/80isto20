"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlanBuilder from '@/components/PlanBuilder';
import MenuExplorer from '@/components/MenuExplorer';
import RadiusChecker from '@/components/RadiusChecker';
import TrialMealFlow from '@/components/TrialMealFlow';
import RulesSection from '@/components/RulesSection';
import CheckoutModal from '@/components/CheckoutModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { PlanSelection } from '@/lib/types';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import Logo from '@/components/Logo';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/constants';

export default function Home() {
  // Global Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'plan' | 'trial'>('plan');
  const [selectedPlan, setSelectedPlan] = useState<PlanSelection | undefined>(undefined);
  const [trialMealName, setTrialMealName] = useState<string>('Spanish Smoky Paprika Chicken Bowl');
  const [trialMealSlot, setTrialMealSlot] = useState<'Lunch' | 'Dinner'>('Lunch');

  const handleOpenCheckout = (type: 'plan' | 'trial') => {
    setCheckoutType(type);
    setIsCheckoutOpen(true);
  };

  const handleSelectPlan = (plan: PlanSelection) => {
    setSelectedPlan(plan);
    setCheckoutType('plan');
    setIsCheckoutOpen(true);
  };

  const handleBookTrial = (mealName: string, slot: 'Lunch' | 'Dinner') => {
    setTrialMealName(mealName);
    setTrialMealSlot(slot);
    setCheckoutType('trial');
    setIsCheckoutOpen(true);
  };

  return (
    <main className="min-h-screen relative selection:bg-brand-coral selection:text-white">
      {/* Navigation */}
      <Navbar onOpenCheckout={handleOpenCheckout} />

      {/* Hero Section */}
      <Hero
        onOpenCheckout={handleOpenCheckout}
        onSelectCategory={(category) => {
          const menuElem = document.getElementById('menu');
          menuElem?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Subscription Plans */}
      <div className="bg-brand-cream">
        <PlanBuilder onSelectPlan={handleSelectPlan} />
      </div>

      {/* Interactive Menu Explorer */}
      <MenuExplorer onSelectTrialDish={handleBookTrial} />

      {/* Trial Meal Conversion Component */}
      <TrialMealFlow onBookTrial={handleBookTrial} />

      {/* Delivery Radius Verification */}
      <div className="bg-brand-cream">
        <RadiusChecker />
      </div>

      {/* Rules & Regulations FAQ */}
      <RulesSection />

      {/* Unified Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        type={checkoutType}
        initialPlan={selectedPlan}
        initialMealName={trialMealName}
        initialMealSlot={trialMealSlot}
      />

      {/* Floating WhatsApp and Sticky Mobile Bar */}
      <FloatingWhatsApp
        onOpenTrial={() => handleOpenCheckout('trial')}
        onOpenPlans={() => {
          const plansElem = document.getElementById('plans');
          plansElem?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Comprehensive Brand Footer */}
      <footer id="contact" className="bg-brand-navy text-brand-cream pt-20 pb-36 md:pb-16 border-t border-brand-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Information */}
            <div className="space-y-4">
              <Logo theme="dark" size="md" showTagline={false} />
              <p className="text-brand-coral font-bold text-sm">
                &ldquo;Nutritious Meals • Happier You&rdquo;
              </p>
              <p className="text-brand-cream/70 text-xs leading-relaxed font-medium">
                Real Food | Real Balance | A Healthier Tomorrow. We prepare high-protein, calorie-calibrated meals designed to fuel active lifestyles without sacrificing flavor.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-coral flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={`tel:${WHATSAPP_DISPLAY}`}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-coral flex items-center justify-center text-white transition-colors"
                  aria-label="Phone"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-coral mb-5">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm font-semibold text-brand-cream/80">
                <li>
                  <a href="#plans" className="hover:text-brand-coral transition-colors">
                    Monthly & Weekly Plans
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-brand-coral transition-colors">
                    Lunch Bowls Menu
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-brand-coral transition-colors">
                    Dinner Plates Menu
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenCheckout('trial')}
                    className="hover:text-brand-coral transition-colors text-left"
                  >
                    Book Single Trial Meal (₹229)
                  </button>
                </li>
                <li>
                  <a href="#radius-check" className="hover:text-brand-coral transition-colors">
                    Check 6km Free Delivery
                  </a>
                </li>
                <li>
                  <a href="#rules" className="hover:text-brand-coral transition-colors">
                    Rules & Freezing Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Kitchen Hours & Dispatch */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-coral mb-5">
                Delivery Schedule
              </h4>
              <ul className="space-y-3 text-xs text-brand-cream/80 font-medium">
                <li className="flex items-start gap-2.5">
                  <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Lunch Delivery:</span>
                    <span>12:30 PM – 2:00 PM (Daily)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Dinner Delivery:</span>
                    <span>7:30 PM – 9:00 PM (Daily)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Customer Care:</span>
                    <span>9:00 AM – 9:00 PM on WhatsApp</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct WhatsApp Ordering */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-coral mb-5">
                Quick WhatsApp Desk
              </h4>
              <p className="text-xs text-brand-cream/70 font-medium">
                Direct booking line for custom calorie plans, corporate bulk orders, or meal queries:
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm w-full justify-center shadow-lg transition-all"
              >
                <MessageCircle size={18} />
                <span>+91 {WHATSAPP_DISPLAY}</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-3.5 rounded-2xl bg-white/10 hover:bg-brand-coral text-white font-bold text-sm w-full justify-center shadow-lg transition-all"
              >
                <InstagramIcon size={18} />
                <span>@80isto20 on Instagram</span>
              </a>
              <div className="text-[11px] text-brand-cream/50">
                Free delivery within 6 km • Maximum 2 freezes per cycle.
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-cream/10 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-cream/50 gap-4">
            <div>
              © 2026 80isto20 Nutritious Meals. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              <span>Crafted for Health & Longevity</span>
              <Heart size={14} className="text-brand-coral fill-brand-coral mx-1" />
              <span>Real Food • Real Balance</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
