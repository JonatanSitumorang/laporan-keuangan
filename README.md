# 📊 Laporan Keuangan - Tracker Pengeluaran

Website sederhana untuk melacak dan menganalisis pengeluaran pribadi Anda dengan grafik dan statistik yang menarik.

## ✨ Fitur Utama

### 1. **Input Pengeluaran**
   - Masukkan tanggal pengeluaran
   - Pilih kategori pengeluaran (Makanan, Transport, Kebutuhan, Hiburan, Kesehatan, Lainnya)
   - Tambahkan deskripsi pengeluaran
   - Input jumlah uang yang dikeluarkan

### 2. **Grafik Visualisasi**
   - **Grafik Donat**: Menampilkan persentase pengeluaran per kategori untuk bulan ini
   - **Grafik Garis**: Menampilkan tren pengeluaran bulanan selama 12 bulan terakhir

### 3. **Ringkasan Statistik**
   - Total pengeluaran bulan ini
   - Rata-rata pengeluaran per hari
   - Pengeluaran terbesar
   - Jumlah transaksi

### 4. **Detail Pengeluaran**
   - Daftar lengkap semua pengeluaran
   - Filter berdasarkan bulan
   - Hapus pengeluaran yang salah input

### 5. **Statistik Per Kategori**
   - Rata-rata pengeluaran per kategori per bulan
   - Total pengeluaran per kategori
   - Jumlah transaksi per kategori

## 🚀 Cara Menggunakan

### Membuka Website
1. Buka folder `LAPORAN KEUANGAN` di komputer Anda
2. Klik dua kali file `index.html` atau
3. Buka dengan web browser favorit Anda

### Menambah Pengeluaran
1. Pada form "Tambah Pengeluaran", isi:
   - Tanggal pengeluaran
   - Kategori (pilih dari dropdown)
   - Deskripsi (opsional)
   - Jumlah uang (dalam Rupiah)
2. Klik tombol "Tambah Pengeluaran"

### Melihat Grafik
- Grafik otomatis update setiap kali Anda menambah pengeluaran
- Grafik menampilkan data bulan ini
- Untuk melihat perbandingan dengan bulan lain, scroll ke bawah

### Memfilter Data
1. Pada section "Detail Pengeluaran", pilih bulan
2. Daftar pengeluaran akan otomatis filter
3. Klik "Reset" untuk melihat semua data kembali

### Menghapus Pengeluaran
- Klik tombol "Hapus" pada pengeluaran yang ingin dihapus
- Konfirmasi penghapusan

## 💾 Penyimpanan Data

Semua data disimpan di **Local Storage** browser Anda:
- Data tetap tersimpan meskipun browser ditutup
- Data hanya hilang jika cache browser dihapus
- Tidak perlu internet untuk menggunakan aplikasi
- Data tidak diunggah ke server manapun (privasi terjaga)

## 📱 Kompatibilitas

- ✅ Chrome / Edge / Firefox (Desktop)
- ✅ Safari (Mac)
- ✅ Browser mobile (responsif)
- ✅ Semua sistem operasi

## 🎨 Tema dan Desain

- **Warna Utama**: Biru-Ungu gradient (#667eea - #764ba2)
- **Tema Gelap**: Background gradient cantik
- **Responsif**: Menyesuaikan dengan ukuran layar
- **Animasi Smooth**: Transisi dan animasi halus

## 📊 Kategori Pengeluaran

| Kategori | Emoji | Deskripsi |
|----------|-------|-----------|
| Makanan | 🍔 | Makan, snack, minuman |
| Transport | 🚗 | Bensin, parkir, ojek, taksi |
| Kebutuhan | 🛒 | Belanja barang, kebutuhan rumah tangga |
| Hiburan | 🎮 | Konser, bioskop, game, hobi |
| Kesehatan | 🏥 | Dokter, obat, fitness |
| Lainnya | 📌 | Pengeluaran lainnya |

## 🔧 Fitur Lanjutan

### Membaca Statistik Bulan
Halaman menampilkan rata-rata pengeluaran per kategori setiap bulannya dengan:
- Rata-rata per bulan
- Total pengeluaran kategori
- Jumlah transaksi

### Export Data (Manual)
Untuk backup data, Anda bisa:
1. Buka Developer Tools (F12)
2. Buka Console
3. Ketik: `JSON.stringify(JSON.parse(localStorage.getItem('expenses')), null, 2)`
4. Copy hasilnya dan simpan di file teks

## ⚠️ Perhatian Penting

1. **Backup Data Penting**: Jika data pengeluaran Anda penting, lakukan backup secara berkala
2. **Pembersihan Cache**: Jangan bersihkan cache browser jika Anda ingin menjaga data
3. **Hapus Data**: Gunakan tombol "Hapus Semua Data" dengan hati-hati (tidak bisa dibatalkan)

## 💡 Tips Penggunaan

1. **Input Konsisten**: Gunakan kategori yang sama untuk pengeluaran serupa
2. **Deskripsi Detail**: Gunakan deskripsi yang jelas agar mudah diingat
3. **Input Rutin**: Masukkan pengeluaran setiap hari untuk data akurat
4. **Analisis Bulanan**: Lihat grafik bulan ini untuk mengevaluasi pengeluaran
5. **Target Pengeluaran**: Bandingkan dengan rata-rata untuk mengatur budget

## 🐛 Troubleshooting

### Data tidak tersimpan
- Pastikan JavaScript diaktifkan di browser
- Cek apakah Local Storage tidak penuh
- Coba buka di browser lain

### Grafik tidak muncul
- Refresh halaman (F5)
- Pastikan data pengeluaran sudah ada
- Periksa konsol browser untuk error (F12)

### Tombol tidak berfungsi
- Refresh halaman
- Clear cache browser dan coba lagi
- Gunakan browser lain untuk test

## 📞 Kontak & Support

Aplikasi ini adalah project sederhana untuk tracking keuangan pribadi. Jika ada pertanyaan atau saran, silakan lakukan update sendiri pada kode.

---

**Versi**: 1.0.0  
**Terakhir Update**: 2024  
**License**: Free to use

**Kelola Keuangan Anda dengan Bijak! 💰**
