/**
 * Scan EXML and TS files for hardcoded Chinese text.
 * Outputs two reports:
 *   hardcode_exml.json  — { filePath: [ { line, text } ] }
 *   hardcode_ts.json    — { filePath: [ { line, text } ] }
 *
 * Usage: node scan_hardcode.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '../client/main');
const SKINS_DIR  = path.join(ROOT, 'resource/game_skins');
const SRC_DIR    = path.join(ROOT, 'src');
const OUT_EXML   = path.join(__dirname, 'hardcode_exml.json');
const OUT_TS     = path.join(__dirname, 'hardcode_ts.json');

const CJK_RE = /[一-鿿㐀-䶿＀-￯]/;

// ── Helpers ──────────────────────────────────────────────────────────────────

function walkDir(dir, ext, results = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walkDir(full, ext, results);
        else if (entry.name.endsWith(ext)) results.push(full);
    }
    return results;
}

function scanLines(filePath, lineFilter) {
    const lines   = fs.readFileSync(filePath, 'utf8').split('\n');
    const matches = [];
    lines.forEach((line, idx) => {
        const result = lineFilter(line);
        if (result) matches.push({ line: idx + 1, text: result.trim() });
    });
    return matches;
}

// ── EXML scan — look for text="..." containing CJK ──────────────────────────

function scanExml() {
    const report = {};
    const files  = walkDir(SKINS_DIR, '.exml');

    for (const file of files) {
        const hits = scanLines(file, line => {
            const m = line.match(/text="([^"]*)"/);
            if (m && CJK_RE.test(m[1])) return `text="${m[1]}"`;
            return null;
        });
        if (hits.length) report[path.relative(ROOT, file)] = hits;
    }

    fs.writeFileSync(OUT_EXML, JSON.stringify(report, null, 2), 'utf8');
    const total = Object.values(report).reduce((s, a) => s + a.length, 0);
    console.log(`✓ EXML: ${total} hardcoded strings in ${Object.keys(report).length} files → ${OUT_EXML}`);
}

// ── TS scan — look for string literals containing CJK, skip comment lines ───

function scanTs() {
    const report = {};
    const files  = walkDir(SRC_DIR, '.ts');

    for (const file of files) {
        const hits = scanLines(file, line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('//') || trimmed.startsWith('*')) return null;
            const m = trimmed.match(/"([^"]*[一-鿿㐀-䶿][^"]*)"/);
            if (m) return `"${m[1]}"`;
            const m2 = trimmed.match(/'([^']*[一-鿿㐀-䶿][^']*)'/);
            if (m2) return `'${m2[1]}'`;
            return null;
        });
        if (hits.length) report[path.relative(ROOT, file)] = hits;
    }

    fs.writeFileSync(OUT_TS, JSON.stringify(report, null, 2), 'utf8');
    const total = Object.values(report).reduce((s, a) => s + a.length, 0);
    console.log(`✓ TS:   ${total} hardcoded strings in ${Object.keys(report).length} files → ${OUT_TS}`);
}

// ── Run ──────────────────────────────────────────────────────────────────────

scanExml();
scanTs();
