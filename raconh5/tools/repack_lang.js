/**
 * Repack translated lang_en.json back into cw.txt
 *
 * Reads the original cw.txt, replaces the "language" section data
 * with content from lang_en.json, and writes the new cw.txt.
 */

const fs   = require('fs');
const path = require('path');

const IN_FILE  = path.join(__dirname, 'lang_en.json');
const CW_FILE  = path.join(__dirname, '../client/main/resource/cw/cw.txt');
const BAK_FILE = CW_FILE + '.bak';

// Đường dẫn XAMPP — sửa nếu bạn đặt game ở chỗ khác
const XAMPP_CW = 'C:\\xampp\\htdocs\\game\\resource\\cw\\cw.txt';

// ── Binary reader (Big-Endian) ────────────────────────────────────────────────

class BufReader {
    constructor(buf) { this.buf = buf; this.pos = 0; }
    readByte()   { return this.buf.readUInt8(this.pos++); }
    readShort()  { const v = this.buf.readInt16BE(this.pos);  this.pos += 2; return v; }
    readInt()    { const v = this.buf.readInt32BE(this.pos);  this.pos += 4; return v; }
    readUTF() {
        const len = this.buf.readUInt16BE(this.pos); this.pos += 2;
        const str = this.buf.toString('utf8', this.pos, this.pos + len); this.pos += len;
        return str;
    }
    slice(len) { const c = this.buf.slice(this.pos, this.pos + len); this.pos += len; return c; }
}

// ── Binary writer (Big-Endian) ────────────────────────────────────────────────

class BufWriter {
    constructor() { this.chunks = []; }
    writeByte(v)  { const b = Buffer.alloc(1); b.writeUInt8(v);     this.chunks.push(b); }
    writeShort(v) { const b = Buffer.alloc(2); b.writeInt16BE(v);   this.chunks.push(b); }
    writeInt(v)   { const b = Buffer.alloc(4); b.writeInt32BE(v);   this.chunks.push(b); }
    writeUTF(str) {
        const enc = Buffer.from(str, 'utf8');
        const lb  = Buffer.alloc(2); lb.writeUInt16BE(enc.length);
        this.chunks.push(lb, enc);
    }
    writeBytes(buf) { this.chunks.push(buf); }
    toBuffer()    { return Buffer.concat(this.chunks); }
}

// ── Build new "language" section binary ─────────────────────────────────────

function buildLangSection(data) {
    // Group entries by table prefix
    const tables = {};
    for (const key of Object.keys(data)) {
        const m = key.match(/^([a-zA-Z_]+)(-?\d+)$/);
        if (!m) { console.warn('  ⚠ Skipping:', key); continue; }
        const [, table, id] = m;
        if (!tables[table]) tables[table] = [];
        tables[table].push({ id: parseInt(id, 10), content: data[key] });
    }

    const tableNames = Object.keys(tables);
    const w = new BufWriter();
    w.writeByte(tableNames.length);

    for (const name of tableNames) {
        const entries = tables[name];
        w.writeUTF(name);
        w.writeShort(entries.length);
        for (const { id, content } of entries) {
            w.writeShort(id);
            w.writeUTF(content);
        }
    }
    return w.toBuffer();
}

// ── Rewrite cw.txt preserving all other sections ─────────────────────────────

function repack() {
    const translations = JSON.parse(fs.readFileSync(IN_FILE, 'utf8'));
    const origBuf      = fs.readFileSync(CW_FILE);
    const r            = new BufReader(origBuf);
    const w            = new BufWriter();

    const sectionCount = r.readByte();
    w.writeByte(sectionCount);

    let replaced = false;
    for (let i = 0; i < sectionCount; i++) {
        const name    = r.readUTF();
        const dataLen = r.readInt();
        const data    = r.slice(dataLen);

        w.writeUTF(name);

        if (name === 'language') {
            const newLang = buildLangSection(translations);
            w.writeInt(newLang.length);
            w.writeBytes(newLang);
            console.log(`  language: ${dataLen} → ${newLang.length} bytes`);
            replaced = true;
        } else {
            w.writeInt(dataLen);
            w.writeBytes(data);
        }
    }

    if (!replaced) {
        console.error('ERROR: "language" section not found — nothing changed');
        process.exit(1);
    }

    if (!fs.existsSync(BAK_FILE)) {
        fs.copyFileSync(CW_FILE, BAK_FILE);
        console.log(`  Backup → ${BAK_FILE}`);
    }

    const outBuf = w.toBuffer();
    fs.writeFileSync(CW_FILE, outBuf);
    const count = Object.keys(translations).length;
    console.log(`✓ Repacked ${count} strings → ${CW_FILE}`);

    // Tự động copy sang XAMPP nếu thư mục tồn tại
    try {
        const xamppDir = path.dirname(XAMPP_CW);
        if (fs.existsSync(xamppDir)) {
            fs.writeFileSync(XAMPP_CW, outBuf);
            console.log(`✓ Copied → ${XAMPP_CW}`);
        } else {
            console.log(`  (XAMPP path not found, skipped: ${XAMPP_CW})`);
        }
    } catch (e) {
        console.warn(`  Warning: could not copy to XAMPP: ${e.message}`);
    }
}

repack();
