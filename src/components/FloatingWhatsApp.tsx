"use client";
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/constants';

interface FloatingWhatsAppProps {
  onOpenTrial: () => void;
  onOpenPlans: () => void;
}

export default function FloatingWhatsApp({ onOpenTrial, onOpenPlans }: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <>
      {/* Floating Desktop / General WhatsApp Bubble */}
      <div className="fixed bottom-20 md:bottom-8 right-6 z-40 flex flex-col items-end gap-3">
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
            className="flex items-center justify-center bg-gradient-to-tr from-amber-400 via-brand-coral to-fuchsia-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            aria-label="Follow 80isto20 on Instagram"
          >
            <InstagramIcon size={22} />
          </a>

          <a
            href={whatsappLink('Hi 80isto20! I would like to know more about your meal plans and trial meals.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white p-4 md:px-5 md:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            aria-label="Order on WhatsApp"
          >
            <div className="relative">
              <MessageCircle size={24} className="fill-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-600" />
            </div>
            <span className="hidden md:inline font-bold text-sm tracking-wide">
              WhatsApp Order ({WHATSAPP_DISPLAY})
            </span>
          </a>
        </div>
      </div>

      {/* Sticky Mobile Bottom Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-navy/10 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors flex items-center justify-center shrink-0"
          aria-label="WhatsApp Contact"
        >
          <MessageCircle size={22} className="fill-emerald-700" />
        </a>

        <button
          onClick={onOpenTrial}
          className="flex-1 py-3 px-3 rounded-xl bg-brand-coral text-white font-bold text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-transform"
        >
          Book Trial • ₹229
        </button>

        <button
          onClick={onOpenPlans}
          className="flex-1 py-3 px-3 rounded-xl bg-brand-navy text-white font-bold text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-transform"
        >
          View Plans
        </button>
      </div>
    </>
  );
}
