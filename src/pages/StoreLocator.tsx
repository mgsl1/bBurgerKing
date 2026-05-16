import { useState } from "react";
import { Search, MapPin, Navigation } from "lucide-react";

export default function StoreLocator() {
  const [zipcode, setZipcode] = useState("");

  const stores = [
    { id: 1, name: "Burger King - Downtown", address: "123 Flame Way, NY 10001", distance: "0.8 mi", open: true },
    { id: 2, name: "Burger King - Westside", address: "405 Grill Blvd, NY 10014", distance: "2.1 mi", open: true },
    { id: 3, name: "Burger King - Uptown", address: "890 Whopper St, NY 10024", distance: "4.5 mi", open: false },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-cream)] flex flex-col">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full">
        <h1 className="text-5xl md:text-6xl font-display uppercase tracking-tighter mb-8 text-[var(--color-charcoal)]">Find a Restaurant</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Enter City or ZIP" 
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-4 focus:outline-none focus:border-[var(--color-flame)] font-medium"
              />
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <button className="absolute right-4 top-4 text-[var(--color-flame)] hover:text-orange-700">
                <Navigation size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 hide-scrollbar">
              {stores.map(store => (
                <div key={store.id} className="border border-gray-100 p-4 rounded-2xl hover:border-[var(--color-flame)] transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold uppercase text-sm group-hover:text-[var(--color-flame)] transition-colors">{store.name}</h3>
                    <span className="text-xs font-bold text-gray-500">{store.distance}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{store.address}</p>
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider">
                    {store.open ? (
                      <span className="text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Open Now</span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Closed</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[var(--color-flame)] text-white text-xs font-bold uppercase py-2 rounded-lg hover:bg-orange-700 transition">Order Here</button>
                    <button className="flex-1 bg-gray-100 text-[var(--color-charcoal)] text-xs font-bold uppercase py-2 rounded-lg hover:bg-gray-200 transition">Directions</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2 bg-gray-200 rounded-3xl h-[400px] lg:h-[600px] relative overflow-hidden flex items-center justify-center border border-gray-200">
             <div className="text-center p-8">
               <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
               <h3 className="text-xl font-display uppercase text-gray-500 font-bold">Interactive Map Embedded Here</h3>
               <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">This area uses the Google Maps JavaScript API to display an interactive map with location markers in production.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
