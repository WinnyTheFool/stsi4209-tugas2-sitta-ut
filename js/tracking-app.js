document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#app',
        data: {
            upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
            paket: [
                { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
                { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
            ],
            tracking: {
                "DO2025-0001": {
                    nim: "123456789",
                    nama: "Rina Wulandari",
                    status: "Dalam Perjalanan",
                    ekspedisi: "JNE",
                    tanggalKirim: "2025-08-25",
                    paket: "PAKET-UT-001",
                    total: 120000,
                    perjalanan: [
                        { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
                        { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
                        { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
                    ]
                }
            },
            searchDoId: "DO2025-0001",
            currentDoKey: "DO2025-0001",
            activeTracking: null,
            showCreateModal: false,
            newDoForm: {
                doId: 'DO2025-0002',
                nim: '',
                nama: '',
                paket: 'PAKET-UT-001',
                ekspedisi: 'JNE'
            }
        },
        created() {
            this.activeTracking = this.tracking["DO2025-0001"] || null;
        },
        computed: {
            calculatedTotal() {
                let found = this.paket.find(p => p.kode === this.newDoForm.paket);
                return found ? found.harga : 0;
            }
        },
        methods: {
            searchDo() {
                let key = this.searchDoId.trim();
                if (this.tracking[key]) {
                    this.currentDoKey = key;
                    this.activeTracking = this.tracking[key];
                } else {
                    alert('Nomor DO ' + key + ' tidak ditemukan!');
                }
            },
            selectTracking(key) {
                this.searchDoId = key;
                this.currentDoKey = key;
                this.activeTracking = this.tracking[key];
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            getPaketDetail(paketKode) {
                let p = this.paket.find(item => item.kode === paketKode);
                return p ? p.isi.join(', ') : 'Modul Standar UT';
            },
            createDo() {
                let id = this.newDoForm.doId;
                let today = new Date().toISOString().slice(0, 10);
                let total = this.calculatedTotal;

                // Set reactive object property in Vue 2 safely
                this.$set(this.tracking, id, {
                    nim: this.newDoForm.nim,
                    nama: this.newDoForm.nama,
                    status: 'Diproses Gudang',
                    ekspedisi: this.newDoForm.ekspedisi,
                    tanggalKirim: today,
                    paket: this.newDoForm.paket,
                    total: total,
                    perjalanan: [
                        { waktu: today + ' 08:00:00', keterangan: 'DO Dibuat dan Diverifikasi Sistem' }
                    ]
                });

                this.currentDoKey = id;
                this.activeTracking = this.tracking[id];
                this.showCreateModal = false;
                
                // Reset form & generate next ID
                let nextIdx = Object.keys(this.tracking).length + 1;
                this.newDoForm = {
                    doId: 'DO2025-' + String(nextIdx).padStart(4, '0'),
                    nim: '',
                    nama: '',
                    paket: 'PAKET-UT-001',
                    ekspedisi: 'JNE'
                };
                alert('Delivery Order berhasil dibuat!');
            }
        }
    });
});
