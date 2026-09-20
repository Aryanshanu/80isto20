"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { MapPin, CheckCircle2, AlertTriangle, Loader2, Navigation, Compass } from 'lucide-react';
import { WHATSAPP_DISPLAY } from '@/lib/constants';

export default function RadiusChecker() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'warning'>('idle');
  const [verifiedDistance, setVerifiedDistance] = useState<number | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setStatus('checking');
    // Simulate real-time geolocation distance matrix query
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulated distance calculation based on input
    const lower = address.toLowerCase();
    let distance = 3.4;

    if (lower.includes('kondapur') || lower.includes('hitec') || lower.includes('madhapur') || lower.includes('gachibowli')) {
      distance = 2.8;
    } else if (lower.includes('jubilee') || lower.includes('banjara') || lower.includes('kukatpally')) {
      distance = 5.2;
    } else if (lower.length > 25 || lower.includes('airport') || lower.includes('secunderabad')) {
      distance = 8.5;
    }

    setVerifiedDistance(distance);

    if (distance <= 6.0) {
      setStatus('success');
    } else {
      setStatus('warning');
    }
  };

  return (
    <section id="radius-check" className="py-24 bg-brand-cream relative overflow-hidden border-t border-brand-navy/5">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-brand-navy rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border-[2px] border-brand-navy rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-black uppercase tracking-wider mb-3">
            <Compass size={14} />
            <span>Delivery Radius Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-3 tracking-tight">
            Check Your Free Delivery Eligibility
          </h2>
          <p className="text-brand-navy/60 text-sm sm:text-base font-medium">
            We offer 100% complimentary delivery on all daily subscriptions and trial orders within 6 km of our kitchen hub.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-brand-navy/10">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter your area, building, or pin code..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-brand-navy/10 focus:border-brand-coral outline-none transition-all font-medium text-brand-navy text-sm"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="px-8 py-4 whitespace-nowrap flex items-center justify-center gap-2 text-sm font-bold shadow-md"
              disabled={status === 'checking'}
            >
              {status === 'checking' ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Navigation size={18} />
                  <span>Verify Zone</span>
                </>
              )}
            </Button>
          </form>

          {/* Verification Result Output */}
          <div className="mt-6 min-h-[70px]">
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-brand-green/10 text-brand-navy border border-brand-green/30 flex items-start gap-3"
                >
                  <CheckCircle2 size={24} className="text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-brand-green block text-sm">
                      Awesome! You are within our Free Delivery Zone (~{verifiedDistance} km)
                    </span>
                    <p className="text-xs text-brand-navy/70 mt-0.5">
                      Your meals will be delivered warm and fresh with zero shipping fees.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'warning' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-amber-50 text-brand-navy border border-amber-300 flex items-start gap-3"
                >
                  <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-amber-700 block text-sm">
                      Notice: Distance is ~{verifiedDistance} km (Beyond our 6 km free zone)
                    </span>
                    <p className="text-xs text-brand-navy/70 mt-0.5">
                      We can still deliver! A nominal custom delivery partner surcharge may apply. Please ping us on WhatsApp at {WHATSAPP_DISPLAY} to finalize your route.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'idle' && (
                <div className="flex items-center justify-between text-xs text-brand-navy/50 p-2">
                  <span>Popular hubs: Madhapur, Hitec City, Kondapur, Gachibowli, Jubilee Hills</span>
                  <span className="font-bold text-brand-coral">Kitchen Radius: 6 km</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
