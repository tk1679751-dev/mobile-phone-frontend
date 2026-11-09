import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('mobimart-cart') || '[]'))
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('mobimart-wishlist') || '[]'))
  const [toast, setToast] = useState(null)
  useEffect(() => localStorage.setItem('mobimart-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('mobimart-wishlist', JSON.stringify(wishlist)), [wishlist])
  const notify = (message, type = 'success') => { setToast({ message, type }); window.setTimeout(() => setToast(null), 2800) }
  const addToCart = (product, quantity = 1) => { setCart(items => { const found = items.find(item => item.id === product.id); return found ? items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { product, quantity }] }); notify(`${product.name} added to your cart`) }
  const updateQuantity = (id, quantity) => setCart(items => items.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
  const removeFromCart = id => { setCart(items => items.filter(item => item.id !== id)); notify('Item removed from cart', 'info') }
  const toggleWishlist = product => { const exists = wishlist.includes(product.id); setWishlist(items => exists ? items.filter(id => id !== product.id) : [...items, product.id]); notify(exists ? 'Removed from wishlist' : 'Saved to wishlist', 'info') }
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const value = useMemo(() => ({ products, cart, wishlist, toast, addToCart, updateQuantity, removeFromCart, toggleWishlist, cartCount, cartTotal, notify }), [cart, wishlist, toast, cartCount, cartTotal])
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export const useShop = () => useContext(ShopContext)
