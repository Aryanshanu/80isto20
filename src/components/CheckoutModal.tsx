"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, ShieldAlert, Truck, CreditCard, 
  Smartphone, MapPin, Calendar, Clock, AlertCircle, ArrowRight, ExternalLink 
} from 'lucide-react';
import { PlanSelection, DietType } from '@/lib/types';
import { Button } from './ui/Button';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'plan' | 'trial';
  initialPlan?: PlanSelection;
  initialMealName?: string;
  initialMealSlot?: 'Lunch' | 'Dinner';
}

export default function CheckoutModal({
  isOpen,
  onClose,
  type,
  initialPlan,
  initialMealName = 'Spanish Smoky Paprika Chicken Bowl',
  initialMealSlot = 'Lunch',
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedPlan, setSelectedPlan] = useState<PlanSelection>(
    initialPlan || {
      duration: 'monthly',
      diet: 'nonveg',
      frequency: 1,
      price: 4999,
      mealsCount: 26,
    }
  );

  const [trialMeal, setTrialMeal] = useState(initialMealName);
  const [mealSlot, setMealSlot] = useState<'Lunch' | 'Dinner' | 'Both'>(
    type === 'trial' ? initialMealSlot : initialPlan?.frequency === 2 ? 'Both' : 'Lunch'
  );
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [allergyNotes, setAllergyNotes] = useState('');

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [distanceStatus, setDistanceStatus] = useState<'valid' | 'warning'>('valid');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Sync props on change
  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
      if (initialPlan.frequency === 2) setMealSlot('Both');
    }
    if (initialMealName) {
      setTrialMeal(initialMealName);
    }
    if (initialMealSlot && type === 'trial') {
      setMealSlot(initialMealSlot);
    }
    setStep(1);
  }, [initialPlan, initialMealName, initialMealSlot, type, isOpen]);

  if (!isOpen) return null;

  const finalPrice = type === 'trial' ? 229 : selectedPlan.price;
  const orderTitle = type === 'trial' 
    ? `Single Trial Meal (₹229)` 
    : `${selectedPlan.duration === 'monthly' ? 'Monthly Plan (26 Days)' : 'Weekly Plan (6 Days)'} - ${selectedPlan.diet === 'veg' ? 'Veg' : 'Non-Veg'} (${selectedPlan.frequency} Meal/Day)`;

  const handleAreaChange = (val: string) => {
    setDeliveryArea(val);
    if (val.toLowerCase().includes('far') || val.length > 25) {
      setDistanceStatus('warning');
    } else {
      setDistanceStatus('valid');
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, contact number, and delivery address.');
      return;
    }
    setStep(3);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomId = '8020-' + Math.floor(1000 + Math.random() * 9000);
      setOrderId(randomId);
      setStep(4);
    }, 1200);
  };

  // WhatsApp Message Generator
  const generateWhatsAppUrl = () => {
    const message = `*NEW ORDER CONFIRMATION - 80isto20*%0A%0A` +
      `*Order ID:* ${orderId}%0A` +
      `*Type:* ${type === 'trial' ? 'Single Trial Meal' : 'Subscription Plan'}%0A` +
      `*Details:* ${type === 'trial' ? trialMeal : orderTitle}%0A` +
      `*Meal Slot:* ${mealSlot}%0A` +
      `*Start Date:* ${startDate}%0A` +
      `*Total Amount:* ₹${finalPrice.toLocaleString()}%0A%0A` +
      `*Customer Details:*%0A` +
      `• Name: ${customerName}%0A` +
      `• Phone: ${phone}%0A` +
      `• Delivery Address: ${address}, ${landmark ? landmark + ', ' : ''}${deliveryArea}%0A` +
      `• Dietary/Allergy Notes: ${allergyNotes || 'None'}%0A` +
      `• Payment Mode: ${paymentMethod.toUpperCase()}%0A%0A` +
      `Please confirm my meal dispatch!`;

    return `https://wa.me/916302408944?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand-navy/10 my-8"
      >
        {/* Modal Header */}
        <div className="bg-brand-navy text-brand-cream px-8 py-6 flex items-center justify-between">
          <div>
            <span className="text-brand-coral font-bold text-xs uppercase tracking-widest block">
              {type === 'trial' ? 'Single Meal Experience' : 'Custom Nutrition Plan'}
            </span>
            <h3 className="text-2xl font-black tracking-tight">
              {type === 'trial' ? 'Trial Meal Checkout' : 'Complete Your Subscription'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex border-b border-brand-navy/10 bg-brand-cream/50 px-8 py-3">
          {[
            { num: 1, label: 'Customise' },
            { num: 2, label: 'Delivery' },
            { num: 3, label: 'Payment' },
            { num: 4, label: 'Confirmed' },
          ].map((item) => (
            <div key={item.num} className="flex-1 flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  step === item.num
                    ? 'bg-brand-coral text-white'
                    : step > item.num
                    ? 'bg-brand-green text-white'
                    : 'bg-brand-navy/10 text-brand-navy/40'
                }`}
              >
                {step > item.num ? '✓' : item.num}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${step === item.num ? 'text-brand-navy' : 'text-brand-navy/40'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Customise & Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-brand-cream border border-brand-navy/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider block">Selected Package</span>
                  <div className="text-lg font-black text-brand-navy">{orderTitle}</div>
                  {type === 'trial' && (
                    <div className="text-sm font-semibold text-brand-coral mt-0.5">
                      Dish: {trialMeal}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider block">Total</span>
                  <div className="text-2xl font-black text-brand-navy">₹{finalPrice.toLocaleString()}</div>
                </div>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-2">
                  Preferred Meal Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(type === 'trial' ? ['Lunch', 'Dinner'] : selectedPlan.frequency === 2 ? ['Both'] : ['Lunch', 'Dinner']).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setMealSlot(slot as any)}
                      className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all text-center ${
                        mealSlot === slot
                          ? 'border-brand-coral bg-brand-coral/10 text-brand-navy'
                          : 'border-brand-navy/10 hover:border-brand-navy/30 text-brand-navy/70'
                      }`}
                    >
                      {slot}
                      <span className="block text-[10px] font-normal text-brand-navy/50">
                        {slot === 'Lunch' ? '12:30 PM - 2:00 PM' : slot === 'Dinner' ? '7:30 PM - 9:00 PM' : 'Lunch & Dinner'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-2">
                    Delivery Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy font-semibold text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-2">
                    Dietary Requirement / Allergies
                  </label>
                  <input
                    type="text"
                    value={allergyNotes}
                    onChange={(e) => setAllergyNotes(e.target.value)}
                    placeholder="e.g. Nut allergy, less spicy, no dairy"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy text-sm font-medium"
                  />
                </div>
              </div>

              {/* Transparency Notice Alert */}
              <div className="p-4 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-start gap-3 text-xs text-brand-navy/80">
                <ShieldAlert size={18} className="text-brand-green shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-green block">Important Policy Notice</span>
                  Advance notice is required for allergies. Subscriptions include up to 2 freeze periods with prior notice. Free delivery up to 6km radius.
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  Proceed to Delivery Details <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery & Contact */}
          {step === 2 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Anil Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-1.5">
                  Complete Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat/House No, Building Name, Street"
                  className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy text-sm font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-1.5">
                    Landmark / Nearby Spot
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near Metro Station or Supermarket"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-1.5">
                    Locality / Pin Code
                  </label>
                  <input
                    type="text"
                    value={deliveryArea}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    placeholder="e.g. Madhapur, Hitec City"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 focus:border-brand-coral outline-none text-brand-navy text-sm font-medium"
                  />
                </div>
              </div>

              {/* 6km Radius Badge */}
              <div className="p-3 rounded-xl bg-brand-cream border border-brand-navy/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-brand-green" />
                  <span className="font-semibold text-brand-navy">Free Delivery Radius:</span>
                  <span className="text-brand-green font-bold">Within 6 kms (Covered)</span>
                </div>
                <span className="text-[11px] font-bold text-brand-navy/60">₹0 Delivery Fee</span>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 text-sm font-bold"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-2/3 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  Continue to Payment <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Simulation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-brand-navy text-brand-cream flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-cream/60 uppercase tracking-widest block font-bold">Amount Payable</span>
                  <span className="text-3xl font-black text-white">₹{finalPrice.toLocaleString()}</span>
                  <span className="text-xs text-brand-green block mt-1">✓ Includes Free Delivery (Within 6km)</span>
                </div>
                <div className="text-right text-xs text-brand-cream/60">
                  <span>Slot: {mealSlot}</span>
                  <br />
                  <span>Start: {startDate}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-brand-navy/60 mb-3">
                  Choose Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-brand-coral bg-brand-coral/5 shadow-sm'
                        : 'border-brand-navy/10 hover:border-brand-navy/20'
                    }`}
                  >
                    <Smartphone size={20} className="text-brand-coral mb-2" />
                    <div className="font-bold text-brand-navy text-sm">UPI / QR Code</div>
                    <div className="text-[11px] text-brand-navy/60">GPay, PhonePe, Paytm</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-brand-coral bg-brand-coral/5 shadow-sm'
                        : 'border-brand-navy/10 hover:border-brand-navy/20'
                    }`}
                  >
                    <CreditCard size={20} className="text-brand-green mb-2" />
                    <div className="font-bold text-brand-navy text-sm">Cards & NetBanking</div>
                    <div className="text-[11px] text-brand-navy/60">Visa, Mastercard, RuPay</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-brand-coral bg-brand-coral/5 shadow-sm'
                        : 'border-brand-navy/10 hover:border-brand-navy/20'
                    }`}
                  >
                    <Truck size={20} className="text-brand-navy mb-2" />
                    <div className="font-bold text-brand-navy text-sm">Pay on Delivery</div>
                    <div className="text-[11px] text-brand-navy/60">UPI / Cash on Delivery</div>
                  </button>
                </div>
              </div>

              {/* UPI Quick Display */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-brand-cream border border-brand-navy/10 text-center">
                  <div className="text-xs font-bold text-brand-navy/60 mb-2">Instant UPI VPA</div>
                  <div className="text-sm font-mono font-bold text-brand-navy bg-white py-2 px-4 rounded-lg inline-block border border-brand-navy/10">
                    80isto20@upi
                  </div>
                  <p className="text-[11px] text-brand-navy/50 mt-2">
                    Scan or transfer directly, or finalize via WhatsApp confirmation.
                  </p>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 text-sm font-bold"
                  disabled={isProcessing}
                >
                  Back
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-2/3 py-4 text-base font-black shadow-xl flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Processing Securely...' : `Pay ₹${finalPrice.toLocaleString()} & Confirm`}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmed & WhatsApp Dispatch */}
          {step === 4 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={48} />
              </div>

              <div>
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest block mb-1">
                  Order Successfully Placed!
                </span>
                <h3 className="text-3xl font-black text-brand-navy">
                  Thank You, {customerName || 'Fitness Champ'}!
                </h3>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy font-mono font-bold text-sm">
                  Order ID: #{orderId}
                </div>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-2xl bg-brand-cream text-left text-xs space-y-2 border border-brand-navy/10">
                <div className="flex justify-between">
                  <span className="text-brand-navy/60">Meal/Plan:</span>
                  <span className="font-bold text-brand-navy">{type === 'trial' ? trialMeal : orderTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-navy/60">Slot & Start:</span>
                  <span className="font-bold text-brand-navy">{mealSlot} • {startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-navy/60">Delivery Address:</span>
                  <span className="font-bold text-brand-navy text-right max-w-[200px] truncate">{address}</span>
                </div>
                <div className="flex justify-between border-t border-brand-navy/10 pt-2 font-bold text-sm">
                  <span>Total Paid/Due:</span>
                  <span className="text-brand-coral">₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* WhatsApp Trigger Button */}
              <div className="pt-2 space-y-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl transition-transform hover:scale-[1.02]"
                >
                  <span>Confirm on WhatsApp (6302408944)</span>
                  <ExternalLink size={18} />
                </a>

                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full py-3 text-sm font-bold border-brand-navy/20"
                >
                  Close & Continue Browsing
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
