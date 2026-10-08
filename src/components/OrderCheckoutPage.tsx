import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Layers,
  Plus,
  Minus,
  Server,
  Cpu,
  Check
} from 'lucide-react';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import type { ProductItem, VariantOption } from '../data/products';
import vpsOptionsData from '../data/vps-options.json';

interface OrderCheckoutPageProps {
  products: ProductItem[];
}

export function OrderCheckoutPage({ products }: OrderCheckoutPageProps) {
  // Inisialisasi awal produk langsung secara sinkron agar tidak stuck di 'Memuat...'
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(() => {
    if (typeof window !== 'undefined') {
      const pId = new URLSearchParams(window.location.search).get('id');
      if (pId === 'vps-custom') {
        return {
          id: 'vps-custom',
          title: 'Cloud VPS / RDP Dedicated',
          category: 'VPS',
          price: 'Rp 25.000',
          period: '/bulan',
          hasWarranty: true,
        };
      }
      if (pId) {
        const found = products.find((p) => p.id === pId);
        if (found) return found;
      }
    }
    return products[0] || {
      id: 'vps-custom',
      title: 'Cloud VPS / RDP Dedicated',
      category: 'VPS',
      price: 'Rp 25.000',
      period: '/bulan',
      hasWarranty: true,
    };
  });

  const [serverType, setServerType] = useState<'vps' | 'rdp'>(() => {
    if (typeof window !== 'undefined') {
      const typeParam = new URLSearchParams(window.location.search).get('type');
      if (typeParam?.toLowerCase() === 'rdp') return 'rdp';
    }
    return 'vps';
  });
  const [planId, setPlanId] = useState<'basic' | 'premium' | 'dedicated' | 'colocation'>('basic');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [resourceId, setResourceId] = useState<string>('b-1gb-1c');
  const [regionId, setRegionId] = useState<string>('sgp');
  const [osDistro, setOsDistro] = useState<string>('ubuntu');
  const [osVersion, setOsVersion] = useState<string>('Ubuntu 24.04 LTS');
  const [hostname, setHostname] = useState<string>('srv1.rizzer.cloud');
  const [quantity, setQuantity] = useState<number>(1);

  // Akun Non-Server State
  const [selectedVariant, setSelectedVariant] = useState<VariantOption | null>(null);

  // Data Pembeli & Catatan
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);

  // References from JSON
  const currentPlan = vpsOptionsData.plans.find((p) => p.id === planId) || vpsOptionsData.plans[0];
  const isDedicated = planId === 'dedicated';
  const isColocation = planId === 'colocation';
  const isInfrastructure = isDedicated || isColocation;

  const activeResourceList = planId === 'basic'
    ? vpsOptionsData.basicResources
    : planId === 'premium'
    ? vpsOptionsData.premiumResources
    : planId === 'dedicated'
    ? vpsOptionsData.dedicatedResources
    : vpsOptionsData.rackResources;

  const currentResource = activeResourceList.find((r) => r.id === resourceId) || activeResourceList[0];
  const currentRegion = vpsOptionsData.regions.find((r) => r.id === regionId) || vpsOptionsData.regions[0];

  const currentOsList = serverType === 'vps' ? vpsOptionsData.osOptions.vps : vpsOptionsData.osOptions.rdp;
  const currentOsObj = currentOsList.find((o) => o.id === osDistro) || currentOsList[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
      const found = products.find((p) => p.id === productId);
      if (found) {
        setSelectedProduct(found);
        if (found.category === 'RDP') {
          setServerType('rdp');
          setOsDistro('win-server');
          setOsVersion('Windows Server 2022');
        } else if (found.category === 'VPS') {
          setServerType('vps');
          setOsDistro('ubuntu');
          setOsVersion('Ubuntu 24.04 LTS');
        }
        if (found.variants && found.variants.length > 0) setSelectedVariant(found.variants[0]);
      } else if (productId === 'vps-custom') {
        setSelectedProduct({
          id: 'vps-custom',
          title: 'Cloud Server & Datacenter',
          category: 'VPS',
          price: 'Rp 20.000',
          period: '/bulan',
          hasWarranty: true,
        });

        const planParam = params.get('plan')?.toLowerCase();
        if (planParam === 'premium') {
          setPlanId('premium');
          if (vpsOptionsData.premiumResources.length > 0) {
            setResourceId(vpsOptionsData.premiumResources[0].id);
          }
        } else if (planParam === 'dedicated') {
          setPlanId('dedicated');
          if (vpsOptionsData.dedicatedResources.length > 0) {
            setResourceId(vpsOptionsData.dedicatedResources[0].id);
          }
        } else if (planParam === 'colocation' || planParam === 'rack') {
          setPlanId('colocation');
          if (vpsOptionsData.rackResources.length > 0) {
            setResourceId(vpsOptionsData.rackResources[0].id);
          }
        } else {
          setPlanId('basic');
          if (vpsOptionsData.basicResources.length > 0) {
            setResourceId(vpsOptionsData.basicResources[0].id);
          }
        }
      }
    } else {
      // Fallback ke produk pertama jika tidak ada ID
      const defaultProd = products[0] || null;
      if (defaultProd) {
        setSelectedProduct(defaultProd);
        if (defaultProd.variants && defaultProd.variants.length > 0) setSelectedVariant(defaultProd.variants[0]);
      }
    }
  }, [products]);

  const handleServerTypeChange = (type: 'vps' | 'rdp') => {
    setServerType(type);
    if (type === 'vps') {
      setOsDistro('ubuntu');
      setOsVersion('Ubuntu 24.04 LTS');
    } else {
      setOsDistro('win-server');
      setOsVersion('Windows Server 2022');
    }
  };

  const handleSelectOsDistro = (distroId: string) => {
    setOsDistro(distroId);
    const list = serverType === 'vps' ? vpsOptionsData.osOptions.vps : vpsOptionsData.osOptions.rdp;
    const distro = list.find((d) => d.id === distroId);
    if (distro && distro.versions.length > 0) setOsVersion(distro.versions[0]);
  };

  const isServer = selectedProduct?.category === 'VPS' || selectedProduct?.category === 'RDP' || selectedProduct?.id === 'vps-custom';
  const hasWarranty = true;

  const unitPriceNumber = (() => {
    if (!isServer) {
      return parseInt((selectedVariant?.price || selectedProduct?.price || '0').replace(/[^0-9]/g, ''), 10);
    }
    if (isDedicated || isColocation) {
      const dRes = currentResource as any;
      return billingCycle === 'yearly' ? (dRes.priceYearly || 0) : (dRes.priceMonthly || 0);
    }
    const cRes = currentResource as any;
    return serverType === 'vps' ? cRes.priceVps : cRes.priceRdp;
  })();

  const billingPeriodLabel = isInfrastructure ? (billingCycle === 'yearly' ? '/tahun' : '/bulan') : '/bulan';
  const displayTotalPrice = `Rp ${(unitPriceNumber * quantity).toLocaleString('id-ID')}`;
  const displayUnitPrice = `Rp ${unitPriceNumber.toLocaleString('id-ID')}${billingPeriodLabel}`;

  const invoiceId = `RZZ-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    let details = `Invoice: ${invoiceId}\nQty: ${quantity}x`;
    if (isServer) {
      details += `\nPlan: ${currentPlan.name} (${currentPlan.tag})`;
      if (isColocation) {
        const rRes = currentResource as any;
        details += `\nRack Space: ${rRes.name} (${rRes.uSize})\nPower: ${rRes.power}\nAllocated IP: ${rRes.ipAllocated}\nBandwidth: ${rRes.bandwidth}\nDatacenter: ${rRes.datacenter}\nBilling: ${billingCycle === 'yearly' ? 'Tahunan (Hemat 2 Bulan)' : 'Bulanan'}`;
      } else if (isDedicated) {
        const dRes = currentResource as any;
        details += `\nServer: ${dRes.name}\nCPU: ${dRes.cpu}\nRAM: ${dRes.ram}\nDisk: ${dRes.storage}\nBilling: ${billingCycle === 'yearly' ? 'Tahunan (Hemat 2 Bulan)' : 'Bulanan'}\nLokasi: ${dRes.datacenter}`;
      } else {
        details += `\nRegion: ${currentRegion.name}\nOS: ${osVersion}\nHostname: ${hostname || 'srv1.rizzer.cloud'}`;
      }
    } else if (selectedVariant) {
      details += `\nVarian: ${selectedVariant.name}`;
    }
    if (notes) details += `\nCatatan: ${notes}`;

    const itemTitle = isServer
      ? (isColocation
          ? `[Colocation Rack Space] ${(currentResource as any).name}`
          : isDedicated
          ? `[Dedicated Server] ${(currentResource as any).name}`
          : `${serverType === 'vps' ? 'Cloud VPS' : 'Windows RDP'} [${currentPlan.name}] ${(currentResource as any).ram} (${currentRegion.code})`)
      : selectedProduct.title;

    const url = createWhatsAppUrl(itemTitle, displayTotalPrice, details);
    window.open(url, '_blank');
  };

  if (!selectedProduct) return <div className="py-20 text-center text-zinc-400">Memuat...</div>;

  return (
    <div className="space-y-8">
      <div>
        <a href="/produk" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Katalog</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSendOrder} className="space-y-6">
            {isServer && (
              <div className="space-y-6">
                <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold">1</span>
                    <h2 className="text-sm font-semibold text-white">Platform Server</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vpsOptionsData.serverTypes.map((t) => (
                      <button key={t.id} type="button" onClick={() => handleServerTypeChange(t.id as 'vps' | 'rdp')} className={`rounded-md p-4 text-left transition border flex items-center justify-between ${serverType === t.id ? 'border-blue-500 bg-blue-950/30' : 'border-zinc-850 bg-zinc-900/60 text-zinc-400'}`}>
                        <div className="flex items-center gap-3">
                          <i className={`${t.icon} text-base ${serverType === t.id ? 'text-blue-400' : ''}`}></i>
                          <div>
                            <span className="font-semibold text-white text-xs block">{t.name}</span>
                            <span className="text-[11px] text-zinc-400 block mt-0.5">{t.desc}</span>
                          </div>
                        </div>
                        {serverType === t.id && <Check className="h-4 w-4 text-blue-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold">2</span>
                      <h2 className="text-sm font-semibold text-white">Pilihan Tipe Server / Plan</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {vpsOptionsData.plans.map((p) => {
                      const isSelected = planId === p.id;
                      const priceBadge = p.id === 'basic'
                        ? 'Mulai Rp 20.000'
                        : p.id === 'premium'
                        ? 'Mulai Rp 70.000'
                        : p.id === 'dedicated'
                        ? 'Mulai Rp 3.300.000'
                        : 'Mulai Rp 950.000';
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            const newPlan = p.id as 'basic' | 'premium' | 'dedicated' | 'colocation';
                            setPlanId(newPlan);
                            const newResourceList = newPlan === 'basic'
                              ? vpsOptionsData.basicResources
                              : newPlan === 'premium'
                              ? vpsOptionsData.premiumResources
                              : newPlan === 'dedicated'
                              ? vpsOptionsData.dedicatedResources
                              : vpsOptionsData.rackResources;
                            if (newResourceList.length > 0) {
                              setResourceId(newResourceList[0].id);
                            }
                          }}
                          className={`rounded-md p-4 text-left transition border ${
                            isSelected
                              ? 'border-blue-500 bg-blue-950/30 shadow-sm ring-1 ring-blue-500/50'
                              : 'border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-xs text-white">{p.name}</span>
                            <Badge className={isSelected ? 'bg-blue-600 text-white text-[9px]' : 'bg-zinc-800 text-zinc-300 text-[9px]'}>
                              {p.tag}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed mb-2 line-clamp-2">{p.desc}</p>
                          <div className="text-[10px] text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-900">
                            <span className="truncate mr-1">{p.warranty.split('&')[0]}</span>
                            <span className="text-blue-400 font-semibold whitespace-nowrap">{priceBadge}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Billing Cycle Khusus Dedicated Server & Colocation Rack (Bulanan / Tahunan Hemat) */}
                {isInfrastructure && (
                  <div className="rounded-lg border border-blue-500/30 bg-blue-950/10 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold">&#9733;</span>
                        <h2 className="text-sm font-semibold text-white">
                          Siklus Pembayaran {isColocation ? 'Rack Space' : 'Dedicated Server'}
                        </h2>
                      </div>
                      <Badge className="bg-emerald-600 text-white text-[10px]">Promo Hemat 2 Bulan</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {vpsOptionsData.billingCycles.map((b) => {
                        const isBSelected = billingCycle === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBillingCycle(b.id as 'monthly' | 'yearly')}
                            className={`rounded-md p-3.5 text-left transition border ${
                              isBSelected
                                ? 'border-blue-500 bg-blue-950/40 text-white shadow-sm ring-1 ring-blue-500/50'
                                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold text-xs text-white mb-1">
                              <span>{b.name}</span>
                              {b.id === 'yearly' && (
                                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">Diskon 2 Bulan</span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-400">{b.discount}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold">3</span>
                      <h2 className="text-sm font-semibold text-white">
                        {isColocation
                          ? 'Pilih Ukuran Rack Space (1U - 45U Full Rack)'
                          : isDedicated
                          ? 'Pilihan Server Hardware (Dual Xeon)'
                          : `Kapasitas Hardware (${currentPlan.name})`}
                      </h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                    {activeResourceList.map((res: any) => {
                      const isSelected = resourceId === res.id;
                      if (isColocation) {
                        const price = billingCycle === 'yearly' ? res.priceYearly : res.priceMonthly;
                        const period = billingCycle === 'yearly' ? '/tahun' : '/bln';
                        return (
                          <button
                            key={res.id}
                            type="button"
                            onClick={() => setResourceId(res.id)}
                            className={`rounded-md p-4 text-left transition border ${
                              isSelected
                                ? 'border-blue-500 bg-blue-950/30 shadow-sm ring-1 ring-blue-500/50'
                                : 'border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm text-white">{res.name}</span>
                              <Badge className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px]">{res.uSize}</Badge>
                            </div>
                            <div className="text-base font-extrabold text-blue-400 mb-2">
                              Rp {price.toLocaleString('id-ID')}
                              <span className="text-xs font-normal text-zinc-400 ml-1">{period}</span>
                            </div>
                            <div className="space-y-1 text-[11px] text-zinc-400 pt-2 border-t border-zinc-900">
                              <div className="flex justify-between"><span>Power Allocation:</span><span className="text-amber-400 font-medium">{res.power}</span></div>
                              <div className="flex justify-between"><span>Allocated IP:</span><span className="text-zinc-200 font-medium">{res.ipAllocated}</span></div>
                              <div className="flex justify-between"><span>Bandwidth:</span><span className="text-zinc-200 font-medium">{res.bandwidth}</span></div>
                              <div className="flex justify-between"><span>Datacenter:</span><span className="text-emerald-400 font-medium">{res.datacenter}</span></div>
                            </div>
                          </button>
                        );
                      }

                      if (isDedicated) {
                        const price = billingCycle === 'yearly' ? res.priceYearly : res.priceMonthly;
                        const period = billingCycle === 'yearly' ? '/tahun' : '/bln';
                        return (
                          <button
                            key={res.id}
                            type="button"
                            onClick={() => setResourceId(res.id)}
                            className={`rounded-md p-4 text-left transition border ${
                              isSelected
                                ? 'border-blue-500 bg-blue-950/30 shadow-sm ring-1 ring-blue-500/50'
                                : 'border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm text-white">{res.name}</span>
                              <Badge className="bg-blue-900/60 text-blue-300 border border-blue-500/30 text-[10px]">{res.tag}</Badge>
                            </div>
                            <div className="text-base font-extrabold text-blue-400 mb-2">
                              Rp {price.toLocaleString('id-ID')}
                              <span className="text-xs font-normal text-zinc-400 ml-1">{period}</span>
                            </div>
                            <div className="space-y-1 text-[11px] text-zinc-400 pt-2 border-t border-zinc-900">
                              <div className="flex items-center gap-1.5 font-medium text-zinc-200">
                                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                                <span>{res.cpu}</span>
                              </div>
                              <div className="flex justify-between"><span>RAM:</span><span className="text-zinc-200 font-medium">{res.ram}</span></div>
                              <div className="flex justify-between"><span>Storage:</span><span className="text-zinc-200 font-medium">{res.storage}</span></div>
                              <div className="flex justify-between"><span>Lokasi:</span><span className="text-emerald-400 font-medium">{res.datacenter}</span></div>
                            </div>
                          </button>
                        );
                      }

                      const resPrice = serverType === 'vps' ? res.priceVps : res.priceRdp;
                      return (
                        <button
                          key={res.id}
                          type="button"
                          onClick={() => setResourceId(res.id)}
                          className={`rounded-md p-3.5 text-left transition border ${
                            isSelected
                              ? 'border-blue-500 bg-blue-950/30 shadow-sm ring-1 ring-blue-500/50'
                              : 'border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          <div className="flex items-baseline justify-between mb-1.5">
                            <span className="font-bold text-sm text-white">{res.ram}</span>
                            <span className="text-xs font-semibold text-blue-400">Rp {resPrice.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="space-y-0.5 text-[11px] text-zinc-400">
                            <div className="flex items-center gap-1.5 font-medium text-zinc-300">
                              <Cpu className="h-3 w-3 text-blue-400" />
                              <span>{res.vcpu}</span>
                            </div>
                            <div>{res.storage}</div>
                            <div className="text-[10px] text-zinc-500">{res.transfer}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lokasi Datacenter & OS hanya untuk VPS/RDP (Colocation & Dedicated sudah fixed di Datacenter Jakarta) */}
                {!isColocation && (
                  <>
                    <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold">4</span>
                        <h2 className="text-sm font-semibold text-white">Lokasi Datacenter</h2>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {vpsOptionsData.regions.map((reg) => (
                          <button key={reg.id} type="button" onClick={() => setRegionId(reg.id)} className={`rounded-md p-3 text-left transition border flex items-center gap-3 ${regionId === reg.id ? 'border-blue-500 bg-blue-950/40' : 'border-zinc-850 bg-zinc-900/60'}`}>
                            <img src={reg.flag} alt={reg.name} className="h-4 w-6 rounded-sm object-cover" />
                            <span className="text-xs font-semibold text-white truncate">{reg.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold">5</span>
                        <h2 className="text-sm font-semibold text-white">Sistem Operasi</h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentOsList.map((distro) => (
                          <button key={distro.id} type="button" onClick={() => handleSelectOsDistro(distro.id)} className={`rounded-md py-1.5 px-3 text-xs font-medium border ${osDistro === distro.id ? 'border-blue-500 bg-blue-600 text-white' : 'border-zinc-850 bg-zinc-900/70 text-zinc-400'}`}>{distro.name}</button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentOsObj.versions.map((ver) => (
                          <button key={ver} type="button" onClick={() => setOsVersion(ver)} className={`rounded-md px-3 py-1.5 text-xs font-medium border ${osVersion === ver ? 'border-blue-500 bg-blue-950/40 text-white' : 'border-zinc-850 bg-zinc-900 text-zinc-400'}`}>{ver}</button>
                        ))}
                      </div>
                      <input type="text" value={hostname} onChange={(e) => setHostname(e.target.value)} placeholder="Hostname..." className="w-full rounded-sm bg-zinc-900 px-3 py-2 text-xs text-zinc-200 border border-zinc-800 focus:border-blue-500 font-mono" />
                    </div>
                  </>
                )}
              </div>
            )}

            {!isServer && selectedProduct.variants && (
              <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2 pb-3 border-b border-zinc-850"><Layers className="h-4 w-4 text-blue-400" /> Paket Varian</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProduct.variants.map((v) => (
                    <button key={v.id} type="button" onClick={() => setSelectedVariant(v)} className={`rounded-md p-3 text-left border flex flex-col justify-between ${selectedVariant?.id === v.id ? 'border-blue-500 bg-blue-950/30' : 'border-zinc-850 bg-zinc-900/60 text-zinc-400'}`}>
                      <div className="flex justify-between w-full mb-1"><span className="font-semibold text-white text-xs">{v.name}</span><span className="text-xs font-bold text-blue-400">{v.price}</span></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4">
              <h2 className="text-sm font-semibold text-white">Data Pembeli & Catatan</h2>
              <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan tambahan..." className="w-full rounded-sm bg-zinc-900 px-3 py-2 text-xs text-zinc-200 border border-zinc-800 focus:border-blue-500 resize-none" />
              <div className="flex items-start gap-2.5 rounded-sm border border-zinc-850 bg-zinc-900/60 p-3">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(c) => setAcceptTerms(!!c)} />
                <Label htmlFor="terms" className="text-xs text-zinc-200 cursor-pointer">Saya menyetujui syarat & ketentuan layanan</Label>
              </div>
            </div>

            <Button type="submit" disabled={!acceptTerms} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11">
              Lanjut Order ke WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-850 bg-zinc-950 p-5 space-y-4 self-start sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
              <span className="text-xs font-semibold text-zinc-300">Ringkasan Layanan</span>
              <Badge variant="outline" className="border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px]">
                {isColocation ? 'COLOCATION' : isDedicated ? 'DEDICATED' : isServer ? serverType.toUpperCase() : selectedProduct.category}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isColocation
                  ? (currentResource as any).name
                  : isDedicated
                  ? (currentResource as any).name
                  : isServer
                  ? (serverType === 'vps' ? 'Cloud VPS Linux' : 'Windows RDP')
                  : selectedProduct.title}
              </h3>
              <div className="text-xl font-extrabold text-white">{displayTotalPrice}</div>
            </div>
            
            <div className="flex items-center justify-between gap-3 p-3 rounded-md bg-black border border-zinc-850">
              <label htmlFor="checkout-quantity" className="text-[10px] font-bold text-zinc-500 uppercase">Jumlah Unit</label>
              <input
                id="checkout-quantity"
                type="number"
                min={1}
                max={999}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setQuantity(isNaN(val) || val < 1 ? 1 : val);
                }}
                className="w-20 rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs text-white font-bold text-center focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="pt-3 border-t border-zinc-900 space-y-2 text-[11px] text-zinc-400">
              {isServer && (
                <>
                  <div className="flex justify-between">
                    <span>Tipe Plan:</span>
                    <span className="text-white font-medium">{currentPlan.name}</span>
                  </div>
                  {isInfrastructure && (
                    <div className="flex justify-between">
                      <span>Billing:</span>
                      <span className="text-blue-400 font-semibold">{billingCycle === 'yearly' ? 'Tahunan (Hemat 2 Bln)' : 'Bulanan'}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between"><span>Harga Satuan:</span><span className="text-white">{displayUnitPrice}</span></div>
              <div className="flex justify-between"><span>Garansi:</span><span className="text-emerald-400">{isServer ? currentPlan.warranty.split('&')[0] : '7 Hari (1x Replace)'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}