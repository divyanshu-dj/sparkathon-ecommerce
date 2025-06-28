
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant: 'standard' | 'nearExpiry';
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, variant: 'standard' | 'nearExpiry', quantity: number) => void;
  removeFromCart: (id: number, variant: 'standard' | 'nearExpiry') => void;
  updateQuantity: (id: number, variant: 'standard' | 'nearExpiry', quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any, variant: 'standard' | 'nearExpiry', quantity: number) => {
    const price = variant === 'nearExpiry' && product.nearExpiryPrice 
      ? product.nearExpiryPrice 
      : product.standardPrice;

    const cartItemId = `${product.id}-${variant}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.variant === variant
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, {
        id: product.id,
        name: product.name,
        image: product.image,
        price,
        quantity,
        variant,
        category: product.category
      }];
    });
  };

  const removeFromCart = (id: number, variant: 'standard' | 'nearExpiry') => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.variant === variant)
    ));
  };

  const updateQuantity = (id: number, variant: 'standard' | 'nearExpiry', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variant);
      return;
    }

    setCartItems(prev => prev.map(item =>
      item.id === id && item.variant === variant
        ? { ...item, quantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
