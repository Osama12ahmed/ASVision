import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Cart({
  cart = [],
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  cartCount = 0
}) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form State for Checkout Modal
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Egypt',
    paymentMethod: 'card'
  });

  // Calculate Numerical Subtotal
  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const clean = priceStr.toString().replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = parsePrice(item.price);
    const qty = item.quantity || 1;
    return sum + unitPrice * qty;
  }, 0);

  // Free shipping over $50 threshold
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 7.99;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeededForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0).toFixed(2);

  // Discount calculation
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(subtotal - discountAmount + (subtotal > 0 ? shippingCost : 0), 0);

  // Handle Promo Code Submission
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');

    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'AS15' || code === 'VISION15') {
      setDiscountPercent(15);
      setPromoApplied(true);
      setPromoError('');
    } else if (code === 'WELCOME10' || code === 'SAVE10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "AS15" or "WELCOME10"');
    }
  };

  // Handle Checkout Submit
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedOrderNum = `ASV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setOrderPlaced(true);
    onClearCart?.();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* Background Radial Glow */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#FF6D06]/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Navbar */}
      <Navbar cartCount={cartCount} />

      {/* Main Cart Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 w-full relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-white/50 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#FF6D06] font-semibold">Shopping Cart</span>
        </nav>

        {/* Page Title & Item Count Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Shopping</span>
              <span className="text-[#FF6D06]">Cart</span>
              <span className="text-sm sm:text-base font-bold text-white/40 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1.5">
              Review your customized products and adjust quantities before checking out.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={onClearCart}
              className="text-xs font-bold text-rose-400/80 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="bg-[#131418] border border-white/10 rounded-[32px] p-8 sm:p-16 text-center max-w-2xl mx-auto shadow-2xl space-y-6 my-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FF6D06]/10 border border-[#FF6D06]/30 flex items-center justify-center mx-auto text-[#FF6D06]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Your Cart is Empty
              </h2>
              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto leading-relaxed">
                Looks like you haven't added or customized any print items yet. Explore our custom apparel, notebooks, and frames to create something unique!
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate('/#categories')}
                className="inline-flex items-center gap-2.5 bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-95 text-white font-extrabold text-xs sm:text-sm tracking-wider px-8 py-3.5 rounded-full shadow-lg shadow-[#FF6D06]/30 hover:shadow-[#FF6D06]/50 transition-all duration-300 cursor-pointer uppercase"
              >
                <span>Explore Products</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* Populated Cart Layout (Grid: 2 Columns on Desktop) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Items List */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Free Shipping Progress Bar Card */}
              <div className="bg-[#141518] border border-white/10 rounded-2xl p-4 space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-white">
                    <span>🚚</span>
                    <span>
                      {isFreeShipping
                        ? "🎉 You've unlocked FREE Standard Shipping!"
                        : `Add $${amountNeededForFreeShipping} more for FREE shipping`}
                    </span>
                  </span>
                  <span className="text-[#FF6D06] font-extrabold">{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF6D06] to-[#ff9442] transition-all duration-500 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {cart.map((item, index) => {
                  const qty = item.quantity || 1;
                  const unitPrice = parsePrice(item.price);
                  const itemTotal = (unitPrice * qty).toFixed(2);
                  const itemId = item.id || `cart-item-${index}`;

                  return (
                    <div
                      key={itemId}
                      className="bg-[#141518] border border-white/10 hover:border-white/20 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-300 shadow-xl relative group"
                    >
                      {/* Item Thumbnail / Artwork Preview */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0d0e11] overflow-hidden border border-white/10 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={item.previewImage || item.uploadedImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80'}
                          alt={item.title}
                          className="w-full h-full object-contain p-1"
                        />
                        {item.uploadedImage && (
                          <span className="absolute bottom-1 right-1 bg-[#FF6D06] text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                            Custom
                          </span>
                        )}
                      </div>

                      {/* Item Details Info */}
                      <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                          <h3 className="text-base sm:text-lg font-extrabold text-white truncate">
                            {item.title}
                          </h3>
                          <span className="text-base sm:text-lg font-black text-[#FF6D06]">
                            ${itemTotal}
                          </span>
                        </div>

                        {/* Specs Badges (Color, Size, Side) */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap text-[11px]">
                          {item.color && (
                            <span className="bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-lg text-white/80 font-medium flex items-center gap-1">
                              <span className="text-white/40">Color:</span>
                              <span className="font-bold text-white">{item.color}</span>
                            </span>
                          )}
                          {item.size && (
                            <span className="bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-lg text-white/80 font-medium flex items-center gap-1">
                              <span className="text-white/40">Size:</span>
                              <span className="font-bold text-white">{item.size}</span>
                            </span>
                          )}
                          {item.side && (
                            <span className="bg-[#FF6D06]/10 border border-[#FF6D06]/30 px-2.5 py-0.5 rounded-lg text-[#FF6D06] font-bold uppercase text-[10px]">
                              {item.side}
                            </span>
                          )}
                        </div>

                        {/* Controls Row: Quantity Selector & Remove Action */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                          <div className="flex items-center gap-1.5 bg-[#0e0f12] border border-white/10 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity?.(itemId, Math.max(qty - 1, 1))}
                              className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-black text-white">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity?.(itemId, qty + 1)}
                              className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveFromCart?.(itemId)}
                            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors px-2.5 py-1 rounded-lg hover:bg-rose-500/10"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-[#FF6D06] transition-colors"
                >
                  <span>← Continue Shopping & Customizing</span>
                </Link>
              </div>

            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5 bg-[#131418] border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl sticky top-28">
              
              <h2 className="text-xl font-extrabold text-white tracking-tight pb-4 border-b border-white/10 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-bold text-white/50">{cart.length} Products</span>
              </h2>

              {/* Promo Code Input Box */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-bold text-white/80 block">
                  Have a Promo Code?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. AS15, WELCOME10"
                    className="flex-1 bg-white/[0.04] border border-white/10 focus:border-[#FF6D06] focus:outline-none text-white text-xs px-3.5 py-2.5 rounded-xl uppercase font-mono tracking-wider transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer border border-white/10 whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <span className="text-[11px] font-bold text-emerald-400 block">
                    ✓ Promo applied: {discountPercent}% discount saved!
                  </span>
                )}
                {promoError && (
                  <span className="text-[11px] font-bold text-rose-400 block">
                    {promoError}
                  </span>
                )}
              </form>

              {/* Pricing Breakdown Rows */}
              <div className="space-y-3 pt-2 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-emerald-400 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-white/70">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-white">
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-base sm:text-lg font-black text-white">
                  <span>Estimated Total</span>
                  <span className="text-2xl font-black text-[#FF6D06]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-[0.99] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-xl shadow-[#FF6D06]/30 hover:shadow-[#FF6D06]/50 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Proceed to Checkout</span>
              </button>

              {/* Trust Features Strip */}
              <div className="space-y-2 pt-2 text-[11px] text-white/50">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>100% Encrypted & Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Japanese Archival Print Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>30-Day Hassle-Free Returns</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="bg-[#141518] border border-white/15 rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setCheckoutModalOpen(false);
                setOrderPlaced(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            {orderPlaced ? (
              /* Success Order Confirmation */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Order Confirmed! 🎉</h3>
                  <p className="text-xs sm:text-sm text-white/70">
                    Thank you for your order. We're preparing your custom print with precision care.
                  </p>
                  <div className="bg-[#0e0f12] border border-white/10 p-3 rounded-xl inline-block mt-2">
                    <span className="text-xs text-white/50 block">Order Number:</span>
                    <span className="text-base font-mono font-bold text-[#FF6D06]">{orderNumber}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setOrderPlaced(false);
                    navigate('/');
                  }}
                  className="w-full bg-[#FF6D06] hover:bg-[#ff7b1c] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              /* Checkout Shipping & Payment Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white">Complete Your Order</h3>
                  <p className="text-xs text-white/60">Enter your shipping details below:</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-white/80 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.fullName}
                      onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                      placeholder="e.g. Ahmed Salem"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6D06]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-white/80 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        placeholder="ahmed@example.com"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6D06]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-white/80 mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        placeholder="+20 100 123 4567"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6D06]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      placeholder="Street name, Building No, Apartment..."
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6D06]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-white/80 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        placeholder="Cairo / Alexandria"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6D06]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-white/80 mb-1">Country</label>
                      <input
                        type="text"
                        disabled
                        value="Egypt"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-3.5 py-2.5 text-white/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Summary in Modal */}
                <div className="bg-[#0e0f12] border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-white/70">Total to pay:</span>
                  <span className="text-lg font-black text-[#FF6D06]">${finalTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-95 text-white font-black text-xs sm:text-sm py-4 rounded-xl transition-all cursor-pointer uppercase tracking-wider shadow-lg shadow-[#FF6D06]/30"
                >
                  Place Order (${finalTotal.toFixed(2)})
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
