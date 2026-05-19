#!/usr/bin/env python3
"""
Apply all translations from cw_translations.json to cw.txt binary.
Restores from .original first, then applies all entries.
"""
import struct, json, shutil, os, sys

CW_PATH = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302/resource/res/cw.txt'
JSON_PATH = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302/cw_translations.json'
ORIG_PATH = CW_PATH + '.original'

def parse_outer(data):
    """Parse top-level sections: [1B count][{2B nameLen, name, 4B dataLen, data}*]"""
    idx = 0
    count = data[idx]; idx += 1
    sections = []
    for _ in range(count):
        nlen = struct.unpack_from('>H', data, idx)[0]; idx += 2
        name = data[idx:idx+nlen].decode('utf-8', errors='replace'); idx += nlen
        dlen = struct.unpack_from('>I', data, idx)[0]; idx += 4
        sec_bytes = data[idx:idx+dlen]; idx += dlen
        sections.append((name, bytearray(sec_bytes)))
    return sections

def build_outer(sections):
    parts = [bytes([len(sections)])]
    for name, sec_bytes in sections:
        nb = name.encode('utf-8')
        parts.append(struct.pack('>H', len(nb)))
        parts.append(nb)
        parts.append(struct.pack('>I', len(sec_bytes)))
        parts.append(bytes(sec_bytes))
    return b''.join(parts)

def apply_offset_translations(sec_bytes, by_offset):
    """Apply translations at specific byte offsets (sorted, non-overlapping)."""
    if not by_offset:
        return bytes(sec_bytes)
    items = sorted(by_offset.items())
    chunks = []
    cursor = 0
    buf = bytes(sec_bytes)
    applied = 0
    skipped = 0
    for offset, (cn, en) in items:
        cn_b = cn.encode('utf-8')
        en_b = en.encode('utf-8')
        if offset < cursor:
            skipped += 1
            continue
        if offset + 2 + len(cn_b) > len(buf):
            skipped += 1
            continue
        stored_len = struct.unpack_from('>H', buf, offset)[0]
        if stored_len != len(cn_b):
            skipped += 1
            continue
        try:
            stored_str = buf[offset+2:offset+2+len(cn_b)].decode('utf-8')
        except UnicodeDecodeError:
            skipped += 1
            continue
        if stored_str != cn:
            skipped += 1
            continue
        chunks.append(buf[cursor:offset])
        chunks.append(struct.pack('>H', len(en_b)))
        chunks.append(en_b)
        cursor = offset + 2 + len(cn_b)
        applied += 1
    chunks.append(buf[cursor:])
    return b''.join(chunks), applied, skipped

def read_utf(buf, pos):
    """Read 2-byte BE length-prefixed UTF-8 string."""
    length = struct.unpack_from('>H', buf, pos)[0]
    pos += 2
    s = buf[pos:pos+length].decode('utf-8', errors='replace')
    return s, pos + length

def write_utf(s):
    """Write 2-byte BE length-prefixed UTF-8 string."""
    b = s.encode('utf-8')
    return struct.pack('>H', len(b)) + b

def apply_language_section(sec_bytes, lang_translations):
    """
    Language section format:
    [1B tableCount][{2B nameLen, name, 2B entryCount, (2B id, 2B valLen, val)*}*]
    """
    buf = bytes(sec_bytes)
    pos = 0
    table_count = buf[pos]; pos += 1
    out = bytes([table_count])
    total_applied = 0

    for _ in range(table_count):
        tname, pos = read_utf(buf, pos)
        entry_count = struct.unpack_from('>H', buf, pos)[0]; pos += 2

        table_out = write_utf(tname)
        table_out += struct.pack('>H', entry_count)

        for _ in range(entry_count):
            eid = struct.unpack_from('>H', buf, pos)[0]; pos += 2
            val, pos = read_utf(buf, pos)

            key = f'lang|{tname}|{eid}'
            if key in lang_translations and lang_translations[key].get('en'):
                en = lang_translations[key]['en']
                table_out += struct.pack('>H', eid)
                table_out += write_utf(en)
                total_applied += 1
            else:
                table_out += struct.pack('>H', eid)
                table_out += write_utf(val)

        out += table_out

    return out, total_applied

def main():
    # Load translations
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        translations = json.load(f)
    print(f'Loaded {len(translations)} translation entries')

    # Restore from original
    if not os.path.exists(ORIG_PATH):
        print(f'ERROR: Original backup not found at {ORIG_PATH}')
        sys.exit(1)
    shutil.copy2(ORIG_PATH, CW_PATH)
    print(f'Restored from {ORIG_PATH}')

    with open(CW_PATH, 'rb') as f:
        data = f.read()
    print(f'Original size: {len(data):,} bytes')

    sections = parse_outer(data)
    print(f'Parsed {len(sections)} sections')

    # Bucket translations by section
    lang_trans = {}   # key -> entry
    offset_trans = {}  # sectionName -> {offset -> (cn, en)}

    for key, entry in translations.items():
        if not isinstance(entry, dict) or not entry.get('en'):
            continue
        cn = entry.get('cn', '')
        en = entry['en']
        if cn == en:
            continue  # skip no-op translations

        sec = entry.get('section', '')
        if sec == 'language':
            lang_trans[key] = entry
        elif entry.get('offset') is not None:
            sname = entry.get('section') or key.split('|')[0]
            if sname not in offset_trans:
                offset_trans[sname] = {}
            offset_trans[sname][entry['offset']] = (cn, en)

    print(f'Language entries: {len(lang_trans)}')
    print(f'Offset-based sections: {len(offset_trans)}, total entries: {sum(len(v) for v in offset_trans.values())}')

    new_sections = []
    total_applied = 0

    for name, sec_bytes in sections:
        if name == 'language':
            new_sec, applied = apply_language_section(sec_bytes, lang_trans)
            print(f'  language: applied {applied} entries')
            total_applied += applied
        elif name in offset_trans:
            new_sec, applied, skipped = apply_offset_translations(sec_bytes, offset_trans[name])
            print(f'  {name}: applied {applied}, skipped {skipped}')
            total_applied += applied
        else:
            new_sec = bytes(sec_bytes)

        new_sections.append((name, new_sec))

    new_data = build_outer(new_sections)
    print(f'New size: {len(new_data):,} bytes')
    print(f'Total applied: {total_applied}')

    with open(CW_PATH, 'wb') as f:
        f.write(new_data)
    print(f'Written: {CW_PATH}')

if __name__ == '__main__':
    main()
