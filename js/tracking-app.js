// [INDIKATOR 1.1: Pemisahan Kode JavaScript tracking-app.js & Inisialisasi Vue Instance Sesuai dataBahanAjar.js Resmi UT]
new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        currentDoKey: 'DO2025-0001',
        hasSearched: false,
        showModal: false,
        selectedPaketPreview: null,
        
        // [INDIKATOR Capaian PDF: Ekspedisi List Sesuai dataBahanAjar.js]
        pengirimanList: [
            { kode: "REG", nama: "Reguler (3-5 hari)" },
            { kode: "EXP", nama: "Ekspres (1-2 hari)" }
        ],

        // Data Paket Bahan Ajar Sesuai dataBahanAjar.js
        paketList: {
            'PAKET-UT-001': {
                nama: 'PAKET IPS Dasar',
                isi: ['EKMA4116', 'EKMA4115'],
                harga: 120000,
                total: 'Rp 120.000'
            },
            'PAKET-UT-002': {
                nama: 'PAKET IPA Dasar',
                isi: ['BIOL4201', 'FISIP4001'],
                harga: 140000,
                total: 'Rp 140.000'
            }
        },

        // Model Form Tambah DO Baru
        newDoForm: {
            nim: '',
            nama: '',
            ekspedisi: 'REG',
            paket: '',
            tanggalKirim: new Date().toISOString().split('T')[0]
        },

        // [INDIKATOR 1.2: Model Data Tracking Pengiriman Sesuai dataBahanAjar.js]
        trackingData: {
            'DO2025-0001': {
                nim: '123456789',
                nama: 'Rina Wulandari',
                ekspedisi: 'Reguler (3-5 hari)',
                paket: 'PAKET-UT-001',
                tanggalKirim: '2025-08-25',
                total: 'Rp 120.000',
                status: 'Dalam Perjalanan',
                perjalanan: [
                    { waktu: '2025-08-25 10:12:20', keterangan: 'Penerimaan di Loket: TANGSEL', lokasi: 'Loket TANGSEL' },
                    { waktu: '2025-08-25 14:07:56', keterangan: 'Tiba di Hub: JAKSEL', lokasi: 'Hub JAKSEL' },
                    { waktu: '2025-08-26 08:44:01', keterangan: 'Diteruskan ke Kantor Tujuan', lokasi: 'Kantor Tujuan' }
                ]
            }
        }
    },
    // [INDIKATOR 1.4: Computed Properties]
    computed: {
        currentDo() {
            if (!this.currentDoKey) return null;
            return this.trackingData[this.currentDoKey] || null;
        }
    },
    // [INDIKATOR 1.5: Watchers untuk Reaktifitas Form & Pencarian]
    watch: {
        // Watcher 1: Memantau perubahan pilihan paket pada form DO baru untuk preview reaktif
        'newDoForm.paket'(newVal) {
            if (newVal && this.paketList[newVal]) {
                this.selectedPaketPreview = this.paketList[newVal];
                console.log(`[Watcher DO Form] Paket terpilih: ${newVal}`);
            } else {
                this.selectedPaketPreview = null;
            }
        },
        // Watcher 2: Memantau kotak pencarian tracking, reset flag jika dikosongkan
        searchQuery(newVal) {
            if (newVal.trim() === '') {
                this.hasSearched = false;
            }
        }
    },
    // [INDIKATOR 1.6: Event Handling & Form DO Logic]
    methods: {
        searchDo() {
            const key = this.searchQuery.trim().toUpperCase();
            this.hasSearched = true;
            if (this.trackingData[key]) {
                this.currentDoKey = key;
            } else {
                this.currentDoKey = null;
            }
        },
        selectDo(key) {
            this.currentDoKey = key;
            this.searchQuery = key;
            this.hasSearched = true;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        resetSearch() {
            this.searchQuery = '';
            this.currentDoKey = 'DO2025-0001';
            this.hasSearched = false;
        },
        openModal() {
            this.newDoForm = {
                nim: '',
                nama: '',
                ekspedisi: 'REG',
                paket: '',
                tanggalKirim: new Date().toISOString().split('T')[0]
            };
            this.selectedPaketPreview = null;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        createDo() {
            // [INDIKATOR Capaian PDF: Generate Nomor DO Sesuai Format dataBahanAjar.js (DO2025-0002, dst)]
            const year = new Date().getFullYear();
            const existingKeys = Object.keys(this.trackingData).filter(k => k.startsWith(`DO${year}-`));
            let maxSeq = 0;
            existingKeys.forEach(k => {
                const parts = k.split('-');
                if (parts.length === 2) {
                    const num = parseInt(parts[1], 10);
                    if (!isNaN(num) && num > maxSeq) {
                        maxSeq = num;
                    }
                }
            });
            const nextSeq = String(maxSeq + 1).padStart(4, '0');
            const newDoKey = `DO${year}-${nextSeq}`;

            // Cari nama ekspedisi
            const eksObj = this.pengirimanList.find(e => e.kode === this.newDoForm.ekspedisi);
            const ekspedisiNama = eksObj ? eksObj.nama : this.newDoForm.ekspedisi;

            // Paket info
            const paketInfo = this.paketList[this.newDoForm.paket];
            const totalBayar = paketInfo ? paketInfo.total : 'Rp 0';

            // Tanggal kirim
            const tglKirim = this.newDoForm.tanggalKirim || new Date().toISOString().split('T')[0];

            // Tambahkan DO baru
            this.$set(this.trackingData, newDoKey, {
                nim: this.newDoForm.nim,
                nama: this.newDoForm.nama,
                ekspedisi: ekspedisiNama,
                paket: this.newDoForm.paket,
                tanggalKirim: tglKirim,
                total: totalBayar,
                status: 'Dalam Perjalanan',
                perjalanan: [
                    {
                        waktu: `${tglKirim} 09:00:00`,
                        keterangan: 'Delivery Order diterbitkan, paket disiapkan di Gudang UT',
                        lokasi: 'Gudang UT Pusat'
                    }
                ]
            });

            this.currentDoKey = newDoKey;
            this.searchQuery = newDoKey;
            this.hasSearched = true;
            this.closeModal();

            alert(`Berhasil membuat Delivery Order: ${newDoKey}`);
        }
    }
});
