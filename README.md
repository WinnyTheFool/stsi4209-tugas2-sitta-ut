# SITTA - Sistem Informasi Bahan Ajar & Tracking Logistik (Universitas Terbuka)

Repositori ini berisi proyek pengembangan aplikasi web frontend berbasis **Vue.js 2 (CDN)** untuk memenuhi Tugas Praktik / Tugas Mata Kuliah **STSI4209 Sistem Informasi** di Universitas Terbuka (SITTA - Sistem Informasi Bahan Ajar).

---

## 🏛️ Fitur Utama Aplikasi
1. **Manajemen Stok Bahan Ajar (Stok UPBJJ):**
   - Menampilkan daftar bahan ajar berdasarkan UPBJJ (Jakarta, Surabaya, Makassar, Padang, Denpasar).
   - Filter berdasarkan Kategori (MK Wajib, MK Pilihan, Praktikum, Problem-Based).
   - Indikator Visual *Safety Stock* & Tombol *Reorder Alert* (`qty < safety`).
   - Pencarian real-time dan Sorting multi-kriteria.
   - Operasi CRUD (Tambah, Edit, Hapus) data bahan ajar secara reaktif.

2. **Tracking DO (Delivery Order) Bahan Ajar:**
   - Pelacakan status pengiriman DO berdasarkan nomor resi/DO (contoh: `DO2025-0001`).
   - Timeline riwayat perjalanan paket pengiriman secara kronologis.
   - Form pembuatan Delivery Order baru dengan reaktivitas pilihan paket dan ekspedisi.

---

## 🛠️ Stack Teknologi
- **HTML5 & Tailwind CSS** (via CDN) untuk tata letak responsif dan modern.
- **Vue.js 2.x** (via CDN) untuk reaktivitas data, *computed properties*, *watchers*, dan *directives* (`v-if`, `v-show`, `v-for`, `v-model`, `v-text`, `v-html`).
- **JavaScript (ES6)** modular (`stok-app.js` dan `tracking-app.js`).

---

## 🚀 Cara Menjalankan Proyek
1. Clone atau unduh repositori ini.
2. Buka direktori proyek melalui terminal atau file manager.
3. Buka file `stok.html` atau `tracking.html` langsung di browser modern (Chrome, Firefox, Edge) karena menggunakan CDN Vue.js & Tailwind.
