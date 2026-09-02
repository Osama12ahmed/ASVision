import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('asvision_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asvision_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Add Item to Cart
  const handleAddToCart = (item) => {
    setCart((prev) => {
      // If same product, color and size exists without unique custom image, merge quantity
      const existingIndex = prev.findIndex(
        (i) => i.title === item.title && i.color === item.color && i.size === item.size && !item.uploadedImage && !i.uploadedImage
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: (next[existingIndex].quantity || 1) + (item.quantity || 1)
        };
        return next;
      }

      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item, idx) => {
        const currentId = item.id || `cart-item-${idx}`;
        if (currentId === itemId) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => prev.filter((item, idx) => (item.id || `cart-item-${idx}`) !== itemId));
  };

  // Clear all items in cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Total count of units
  const totalCartUnits = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home onAddToCart={handleAddToCart} cartCount={totalCartUnits} />} 
        />
        <Route 
          path="/product/:id" 
          element={<ProductDetail onAddToCart={handleAddToCart} cartCount={totalCartUnits} />} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
              cartCount={totalCartUnits}
            />
          } 
        />
        <Route 
          path="*" 
          element={<Home onAddToCart={handleAddToCart} cartCount={totalCartUnits} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
