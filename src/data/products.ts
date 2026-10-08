export interface VariantOption {
	id: string;
	name: string;
	price: string;
	originalPrice?: string;
	period: string;
	specs?: string[];
}

export interface ProductItem {
	id: string;
	title: string;
	description?: string;
	category: 'VPS' | 'RDP' | 'Standard VPS' | 'Premium VPS' | 'Dedicated Server' | 'Colocation Rack' | 'VPN Private' | 'Web Hosting' | 'Jasa & Setup' | 'Akun Cloud' | 'Akun Premium' | 'Akun Premium Cloud' | 'Tools & Lisensi' | 'Proxy';
	specs?: string[];
	price: string;
	originalPrice?: string;
	discountPercent?: string;
	period?: string;
	tag?: string;
	iconClass?: string;
	available?: boolean;
	hasWarranty?: boolean;
	variants?: VariantOption[];
}

import vpsStandardData from './vps-standard.json';
import vpsPremiumData from './vps-premium.json';
import serversDedicatedData from './servers-dedicated.json';
import serversColocationData from './servers-colocation.json';
import vpnPrivateData from './vpn-private.json';
import webHostingData from './web-hosting.json';
import servicesData from './services.json';
import canvaData from './canva.json';
import licensesData from './licenses.json';
import cloudStorageData from './cloud-storage.json';
import sportsStreamData from './sports-stream.json';
import cloudAccountsData from './cloud-accounts.json';
import accountsData from './accounts.json';
import proxyData from './proxy.json';

export const vpsStandardProducts = vpsStandardData as ProductItem[];
export const vpsPremiumProducts = vpsPremiumData as ProductItem[];
export const dedicatedServerProducts = serversDedicatedData as ProductItem[];
export const colocationRackProducts = serversColocationData as ProductItem[];
export const vpnPrivateProducts = vpnPrivateData as ProductItem[];
export const webHostingProducts = webHostingData as ProductItem[];
export const servicesProducts = servicesData as ProductItem[];
export const canvaProducts = canvaData as ProductItem[];
export const licensesProducts = licensesData as ProductItem[];
export const cloudStorageProducts = cloudStorageData as ProductItem[];
export const sportsStreamProducts = sportsStreamData as ProductItem[];
export const cloudAccountsProducts = cloudAccountsData as ProductItem[];
export const accountsProducts = accountsData as ProductItem[];
export const proxyProducts = proxyData as ProductItem[];

export const productsData: ProductItem[] = [
	...vpsStandardProducts,
	...vpsPremiumProducts,
	...dedicatedServerProducts,
	...colocationRackProducts,
	...vpnPrivateProducts,
	...webHostingProducts,
	...servicesProducts,
	...canvaProducts,
	...licensesProducts,
	...cloudStorageProducts,
	...sportsStreamProducts,
	...cloudAccountsProducts,
	...accountsProducts,
	...proxyProducts,
];

