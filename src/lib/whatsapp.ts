export const STORE_CONFIG = {
	name: 'RizzerShop',
	whatsappNumber: '6281385173654',
	currency: 'Rp'
};

export function createWhatsAppUrl(productName: string, price: string, details?: string): string {
	const message = `Halo Admin, saya mau order:

*Produk:* ${productName}
*Total:* ${price}

*Detail:*
${details || '-'}

Mohon instruksi pembayarannya. Terima kasih.`;

	return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
