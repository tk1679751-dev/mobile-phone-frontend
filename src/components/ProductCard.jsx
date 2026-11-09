import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop()
  const saved = wishlist.includes(product.id)
  return <article className="product-card group">
    <div className="product-image-wrap">
      {product.badge && <span className="badge">{product.badge}</span>}
      <button className={`icon-button wishlist-button ${saved ? 'saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
      <Link to={`/product/${product.id}`} className="product-image-link"><img src={product.image} alt={product.name} /></Link>
      <button className="quick-add" onClick={() => addToCart(product)}><ShoppingBag size={15} /> Quick add</button>
    </div>
    <div className="product-card-body">
      <div className="eyebrow-row"><span>{product.brand}</span><span className="stock"><i /> In stock</span></div>
      <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
      <div className="rating"><Star size={14} fill="currentColor" /><b>{product.rating}</b><span>({product.reviews})</span></div>
      <div className="price-row"><strong>${product.price.toLocaleString()}</strong><del>${product.oldPrice.toLocaleString()}</del><span>{Math.round((1 - product.price / product.oldPrice) * 100)}% off</span></div>
    </div>
  </article>
}
