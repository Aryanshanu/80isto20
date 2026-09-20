"use client";
import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import Logo from './Logo';
import { InstagramIcon } from './icons/InstagramIcon';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/constants';

interface NavbarProps {
  onOpenCheckout: (type: 'plan' | 'trial') => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Plans', href: '#plans' },
    { name: 'Menu', href: '#menu' },
    { name: 'Free Delivery', href: '#radius-check' },
    { name: 'Rules & FAQ', href: '#rules' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-navy/10 transition-all">
      {/* Top micro-banner */}
      <div className="bg-brand-navy text-brand-cream text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-brand-green"></span>
        <span>Free Delivery up to 6 kms • 45+ Grams of Protein Per Meal • Zero Preservatives</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex-shrink-0 group">
            <Logo size="sm" className="group-hover:scale-[1.02] transition-transform" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-brand-navy/80 hover:text-brand-coral font-bold text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}

            <a
              href={whatsappLink('Hi 80isto20, I would like to place an order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-bold border border-emerald-200"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow 80isto20 on Instagram"
              className="w-8 h-8 rounded-full bg-brand-coral/10 text-brand-coral hover:bg-brand-coral hover:text-white flex items-center justify-center transition-colors border border-brand-coral/20"
            >
              <InstagramIcon size={16} />
            </a>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenCheckout('trial')}
                className="text-xs px-4 py-2.5 border-brand-coral text-brand-coral hover:bg-brand-coral hover:text-white"
              >
                Trial Meal ₹229
              </Button>
              <Button
                variant="primary"
                onClick={() => onOpenCheckout('plan')}
                className="text-xs px-5 py-2.5 shadow-md"
              >
                Order Plan
              </Button>
            </div>
          </div>

          {/* Mobile Right Bar */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => onOpenCheckout('trial')}
              className="text-xs px-3 py-2"
            >
              Trial ₹229
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-navy p-2 rounded-xl hover:bg-brand-navy/5"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-brand-cream border-b border-brand-navy/10 px-6 py-6 space-y-4 shadow-xl">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-base text-brand-navy font-bold hover:text-brand-coral"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-navy/10 space-y-3">
            <div className="flex gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                <MessageCircle size={18} />
                <span>WhatsApp ({WHATSAPP_DISPLAY})</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow 80isto20 on Instagram"
                className="px-4 flex items-center justify-center rounded-xl bg-brand-coral/10 text-brand-coral border border-brand-coral/20"
              >
                <InstagramIcon size={20} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  onOpenCheckout('trial');
                }}
                className="w-full text-xs py-3 border-brand-coral text-brand-coral"
              >
                Book Trial ₹229
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  onOpenCheckout('plan');
                }}
                className="w-full text-xs py-3"
              >
                Select Plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
