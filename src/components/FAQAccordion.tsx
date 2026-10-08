import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <Accordion defaultValue={["item-1"]} className="max-w-2xl mx-auto space-y-2">
      <AccordionItem value="item-1">
        <AccordionTrigger>Berapa lama proses aktivasi VPS atau RDP setelah pembayaran?</AccordionTrigger>
        <AccordionContent>
          Proses aktivasi berlangsung instan dan otomatis. Detail IP, username, dan password server akan dikirimkan ke WhatsApp Anda dalam waktu 1-5 menit setelah pembayaran terverifikasi.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Bagaimana cara membeli akun premium (ChatGPT Plus, Canva, GitHub)?</AccordionTrigger>
        <AccordionContent>
          Pilih produk akun di katalog, klik Beli Sekarang, lalu konfirmasi pesanan ke WhatsApp CS kami. Setelah bukti bayar dikirim, data akun langsung diberikan lengkap dengan panduan login yang aman.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Apa saja metode pembayaran yang diterima di RizzerShop?</AccordionTrigger>
        <AccordionContent>
          Kami menerima seluruh metode pembayaran lokal Indonesia: QRIS (BCA, Mandiri, BRI, BNI), Dompet Digital (DANA, OVO, GoPay, ShopeePay), dan Virtual Account otomatis.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Apakah ada garansi jika server VPS atau RDP mengalami kendala?</AccordionTrigger>
        <AccordionContent>
          Ya, kami memberikan garansi replace (ganti server baru) jika terjadi kendala jaringan atau downtime provider selama masa sewa aktif.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Bolehkah server digunakan untuk bot dan aplikasi non-stop 24 jam?</AccordionTrigger>
        <AccordionContent>
          Sangat boleh. Server kami didukung network port 1 Gbps unlimited dan NVMe SSD yang stabil untuk menjalankan bot Telegram, automation, scraping, maupun trading forex 24/7.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FAQAccordion;