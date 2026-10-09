/**
 * REKOD MARKAH LATIHAN TAHUN 4 — Google Apps Script
 * ------------------------------------------------------------
 * 1. Latihan murid hantar markah ke sini (doPost) → simpan dalam sheet "Rekod".
 * 2. Dashboard cikgu baca data dari sini (doGet) → perlukan KUNCI_CIKGU.
 * Panduan penuh: lihat PANDUAN.md
 */

// ⚠️ TUKAR kunci ini kepada kata laluan rahsia awak sendiri (huruf/nombor, tiada ruang).
const KUNCI_CIKGU = "tukar-kunci-rahsia-ini";

const NAMA_SHEET = "Rekod";
const SUBJEK_SAH = ["Bahasa Melayu", "Bahasa Inggeris", "Matematik", "Sains"];
const LAJUR = [
  "Tarikh & Masa", "Nama", "Subjek", "Markah (%)", "Cubaan ke-",
  "Salah: Kecuaian", "Salah: Konsep", "Salah: Fakta",
  "Markah hilang: Kecuaian", "Markah hilang: Konsep", "Markah hilang: Fakta",
  "Butiran (jangan ubah)"
];

/** Jalankan SEKALI dari editor (pilih "sediakan" → Run) untuk buat sheet & highlight markah tertinggi. */
function sediakan() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(NAMA_SHEET) || ss.insertSheet(NAMA_SHEET);
  sh.getRange(1, 1, 1, LAJUR.length).setValues([LAJUR])
    .setFontWeight("bold").setBackground("#213a7c").setFontColor("#ffffff").setWrap(true);
  sh.setFrozenRows(1);
  sh.setColumnWidth(1, 150); sh.setColumnWidth(2, 220); sh.setColumnWidth(3, 140);
  sh.setColumnWidth(LAJUR.length, 120);
  sh.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm");

  // 🏆 Highlight markah tertinggi setiap murid bagi setiap subjek
  const julat = sh.getRange(2, 1, sh.getMaxRows() - 1, LAJUR.length);
  const peraturan = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($D2<>"",$D2=MAXIFS($D:$D,$B:$B,$B2,$C:$C,$C2))')
    .setBackground("#fff1a8").setBold(true)
    .setRanges([julat]).build();
  sh.setConditionalFormatRules([peraturan]);
}

/** Terima markah daripada latihan murid. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);
    const nama = String(d.nama || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
    const subjek = String(d.subjek || "");
    const markah = Math.round(Number(d.markah));
    const butiran = Array.isArray(d.butiran) ? d.butiran.slice(0, 80) : [];
    if (nama.length < 2 || SUBJEK_SAH.indexOf(subjek) < 0 || !(markah >= 0 && markah <= 100)) {
      return jawab({ ok: false, ralat: "data tidak sah" });
    }

    const kira = { kecuaian: 0, konsep: 0, fakta: 0 }, hilang = { kecuaian: 0, konsep: 0, fakta: 0 };
    const bersih = butiran.map(function (b) {
      const j = ["kecuaian", "konsep", "fakta"].indexOf(b.j) >= 0 ? b.j : "";
      const g = Number(b.g) || 0, m = Number(b.m) || 0;
      if (j) { kira[j]++; hilang[j] += Math.max(0, m - g); }
      return { no: String(b.no).slice(0, 10), g: g, m: m, j: j };
    });

    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NAMA_SHEET);
    if (!sh) return jawab({ ok: false, ralat: "jalankan sediakan() dahulu" });

    // Cubaan ke-berapa untuk murid + subjek ini
    let cubaan = 1;
    const n = sh.getLastRow() - 1;
    if (n > 0) {
      const lama = sh.getRange(2, 2, n, 2).getValues();
      const kunci = nama.toLowerCase() + "|" + subjek;
      lama.forEach(function (r) { if (String(r[0]).toLowerCase() + "|" + r[1] === kunci) cubaan++; });
    }

    sh.appendRow([
      new Date(), selamat(nama), subjek, markah, cubaan,
      kira.kecuaian, kira.konsep, kira.fakta,
      bulat(hilang.kecuaian), bulat(hilang.konsep), bulat(hilang.fakta),
      JSON.stringify(bersih)
    ]);
    return jawab({ ok: true });
  } catch (err) {
    return jawab({ ok: false, ralat: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Dashboard cikgu baca semua rekod. Perlu ?kunci=KUNCI_CIKGU */
function doGet(e) {
  const p = (e && e.parameter) || {};
  let hasil;
  if (p.kunci !== KUNCI_CIKGU) {
    hasil = { ok: false, ralat: "kunci salah" };
  } else {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NAMA_SHEET);
    const n = sh ? sh.getLastRow() - 1 : 0;
    const baris = n > 0 ? sh.getRange(2, 1, n, LAJUR.length).getValues() : [];
    hasil = {
      ok: true,
      rekod: baris.map(function (r) {
        let b = [];
        try { b = JSON.parse(r[11] || "[]"); } catch (x) {}
        return {
          masa: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
          nama: String(r[1]).replace(/^'/, ""), subjek: r[2], markah: Number(r[3]), cubaan: Number(r[4]),
          kecuaian: Number(r[5]), konsep: Number(r[6]), fakta: Number(r[7]), butiran: b
        };
      })
    };
  }
  const cb = p.callback;
  if (cb && /^[\w.$]+$/.test(cb)) {
    return ContentService.createTextOutput(cb + "(" + JSON.stringify(hasil) + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return jawab(hasil);
}

function jawab(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function bulat(x) { return Math.round(x * 100) / 100; }
// Elak nama dibaca sebagai formula (=, +, -, @)
function selamat(s) { return /^[=+\-@]/.test(s) ? "'" + s : s; }
