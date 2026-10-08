import React from 'react';
import { Badge } from './ui/badge';

interface ServerCatalogCardProps {
  type: 'basic' | 'premium' | 'dedicated' | 'rack';
}

export function ServerCatalogCard({ type }: ServerCatalogCardProps) {
  if (type === 'basic') {
    return (
      <div className="group flex flex-col justify-between rounded-lg bg-zinc-950 p-5 transition hover:bg-zinc-900/60 min-h-[160px] h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] font-normal px-2 py-0.5 rounded">
              Standard VPS
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded">
              Budget & Hemat
            </Badge>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black text-blue-400 group-hover:text-blue-300 transition-colors">
              <i className="fa-solid fa-server text-lg"></i>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
              Standard Cloud VPS
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
            Pilihan ekonomis untuk deploy bot Telegram, VPN pribadi, proxy, atau web hosting ringan.
          </p>
        </div>

        {/* Price & Order Action Link */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-900/80 pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 35.000</span>
              <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-42%</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight">Rp 20.000</span>
              <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
            </div>
          </div>

          <a
            href="/produk/vps-starter"
            className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95 shadow"
          >
            <span>Beli</span>
          </a>
        </div>
      </div>
    );
  }

  if (type === 'premium') {
    return (
      <div className="group flex flex-col justify-between rounded-lg bg-zinc-950 p-5 transition hover:bg-zinc-900/60 min-h-[160px] h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] font-normal px-2 py-0.5 rounded">
              Premium VPS
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded">
              Unshared 100%
            </Badge>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black text-blue-400 group-hover:text-blue-300 transition-colors">
              <i className="fa-solid fa-bolt text-lg"></i>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
              Premium Private Cloud
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
            Pay As You Go Cloud VPS — Unshared Resources, Bandwidth Unmetered, NVMe SSD, Uptime 99.9%.
          </p>
        </div>

        {/* Price & Order Action Link */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-900/80 pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 110.000</span>
              <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-36%</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight">Rp 70.000</span>
              <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
            </div>
          </div>

          <a
            href="/produk/vps-premium-cloud"
            className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95 shadow"
          >
            <span>Beli</span>
          </a>
        </div>
      </div>
    );
  }

  if (type === 'dedicated') {
    return (
      <div className="group flex flex-col justify-between rounded-lg bg-zinc-950 p-5 transition hover:bg-zinc-900/60 min-h-[160px] h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] font-normal px-2 py-0.5 rounded">
              Dedicated Server
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded">
              Dual Intel Xeon
            </Badge>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black text-blue-400 group-hover:text-blue-300 transition-colors">
              <i className="fa-solid fa-microchip text-lg"></i>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
              Bare Metal Dedicated Server
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
            Server fisik 100% milik Anda. 128 GB RAM, 2x 1TB SSD, Jakarta Tier 3 Datacenter, hemat 2 bulan bayar tahunan.
          </p>
        </div>

        {/* Price & Order Action Link */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-900/80 pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 4.500.000</span>
              <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-27%</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight">Rp 3.300.000</span>
              <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
            </div>
          </div>

          <a
            href="/produk/ds-dual-xeon"
            className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95 shadow"
          >
            <span>Beli</span>
          </a>
        </div>
      </div>
    );
  }

  // Colocation Rack Space Card
  return (
    <div className="group flex flex-col justify-between rounded-lg bg-zinc-950 p-5 transition hover:bg-zinc-900/60 min-h-[160px] h-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] font-normal px-2 py-0.5 rounded">
            Colocation Server
          </Badge>
          <Badge className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded">
            Rack Space 1U - 45U
          </Badge>
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black text-blue-400 group-hover:text-blue-300 transition-colors">
            <i className="fa-solid fa-network-wired text-lg"></i>
          </div>
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
            Colocation Rack Space
          </h3>
        </div>

        {/* Description */}
        <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
          Titip server fisik Anda di Datacenter Tier 3 Jakarta. Power 450W, IP Public, 1 Gbps Local & bandwidth unlimited.
        </p>
      </div>

      {/* Price & Order Action Link */}
      <div className="mt-6 flex items-center justify-between border-t border-zinc-900/80 pt-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 1.350.000</span>
            <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-30%</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-base font-bold text-white tracking-tight">Rp 950.000</span>
            <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
          </div>
        </div>

        <a
          href="/produk/colocation-rack"
          className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95 shadow"
        >
          <span>Beli</span>
        </a>
      </div>
    </div>
  );
}
