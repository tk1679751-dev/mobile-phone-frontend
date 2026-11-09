import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'
export default function WishlistPage() { const { wishlist } = useShop(); const items = products.filter(p => wishlist.includes(p.id)); return <div className="shop-page"><div className="container page-heading"><span className="eyebrow">Saved for later</span><h1>Your <em>wishlist.</em></h1><p>Keep track of the phones you’re thinking about.</p></div>{items.length ? <div className="container product-grid">{items.map(p => <ProductCard key={p.id} product={p} />)}</div> : <div className="container empty-cart"><div className="empty-cart-icon"><Heart /></div><h2>Nothing saved yet.</h2><p>Tap the heart on any phone to save it here.</p><Link to="/shop" className="button button-primary"><ShoppingBag size={16} /> Browse phones</Link></div>}</div> }
