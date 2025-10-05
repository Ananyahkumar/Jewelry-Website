import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of a cart item
export interface CartItem {
  id: string; // Product ID
  cartItemId: string; // Unique ID for this cart entry
  name: string;
  price: number; // For rentals, this is the total rental price. For purchase, it's the item price.
  image: string;
  quantity: number;
  rentalStartDate?: string;
  rentalEndDate?: string;
  rentalDays?: number;
}

// Define the shape of the context
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity' | 'cartItemId'>) => {
    setCartItems(prevItems => {
      // For rental items, always add as a new line item.
      if (item.rentalStartDate) {
        const newCartItem: CartItem = {
          ...item,
          quantity: 1,
          cartItemId: `${item.id}-${Date.now()}`
        };
        return [...prevItems, newCartItem];
      }

      // For regular items, check if a similar item already exists.
      const existingItem = prevItems.find(i => i.id === item.id && !i.rentalStartDate);
      if (existingItem) {
        // Increase quantity of existing item.
        return prevItems.map(i =>
          i.cartItemId === existingItem.cartItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Add as a new item.
        const newCartItem: CartItem = {
          ...item,
          quantity: 1,
          cartItemId: `${item.id}-${Date.now()}`
        };
        return [...prevItems, newCartItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const decreaseQuantity = (cartItemId: string) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);
      if (itemIndex === -1) return prevItems;

      const currentItem = prevItems[itemIndex];
      // For rental items, or items with quantity 1, decreaseQuantity acts like remove.
      if (currentItem.rentalStartDate || currentItem.quantity <= 1) {
        return prevItems.filter(item => item.cartItemId !== cartItemId);
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = { ...currentItem, quantity: currentItem.quantity - 1 };
        return updatedItems;
      }
    });
  };

  const increaseQuantity = (cartItemId: string) => {
    setCartItems(prevItems => {
      const itemToIncrease = prevItems.find(item => item.cartItemId === cartItemId);

      // Can't increase quantity of rental items from the cart view.
      if (!itemToIncrease || itemToIncrease.rentalStartDate) {
        return prevItems;
      }

      return prevItems.map(item => {
        if (item.cartItemId === cartItemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
