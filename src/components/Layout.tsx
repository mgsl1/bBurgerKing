import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body bg-[var(--color-cream)] text-[var(--color-charcoal)]">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-[var(--color-charcoal)] text-white shadow-lg py-4" : "bg-transparent text-white py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link to="/" className="text-3xl font-display font-bold tracking-tighter text-[var(--color-flame)]">
            BURGER KING
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-bold tracking-wide uppercase text-sm">
            <Link to="/menu" className="hover:text-[var(--color-gold)] transition-colors">Menu</Link>
            <Link to="/deals" className="hover:text-[var(--color-gold)] transition-colors">Deals</Link>
            <Link to="/rewards" className="hover:text-[var(--color-gold)] transition-colors">Rewards</Link>
            <Link to="/find-a-burger-king" className="hover:text-[var(--color-gold)] transition-colors">Locations</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors uppercase text-sm font-bold">
              <User size={20} />
              <span>Sign In</span>
            </button>
            <button className="relative bg-[var(--color-flame)] text-white p-3 rounded-full hover:bg-orange-700 transition">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-[var(--color-gold)] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-[var(--color-charcoal)] text-white z-40 p-6 flex flex-col md:hidden">
          <nav className="flex flex-col gap-6 text-2xl font-display uppercase">
            <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
            <Link to="/deals" onClick={() => setMobileMenuOpen(false)}>Deals</Link>
            <Link to="/rewards" onClick={() => setMobileMenuOpen(false)}>Rewards</Link>
            <Link to="/find-a-burger-king" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[var(--color-charcoal)] text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-2xl font-display text-[var(--color-flame)] mb-6 tracking-tighter">BURGER KING</h2>
            <p className="text-gray-400 text-sm">Have it your way. Order online or visit a restaurant near you.</p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Explore</h3>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><Link to="/menu" className="hover:text-white">Our Menu</Link></li>
              <li><Link to="/deals" className="hover:text-white">Deals & Offers</Link></li>
              <li><Link to="/rewards" className="hover:text-white">BK Rewards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Information</h3>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white">About BK</Link></li>
              <li><Link to="/nutrition" className="hover:text-white">Nutrition Explorer</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Get the App</h3>
             <div className="flex flex-col gap-3">
               <button className="border border-white/20 py-3 px-6 rounded-lg uppercase tracking-wider text-xs font-bold hover:bg-white/10 transition">App Store</button>
               <button className="border border-white/20 py-3 px-6 rounded-lg uppercase tracking-wider text-xs font-bold hover:bg-white/10 transition">Google Play</button>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-white/10 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Burger King Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
