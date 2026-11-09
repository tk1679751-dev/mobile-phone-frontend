import { CheckCircle2, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useShop } from '../context/ShopContext'
export default function Layout() { const { toast } = useShop(); return <><Header /><main><Outlet /></main><Footer />{toast && <div className={`toast ${toast.type}`}><CheckCircle2 size={18} /><span>{toast.message}</span><button aria-label="Dismiss notification"><X size={15} /></button></div>}</> }
