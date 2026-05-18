/**
 * translate_sections.js
 *
 * EXTRACT:  node translate_sections.js extract
 *   → Quét tất cả section trong cw.txt, tìm mọi chuỗi tiếng Trung
 *   → Xuất ra sections_cn.json (key = "sectionName|offset", value = text TQ)
 *   → Xuất ra sections_en.json (bản copy để dịch sang tiếng Anh)
 *
 * REPACK:   node translate_sections.js repack
 *   → Đọc sections_en.json (đã dịch)
 *   → Ghi lại cw.txt với text tiếng Anh
 *   → Tự copy sang XAMPP nếu thấy thư mục
 */

const fs   = require('fs');
const path = require('path');

const CW_SRC   = path.join(__dirname, '../client/main/resource/res/cw.txt');
const CN_FILE  = path.join(__dirname, 'sections_cn.json');
const EN_FILE  = path.join(__dirname, 'sections_en.json');
const BAK_FILE = CW_SRC + '.bak2';
const XAMPP_CW = 'C:\\xampp\\htdocs\\game\\resource\\res\\cw.txt';

const CJK = /[一-鿿㐀-䶿]/;

// ── Big-Endian binary helpers ─────────────────────────────────────────────────

function makeReader(buf) {
    let p = 0;
    return {
        get pos() { return p; },
        set pos(v) { p = v; },
        remaining() { return buf.length - p; },
        readByte()  { return buf.readUInt8(p++); },
        readUShort(){ const v = buf.readUInt16BE(p); p+=2; return v; },
        readInt()   { const v = buf.readInt32BE(p); p+=4; return v; },
        readUTF()   {
            const l = buf.readUInt16BE(p); p+=2;
            const s = buf.toString('utf8', p, p+l); p+=l;
            return s;
        },
        slice(n)    { const c = buf.slice(p, p+n); p+=n; return c; },
        buf,
    };
}

function makeWriter() {
    const chunks = [];
    return {
        writeByte(v)  { const b=Buffer.alloc(1); b.writeUInt8(v);    chunks.push(b); },
        writeUShort(v){ const b=Buffer.alloc(2); b.writeUInt16BE(v); chunks.push(b); },
        writeInt(v)   { const b=Buffer.alloc(4); b.writeInt32BE(v);  chunks.push(b); },
        writeUTF(s)   {
            const e=Buffer.from(s,'utf8');
            const l=Buffer.alloc(2); l.writeUInt16BE(e.length);
            chunks.push(l,e);
        },
        writeBytes(b) { chunks.push(b); },
        toBuffer()    { return Buffer.concat(chunks); },
    };
}

// ── Parse outer container ────────────────────────────────────────────────────

function parseOuter(buf) {
    const r = makeReader(buf);
    const count = r.readByte();
    const sections = [];
    for (let i = 0; i < count; i++) {
        const name = r.readUTF();
        const len  = r.readInt();
        const data = r.slice(len);
        sections.push({ name, data });
    }
    return sections;
}

function buildOuter(sections) {
    const w = makeWriter();
    w.writeByte(sections.length);
    for (const { name, data } of sections) {
        w.writeUTF(name);
        w.writeInt(data.length);
        w.writeBytes(data);
    }
    return w.toBuffer();
}

// ── Scan a section buffer for Chinese UTF strings ─────────────────────────────
// Returns array of { offset, text } where offset = position of the 2-byte length prefix

function scanChinese(buf) {
    const found = [];
    let i = 0;
    while (i < buf.length - 2) {
        const strLen = buf.readUInt16BE(i);
        if (strLen >= 1 && strLen <= 512 && i + 2 + strLen <= buf.length) {
            const candidate = buf.toString('utf8', i+2, i+2+strLen);
            // Verify byte length matches (no invalid UTF sequences)
            const reencoded = Buffer.from(candidate, 'utf8');
            if (reencoded.length === strLen && CJK.test(candidate)) {
                found.push({ offset: i, text: candidate });
                i += 2 + strLen; // skip past this string
                continue;
            }
        }
        i++;
    }
    return found;
}

// ── Rebuild a section buffer with translated strings ──────────────────────────

function applyTranslations(buf, translations) {
    // translations: array of { offset, original, translated }
    // Sort by offset ascending
    translations.sort((a,b) => a.offset - b.offset);

    const chunks = [];
    let cursor = 0;
    for (const { offset, original, translated } of translations) {
        const origLen = Buffer.byteLength(original, 'utf8');
        const transLen = Buffer.byteLength(translated, 'utf8');

        // Skip if offset is behind cursor (overlap from a previous replacement)
        if (offset < cursor) continue;

        // Verify the content at this offset still matches the original Chinese.
        // If the file was already translated, the Chinese won't be there → skip safely.
        if (offset + 2 + origLen > buf.length) continue;
        const storedLen = buf.readUInt16BE(offset);
        if (storedLen !== origLen) continue;
        const storedStr = buf.toString('utf8', offset + 2, offset + 2 + origLen);
        if (storedStr !== original) continue;

        chunks.push(buf.slice(cursor, offset));                 // bytes before prefix
        const lenBuf = Buffer.alloc(2);
        lenBuf.writeUInt16BE(transLen);
        chunks.push(lenBuf);                                    // new length prefix
        chunks.push(Buffer.from(translated, 'utf8'));           // translated content
        cursor = offset + 2 + origLen;                         // skip original content
    }
    // Remaining bytes after last translation
    chunks.push(buf.slice(cursor));
    return Buffer.concat(chunks);
}

// ── EXTRACT command ───────────────────────────────────────────────────────────

function extract() {
    const buf = fs.readFileSync(CW_SRC);
    const sections = parseOuter(buf);

    const cnMap = {};   // "sectionName|offset" → Chinese text
    let total = 0;

    for (const { name, data } of sections) {
        const hits = scanChinese(data);
        for (const { offset, text } of hits) {
            cnMap[`${name}|${offset}`] = text;
            total++;
        }
    }

    fs.writeFileSync(CN_FILE, JSON.stringify(cnMap, null, 2), 'utf8');
    // sections_en.json starts as a copy — user fills in English translations
    if (!fs.existsSync(EN_FILE)) {
        fs.writeFileSync(EN_FILE, JSON.stringify(cnMap, null, 2), 'utf8');
        console.log(`✓ Created ${EN_FILE} (fill in English translations)`);
    } else {
        // Merge: add new keys not yet in EN_FILE
        const existing = JSON.parse(fs.readFileSync(EN_FILE, 'utf8'));
        let added = 0;
        for (const k of Object.keys(cnMap)) {
            if (!(k in existing)) { existing[k] = cnMap[k]; added++; }
        }
        fs.writeFileSync(EN_FILE, JSON.stringify(existing, null, 2), 'utf8');
        if (added) console.log(`  Added ${added} new keys to ${EN_FILE}`);
    }

    console.log(`✓ Found ${total} Chinese strings across ${sections.length} sections → ${CN_FILE}`);
    console.log(`  Edit ${EN_FILE} with English translations, then run:`);
    console.log(`  node translate_sections.js repack`);
}

// ── REPACK command ────────────────────────────────────────────────────────────

function repack() {
    const cnMap = JSON.parse(fs.readFileSync(CN_FILE, 'utf8'));
    const enMap = JSON.parse(fs.readFileSync(EN_FILE, 'utf8'));
    const origBuf = fs.readFileSync(CW_SRC);
    const sections = parseOuter(origBuf);

    let replacedTotal = 0;
    let unchangedTotal = 0;

    const newSections = sections.map(({ name, data }) => {
        // language section is handled entirely by repack_lang.js — skip it here
        if (name === 'language') return { name, data };
        // Collect translations for this section
        const trans = [];
        for (const key of Object.keys(enMap)) {
            const [sec, offStr] = key.split('|');
            if (sec !== name) continue;
            const offset   = parseInt(offStr, 10);
            const original = cnMap[key];
            const translated = enMap[key];
            if (!original || translated === original) { unchangedTotal++; continue; }
            trans.push({ offset, original, translated });
        }
        if (trans.length === 0) return { name, data };
        replacedTotal += trans.length;
        return { name, data: applyTranslations(data, trans) };
    });

    const outBuf = buildOuter(newSections);

    if (!fs.existsSync(BAK_FILE)) {
        fs.copyFileSync(CW_SRC, BAK_FILE);
        console.log(`  Backup → ${BAK_FILE}`);
    }

    fs.writeFileSync(CW_SRC, outBuf);
    console.log(`✓ Replaced ${replacedTotal} strings (${unchangedTotal} unchanged) → ${CW_SRC}`);

    // Auto-copy to XAMPP
    try {
        const xamppDir = path.dirname(XAMPP_CW);
        if (fs.existsSync(xamppDir)) {
            fs.writeFileSync(XAMPP_CW, outBuf);
            console.log(`✓ Copied → ${XAMPP_CW}`);
        } else {
            console.log(`  (XAMPP path not found — copy manually)`);
        }
    } catch(e) {
        console.warn(`  Warning: XAMPP copy failed: ${e.message}`);
    }
}

// ── Main ─────────────────────────────────────────────────────────────────────

const cmd = process.argv[2];
if (cmd === 'extract') extract();
else if (cmd === 'repack') repack();
else {
    console.log('Usage:');
    console.log('  node translate_sections.js extract   ← tìm text TQ → sections_en.json');
    console.log('  node translate_sections.js repack    ← ghi bản dịch vào cw.txt');
}
