import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  notes: string;
  price: string;
  priceValue: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (v: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  openCheckout: () => void;
  buyNow: (item: Omit<CartItem, "qty">) => void;
  addItem: (item: Omit<CartItem, "qty">, openDrawer?: boolean) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("junaid_cart_items");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart items:", e);
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("junaid_cart_items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart items:", e);
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, openDrawer = true) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    if (openDrawer) {
      setOpen(true);
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty < 1) {
        return prev;
      }
      return prev.map((p) => (p.id === id ? { ...p, qty } : p));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCheckout = useCallback(() => {
    setOpen(false);
    setTimeout(() => setCheckoutOpen(true), 220);
  }, []);

  const buyNow = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(false);
    setTimeout(() => setCheckoutOpen(true), 50);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.priceValue * i.qty, 0);
    return {
      items,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      setOpen,
      isCheckoutOpen,
      setCheckoutOpen,
      openCheckout,
      buyNow,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      total,
    };
  }, [items, isOpen, isCheckoutOpen, openCheckout, buyNow, addItem, removeItem, updateQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
