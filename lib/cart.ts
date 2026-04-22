import type { Product } from "@/lib/airtable";

export const CART_STORAGE_KEY = "store-cart";
export const CART_UPDATED_EVENT = "cart-updated";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: string;
  priceValue: number | null;
  image: string;
  color: string | null;
  size: string | null;
  quantity: number;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCartItems(): CartItem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
}

export function createCartItem(input: {
  product: Product;
  color: string | null;
  size: string | null;
  quantity?: number;
}): CartItem {
  const { product, color, size, quantity = 1 } = input;

  return {
    id: [product.id, color ?? "-", size ?? "-"].join("__"),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    priceValue: product.priceValue,
    image: product.images[0] ?? "",
    color,
    size,
    quantity,
  };
}

export function addCartItem(item: CartItem) {
  const items = getCartItems();
  const existing = items.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += item.quantity;
    saveCartItems(items);
    return;
  }

  saveCartItems([...items, item]);
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const items = getCartItems()
    .map((item) => (item.id === itemId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  saveCartItems(items);
}

export function removeCartItem(itemId: string) {
  const items = getCartItems().filter((item) => item.id !== itemId);
  saveCartItems(items);
}

export function clearCart() {
  saveCartItems([]);
}
