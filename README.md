# Dokumentasi Proyek SITTA - Tugas Praktik 2 STSI4209 (Vue.js)

Proyek ini dibangun untuk memenuhi persyaratan **Tugas Praktik 2 mata kuliah STSI4209 (Web Programming / Pemrograman Berbasis Web)** di Universitas Terbuka, menggunakan **Vue.js 2 CDN** (tanpa build tools yang rumit) sesuai dengan ketentuan soal.

---

## 📁 Struktur Folder Proyek
Sesuai dengan arahan modul tugas, struktur direktori terisolasi di `D:\tugas2-vue-ut\` adalah sebagai berikut:

```text
D:\tugas2-vue-ut/
├── index.html           # Halaman utama dengan navigasi ke menu Stok & Tracking DO
├── stok.html            # Halaman 1: Manajemen & Filter Stok Bahan Ajar UT
├── tracking.html        # Halaman 2: Pelacakan (Tracking) & Pembuatan Delivery Order (DO)
├── README.md            # Dokumentasi panduan lengkap penggunaan aplikasi
├── css/
│   └── style.css        # Styling tambahan (Custom font & scrollbar)
└── js/
    └── dataBahanAjar.js # File data dummy (upbjjList, kategoriList, stok, paket, tracking)
```

---

## 🎯 Penjelasan Fitur & Pemenuhan Ketentuan Soal

### 1. Halaman Stok Bahan Ajar (`stok.html`)
*   **Data Field Lengkap:** Menampilkan Kode, Judul, Kategori, UPBJJ (UT-Daerah), Lokasi Rak, Qty, Safety Stock, Status, dan Catatan.
*   **Rendering HTML Dinamis (`v-html`):** Kolom catatan merender tag HTML asli dari data (`<em>`, `<strong>`, `<u>`, dll).
*   **Dependent Filter Options:** Filter **Kategori Mata Kuliah** terkunci (disabled) secara otomatis dan baru bisa dipilih setelah pengguna memilih **UPBJJ (UT-Daerah)** terlebih dahulu.
*   **Filter Reorder:** Checkbox khusus untuk langsung menyaring bahan ajar yang stoknya menipis (`qty <= safety`) atau kosong (`qty == 0`).
*   **Indikator Status Stok (Conditional Rendering):**
    *   🟢 **Aman**: Ditandai badge hijau jika `qty > safety`.
    *   🟠 **Menipis**: Ditandai badge orange jika `0 < qty <= safety`.
    *   🔴 **Kosong**: Ditandai badge merah jika `qty == 0`.
*   **Form Tambah & Edit Data:** Dilengkapi modal interaktif untuk menambah modul baru atau mengedit stok dengan validasi input sederhana.
*   **Computed Properties & Watchers:** 
    *   Pencarian dan filter menggunakan *Computed Properties* agar reaktif dan efisien tanpa recompute berlebih.
    *   Dilengkapi *Watchers* untuk memantau perubahan pada filter UPBJJ dan form input.

### 2. Tracking Delivery Order / DO (`tracking.html`)
*   **Nomor DO Otomatis:** Sistem secara otomatis menghasilkan nomor DO dengan format standar (Cth: `DO2025-0001`, `DO2025-0002`, dst).
*   **Form Pembuatan DO Baru:** 
    *   Input NIM & Nama Mahasiswa secara manual.
    *   Pilihan Ekspedisi pengiriman.
    *   Pilihan Paket Bahan Ajar (`paket`). Saat paket dipilih, rincian isi modul (*items*) di dalam paket langsung muncul secara real-time di bawah pilihan.
    *   Total harga otomatis terkalkulasi berdasarkan harga paket.
*   **Timeline Perjalanan Resi:** Menampilkan riwayat status pengiriman logistik secara kronologis dengan penanda titik timeline yang rapi.

---

## 🚀 Cara Menjalankan Aplikasi
1. Buka folder **`D:\tugas2-vue-ut\`** di komputer Anda.
2. Klik dua kali pada file **`index.html`** untuk membukanya langsung di browser web (Chrome, Firefox, Edge, atau Safari).
3. Gunakan menu navigasi di bagian atas untuk berpindah antara **Manajemen Stok** dan **Tracking DO**.
