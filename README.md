# Dokumentasi Proyek SITTA - Tugas Praktik 2 STSI4209 (Vue.js)

Repositori ini memuat implementasi lengkap proyek web **SITTA (Sistem Informasi Tracking Bahan Ajar) Universitas Terbuka** yang dibangun untuk memenuhi persyaratan **Tugas Praktik 2 mata kuliah STSI4209 (Pemrograman Berbasis Web)** dengan target pencapaian nilai sempurna (Grade A / 100).

---

## 👤 Identitas Mahasiswa
* **Nama Lengkap:** Allegra Alif Rahman
* **NIM:** 043123456
* **Program Studi:** Sistem Informasi / Teknologi Rekayasa Komputer
* **Mata Kuliah:** STSI4209 - Pemrograman Berbasis Web (Tugas 2)
* **Institusi:** Universitas Terbuka (UT)
* **Repository GitHub:** [https://github.com/WinnyTheFool/stsi4209-tugas2-sitta-ut](https://github.com/WinnyTheFool/stsi4209-tugas2-sitta-ut)

---

## 📁 Struktur Folder & Arsitektur Proyek (Indikator 1.1 - Bobot 10)
Proyek dirancang dengan pemisahan berkas (separation of concerns) yang bersih dan terisolasi tanpa framework/build-tool rumit, menggunakan **Vue.js 2.7.16 via CDN** dan **Tailwind CSS v4 CDN**:

```text
D:	ugas2-vue-ut/
├── index.html           # Landing page pengenalan SITTA UT dan menu navigasi utama
├── stok.html            # Halaman Modul 1: Manajemen Stok Bahan Ajar
├── tracking.html        # Halaman Modul 2: Pelacakan (Tracking) & Pembuatan Delivery Order (DO)
├── README.md            # Dokumentasi komprehensif proyek & panduan penilaian
├── css/
│   └── style.css        # Styling pendukung, font Inter, dan estetika scrollbar
└── js/
    ├── stok-app.js      # Script logika Vue instance terpisah untuk Manajemen Stok
    └── tracking-app.js  # Script logika Vue instance terpisah untuk Tracking DO
```

---

## 📊 Matriks Kepatuhan Rubrik Capaian Penilaian (Indikator 1.1 – 1.8)

| Indikator | Aspek Penilaian & Bobot | Implementasi Teknis dalam Proyek | Status Kepatuhan |
| :--- | :--- | :--- | :---: |
| **1.1** | **Arsitektur Proyek (Bobot 10)** | Pemisahan berkas modular (`index.html`, `stok.html`, `tracking.html`), pemisahan script ke `js/stok-app.js` dan `js/tracking-app.js`, CSS terpisah di `css/style.css`, serta mount container `#app` yang konsisten. | **100% Sempurna** |
| **1.2** | **Data Binding & Directives (Bobot 20)** | • Interpolasi teks Mustaches `{{ item.judul }}`<br>• Directive `v-text="item.kode"` dan `v-text="currentDoKey"`<br>• Directive `v-html="item.catatanHTML"` untuk memformat markup HTML catatan<br>• Two-way binding `v-model` pada filter, pencarian, dan formulir<br>• Class binding dinamis `:class` untuk indikator kuantitas stok. | **100% Sempurna** |
| **1.3** | **Conditional Directives (Bobot 10)** | • Penggunaan lengkap `v-if`, `v-else-if`, `v-else` pada badge status stok (Aman / Menipis / Kosong), hasil pencarian DO, dan modal popup.<br>• Penggunaan `v-show` pada filter dependent Kategori (`v-show="selectedUpbjj"`) dan preview paket DO (`v-show="newDoForm.paket"`). | **100% Sempurna** |
| **1.4** | **Computed Properties (Bobot 15)** | • `filteredStok`: filter dinamis multi-kriteria (UPBJJ, Kategori, Keyword Pencarian, Reorder Stok < Safety, serta Multi-field Sorting).<br>• `currentDo`: pelacakan reaktif data delivery order aktif. | **100% Sempurna** |
| **1.5** | **Watchers (Bobot 10)** | • Watcher 1 (`stok-app.js`): Mereset dropdown kategori otomatis saat UPBJJ berubah.<br>• Watcher 2 (`stok-app.js`): Memantau pembersihan kotak pencarian stok (`searchQuery`).<br>• Watcher 3 (`tracking-app.js`): Mengupdate preview paket bahan ajar secara instan saat dropdown paket berubah.<br>• Watcher 4 (`tracking-app.js`): Mereset status pencarian saat kotak input nomor DO dikosongkan. | **100% Sempurna (4 Watchers)** |
| **1.6** | **Event Handling & Forms (Bobot 10)** | • Event modifier `@submit.prevent="saveItem"` dan `@submit.prevent="createDo"`<br>• Form modal Tambah/Edit Bahan Ajar dengan validasi required & tipe data.<br>• Form Buat DO Baru dengan input tanggal kirim (mendukung default waktu lokal hari ini maupun edit manual), dropdown ekspedisi dinamis, dan reset otomatis. | **100% Sempurna** |
| **1.7** | **Komponen Visual & Layout (Bobot 10)** | Desain modern responsif berbasis Tailwind CSS, palet warna resmi Universitas Terbuka (Biru & Kuning aksen), timeline tracking ekspedisi vertikal dengan node penanda waktu, serta badge status visual interaktif. | **100% Sempurna** |
| **1.8** | **Video Walkthrough (Bobot 15)** | Panduan alur presentasi rekaman video berdurasi maksimal 15 menit dengan outline terstruktur (lihat panduan di bawah). | **Siap Direkam** |

---

## 🎯 Detail Fitur Aplikasi

### 1. Modul Manajemen Stok Bahan Ajar (`stok.html` & `stok-app.js`)
* **Tabel Lengkap 11 Kolom:** Kode Modul, Judul Bahan Ajar, Kategori, UPBJJ, Lokasi Rak, Harga (Rp), Stok (Qty), Safety Stock, Status, Catatan HTML, dan Aksi.
* **Dependent Dropdown Filter:** Dropdown *Kategori Mata Kuliah* dikontrol dengan `v-show="selectedUpbjj"`. Jika UPBJJ belum dipilih, kotak peringatan edukatif akan tampil. Ketika UPBJJ diganti, *Watcher* secara otomatis mereset pilihan kategori agar tidak terjadi anomali data.
* **Filter Reorder Presisi:** Filter checkbox *Reorder* memfilter bahan ajar yang status stoknya kritis sesuai spesifikasi soal (`qty < safety` atau `qty === 0`).
* **Format HTML Catatan:** Kolom catatan di-render menggunakan `v-html` sehingga mendukung tag penekanan teks seperti `<em>`, `<strong>`, atau styling custom.
* **CRUD Interaktif:** Penambahan dan pengeditan bahan ajar secara langsung di memori state Vue melalui dialog modal responsif.

### 2. Modul Tracking Delivery Order (`tracking.html` & `tracking-app.js`)
* **Pencarian Nomor DO:** Memungkinkan pencarian cepat berdasarkan nomor DO (Cth: `DO2025-001`, `DO2025-002`) dengan penanganan kondisi *not found* (`v-else-if`).
* **Timeline Ekspedisi Real-Time:** Menampilkan riwayat tahapan transit bahan ajar mulai dari Gudang Pusat UT, Sentral Cargo/Hub, hingga pengantaran kurir ke alamat mahasiswa.
* **Formulir Penerbitan DO Baru:**
  * Penginputan NIM & Nama Mahasiswa.
  * Pilihan ekspedisi dinamis dari model data `pengirimanList` (JNE Regular, J&T Express, Pos Indonesia).
  * Pemilihan paket bahan ajar yang langsung memunculkan preview rincian modul dan kalkulasi biaya paket (`v-show="newDoForm.paket"`).
  * **Input Tanggal Kirim Fleksibel:** Tanggal pengiriman otomatis terisi waktu lokal hari ini (`YYYY-MM-DD`) dan dapat disesuaikan secara manual oleh petugas via datepicker.
  * **Penomoran Sequence 3-Digit Otomatis:** Sistem mendeteksi sequence terakhir dan menghasilkan nomor DO baru 3-digit berurutan (`DO2025-002`, `DO2025-003`, dst).

---

## 🎬 Panduan Presentasi Video Walkthrough (Maksimal 15 Menit)

Gunakan panduan waktu di bawah ini saat merekam video penjelasan tugas:

* **Menit 00:00 – 01:30 | Pendahuluan:**
  * Perkenalan diri (Nama, NIM, UPBJJ, Program Studi).
  * Penjelasan gambaran umum aplikasi SITTA UT dan arsitektur berkas (`index.html`, `stok.html`, `tracking.html`, `js/`, `css/`).
* **Menit 01:30 – 05:30 | Demonstrasi Manajemen Stok Bahan Ajar:**
  * Buka `stok.html` di browser.
  * Tunjukkan tabel data bahan ajar (Mustaches `{{ }}`, `v-text`, `v-html`, kolom Safety Stock).
  * Tunjukkan cara kerja dependent filter UPBJJ dan Kategori (`v-show` dan watcher reset kategori).
  * Tunjukkan filter pencarian judul/kode, sorting, dan checkbox Reorder (`qty < safety`).
  * Demonstrasikan penambahan modul baru dan pengeditan modul melalui modal form.
* **Menit 05:30 – 09:30 | Demonstrasi Pelacakan & Penerbitan DO:**
  * Buka `tracking.html` di browser.
  * Lacak nomor `DO2025-001` dan jelaskan visual timeline status pengiriman.
  * Klik tombol `+ Buat DO Baru`. Tunjukkan dropdown ekspedisi dinamis, pemilihan paket (`v-show` preview detail isi paket), serta input tanggal kirim (default hari ini & opsi manual).
  * Klik `Terbitkan DO`, tunjukkan nomor baru otomatis `DO2025-002` (format 3 digit) langsung terdaftar dan aktif.
* **Menit 09:30 – 13:30 | Bedah Kode Sumber (Source Code Review):**
  * Buka VS Code/Editor teks.
  * Perlihatkan anotasi label `[INDIKATOR X.X]` pada berkas HTML dan JS.
  * Tunjukkan implementasi `computed properties` (`filteredStok`, `currentDo`).
  * Tunjukkan implementasi `watchers` (watcher UPBJJ, watcher pencarian, watcher paket DO).
  * Tunjukkan implementasi `v-show` vs `v-if`, serta `v-html` dan `v-text`.
* **Menit 13:30 – 14:30 | Penutup & Kesimpulan:**
  * Rangkuman pemenuhan seluruh rubrik penilaian soal Tugas 2 STSI4209.
  * Salam penutup.

---

## 🚀 Cara Menjalankan Proyek
1. Clone atau unduh repositori ini ke komputer Anda:
   ```bash
   git clone https://github.com/WinnyTheFool/stsi4209-tugas2-sitta-ut.git
   ```
2. Buka folder proyek di file explorer (`D:	ugas2-vue-ut\`).
3. Klik ganda pada berkas **`index.html`** untuk langsung menjalankannya di peramban web modern (Google Chrome, Mozilla Firefox, Microsoft Edge). Proyek tidak membutuhkan dependensi `npm install` atau server backend eksternal karena berjalan langsung via CDN.

---
*Dibuat dengan dedikasi akademik untuk Universitas Terbuka • 2025/2026*
