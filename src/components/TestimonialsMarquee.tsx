import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import { Star } from "lucide-react";

export interface ReviewItem {
  name: string;
  role: string;
  rating: number;
  product: string;
  body: string;
  avatar: string;
}

const customerReviews: ReviewItem[] = [
  {
    name: "Dimas Aditya",
    role: "DevOps & Bot Developer",
    rating: 5,
    product: "VPS Starter 2GB",
    body: "Order VPS Ubuntu buat deploy bot Telegram langsung sat-set aktif hitungan detik. Bandwidth kenceng, latency rendah banget.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Rizky Firmansyah",
    role: "Freelance Scraper",
    rating: 5,
    product: "RDP Botting 4GB",
    body: "RDP Windows jalan non-stop 24/7 anti DC buat automation bot. Admin ramah pas nanya cara ganti port. Recommended parah!",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Nadia Safitri",
    role: "Content Creator",
    rating: 5,
    product: "Canva Pro & ChatGPT Plus",
    body: "Akun ChatGPT Plus langsung bisa login tanpa kendala VPN. Garansi replace beneran aktif pas akun ada kendala langsung dibantu.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Fajar Nugraha",
    role: "Webmaster",
    rating: 5,
    product: "Cloud VPS Pro 4GB",
    body: "Uptime beneran 99.9% NVMe SSD-nya cepet banget buka web portal. Harga lokal rasa server enterprise luar negeri.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Bagus Pratama",
    role: "Trader & Botter",
    rating: 5,
    product: "RDP Extreme 8GB",
    body: "Setup MT4 & MT5 lancar jaya, ping ke broker cuma belasan ms. Beli RDP berkali-kali cuma di RizzerShop yang stabil.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Arya Setiawan",
    role: "Fullstack Engineer",
    rating: 5,
    product: "GitHub Student Developer",
    body: "Lisensi & benefits GitHub Pack aktif lancar. CS fast response via WA, proses verifikasi pembayaran nggak sampai 3 menit.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Eka Putri",
    role: "Digital Marketer",
    rating: 5,
    product: "Claude Pro & Canva",
    body: "Bantu banget buat ngerjain copywriting klien sehari-hari. Harga terjangkau tapi support CS tetep nomor satu.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Hendro Wicaksono",
    role: "System Administrator",
    rating: 5,
    product: "Cloud VPS Enterprise 8GB",
    body: "Dedicated IP bersih gak pernah kena blacklist spam. Keren RizzerShop makin mantap pelayanannya.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
];

const firstRow = customerReviews.slice(0, 4);
const secondRow = customerReviews.slice(4);

const ReviewCard = ({
  avatar,
  name,
  role,
  product,
  body,
  rating,
}: ReviewItem) => {
  return (
    <figure
      className={cn(
        "relative h-full w-[310px] cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-200",
        "border-zinc-800/80 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/60"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <img
            className="h-9 w-9 rounded-full object-cover border border-zinc-700/60"
            src={avatar}
            alt={name}
            loading="lazy"
          />
          <div className="flex flex-col text-left">
            <figcaption className="text-xs font-semibold text-white">
              {name}
            </figcaption>
            <p className="text-[11px] text-zinc-400">{role}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-amber-400" />
          ))}
        </div>
      </div>

      <div className="mt-2.5 inline-flex items-center rounded bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 text-[10px] font-medium text-blue-400">
        Order: {product}
      </div>

      <blockquote className="mt-2.5 text-xs text-zinc-300 leading-relaxed text-left">
        “{body}”
      </blockquote>
    </figure>
  );
};

export function TestimonialsMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
      {/* Row 1 */}
      <Marquee pauseOnHover className="[--duration:30s] gap-4">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* Row 2 (Reverse) */}
      <Marquee reverse pauseOnHover className="[--duration:30s] gap-4 mt-1">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* Edge Gradients - Fade effect left & right */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
    </div>
  );
}

export default TestimonialsMarquee;
