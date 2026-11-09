import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false); const [query, setQuery] = useState(''); const navigate = useNavigate(); const { cartCount, wishlist } = useShop()
  const submit = e => { e.preventDefault(); navigate(`/shop${query ? `?q=${encodeURIComponent(query)}` : ''}`); setOpen(false) }
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Free shipping on orders over $500</span><span>Need help? <b>Talk to an expert&nbsp; →</b></span></div></div>
    <header className="header"><div className="container header-inner">
      <Link to="/" className="logo"><span className="logo-mark">M</span><span>Mobile<span>Mart</span></span></Link>
      <form className="searchbar" onSubmit={submit}><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search phones, brands and more..." aria-label="Search products" /><kbd>⌘ K</kbd></form>
      <div className="header-actions"><ThemeToggle /><Link to="/wishlist" className="header-action wishlist-link"><Heart size={20} /><span className="action-label">Wishlist</span>{wishlist.length > 0 && <em>{wishlist.length}</em>}</Link><Link to="/cart" className="header-action"><ShoppingBag size={20} /><span className="action-label">Cart</span>{cartCount > 0 && <em>{cartCount}</em>}</Link><button className="profile-button"><span className="avatar">JD</span><span className="action-label">Account</span></button></div>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div><nav className={`nav ${open ? 'nav-open' : ''}`}><div className="container nav-inner"><NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink><NavLink to="/shop" onClick={() => setOpen(false)}>Shop all</NavLink><NavLink to="/sell" onClick={() => setOpen(false)}>Sell your phone <span className="new-pill">New</span></NavLink><NavLink to="/about" onClick={() => setOpen(false)}>About us</NavLink><NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink></div></nav></header>
  </>
}
