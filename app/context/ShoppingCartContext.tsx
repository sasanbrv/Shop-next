"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

type ShoppingCartContextProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: string;
  qty: number;
};

type TShoppingCartItems = {
  cartItems: CartItem[];
  handleIncreaseProductQty: (id: string) => void;
  handleDecreaseProductQty: (id: string) => void;
  cartTotalQty: number;
  isInitialized: boolean;
};

const STORAGE_KEY = "shopping-cart";

const ShoppingCartContext = createContext<TShoppingCartItems | undefined>(
  undefined
);

let cachedCart: CartItem[] = [];
let initialized = false;

const listeners = new Set<() => void>();

function isValidCartItem(item: unknown): item is CartItem {
  if (typeof item !== "object" || item === null) return false;
  if (!("id" in item) || !("qty" in item)) return false;

  return (
    typeof item.id === "string" &&
    item.id.length > 0 &&
    typeof item.qty === "number" &&
    Number.isInteger(item.qty) &&
    item.qty > 0
  );
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function initializeCart() {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (savedCart) {
      const parsed: unknown = JSON.parse(savedCart);
      cachedCart = Array.isArray(parsed)
        ? parsed.filter(isValidCartItem)
        : [];
    }
  } catch (error) {
    console.error("Failed to load shopping cart:", error);
    cachedCart = [];
  }
}

function getSnapshot() {
  return cachedCart;
}

const EMPTY_CART: CartItem[] = [];

function getServerSnapshot() {
  return EMPTY_CART;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!initialized && typeof window !== "undefined") {
    initializeCart();
    notifyListeners();
  }

  return () => {
    listeners.delete(listener);
  };
}

function updateCart(updater: (items: CartItem[]) => CartItem[]) {
  initializeCart();
  cachedCart = updater(cachedCart);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedCart));
  } catch (error) {
    console.error("Failed to save shopping cart:", error);
  }

  notifyListeners();
}

export function useShoppingCartContext() {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useShoppingCartContext must be used within ShoppingCartContextProvider"
    );
  }

  return context;
}

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const cartItems = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const handleIncreaseProductQty = useCallback((id: string) => {
    updateCart((items) => {
      const existing = items.find((item) => item.id === id);

      if (existing) {
        return items.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...items, { id, qty: 1 }];
    });
  }, []);

  const handleDecreaseProductQty = useCallback((id: string) => {
    updateCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const cartTotalQty = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        cartTotalQty,
        isInitialized: initialized,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}