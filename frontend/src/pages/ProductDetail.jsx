import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DesignCanvas from '../components/DesignCanvas';
import productHoodieImg from '../assets/product-hoodie.jpg';

const productsDatabase = {
  notebook: {
    id: 'notebook',
    category: 'notebooks',
    badge: 'New Arrival',
    title: 'Essential Hardcover Notebook',
    subtitle: 'Custom Journals & Planners',
    rating: 4.9,
    reviewsCount: 142,
    price: '$19.99',
    oldPrice: '$29.99',
    discount: '33% OFF',
    description: 'Premium heavyweight 120gsm bleed-proof cream paper journal with a durable vegan leather hardcover, designed for ultimate writing comfort and modern aesthetic.',
    colors: [
      { name: 'Charcoal Gray', hex: '#2b2c30', bgImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=80' },
      { name: 'Warm Cream', hex: '#e8dec8', bgImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=900&auto=format&fit=crop&q=80' },
      { name: 'Sand Beige', hex: '#d4a373', bgImage: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=900&auto=format&fit=crop&q=80' },
      { name: 'Midnight Black', hex: '#111215', bgImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Pocket (3.5x5.5")', 'A5 (5.8x8.3")', 'A4 (8.3x11.7")'],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=900&auto=format&fit=crop&q=80'
    ]
  },
  tshirt: {
    id: 'tshirt',
    category: 'tshirts',
    badge: 'New Arrival',
    title: 'Essential Oversized Hoodie',
    subtitle: 'Streetwear & Apparel',
    rating: 4.8,
    reviewsCount: 128,
    price: '$59.99',
    oldPrice: '$89.99',
    discount: '33% OFF',
    description: 'Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern style. Features double-stitched seams and ultra-soft fleece lining.',
    colors: [
      { name: 'Charcoal Gray', hex: '#373a40', bgImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80' },
      { name: 'Heather Gray', hex: '#b0b3b8', bgImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80' },
      { name: 'Oatmeal Beige', hex: '#e3dac9', bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80' },
      { name: 'Pitch Black', hex: '#121214', bgImage: productHoodieImg }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80',
      productHoodieImg
    ]
  },
  frame: {
    id: 'frame',
    category: 'frames',
    badge: 'Museum Grade',
    title: 'Essential Oak Wall Frame',
    subtitle: 'Gallery Wall Canvas',
    rating: 4.95,
    reviewsCount: 96,
    price: '$39.99',
    oldPrice: '$59.99',
    discount: '33% OFF',
    description: 'Natural solid oak wood gallery frame with museum-grade acrylic glass shield and archival cotton canvas backing. Ready to hang out of the box.',
    colors: [
      { name: 'Natural Oak', hex: '#c8a882', bgImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&auto=format&fit=crop&q=80' },
      { name: 'Matte Black', hex: '#1c1d21', bgImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&auto=format&fit=crop&q=80' },
      { name: 'Studio White', hex: '#f0f2f5', bgImage: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=900&auto=format&fit=crop&q=80' }
    ],
    sizes: ['30x40 cm (12x16")', '50x70 cm (20x28")', '70x100 cm (28x40")'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&auto=format&fit=crop&q=80'
    ]
  },
  accessories: {
    id: 'accessories',
    category: 'accessories',
    badge: 'Trending',
    title: 'Essential Vinyl Sticker Pack',
    subtitle: 'Die-Cut Merch & Decals',
    rating: 4.85,
    reviewsCount: 78,
    price: '$8.99',
    oldPrice: '$12.99',
    discount: '30% OFF',
    description: 'Weatherproof, dishwasher-safe and UV-protected vinyl stickers with precision laser die-cut edges. Perfect for laptops, phone cases, and sketchbooks.',
    colors: [
      { name: 'Multi Artwork', hex: '#ff5500', bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80' },
      { name: 'Monochrome', hex: '#222222', bgImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Pack of 5', 'Pack of 10', 'Pack of 20'],
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80'
    ]
  }
};

/**
 * High-performance Image Resizer:
 * Resizes user uploaded image to max 1200x1200 px on an HTML5 canvas and converts to optimized JPEG dataURL.
 */
function resizeImageToDataUrl(file, maxDimension = 1200, quality = 0.9) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target.result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedDataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default function ProductDetail({ onAddToCart, cartCount = 0 }) {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const designCanvasRef = useRef(null);

  // Find product by id, default to notebook
  const productKey = id && productsDatabase[id] ? id : 'notebook';
  const product = productsDatabase[productKey];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [hasArtwork, setHasArtwork] = useState(false);
  const [activeSide, setActiveSide] = useState('front');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setHasArtwork(false);
    window.scrollTo(0, 0);
  }, [id, product]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const optimizedImage = await resizeImageToDataUrl(file, 1200, 0.9);
        designCanvasRef.current?.addImage(optimizedImage);
        setHasArtwork(true);
      } catch (err) {
        console.error('Failed to process image:', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handlePresetApply = (url) => {
    designCanvasRef.current?.addImage(url);
    setHasArtwork(true);
  };

  const handleRemoveArt = () => {
    designCanvasRef.current?.removeDesign();
    setHasArtwork(false);
  };

  const handleAddToCart = () => {
    const canvasPreview = designCanvasRef.current?.getExportImage();
    const itemToAdd = {
      id: `${product.id}-${Date.now()}`,
      title: product.title,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize,
      side: activeSide,
      previewImage: canvasPreview || selectedColor.bgImage || product.images[0]
    };
    onAddToCart?.(itemToAdd);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans select-none">

      {/* Top Navbar */}
      <Navbar cartCount={cartCount} />

      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18191c] border border-emerald-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/80 flex items-center gap-3 backdrop-blur-xl animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs sm:text-sm font-bold">Added custom design to Cart! 🛒</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-white/50 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#FF6D06] font-semibold">{product.title}</span>
        </nav>

        {/* Product Showcase Grid: Exact 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Interactive Fabric.js 2D Design Editor */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Interactive Fabric Canvas Container with Front/Back Switcher */}
            <div className="relative">
              <DesignCanvas
                ref={designCanvasRef}
                productId={product.id}
                productTitle={product.title}
                selectedColor={selectedColor}
                onHasDesignChange={(hasArt) => setHasArtwork(hasArt)}
                onActiveSideChange={(side) => setActiveSide(side)}
              />

              {/* Upload Artwork Trigger Button at Bottom Right */}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100 shadow-xl px-4 py-2 rounded-full text-xs font-black flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95 z-10 disabled:opacity-50"
                title="Upload custom graphic onto product mockup"
              >
                {uploading ? (
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
                <span>{uploading ? 'Processing...' : 'Upload Cover Art'}</span>
              </button>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Custom Graphic Status Strip */}
            {hasArtwork && (
              <div className="bg-[#18191d] border border-white/10 px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓ Custom Artwork Layer Active</span>
                  <span className="text-white/40">• Drag, Scale or Rotate with Handles</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveArt}
                  className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer underline text-[11px]"
                >
                  Remove Design
                </button>
              </div>
            )}

            {/* Preset Artwork Suggestions for Quick Testing */}
            <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none">
              <span className="text-[11px] text-white/50 whitespace-nowrap font-medium">Quick Art Presets:</span>
              {[
                { name: '⚡ Cyber', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80' },
                { name: '🌙 Gold', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80' },
                { name: '🪐 Nebula', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80' }
              ].map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handlePresetApply(preset.url)}
                  className="px-3 py-1 bg-white/[0.05] hover:bg-[#FF6D06]/20 border border-white/10 hover:border-[#FF6D06] text-white text-[11px] font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Details, Color Selector, Sizes, Actions (Untouched Layout) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 bg-[#131418] border border-white/10 rounded-[32px] p-6 sm:p-8 md:p-10 space-y-6 shadow-2xl">
            
            {/* Top Badge: "New Arrival" */}
            <div>
              <span className="inline-block text-[11px] font-bold text-white/80 bg-white/[0.08] border border-white/10 px-3.5 py-1 rounded-md tracking-wide">
                {product.badge}
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Star Ratings Row: ★★★★★ 4.8 (128 reviews) */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5 text-black bg-white px-2 py-0.5 rounded font-black text-xs">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="text-xs font-bold text-white/90">{product.rating}</span>
              <span className="text-xs text-white/40">({product.reviewsCount} reviews)</span>
            </div>

            {/* Price Row: $59.99 $89.99 [33% OFF] */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {product.price}
              </span>
              <span className="text-base text-white/40 line-through">
                {product.oldPrice}
              </span>
              <span className="bg-black text-white text-[11px] font-black tracking-wider px-2.5 py-1 rounded-md border border-white/20">
                {product.discount}
              </span>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
              {product.description}
            </p>

            {/* Thin Divider Line */}
            <div className="border-t border-white/10" />

            {/* Color Swatch Picker */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white/80">
                <span>Color: </span>
                <span className="text-white font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer relative flex items-center justify-center ${
                        isSelected 
                          ? 'border-white scale-110 shadow-lg ring-2 ring-[#FF6D06]' 
                          : 'border-white/20 hover:border-white/60'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="text-[10px] text-white font-bold drop-shadow">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector with Size Guide Link */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div>
                  <span className="text-white/80">Size: </span>
                  <span className="text-white font-bold">{selectedSize}</span>
                </div>
                <button
                  type="button"
                  className="text-white/50 hover:text-[#FF6D06] flex items-center gap-1 transition-colors cursor-pointer text-xs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Size Guide</span>
                </button>
              </div>

              {/* Rectangular Size Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((sz, idx) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] px-4 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white text-black border-white shadow-lg' 
                          : 'bg-[#1a1b20] text-white/80 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Row: Add To Cart Full-Width Button + Wishlist Heart */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-gray-100 active:scale-[0.99] text-black font-extrabold text-sm py-4 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-500 scale-105' 
                    : 'bg-white/[0.05] border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Add to Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Bottom Trust & Shipping Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center text-[#FF6D06] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white block">Free Shipping</span>
                <span className="text-[10px] text-white/40 block">On orders over $50</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center text-[#FF6D06] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white block">Easy Returns</span>
                <span className="text-[10px] text-white/40 block">30-day return policy</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center text-[#FF6D06] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white block">Secure Payment</span>
                <span className="text-[10px] text-white/40 block">100% secure checkout</span>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
