// [INDIKATOR 1.1: Pemisahan Kode JavaScript tracking-app.js & Inisialisasi Vue Instance]
new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        currentDoKey: 'DO2025-001',
        hasSearched: false,
        showModal: false,
        selectedPaketPreview: null,
        
        // [INDIKATOR Capaian PDF: Ekspedisi List]
        pengirimanList: [
            { kode: 'REG', nama: 'JNE Regular' },
            { kode: 'EXP', nama: 'J&T Express' },
            { kode: 'POS', nama: 'Pos Indonesia' }
        ],

        // Data Paket Bahan Ajar
        paketList: {
            'PAKET-SI-01': {
                nama: 'Paket Semester 1 Sistem Informasi',
                isi: ['EKMA4116', 'EKMA4115', 'ISIP4110'],
                total: 'Rp 195.000'
            },
            'PAKET-SI-02': {
                nama: 'Paket Praktikum Komputer',
                isi: ['MSIM4201', 'MSIM4301'],
                total: 'Rp 185.000'
            },
            'PAKET-SI-TAP': {
                nama: 'Paket Kelulusan & TAP',
                isi: ['MSIM4401'],
                total: 'Rp 110.000'
            }
        },

        // Model Form Tambah DO Baru
        // [INDIKATOR 1.2: Form Model & INDIKATOR Capaian PDF: Tanggal Kirim Reaktif]
        newDoForm: {
            nim: '',
            nama: '',
            ekspedisi: 'REG',
            paket: '',
            tanggalKirim: new Date().toISOString().split('T')[0] // default waktu lokal hari ini
        },

        // [INDIKATOR 1.2: Model Data Tracking Pengiriman (Format Sequence 3-Digit Standard: DO2025-001)]
        trackingData: {
            'DO2025-001': {
                nim: '043123456',
                nama: 'Allegra Alif Rahman',
                ekspedisi: 'JNE Regular',
                paket: 'PAKET-SI-01',
                tanggalKirim: '2025-10-20',
                total: 'Rp 195.000',
                status: 'Dalam Pengiriman',
                perjalanan: [
                    { waktu: '2025-10-20 09:00', keterangan: 'Paket telah diserahkan ke kurir JNE', lokasi: 'Gudang Pusat UT Tangerang Selatan' },
                    { waktu: '2025-10-20 18:30', keterangan: 'Tiba di sorting center Jakarta Hub', lokasi: 'Jakarta Pusat' },
                    { waktu: '2025-10-21 07:15', keterangan: 'Paket sedang diantar ke alamat penerima', lokasi: 'Bogor Hub' }
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
            this.currentDoKey = 'DO2025-001';
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
            // [INDIKATOR Capaian PDF: Generate Nomor DO 3 Digit (DO2025-002, DO2025-003, dst)]
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
            const nextSeq = String(maxSeq + 1).padStart(3, '0');
            const newDoKey = `DO${year}-${nextSeq}`;

            // Cari nama ekspedisi
            const eksObj = this.pengirimanList.find(e => e.kode === this.newDoForm.ekspedisi);
            const ekspedisiNama = eksObj ? eksObj.nama : this.newDoForm.ekspedisi;

            // Paket info
            const paketInfo = this.paketList[this.newDoForm.paket];
            const totalBayar = paketInfo ? paketInfo.total : 'Rp 0';

            // Tanggal kirim (dari form input atau fallback hari ini)
            const tglKirim = this.newDoForm.tanggalKirim || new Date().toISOString().split('T')[0];

            // Tambahkan DO baru ke reactive object trackingData via Vue.set / this.$set
            this.$set(this.trackingData, newDoKey, {
                nim: this.newDoForm.nim,
                nama: this.newDoForm.nama,
                ekspedisi: ekspedisiNama,
                paket: this.newDoForm.paket,
                tanggalKirim: tglKirim,
                total: totalBayar,
                status: 'Dalam Pengiriman',
                perjalanan: [
                    {
                        waktu: `${tglKirim} 08:30`,
                        keterangan: 'Delivery Order diterbitkan, paket disiapkan di Gudang UT',
                        lokasi: 'Gudang UT Pusat'
                    }
                ]
            });

            // Fokuskan tampilan ke DO yang baru dibuat
            this.currentDoKey = newDoKey;
            this.searchQuery = newDoKey;
            this.hasSearched = true;
            this.closeModal();

            alert(`Berhasil membuat Delivery Order: ${newDoKey}`);
        }
    }
});
