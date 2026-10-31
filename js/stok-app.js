// [INDIKATOR 1.1: Pemisahan Kode JavaScript stok-app.js & Inisialisasi Vue Instance]
new Vue({
    el: '#app',
    data: {
        // [INDIKATOR 1.2: Model Data Reaktif Bahan Ajar Sesuai Presisi dataBahanAjar.js Resmi UT]
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        selectedUpbjj: '',
        selectedKategori: '',
        searchQuery: '',
        filterReorder: false,
        sortBy: '',
        showAddModal: false,
        editingItem: null,
        lastSearchCleared: false, // flag audit untuk watcher searchQuery
        form: {
            kode: '',
            judul: '',
            kategori: 'MK Wajib',
            upbjj: 'Jakarta',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        },
        stokData: [
            {
                kode: "EKMA4116",
                judul: "Pengantar Manajemen",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A3",
                harga: 65000,
                qty: 28,
                safety: 20,
                catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
            },
            {
                kode: "EKMA4115",
                judul: "Pengantar Akuntansi",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A4",
                harga: 60000,
                qty: 7,
                safety: 15,
                catatanHTML: "<strong>Cover baru</strong>"
            },
            {
                kode: "BIOL4201",
                judul: "Biologi Umum (Praktikum)",
                kategori: "Praktikum",
                upbjj: "Surabaya",
                lokasiRak: "R3-B2",
                harga: 80000,
                qty: 12,
                safety: 10,
                catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
            },
            {
                kode: "FISIP4001",
                judul: "Dasar-Dasar Sosiologi",
                kategori: "MK Pilihan",
                upbjj: "Makassar",
                lokasiRak: "R2-C1",
                harga: 55000,
                qty: 2,
                safety: 8,
                catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
            }
        ]
    },
    // [INDIKATOR 1.4: Computed Properties Filter & Sorting Multi-Kriteria]
    computed: {
        filteredStok() {
            let result = this.stokData;

            // Filter UPBJJ
            if (this.selectedUpbjj) {
                result = result.filter(item => item.upbjj === this.selectedUpbjj);
            }

            // Filter Kategori (Dependent Filter)
            if (this.selectedKategori) {
                result = result.filter(item => item.kategori === this.selectedKategori);
            }

            // Search Filter
            if (this.searchQuery.trim() !== '') {
                const q = this.searchQuery.toLowerCase();
                result = result.filter(item =>
                    item.kode.toLowerCase().includes(q) ||
                    item.judul.toLowerCase().includes(q)
                );
            }

            // [INDIKATOR Capaian PDF: Logika Reorder (qty < safety || qty === 0)]
            if (this.filterReorder) {
                result = result.filter(item => item.qty < item.safety || item.qty === 0);
            }

            // Sorting
            if (this.sortBy) {
                result = [...result].sort((a, b) => {
                    if (this.sortBy === 'judul-asc') return a.judul.localeCompare(b.judul);
                    if (this.sortBy === 'judul-desc') return b.judul.localeCompare(a.judul);
                    if (this.sortBy === 'qty-asc') return a.qty - b.qty;
                    if (this.sortBy === 'qty-desc') return b.qty - a.qty;
                    if (this.sortBy === 'harga-asc') return a.harga - b.harga;
                    if (this.sortBy === 'harga-desc') return b.harga - a.harga;
                    return 0;
                });
            }

            return result;
        }
    },
    // [INDIKATOR 1.5: Watchers untuk Side Effects Reaktif]
    watch: {
        // Watcher 1: Mereset selectedKategori saat selectedUpbjj berubah
        selectedUpbjj(newVal, oldVal) {
            console.log(`[Watcher UPBJJ] Berubah dari ${oldVal} ke ${newVal}. Reset kategori filter.`);
            this.selectedKategori = '';
        },
        // Watcher 2: Memantau dan merespon saat kolom pencarian dikosongkan
        searchQuery(newVal, oldVal) {
            if (newVal === '' && oldVal !== '') {
                this.lastSearchCleared = true;
                console.log('[Watcher Search] Kotak pencarian stok dikosongkan.');
            }
        }
    },
    // [INDIKATOR 1.6: Methods & Event Handling]
    methods: {
        resetFilter() {
            this.selectedUpbjj = '';
            this.selectedKategori = '';
            this.searchQuery = '';
            this.filterReorder = false;
            this.sortBy = '';
        },
        openAddModal() {
            this.editingItem = null;
            this.form = {
                kode: '',
                judul: '',
                kategori: 'MK Wajib',
                upbjj: 'Jakarta',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            };
            this.showAddModal = true;
        },
        editItem(item) {
            this.editingItem = item.kode;
            this.form = JSON.parse(JSON.stringify(item));
        },
        saveItem() {
            if (this.editingItem !== null) {
                // Update
                const idx = this.stokData.findIndex(i => i.kode === this.editingItem);
                if (idx !== -1) {
                    this.$set(this.stokData, idx, { ...this.form });
                }
            } else {
                // Add
                const exists = this.stokData.some(i => i.kode.toUpperCase() === this.form.kode.toUpperCase());
                if (exists) {
                    alert('Kode modul sudah terdaftar!');
                    return;
                }
                this.stokData.push({ ...this.form, kode: this.form.kode.toUpperCase() });
            }
            this.closeModal();
        },
        deleteItem(kode) {
            if (confirm(`Apakah Anda yakin ingin menghapus bahan ajar [${kode}]?`)) {
                this.stokData = this.stokData.filter(i => i.kode !== kode);
            }
        },
        closeModal() {
            this.showAddModal = false;
            this.editingItem = null;
        }
    }
});
