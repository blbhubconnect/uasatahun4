# 📚 Latihan Interaktif Tahun 4 (SK)

Koleksi latihan interaktif dalam format HTML untuk murid **Tahun 4 Sekolah Kebangsaan (SK)** di Malaysia. Setiap latihan dibina daripada bahan soalan yang disediakan, supaya murid boleh belajar langkah demi langkah.

---

## 🎯 Prinsip Pembelajaran

**Belajar → Cuba → Petunjuk → Semak → Baiki → Maju**

---

## 📋 Senarai Latihan

| Subjek | Fail | Gambar soalan |
|---|---|---|
| 🇬🇧 Bahasa Inggeris | `bi-tahun4-latihan.html` | Terbenam dalam fail |
| 🇲🇾 Bahasa Melayu | `latihan-bahasa-melayu-tahun4.html` | Terbenam dalam fail |
| 🔢 Matematik (UASA) | `matematik-tahun4-uasa.html` | Folder `img/mt4-uasa/` |
| 🔬 Sains | `sains-tahun4.html` | Folder `img/sains-t4/` |

---

## ✅ Peraturan Latihan

| Peraturan | Keterangan |
|---|---|
| 💡 Petunjuk | **1 petunjuk sahaja** untuk setiap soalan |
| 🔁 Cuba semula | **Tiada.** Jawapan salah terus ke soalan seterusnya |
| 💯 Markah | Jumlah **100%**, diagihkan kepada setiap soalan |
| 📄 Fail | **1 subjek = 1 fail HTML** |
| ✅ Jawapan | Jawapan betul dipaparkan selepas murid tekan **Semak** (betul atau salah) |
| 🧒 Nama | Murid tulis nama sebelum mula; markah dihantar ke Google Sheet cikgu |

---

## 🎨 Reka Bentuk

- Font besar dan mudah dibaca (font **Fredoka** dari Google Fonts)
- Gaya visual ceria dan child-friendly
- Animasi untuk jawapan betul dan jawapan salah
- Teks ringkas, tiada ayat panjang
- Gambar rajah dalam format **WebP** supaya ringan dan cepat dimuat

---

## 📁 Struktur Repository

```
/
├── README.md
├── bi-tahun4-latihan.html
├── latihan-bahasa-melayu-tahun4.html
├── matematik-tahun4-uasa.html
├── sains-tahun4.html
└── img/
    ├── mt4-uasa/        ← 11 gambar Matematik (.webp)
    └── sains-t4/        ← 17 gambar Sains (.webp)
```

> ⚠️ **Penting:**
> - **BI** dan **BM** berdiri sendiri. Gambar sudah terbenam dalam fail HTML.
> - **Matematik** dan **Sains** perlukan folder `img/` di **lokasi yang sama** dengan fail HTML. Jangan ubah nama atau lokasi folder ini, nanti gambar tak keluar.
> - Semua fail guna Google Fonts. Kalau tiada internet, latihan masih berfungsi tapi font akan bertukar ke font biasa.

---

## 🚀 Cara Guna

### Buka secara lokal
1. Muat turun atau clone repository ini.
2. Klik dua kali pada mana-mana fail `.html`.

### Terbitkan dengan GitHub Pages
1. Pergi ke **Settings → Pages** dalam repository.
2. Di bawah **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/ (root)`, kemudian **Save**.
4. Pautan setiap latihan:
   ```
   https://<username>.github.io/<nama-repo>/bi-tahun4-latihan.html
   https://<username>.github.io/<nama-repo>/latihan-bahasa-melayu-tahun4.html
   https://<username>.github.io/<nama-repo>/matematik-tahun4-uasa.html
   https://<username>.github.io/<nama-repo>/sains-tahun4.html
   ```

### Pautkan dari website
Gunakan `target="_blank"` supaya latihan dibuka dalam tab baharu:

```html
<a href="https://<username>.github.io/<nama-repo>/sains-tahun4.html" target="_blank" rel="noopener">
  Mula Latihan Sains
</a>
```

---

## 📊 Rekod Markah & Kelemahan

Setiap latihan menghantar **nama, markah dan jenis kesilapan (kecuaian / konsep / fakta)** ke Google Sheet.
Setup: lihat **`rekod-markah/PANDUAN.md`**.

> ⚠️ Folder `rekod-markah/` (`Code.gs`, `dashboard-cikgu.html`, `PANDUAN.md`) untuk cikgu sahaja. Simpan dalam komputer, **jangan** upload ke repository awam.

---

## ➕ Tambah Latihan Baharu

1. Sediakan bahan soalan subjek (PDF atau fail lain).
2. Tukar bahan menjadi 1 fail HTML mengikut peraturan di atas.
3. Namakan fail mengikut subjek, huruf kecil dan sengkang sahaja (contoh: `pjk-tahun4.html`). Elak ruang kosong dan kurungan.
4. Kalau ada gambar, letak dalam folder baharu `img/<kod-subjek>/` dalam format `.webp`.
5. Upload ke repository dan commit.
6. Tambah pautan baharu dalam website dan dalam jadual **Senarai Latihan** di atas.

---

## 👤 Pembangun

**Brendan Lopez**
Kota Marudu, Sabah, Malaysia
