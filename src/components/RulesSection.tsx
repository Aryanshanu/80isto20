"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Calendar, ShieldAlert, CreditCard, 
  Truck, Clock, CheckCircle2, HelpCircle, PhoneCall 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { whatsappLink } from '@/lib/constants';

interface Rule {
  id: string;
  num: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  summary: string;
  keyPoints: string[];
}

const RULES: Rule[] = [
  {
    id: 'rule-1',
    num: '01',
    title: 'Meal Cancellation & Availability',
    badge: 'Zero Food Waste',
    icon: <Clock className="text-brand-coral" size={24} />,
    summary: 'We maintain strict preparation schedules to guarantee supreme freshness and zero food waste.',
    keyPoints: [
      'Lunch menu & dispatch details are confirmed early morning.',
      'Dinner menu & dispatch details are confirmed in the afternoon.',
      'Any cancellation or pause requests must be made prior to kitchen cut-off times to avoid meal forfeiture.',
      'Fresh ingredients are pre-sourced daily based on exact headcounts.',
    ],
  },
  {
    id: 'rule-2',
    num: '02',
    title: 'Subscription Freezing Policy',
    badge: 'Max 2 Freezes',
    icon: <Calendar className="text-brand-green" size={24} />,
    summary: 'Travelling or taking a break? We offer structured flexibility without losing your hard-earned meals.',
    keyPoints: [
      'A maximum of 2 freeze periods are permitted per subscription duration (Monthly or Weekly).',
      'Freezing cannot be postponed indefinitely — resume dates must be specified.',
      'Unused, unapproved absences without prior notice are strictly non-refundable and non-forwardable.',
      'Notify via WhatsApp at least 24 hours prior to activate a freeze.',
    ],
  },
  {
    id: 'rule-3',
    num: '03',
    title: 'Allergies & Dietary Restrictions',
    badge: 'Safety First',
    icon: <ShieldAlert className="text-brand-coral" size={24} />,
    summary: 'Your health and safety are our primary responsibility. Mutual transparency is critical.',
    keyPoints: [
      'Advance notice of any food allergies (e.g., nuts, gluten, lactose, mushrooms) is mandatory during onboarding.',
      '80isto20 is not liable for adverse reactions arising from undisclosed allergies or unmentioned dietary conditions.',
      'Customized substitutions (e.g. low spice, alternative grains) can be accommodated upon request.',
    ],
  },
  {
    id: 'rule-4',
    num: '04',
    title: 'Subscription & Payment Terms',
    badge: 'Clear & Upfront',
    icon: <CreditCard className="text-brand-green" size={24} />,
    summary: 'Straightforward billing designed to keep service seamless and uninterrupted.',
    keyPoints: [
      '100% advance payment is required to activate and schedule meal deliveries.',
      'Monthly subscriptions are valid for 26 days; Weekly plans are valid for 6 days.',
      'Meals outside the subscribed plan or supplementary orders are charged separately at standard rates.',
      'Secure payment methods include UPI, Debit/Credit cards, and NetBanking.',
    ],
  },
  {
    id: 'rule-5',
    num: '05',
    title: 'Delivery Terms & Accuracy',
    badge: 'Prompt & Fresh',
    icon: <Truck className="text-brand-navy" size={24} />,
    summary: 'Hot and fresh deliveries right to your hands within scheduled mealtime windows.',
    keyPoints: [
      'Free delivery applies up to 6 kms radius from our central kitchen hub.',
      'Delivery address and contact phone must be accurate. Courier wait times are limited to 10 minutes.',
      'Incorrect addresses or unreachable customer phones leading to failed delivery cannot be replaced or re-dispatched.',
      'Lunch delivery window: 12:30 PM - 2:00 PM | Dinner delivery window: 7:30 PM - 9:00 PM.',
    ],
  },
];

export default function RulesSection() {
  const [activeRule, setActiveRule] = useState<string | null>('rule-1');

  return (
    <section id="rules" className="py-24 sm:py-32 bg-brand-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy text-brand-cream text-xs font-black uppercase tracking-widest mb-4">
            <ShieldAlert size={14} className="text-brand-coral" />
            <span>Transparency & Trust</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-4 tracking-tight">
            Rules & Regulations
          </h2>
          <p className="text-brand-navy/70 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Clear guidelines to ensure smooth deliveries, top culinary hygiene, and reliable daily service.
          </p>
        </div>

        {/* 5 Structured Numbered Blocks */}
        <div className="space-y-4">
          {RULES.map((rule) => {
            const isOpen = activeRule === rule.id;

            return (
              <div
                key={rule.id}
                className={cn(
                  "rounded-3xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "bg-white shadow-xl border-brand-navy/20"
                    : "bg-white/70 border-brand-navy/10 hover:border-brand-navy/20 hover:bg-white"
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveRule(isOpen ? null : rule.id)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Number Badge */}
                    <span className="text-2xl sm:text-3xl font-black text-brand-coral/80 font-mono">
                      {rule.num}
                    </span>

                    <div className="p-3 rounded-2xl bg-brand-navy/5 shrink-0 hidden sm:block">
                      {rule.icon}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-black text-brand-navy">
                          {rule.title}
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-brand-navy/5 text-brand-navy/70 px-2.5 py-0.5 rounded-full border border-brand-navy/10">
                          {rule.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-navy/60 font-medium line-clamp-1">
                        {rule.summary}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-2 rounded-full bg-brand-navy/5 shrink-0 text-brand-navy/60"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-7 sm:px-7 sm:pl-24 pt-2 border-t border-brand-navy/5">
                        <p className="text-sm font-semibold text-brand-navy/80 mb-4">
                          {rule.summary}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {rule.keyPoints.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-brand-navy/70 bg-brand-cream/60 p-3 rounded-xl border border-brand-navy/5"
                            >
                              <CheckCircle2 size={15} className="text-brand-green shrink-0 mt-0.5" />
                              <span className="leading-relaxed font-medium">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Clarification Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-brand-navy text-brand-cream flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-amber-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <div className="font-bold text-sm">Have specific custom questions?</div>
              <div className="text-xs text-brand-cream/60">Our team is available 9 AM - 9 PM daily on WhatsApp.</div>
            </div>
          </div>
          <a
            href={whatsappLink('Hi 80isto20! I have a question regarding the subscription rules.')}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
          >
            <PhoneCall size={14} />
            <span>Chat With Nutritionist</span>
          </a>
        </div>
      </div>
    </section>
  );
}
