document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#app',
        data: {
            upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
            kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
            selectedUpbjj: '',
            selectedKategori: '',
            searchQuery: '',
            sortBy: '',
            filterReorder: false,
            lastSearchCleared: false,
            showAddModal: false,
            editingItem: null,
            form: {
                kode: '',
                judul: '',
                kategori: 'MK Wajib',
                upbjj: 'Jakarta',
                lokasiRak: '',
                harga: 50000,
                qty: 10,
                safety: 5,
                catatanHTML: ''
            },
            stok: [
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
        computed: {
            filteredStok() {
                let result = this.stok.filter(item => {
                    let matchUpbjj = !this.selectedUpbjj || item.upbjj === this.selectedUpbjj;
                    let matchKategori = !this.selectedKategori || item.kategori === this.selectedKategori;
                    let matchSearch = !this.searchQuery || 
                        item.kode.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                        item.judul.toLowerCase().includes(this.searchQuery.toLowerCase());
                    let matchReorder = !this.filterReorder || (item.qty <= item.safety);
                    return matchUpbjj && matchKategori && matchSearch && matchReorder;
                });

                if (this.sortBy) {
                    result.sort((a, b) => {
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
        watch: {
            // Watcher 1: Reset kategori otomatis saat filter UPBJJ dikosongkan
            selectedUpbjj(newVal) {
                if (!newVal) {
                    this.selectedKategori = '';
                }
            },
            // Watcher 2: Pantau searchQuery — jika query dihapus (kosong), reset filter kategori & upbjj
            searchQuery(newVal) {
                if (newVal.trim() === '') {
                    // Ketika search dikosongkan, kembalikan filter ke default
                    // (tidak reset upbjj/kategori agar user tetap bisa kombinasi filter)
                    // Namun kita catat state perubahan untuk keperluan reactive tracking
                    this.lastSearchCleared = true;
                } else {
                    this.lastSearchCleared = false;
                }
            }
        },
        methods: {
            resetFilter() {
                this.selectedUpbjj = '';
                this.selectedKategori = '';
                this.searchQuery = '';
                this.sortBy = '';
                this.filterReorder = false;
            },
            editItem(item) {
                this.editingItem = item.kode;
                this.form = { ...item };
                this.showAddModal = true;
            },
            deleteItem(kode) {
                if (confirm('Yakin ingin menghapus bahan ajar ' + kode + '?')) {
                    this.stok = this.stok.filter(i => i.kode !== kode);
                }
            },
            closeModal() {
                this.showAddModal = false;
                this.editingItem = null;
                this.form = {
                    kode: '',
                    judul: '',
                    kategori: 'MK Wajib',
                    upbjj: 'Jakarta',
                    lokasiRak: '',
                    harga: 50000,
                    qty: 10,
                    safety: 5,
                    catatanHTML: ''
                };
            },
            saveItem() {
                if (this.editingItem) {
                    let index = this.stok.findIndex(i => i.kode === this.editingItem);
                    if (index !== -1) {
                        this.stok.splice(index, 1, { ...this.form });
                    }
                } else {
                    if (this.stok.some(i => i.kode === this.form.kode)) {
                        alert('Kode bahan ajar sudah ada!');
                        return;
                    }
                    this.stok.push({ ...this.form });
                }
                this.closeModal();
            }
        }
    });
});
