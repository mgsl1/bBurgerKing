import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, MapPin, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Order() {
  const [step, setStep] = useState<"type" | "checkout" | "confirmed">("type");
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | null>(null);

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Whopper", price: 6.49, quantity: 1, cals: 670, customizations: ["No Onions"] },
    { id: 4, name: "Chicken Fries", price: 4.49, quantity: 2, cals: 260 }
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const deliveryFee = orderType === "delivery" ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = () => {
    setStep("confirmed");
  };

  if (cartItems.length === 0 && step !== "confirmed") {
    return (
      <div className="pt-32 min-h-[80vh] flex flex-col items-center justify-center bg-[var(--color-cream)]">
        <h1 className="text-4xl font-display uppercase tracking-tighter mb-4 text-[var(--color-charcoal)]">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 font-medium">Looks like you haven't added anything to your order yet.</p>
        <Link to="/menu" className="bg-[var(--color-flame)] hover:bg-orange-700 text-white font-bold uppercase tracking-wider py-4 px-10 rounded-full transition">
          Start Order
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <Link to={step === "checkout" ? () => setStep("type") : "/menu"} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-8 hover:text-[var(--color-flame)] transition-colors">
          <ArrowLeft size={16} /> {step === "checkout" ? "Back to Order Options" : "Back to Menu"}
        </Link>
        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-12 text-[var(--color-charcoal)]">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <AnimatePresence mode="wait">
              {step === "type" && (
                <motion.div 
                  key="type"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-display uppercase tracking-wider mb-6">How would you like your order?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Delivery Card */}
                    <button 
                      onClick={() => { setOrderType("delivery"); setStep("checkout"); }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${orderType === "delivery" ? 'border-[var(--color-flame)] bg-red-50' : 'border-gray-200 hover:border-gray-50'}`}
                    >
                      <MapPin size={32} className={`mb-4 ${orderType === "delivery" ? 'text-[var(--color-flame)]' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold uppercase mb-2">Delivery</h3>
                      <p className="text-sm text-gray-500 font-medium">We'll bring it right to your door.</p>
                    </button>
                    {/* Pickup Card */}
                    <button 
                      onClick={() => { setOrderType("pickup"); setStep("checkout"); }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${orderType === "pickup" ? 'border-[var(--color-flame)] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <MapPin size={32} className={`mb-4 ${orderType === "pickup" ? 'text-[var(--color-flame)]' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold uppercase mb-2">Pickup</h3>
                      <p className="text-sm text-gray-500 font-medium">Grab it yourself at your nearest BK.</p>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "checkout" && (
                <motion.div 
                  key="checkout"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <h2 className="text-2xl font-display uppercase tracking-wider">Payment Details</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">Secure <CreditCard size={12}/></span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                      <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-flame)] focus:ring-1 focus:ring-[var(--color-flame)]" />
                    </div>
                    {orderType === "delivery" && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Delivery Address</label>
                        <input type="text" placeholder="123 Flame Grill Ave" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-flame)] focus:ring-1 focus:ring-[var(--color-flame)] mb-3" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="City" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-flame)] focus:ring-1 focus:ring-[var(--color-flame)]" />
                          <input type="text" placeholder="ZIP" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-flame)] focus:ring-1 focus:ring-[var(--color-flame)]" />
                        </div>
                      </div>
                    )}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 mt-8 flex flex-col items-center justify-center text-center">
                      <CreditCard className="text-gray-400 mb-4" size={32} />
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Test Mode Environment</p>
                      <p className="text-xs text-gray-400 mt-1">Stripe Payment Element would load here in production.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "confirmed" && (
                <motion.div 
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-12 text-center shadow-lg border-t-8 border-[var(--color-flame)]"
                >
                  <div className="w-24 h-24 bg-[var(--color-gold)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,183,0,0.4)]">
                    <span className="text-4xl">🔥</span>
                  </div>
                  <h2 className="text-5xl font-display uppercase tracking-tighter mb-4 text-[var(--color-flame)]">Order Received</h2>
                  <p className="text-xl text-gray-600 font-medium mb-8">We've got it! Your food is hitting the grill.</p>
                  
                  <div className="bg-[#F5F5F3] rounded-2xl p-6 max-w-sm mx-auto mb-8 text-left">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Order #</p>
                    <p className="text-2xl font-display text-[var(--color-charcoal)] mb-4">BK-84920</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                       <div className="bg-[var(--color-flame)] h-2 rounded-full w-1/3"></div>
                    </div>
                    <p className="text-xs font-bold uppercase text-[var(--color-flame)]">In the kitchen</p>
                  </div>

                  <Link to="/" className="text-sm font-bold uppercase tracking-wider underline hover:text-[var(--color-flame)]">Return to Home</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Cart Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-display uppercase tracking-wider mb-6">Your Order</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 hide-scrollbar">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-16 bg-orange-50 rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold uppercase text-sm">{item.name}</h4>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mb-2">Qty: {item.quantity} • {item.cals * item.quantity} cal</p>
                      {item.customizations && (
                        <p className="text-xs text-[var(--color-flame)] italic">"{item.customizations.join(", ")}"</p>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3 mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between text-sm font-medium text-[var(--color-flame)]">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-display uppercase text-[var(--color-charcoal)] pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {step === "checkout" && (
                 <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-[var(--color-flame)] hover:bg-orange-700 text-white font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
