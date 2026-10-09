# 📊 Panduan Rekod Markah (Google Sheet)

Setup sekali sahaja, ~5 minit.

## 1. Buat Google Sheet + Apps Script
1. Buka [sheets.new](https://sheets.new) → namakan, cth **Rekod Markah Tahun 4**.
2. Menu **Extensions → Apps Script**.
3. Padam kod sedia ada, tampal semua isi **`Code.gs`**.
4. Tukar baris ini kepada kata laluan rahsia awak:
   ```js
   const KUNCI_CIKGU = "tukar-kunci-rahsia-ini";
   ```
5. **Save** 💾 → pilih fungsi **`sediakan`** di atas → **Run** → benarkan akses (Allow).
   Sheet **Rekod** akan muncul dengan tajuk lajur + highlight markah tertinggi.

## 2. Deploy sebagai Web App
1. **Deploy → New deployment** → ⚙️ pilih **Web app**.
2. **Execute as:** Me · **Who has access:** **Anyone**
3. **Deploy** → salin **Web app URL** (berakhir dengan `/exec`).

> Kalau ubah `Code.gs` kemudian: **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. URL kekal sama.

## 3. Tampal URL dalam 4 latihan
Dalam setiap fail latihan, cari baris ini (Ctrl+F `TAMPAL_URL`) dan ganti:
```js
const REKOD_URL = "TAMPAL_URL_APPS_SCRIPT_DI_SINI";
```
Upload semula ke GitHub.

## 4. Buka dashboard cikgu
1. Buka **`dashboard-cikgu.html`** (boleh terus dari komputer, tak perlu upload).
2. **⚙️ Tetapan** → tampal URL + kunci → **Sambung**.
3. Tekan **🔄 Muat semula** bila-bila nak data terkini.

⚠️ Jangan letak `dashboard-cikgu.html` dalam repo awam bersama kunci. Kunci disimpan dalam browser sahaja, bukan dalam fail.

---

## Cara kelemahan dikenal pasti
Setiap soalan yang salah diberi 1 label:

| Label | Maksud | Contoh |
|---|---|---|
| 🟠 **Kecuaian** | Murid sebenarnya tahu, tapi cuai | Dapat ≥ separuh markah, 1 huruf/1 digit salah, terlepas kata kunci "kecuali" / "paling sedikit" |
| 🟣 **Konsep** | Tak faham peraturan / idea | Penjodoh bilangan, operasi matematik, inferens sains |
| 🔵 **Fakta** | Tak ingat / tak jumpa maklumat | Fakta dalam petikan, rajah, hafalan (1 abad = 100 tahun) |

- Label setiap soalan ada dalam senarai **`TAG`** dalam setiap fail latihan (1 baris = 1 soalan, ada komen). Ubah di situ kalau tak setuju.
- `["fakta",{2:"kecuaian"}]` = biasanya fakta, tapi kalau murid pilih pilihan C (indeks 2) → kecuaian.

## Nota
- Murid taip **nama penuh yang sama** setiap kali (huruf besar/kecil tak kisah) supaya cubaan dikira betul.
- Tiada internet? Markah disimpan dalam browser dan dihantar automatik bila latihan dibuka semula dengan internet.
