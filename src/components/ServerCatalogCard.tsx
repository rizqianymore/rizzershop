import React from 'react';
import { Badge } from './ui/badge';

interface ServerCatalogCardProps {
  type: 'basic' | 'premium' | 'dedicated' | 'rack';
}

export function ServerCatalogCard({ type }: ServerCatalogCardProps) {
  if (type === 'basic') {
    return (
      <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-blue-500/5 min-h-[160px] h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] font-normal px-2 py-0.5 rounded">
              Tier Low
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-medium px-2 py-0.5 rounded">
              Durasi Maks ~20 Hari
            </Badge>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-900/90 border border-zinc-800 text-blue-400 group-hover:scale-105 group-hover:text-blue-300 group-hover:border-blue-500/30 transition-all duration-300">
              <i className="fa-solid fa-server text-lg"></i>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
              Cloud VPS Low
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
            Pilihan ekonomis untuk bot Telegram, VPN pribadi, proxy, atau web ringan. Catatan: Kondisi cloud rawan, ketahanan maks ~20 hari.
          </p>
        </div>

        {/* Price & Order Action Link */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-900/90 pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 35.000</span>
              <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-28%</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">Rp 25.000</span>
              <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
            </div>
          </div>

          <a
            href="/produk/vps-starter"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-600/20 active:scale-95 shadow"
          >
            <span>Beli</span>
          </a>
        </div>
      </div>
    );
  }

  if (type === 'premium') {
    return (
      <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-purple-500/5 min-h-[160px] h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-purple-500/30 bg-purple-950/40 text-purple-300 text-[10px] font-normal px-2 py-0.5 rounded">
              Tier High
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
              Durasi Penuh 30 Hari
            </Badge>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-900/90 border border-zinc-800 text-purple-400 group-hover:scale-105 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-all duration-300">
              <i className="fa-solid fa-bolt text-lg"></i>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
              High Private Cloud
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
            Menggunakan Provider Khusus (Dedicated Resources & NVMe SSD). Sifatnya lebih mahal karena terjamin durasi penuh 30 hari pas & bergaransi.
          </p>
        </div>

        {/* Price & Order Action Link */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-900/90 pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 110.000</span>
              <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-31%</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">Rp 75.000</span>
              <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
            </div>
          </div>

          <a
            href="/produk/vps-premium-cloud"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-600/20 active:scale-95 shadow"
          >
            <span>Beli</span>
          </a>
        </div>
      </div>
    );
  }

  if (type === 'dedicated') {
    return (
      <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-emerald-500/5 min-h-[160px] h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-[10px] font-normal px-2 py-0.5 rounded">
              Dedicated Server
            </Badge>
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
              Dual Intel Xeon
            </Badge>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-900/90 border border-zinc-800 text-emerald-400 group-hover:scale-105 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all duration-300">
              <i className="fa-solid fa-microchip text-lg"></i>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
              Bare Metal Dedicated Server
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
            Server fisik 100% milik Anda. 128 GB RAM, 2x 1TB SSD, Jakarta Tier 3 Datacenter, hemat 2 bulan bayar tahunan.
          </p>
        </div>

        {/* Price & Order Action Link */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-900/90 pt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 4.500.000</span>
              <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-27%</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight group-hover:text-emerald-200 transition-colors">Rp 3.300.000</span>
              <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
            </div>
          </div>

          <a
            href="/produk/ds-dual-xeon"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-600/20 active:scale-95 shadow"
          >
            <span>Beli</span>
          </a>
        </div>
      </div>
    );
  }

  // Colocation Rack Space Card
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-cyan-500/5 min-h-[160px] h-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-[10px] font-normal px-2 py-0.5 rounded">
            Colocation Server
          </Badge>
          <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
            Tier 3 Jakarta
          </Badge>
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-900/90 border border-zinc-800 text-cyan-400 group-hover:scale-105 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all duration-300">
            <i className="fa-solid fa-network-wired text-lg"></i>
          </div>
          <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
            Colocation Server Rack Space
          </h3>
        </div>

        {/* Description */}
        <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300">
          Titip server fisik Anda di Datacenter Tier 3 Jakarta. Power 450W, IP Public, 1 Gbps Local & bandwidth unlimited.
        </p>
      </div>

      {/* Price & Order Action Link */}
      <div className="mt-6 flex items-center justify-between border-t border-zinc-900/90 pt-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[11px] text-zinc-500 line-through font-medium">Rp 1.350.000</span>
            <span className="text-[9px] font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-1 py-0.2 rounded">-30%</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-base font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">Rp 950.000</span>
            <span className="text-[11px] text-zinc-500 font-normal whitespace-nowrap">/bulan</span>
          </div>
        </div>

        <a
          href="/produk/colocation-rack"
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-600/20 active:scale-95 shadow"
        >
          <span>Beli</span>
        </a>
      </div>
    </div>
  );
}
