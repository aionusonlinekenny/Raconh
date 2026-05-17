/**
 * Extract language strings from cw.txt
 *
 * Outer format (CVOManager):
 *   byte        sectionCount
 *   for each section:
 *     readUTF   sectionName   (2-byte BE length + UTF-8)
 *     readInt   dataLen       (4-byte BE)
 *     [dataLen bytes of section data]
 *
 * Inner "language" section (LangCVO):
 *   byte        tableCount
 *   for each table:
 *     readUTF   tableName
 *     readShort entryCount    (2-byte BE signed)
 *     for each entry:
 *       readShort id
 *       readUTF   content
 */

const fs   = require('fs');
const path = require('path');

const CW_FILE  = path.join(__dirname, '../client/main/resource/cw/cw.txt');
const OUT_FILE = path.join(__dirname, 'lang_en.json');

// ── Binary reader (Big-Endian) ────────────────────────────────────────────────

class BufReader {
    constructor(buf) { this.buf = buf; this.pos = 0; }

    readByte()   { return this.buf.readUInt8(this.pos++); }
    readShort()  { const v = this.buf.readInt16BE(this.pos);  this.pos += 2; return v; }
    readUShort() { const v = this.buf.readUInt16BE(this.pos); this.pos += 2; return v; }
    readInt()    { const v = this.buf.readInt32BE(this.pos);  this.pos += 4; return v; }

    readUTF() {
        const len = this.readUShort();
        const str = this.buf.toString('utf8', this.pos, this.pos + len);
        this.pos += len;
        return str;
    }

    slice(len) {
        const chunk = this.buf.slice(this.pos, this.pos + len);
        this.pos += len;
        return chunk;
    }
}

// ── Parse outer container (CVOManager format) ────────────────────────────────

function parseOuter(buf) {
    const r = new BufReader(buf);
    const sectionCount = r.readByte();
    const sections = {};

    for (let i = 0; i < sectionCount; i++) {
        const name    = r.readUTF();
        const dataLen = r.readInt();
        sections[name] = r.slice(dataLen);
    }
    return sections;
}

// ── Parse inner "language" section (LangCVO format) ──────────────────────────

function parseLang(langBuf) {
    const r = new BufReader(langBuf);
    const tableCount = r.readByte();
    const out = {};

    for (let i = 0; i < tableCount; i++) {
        const tableName  = r.readUTF();
        const entryCount = r.readShort();

        for (let j = 0; j < entryCount; j++) {
            const id      = r.readShort();
            const content = r.readUTF();
            out[tableName + id] = content;
        }
    }
    return out;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function extract() {
    const buf      = fs.readFileSync(CW_FILE);
    const sections = parseOuter(buf);

    if (!sections['language']) {
        console.error('ERROR: no "language" section found in cw.txt');
        console.log('Sections found:', Object.keys(sections).join(', '));
        process.exit(1);
    }

    console.log(`Sections in cw.txt: ${Object.keys(sections).length}`);
    console.log('  language section size:', sections['language'].length, 'bytes');

    const strings = parseLang(sections['language']);
    const count   = Object.keys(strings).length;

    fs.writeFileSync(OUT_FILE, JSON.stringify(strings, null, 2), 'utf8');
    console.log(`✓ Extracted ${count} strings → ${OUT_FILE}`);
}

extract();
