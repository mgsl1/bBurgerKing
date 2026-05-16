import { useState } from "react";
import { Plus } from "lucide-react";

const CATEGORIES = ["Flame Grilled Burgers", "Chicken", "Sides", "Drinks", "Desserts"];

const MENU_ITEMS = [
  { id: 1, name: "Whopper", category: "Flame Grilled Burgers", price: 6.49, cals: 670, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", tags: ["Popular"] },
  { id: 2, name: "Double Whopper", category: "Flame Grilled Burgers", price: 7.99, cals: 900, img: "https://images.unsplash.com/photo-1594212848116-b8db5d8f8e4d?w=600&q=80", tags: [] },
  { id: 3, name: "Impossible Whopper", category: "Flame Grilled Burgers", price: 6.99, cals: 630, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80", tags: ["Vegetarian"] },
  { id: 4, name: "Chicken Fries", category: "Chicken", price: 4.49, cals: 260, img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80", tags: ["Popular"] },
  { id: 5, name: "Crispy Chicken Sandwich", category: "Chicken", price: 5.99, cals: 670, img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80", tags: [] },
  { id: 6, name: "Onion Rings", category: "Sides", price: 2.99, cals: 150, img: "https://images.unsplash.com/photo-1639024471210-62ca6c0eefd8?w=600&q=80", tags: [] },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-cream)]">
      {/* Category Nav - Sticky */}
      <div className="sticky top-[72px] md:top-[88px] bg-[var(--color-cream)] z-30 border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-8 py-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap uppercase font-bold tracking-wider text-sm transition-colors pb-1 border-b-2 ${
                  activeCategory === cat 
                    ? "border-[var(--color-flame)] text-[var(--color-flame)]" 
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-display uppercase tracking-tighter mb-10 text-[var(--color-charcoal)]">
          {activeCategory}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col">
              <div className="relative h-48 md:h-56 w-full mb-6 flex-shrink-0">
                {item.tags.map(tag => (
                  <span key={tag} className="absolute top-0 left-0 bg-[var(--color-gold)] text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full z-10 shadow-sm">
                    {tag}
                  </span>
                ))}
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[var(--color-flame)]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-3xl font-display leading-tight uppercase text-[var(--color-charcoal)] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium mb-4">{item.cals} Cal</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
                  <button className="bg-black hover:bg-[var(--color-flame)] text-white p-3 rounded-xl transition-colors group/btn">
                    <Plus size={20} className="group-hover/btn:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
