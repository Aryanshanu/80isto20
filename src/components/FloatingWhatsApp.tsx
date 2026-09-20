"use client";
import React, { useState } from 'react';
import { MessageCircle, X, Home, UtensilsCrossed, CalendarCheck, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FloatingWhatsAppProps {
  onOpenTrial: () => void;
  onOpenPlans: () => void;
}

const TAB_ITEMS = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Menu', icon: UtensilsCrossed, href: '#menu' },
  { name: 'Plans', icon: CalendarCheck, href: '#plans' },
  { name: 'Rules', icon: ShieldCheck, href: '#rules' },
];

export default function FloatingWhatsApp({ onOpenTrial, onOpenPlans }: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      {/* Floating WhatsApp + Instagram Bubbles — desktop only. On mobile, WhatsApp lives in the
          tab bar's Chat tab and Instagram in the nav/footer, so we don't stack extra floating
          widgets on top of the quick-order pill and tab bar. */}
      <div className="hidden md:flex fixed bottom-8 right-6 z-40 flex-col items-end gap-3">
        {showTooltip && (
          <div className="relative bg-white text-brand-navy px-4 py-2.5 rounded-2xl shadow-xl border border-brand-navy/10 text-xs font-semibold flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Need advice or instant order? Chat with us!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-brand-navy/40 hover:text-brand-navy ml-1 p-0.5"
            >
              <X size={14} />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-brand-navy/10 transform rotate-45" />
          </div>
        )}

        <div className="flex items-end gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-tr from-amber-400 via-brand-coral to-fuchsia-600 text-white w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            aria-label="Follow 80isto20 on Instagram"
          >
            <InstagramIcon size={22} />
          </a>

          <a
            href={whatsappLink('Hi 80isto20! I would like to know more about your meal plans and trial meals.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            aria-label="Order on WhatsApp"
          >
            <div className="relative">
              <MessageCircle size={24} className="fill-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-600" />
            </div>
            <span className="font-bold text-sm tracking-wide">
              WhatsApp Order ({WHATSAPP_DISPLAY})
            </span>
          </a>
        </div>
      </div>

      {/* Floating Quick-Order Pill (sits above the app tab bar, mobile only) */}
      <div className="md:hidden fixed bottom-[68px] left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <button
          onClick={onOpenTrial}
          className="pointer-events-auto flex items-center gap-2 py-3 px-6 rounded-full bg-brand-coral text-white font-black text-xs uppercase tracking-wider shadow-[0_8px_24px_rgba(255,107,74,0.45)] active:scale-95 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Quick Order: Trial Meal • ₹229
        </button>
      </div>

      {/* App-Style Bottom Tab Bar (mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-navy/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 items-stretch">
          {TAB_ITEMS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => {
                  setActiveTab(tab.name);
                  if (tab.name === 'Plans') onOpenPlans();
                }}
                className="flex flex-col items-center justify-center gap-1 py-2.5"
              >
                <Icon
                  size={20}
                  className={cn(isActive ? 'text-brand-coral' : 'text-brand-navy/40')}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={cn(
                    'text-[10px] font-bold',
                    isActive ? 'text-brand-coral' : 'text-brand-navy/40'
                  )}
                >
                  {tab.name}
                </span>
              </a>
            );
          })}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2.5"
            aria-label="WhatsApp Contact"
          >
            <MessageCircle size={20} className="text-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-600">Chat</span>
          </a>
        </div>
      </nav>
    </>
  );
}
