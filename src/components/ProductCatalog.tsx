import React, { useState, useMemo, useEffect } from 'react';
import { ServerCatalogCard } from './ServerCatalogCard';
import { Badge } from './ui/badge';
import type { ProductItem } from '../data/products';

interface ProductCatalogProps {
  products: ProductItem[];
}

const CATEGORIES = ['Semua', 'VPS & Server', 'Akun Cloud', 'Proxy', 'VPN Private', 'Web Hosting', 'Jasa & Setup', 'Akun Premium', 'Akun Premium Cloud', 'Tools & Lisensi'] as const;

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    // Saring server products agar hanya card server tunggal yang tampil (tidak dobel/berantakan di katalog)
    const nonServerProducts = products.filter(
      (p) =>
        p.category !== 'VPS' &&
        p.category !== 'RDP' &&
        p.category !== 'Standard VPS' &&
        p.category !== 'Premium VPS' &&
        p.category !== 'Dedicated Server' &&
        p.category !== 'Colocation Rack'
    );
    
    if (!searchQuery && selectedCategory === 'Semua') return nonServerProducts;

    const lowerQuery = searchQuery.toLowerCase();
    return nonServerProducts.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch = !searchQuery ||
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        (item.specs && item.specs.some(s => s.toLowerCase().includes(lowerQuery)));

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const showServerCards = (selectedCategory === 'Semua' || selectedCategory === 'VPS & Server') &&
    (!searchQuery || 'vps rdp cloud server dedicated xeon rack colocation standard premium'.includes(searchQuery.toLowerCase()));

  const serverCardsCount = showServerCards ? 4 : 0;

  return (
    <div className="w-full">
      {/* Category Filter Tabs & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-sm px-3 py-1.5 text-xs font-medium transition active:scale-95 ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-850 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Counter & Search Query Reset */}
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          {searchQuery && (
            <div className="flex items-center gap-1.5 rounded bg-zinc-900 px-2 py-1 text-zinc-300">
              <span>Filter: "{searchQuery}"</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  window.history.replaceState({}, '', '/produk');
                }}
                className="text-zinc-500 hover:text-white ml-1"
                title="Reset pencarian"
              >
                &times;
              </button>
            </div>
          )}
          <span>
            Menampilkan <span className="font-semibold text-zinc-300">{filteredProducts.length + serverCardsCount}</span> produk
          </span>
        </div>
      </div>

      {/* Grid of Catalog */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* 4 Card Terpisah: Standard VPS, Premium Private Cloud, Dedicated Server, Colocation Rack Space */}
        {showServerCards && (
          <>
            <ServerCatalogCard type="basic" />
            <ServerCatalogCard type="premium" />
            <ServerCatalogCard type="dedicated" />
            <ServerCatalogCard type="rack" />
          </>
        )}

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col justify-between rounded-lg bg-zinc-950 p-5 transition hover:bg-zinc-900/60 min-h-[160px] h-full"
          >
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] font-normal px-2 py-0.5 rounded">
                  {product.category}
                </Badge>
                {product.tag && (
                  <Badge className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    {product.tag}
                  </Badge>
                )}
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black text-blue-400 group-hover:text-blue-300 transition-colors">
                  <i className={`${product.iconClass || 'fa-solid fa-server'} text-lg`}></i>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
                  {product.title}
                </h3>
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price & Order Action Link */}
            <div className="mt-6 flex items-center justify-between border-t border-zinc-900/80 pt-4">
              <div className="flex flex-col">
                {product.originalPrice && (
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] text-zinc-500 line-through font-medium">
                      {product.originalPrice}
                    </span>
                    {product.discountPercent && (
                      <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">
                        -{product.discountPercent}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="text-base font-bold text-white tracking-tight">{product.price}</span>
                  {product.period && (
                    <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">{product.period}</span>
                  )}
                </div>
              </div>

              <a
                href={`/produk/${product.id}`}
                className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95 shadow"
              >
                <span>Beli</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
