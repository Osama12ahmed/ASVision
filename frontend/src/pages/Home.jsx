import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import group1Img from '../assets/Group 1.png';
import productHoodieImg from '../assets/product-hoodie.jpg';

// ==================== PRODUCTS DATA ====================
const productsData = [
  {
    id: 'tshirt',
    category: 'tshirts',
    title: 'Custom T-Shirts & Hoodies',
    price: '$59.99',
    oldPrice: '$89.99',
    rating: 4.9,
    sales: '1.2k+ sold',
    tag: 'Best Seller ⭐',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'notebook',
    category: 'notebooks',
    title: 'Custom Hardcover Notebooks',
    price: '$19.99',
    oldPrice: '$29.99',
    rating: 4.95,
    sales: '850+ sold',
    tag: 'Archival 📓',
    sizes: ['Pocket', 'A5', 'A4'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'frame',
    category: 'frames',
    title: 'Custom Wall Art & Frames',
    price: '$39.99',
    oldPrice: '$59.99',
    rating: 4.88,
    sales: '620+ sold',
    tag: 'Museum Grade 🖼️',
    sizes: ['30x40 cm', '50x70 cm', '70x100 cm'],
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'accessories',
    category: 'accessories',
    title: 'Stickers & Accessories',
    price: '$8.99',
    oldPrice: '$14.99',
    rating: 4.92,
    sales: '2.4k+ sold',
    tag: 'Vinyl Pack ✨',
    sizes: ['Single', 'Pack (5)', 'Pack (10)'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  }
];

// ==================== HOW IT WORKS DATA ====================
const stepsData = [
  {
    stepNumber: '01',
    title: 'Choose Your Product',
    subtitle: 'Apparel, Journals or Frames',
    description: 'Select what you want to create: a premium combed cotton tee, a sleek hardcover journal with bleed-proof pages, or a museum-grade framed canvas.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#FF6D06]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    badge: 'Step One'
  },
  {
    stepNumber: '02',
    title: 'Customize Your Artwork',
    subtitle: 'Upload, Scale & Style',
    description: 'Pick an exclusive artwork from our artist presets or upload your own high-res design. Control placement, scale, and add personalized text.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#FF6D06]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Total Freedom'
  },
  {
    stepNumber: '03',
    title: 'Ultra-HD Print & Fast Delivery',
    subtitle: 'Printed & Shipped to Door',
    description: 'We inspect every detail, print using Japanese archival DTG inks that resist washing, securely package your order, and dispatch it promptly.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#FF6D06]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    badge: 'Express Shipping'
  }
];

// ==================== FEATURED ITEMS DATA ====================
const featuredItemsData = [
  {
    id: 'f-1',
    productId: 'tshirt',
    title: 'Essential Oversized Hoodie',
    category: 'tshirts',
    price: '$59.99',
    oldPrice: '$89.99',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&auto=format&fit=crop&q=80',
    rating: 4.8,
    sales: '320+ sold',
    tag: 'Best Seller ⭐',
    sizes: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'f-2',
    productId: 'notebook',
    title: 'Essential Hardcover Notebook',
    category: 'notebooks',
    price: '$19.99',
    oldPrice: '$29.99',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&auto=format&fit=crop&q=80',
    rating: 4.9,
    sales: '180+ sold',
    tag: 'New Arrival 📓',
    sizes: ['Pocket', 'A5', 'A4']
  },
  {
    id: 'f-3',
    productId: 'frame',
    title: 'Essential Oak Wall Frame',
    category: 'frames',
    price: '$39.99',
    oldPrice: '$59.99',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=700&auto=format&fit=crop&q=80',
    rating: 4.95,
    sales: '240+ sold',
    tag: 'Oak Wood Frame 🖼️',
    sizes: ['30x40 cm', '50x70 cm', '70x100 cm']
  },
  {
    id: 'f-4',
    productId: 'tshirt',
    title: 'Heavy Cotton Streetwear Tee',
    category: 'tshirts',
    price: '$26.99',
    oldPrice: '$34.99',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80',
    rating: 4.85,
    sales: '510+ sold',
    tag: '100% Combed Cotton 👕',
    sizes: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'f-5',
    productId: 'notebook',
    title: 'Annual Goal Planner Journal',
    category: 'notebooks',
    price: '$18.99',
    oldPrice: '$24.99',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=700&auto=format&fit=crop&q=80',
    rating: 4.92,
    sales: '190+ sold',
    tag: 'Goal Planner 🎯',
    sizes: ['Pocket', 'A5', 'A4']
  },
  {
    id: 'f-6',
    productId: 'frame',
    title: 'Minimalist Botanical Frame Set',
    category: 'frames',
    price: '$49.99',
    oldPrice: '$68.99',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700&auto=format&fit=crop&q=80',
    rating: 4.88,
    sales: '135+ sold',
    tag: '3-Piece Set 🖼️',
    sizes: ['30x40 cm', '50x70 cm', '70x100 cm']
  }
];

export default function Home({ onAddToCart, cartCount = 0 }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  // Products Section State
  const [selectedProductSizes, setSelectedProductSizes] = useState({
    tshirt: 'L',
    notebook: 'A5',
    frame: '50x70 cm',
    accessories: 'Pack (5)'
  });
  const [productTab, setProductTab] = useState('all');

  // Featured Gallery State
  const [galleryFilter, setGalleryFilter] = useState('all');

  // Footer Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleAddToCart = (item) => {
    onAddToCart?.(item);
    setToastMessage(`Added "${item.title}" to cart! 🛒`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleProductSizeClick = (productId, size, e) => {
    e.stopPropagation();
    setSelectedProductSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  const filteredProducts = productTab === 'all'
    ? productsData
    : productsData.filter(p => p.category === productTab);

  const filteredGallery = galleryFilter === 'all'
    ? featuredItemsData
    : featuredItemsData.filter(item => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans select-none overflow-x-hidden relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18191c] border border-[#FF6D06]/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/80 flex items-center gap-3 backdrop-blur-xl animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6D06]" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCustomizer={() => {
          const el = document.getElementById('categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Background radial glow */}
      <div
        className="absolute top-0 left-0 w-[850px] h-[550px] bg-[#ff5500]/15 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1. HERO SECTION */}
      <section className="relative mt-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16">
        <div className="relative bg-[#18191c] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/[0.06] flex flex-col md:flex-row items-center justify-between min-h-[440px] sm:min-h-[480px] md:min-h-[500px] overflow-hidden md:overflow-visible">

          {/* Left Column: Content */}
          <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start space-y-4 sm:space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 tracking-wide bg-white/[0.07] border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
              <span className="text-[#FF6D06] text-sm leading-none">✦</span>
              <span>New Print Collection</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] font-bold text-white leading-[1.12] tracking-[-0.03em]">
              Print Your Vision, Your<br />
              Way With <span className="text-[#FF6D06]">ASVision</span>
            </h1>

            <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed max-w-md font-normal tracking-[-0.01em]">
              From custom t-shirts and hoodies to luxury journals and museum-grade wall frames; turn your imagination into high-quality tangible products. Leave your mark in every detail.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <a
                href="#categories"
                className="bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wider px-8 py-3.5 rounded-full shadow-lg shadow-[#ff5500]/30 hover:shadow-[#ff5500]/50 transition-all duration-300 cursor-pointer uppercase flex items-center gap-2"
              >
                <span>Shop Products</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <Link
                to="/product/notebook"
                className="bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/10 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>View Notebook</span>
                <span>→</span>
              </Link>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-3 bg-[#111215]/90 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-2xl shadow-lg">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#18191c] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User 1"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#18191c] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User 2"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#18191c] object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="User 3"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-200 tracking-wide block">
                    Loved by 20,000+ Creators
                  </span>
                  <span className="text-[10px] text-white/50 block">4.9 / 5.0 Star Rating ★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hoodie Image: Background on Mobile, Right Column on Desktop */}
          <div
            onClick={() => navigate('/product/tshirt')}
            className="absolute inset-0 md:inset-auto md:right-0 md:right-4 lg:right-8 md:bottom-0 md:-top-16 lg:-top-24 md:w-[48%] lg:w-[52%] flex items-center md:items-end justify-center md:justify-end cursor-pointer z-0 md:z-10 group overflow-hidden md:overflow-visible pointer-events-none md:pointer-events-auto"
          >
            <img
              src={group1Img}
              alt="ASVision Custom Hoodie"
              className="w-[85%] sm:w-[75%] max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px] md:w-full object-contain opacity-40 sm:opacity-25 md:opacity-100 drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-all duration-500 scale-110 md:scale-100 md:group-hover:scale-105"
            />
          </div>



        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT CARDS SECTION (Clean: Image, Name, Price, Sizes) */}
      {/* ========================================================================= */}
      <section id="categories" className="py-16 relative z-20 bg-[#0c0d10] border-t border-white/[0.06] scroll-mt-24">
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF6D06]/10 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Our <span className="text-[#FF6D06]">Products</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl">
                Click any product to view its full details, color options, and size guide.
              </p>
            </div>

            {/* Filter Tabs with Smooth Horizontal Scroll */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 scrollbar-none touch-pan-x">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#141518] border border-white/10 rounded-2xl min-w-max shadow-md">
                <button
                  type="button"
                  onClick={() => setProductTab('all')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${productTab === 'all'
                      ? 'bg-[#FF6D06] text-white shadow-md shadow-[#FF6D06]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setProductTab('tshirts')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${productTab === 'tshirts'
                      ? 'bg-[#FF6D06] text-white shadow-md shadow-[#FF6D06]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  T-Shirts & Hoodies
                </button>
                <button
                  type="button"
                  onClick={() => setProductTab('notebooks')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${productTab === 'notebooks'
                      ? 'bg-[#FF6D06] text-white shadow-md shadow-[#FF6D06]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  Notebooks
                </button>
                <button
                  type="button"
                  onClick={() => setProductTab('frames')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${productTab === 'frames'
                      ? 'bg-[#FF6D06] text-white shadow-md shadow-[#FF6D06]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  Frames
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid: 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => {
              const activeSize = selectedProductSizes[product.id] || product.sizes[0];

              return (
                <div
                  key={product.id}
                  id={product.id === 'tshirt' ? 'tshirts' : product.id === 'notebook' ? 'notebooks' : product.id === 'frame' ? 'frames' : undefined}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-[#141518] border border-white/10 hover:border-[#FF6D06]/40 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6D06]/10 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Product Image Box */}
                  <div className="relative w-full h-36 sm:h-56 md:h-64 overflow-hidden bg-[#0d0e11]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.tag && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 backdrop-blur-md border border-white/15 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold text-white shadow">
                        {product.tag}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-black text-[10px] sm:text-xs font-extrabold px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Product Info: Rating, Name, Sizes, Price & Action */}
                  <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-[10px] sm:text-xs">
                          <span>★</span>
                          <span>{product.rating}</span>
                        </div>
                        <span className="text-white/40 text-[9px] sm:text-[11px]">{product.sales}</span>
                      </div>

                      <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-[#FF6D06] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                    </div>

                    {/* Sizes Selection */}
                    {product.sizes && (
                      <div className="pt-1.5 sm:pt-2 border-t border-white/[0.06]">
                        <span className="text-[10px] sm:text-[11px] text-white/50 block mb-1 font-medium">Sizes:</span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {product.sizes.map((sz, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => handleProductSizeClick(product.id, sz, e)}
                              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-md sm:rounded-lg border transition-all ${
                                activeSize === sz
                                  ? 'bg-[#FF6D06] text-white border-[#FF6D06] shadow-sm shadow-[#FF6D06]/30'
                                  : 'bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and Details link */}
                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/[0.06]">
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-xs sm:text-lg font-extrabold text-white">{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-[10px] sm:text-xs text-white/40 line-through">{product.oldPrice}</span>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-[#FF6D06] group-hover:text-[#ff8833] flex items-center gap-0.5 sm:gap-1">
                        <span>Details</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS (3 Simple Steps with Watermark Numbers) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 relative bg-[#0c0d10] border-t border-white/[0.06] overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6D06] tracking-wider uppercase bg-[#FF6D06]/10 border border-[#FF6D06]/20 px-4 py-1 rounded-full">
              <span>✦ Seamless 3-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              How It Works in <span className="text-[#FF6D06]">3 Simple Steps</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              We designed our ordering workflow to be effortless from creative conception to doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-1/2 left-16 right-16 h-[2px] bg-gradient-to-r from-[#FF6D06]/20 via-[#FF6D06]/50 to-[#FF6D06]/20 -translate-y-12 z-0"
              aria-hidden="true"
            />

            {stepsData.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-[#141518] border border-white/10 hover:border-[#FF6D06]/50 rounded-3xl p-8 min-h-[320px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF6D06]/10 z-10 group overflow-hidden"
              >
                {/* Giant Background Watermark Number */}
                <span
                  className="absolute -bottom-8 -right-3 text-[140px] sm:text-[160px] md:text-[180px] font-black font-mono text-white/[0.04] group-hover:text-[#FF6D06]/[0.12] select-none pointer-events-none transition-all duration-500 tracking-tighter leading-none z-0"
                  aria-hidden="true"
                >
                  {step.stepNumber}
                </span>

                {/* Top Icon and Step Badge */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-[#FF6D06]/40 flex items-center justify-center shadow-lg transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#FF6D06] bg-[#FF6D06]/10 border border-[#FF6D06]/20 px-3 py-1 rounded-full">
                    {step.badge}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-3 mb-6 relative z-10">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF6D06] transition-colors">
                    {step.title}
                  </h3>
                  <span className="block text-xs font-semibold text-white/40 uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed max-w-[90%]">
                    {step.description}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden relative z-10">
                  <div className="w-0 group-hover:w-full h-full bg-[#FF6D06] transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED GALLERY SECTION */}
      {/* ========================================================================= */}
      <section id="featured" className="py-20 bg-[#090a0c] border-t border-white/[0.08] relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6D06] tracking-wider uppercase bg-[#FF6D06]/10 border border-[#FF6D06]/20 px-3.5 py-1 rounded-full">
                <span>✦ Ready-Made & Community Inspired</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Trending Designs Loved by <span className="text-[#FF6D06]">Creators</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl">
                Order these curated designs instantly or pick your favorite piece.
              </p>
            </div>

            {/* Filter Pills with Smooth Horizontal Scroll */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 scrollbar-none touch-pan-x">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#141518] border border-white/10 rounded-2xl min-w-max shadow-md">
                <button
                  type="button"
                  onClick={() => setGalleryFilter('all')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${galleryFilter === 'all' ? 'bg-[#FF6D06] text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  All Items
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('tshirts')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${galleryFilter === 'tshirts' ? 'bg-[#FF6D06] text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  T-Shirts & Hoodies
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('notebooks')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${galleryFilter === 'notebooks' ? 'bg-[#FF6D06] text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  Notebooks
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('frames')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${galleryFilter === 'frames' ? 'bg-[#FF6D06] text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  Frames & Canvas
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Grid: 2 columns on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-[#141518] border border-white/10 hover:border-[#FF6D06]/40 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6D06]/10 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div className="relative w-full h-36 sm:h-56 md:h-72 overflow-hidden bg-[#0d0e11]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 backdrop-blur-md border border-white/15 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold text-white shadow">
                    {item.tag}
                  </div>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${item.productId || 'notebook'}`)}
                      className="bg-white text-black text-[10px] sm:text-xs font-extrabold px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-1.5 shadow-lg cursor-pointer hover:bg-gray-100"
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-[10px] sm:text-xs">
                      <span>★</span>
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-white/40 text-[9px] sm:text-[11px]">{item.sales}</span>
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-[#FF6D06] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Sizes Selection */}
                  {item.sizes && (
                    <div className="pt-1.5 sm:pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] sm:text-[11px] text-white/50 block mb-1 font-medium">Sizes:</span>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {item.sizes.map((sz, idx) => {
                          const activeSize = selectedProductSizes[item.id] || item.sizes[0];
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => handleProductSizeClick(item.id, sz, e)}
                              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-md sm:rounded-lg border transition-all ${
                                activeSize === sz
                                  ? 'bg-[#FF6D06] text-white border-[#FF6D06] shadow-sm shadow-[#FF6D06]/30'
                                  : 'bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/[0.06]">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-xs sm:text-lg font-extrabold text-white">{item.price}</span>
                      <span className="text-[10px] sm:text-xs text-white/40 line-through">{item.oldPrice}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${item.productId || 'notebook'}`)}
                      className="text-[10px] sm:text-xs font-bold text-[#FF6D06] hover:text-[#ff8833] flex items-center gap-0.5 sm:gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 relative bg-gradient-to-b from-[#0b0c0f] to-[#08080a] border-t border-white/[0.06] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-tr from-[#1a1b22] to-[#121316] border border-[#FF6D06]/30 p-8 sm:p-14 rounded-[36px] shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF6D06]/20 rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6D06] bg-[#FF6D06]/10 px-4 py-1.5 rounded-full uppercase tracking-wider">
              <span>✦ Bring Your Vision to Life</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Have a custom graphic or unique idea in mind?
            </h2>

            <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Whether you want an iconic single piece for yourself, a personalized gift for someone special, or bespoke merchandise for your brand; we make printing seamless.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#categories"
                className="w-full sm:w-auto bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-95 text-white font-black text-sm tracking-wider px-10 py-4 rounded-full shadow-xl shadow-[#FF6D06]/30 hover:shadow-[#FF6D06]/50 transition-all cursor-pointer uppercase"
              >
                Shop All Products
              </a>
              <Link
                to="/product/notebook"
                className="w-full sm:w-auto bg-white/[0.07] hover:bg-white/[0.12] text-white font-bold text-sm px-8 py-4 rounded-full border border-white/15 transition-all cursor-pointer"
              >
                Explore Notebook Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#08080a] border-t border-white/10 pt-16 pb-12 text-white/70 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6D06] to-[#ff9442] flex items-center justify-center shadow-lg shadow-[#FF6D06]/30">
                  <span className="font-extrabold text-black text-xl tracking-tighter">AS</span>
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  AS<span className="text-[#FF6D06]">Vision</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
                Your premier custom print studio for bespoke apparel, luxury journals, and museum-grade wall art. Bring your unique identity to life.
              </p>

              <div className="pt-2">
                <span className="text-xs font-bold text-white block mb-2">Subscribe for 15% off your first order:</span>
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="bg-white/[0.06] border border-white/15 focus:border-[#FF6D06] focus:outline-none text-white text-xs px-3.5 py-2.5 rounded-xl flex-1 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-[#FF6D06]/20"
                  >
                    Join
                  </button>
                </form>
                {newsletterSubscribed && (
                  <span className="text-[11px] text-emerald-400 font-medium block mt-1.5 animate-fadeIn">
                    ✓ Successfully subscribed! Your promo code: ASVISION15
                  </span>
                )}
              </div>
            </div>

            {/* Col 2: Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Product Categories
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/product/tshirt" className="hover:text-[#FF6D06] transition-colors">
                    Custom Tees & Hoodies
                  </Link>
                </li>
                <li>
                  <Link to="/product/notebook" className="hover:text-[#FF6D06] transition-colors">
                    Hardcover Journals & Planners
                  </Link>
                </li>
                <li>
                  <Link to="/product/frame" className="hover:text-[#FF6D06] transition-colors">
                    Wall Frames & Canvas Art
                  </Link>
                </li>
                <li>
                  <Link to="/product/accessories" className="hover:text-[#FF6D06] transition-colors">
                    Vinyl Stickers & Merch
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Studio & Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Custom Studio
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#how-it-works" className="hover:text-[#FF6D06] transition-colors">
                    Our Printing Process
                  </a>
                </li>
                <li>
                  <Link to="/product/notebook" className="hover:text-[#FF6D06] transition-colors">
                    Notebook Sizing & Specs
                  </Link>
                </li>
                <li>
                  <Link to="/product/tshirt" className="hover:text-[#FF6D06] transition-colors">
                    Hoodie Fit Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Support & Guarantees
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="hover:text-[#FF6D06] transition-colors">
                    100% Satisfaction Guarantee
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FF6D06] transition-colors">
                    Shipping & Dispatch Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FF6D06] transition-colors">
                    Bulk Orders & Contact
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div>
              © {new Date().getFullYear()} ASVision Studio. All rights reserved.
            </div>

            <div className="flex items-center gap-3 text-white/60">
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono">
                VISA / MASTERCARD
              </span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono">
                APPLE PAY
              </span>
              <span className="bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono">
                SECURE CHECKOUT
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
