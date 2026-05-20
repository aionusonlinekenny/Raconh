#!/usr/bin/env python3
"""
Translate Chinese attribute names in item_data binary section.
Scans readUTF strings and does substring replacement within them.
This makes gem/item descriptions show in English WITHOUT needing the JS hook.
"""
import struct, shutil, os

CW_PATH = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302/resource/res/cw.txt'

# Ordered so longer strings match before shorter overlapping ones
ATTR_SUBS = [
    # Handle partial-translated state from previous run
    ('可在“Forge-Gem”中Inlay', 'Can be inlaid in Forge-Gems'),
    # Original full phrase with Unicode quotes
    ('可在“锻造-宝石”中镶嵌', 'Can be inlaid in Forge-Gems'),
    # Fallback with ASCII quotes
    ('可在"锻造-宝石"中镶嵌', 'Can be inlaid in Forge-Gems'),
    ('气血上限', 'Max HP'),
    ('气血增加', 'HP+'),
    ('攻击增加', 'ATK+'),
    ('防御增加', 'DEF+'),
    ('破甲增加', 'Pen+'),
    ('命中增加', 'Hit+'),
    ('闪避增加', 'Eva+'),
    ('暴击增加', 'Crit+'),
    ('坚韧增加', 'TEN+'),
    ('每5级攻击', 'ATK/5Lv'),
    ('每5级气血', 'HP/5Lv'),
    ('每5级防御', 'DEF/5Lv'),
    ('每5级破甲', 'Pen/5Lv'),
    ('每5级命中', 'Hit/5Lv'),
    ('每5级闪避', 'Eva/5Lv'),
    ('每5级暴击', 'Crt/5Lv'),
    ('每5级坚韧', 'TEN/5Lv'),
    ('激活称号', 'Activate Title'),
    ('气血', 'HP'),
    ('攻击', 'ATK'),
    ('防御', 'DEF'),
    ('破甲', 'Pen'),
    ('命中', 'Hit'),
    ('闪避', 'Eva'),
    ('暴击', 'Crit'),
    ('坚韧', 'TEN'),
    ('战力', 'Power'),
    ('生命', 'HP'),
    ('锻造', 'Forge'),
    ('宝石', 'Gem'),
    ('镶嵌', 'Inlay'),
]

def parse_outer(data):
    idx = 0
    count = data[idx]; idx += 1
    sections = []
    while idx < len(data) and len(sections) < count:
        if idx + 2 > len(data): break
        nlen = struct.unpack_from('>H', data, idx)[0]; idx += 2
        if idx + nlen > len(data): break
        name = data[idx:idx+nlen].decode('utf-8', errors='replace'); idx += nlen
        if idx + 4 > len(data): break
        dlen = struct.unpack_from('>I', data, idx)[0]; idx += 4
        if idx + dlen > len(data): break
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

def translate_strings_in_section(sec_bytes, subs):
    """
    Walk through section bytes. At each position, try to read a readUTF string
    (2-byte BE length + UTF-8 content). If it contains Chinese, apply substring
    replacements and rebuild with updated length. Otherwise advance by 1 byte.
    """
    buf = bytes(sec_bytes)
    result = bytearray()
    i = 0
    applied = 0

    while i < len(buf):
        if i + 2 > len(buf):
            result.append(buf[i])
            i += 1
            continue

        slen = struct.unpack_from('>H', buf, i)[0]

        if slen < 3 or slen > 2000 or i + 2 + slen > len(buf):
            result.append(buf[i])
            i += 1
            continue

        s = buf[i+2:i+2+slen]
        try:
            text = s.decode('utf-8')
        except UnicodeDecodeError:
            result.append(buf[i])
            i += 1
            continue

        # Only process strings that contain Chinese
        if not any('一' <= c <= '鿿' for c in text):
            result.append(buf[i])
            i += 1
            continue

        # Apply substring replacements
        new_text = text
        for cn, en in subs:
            if cn in new_text:
                new_text = new_text.replace(cn, en)

        if new_text != text:
            new_bytes = new_text.encode('utf-8')
            result.extend(struct.pack('>H', len(new_bytes)))
            result.extend(new_bytes)
            i += 2 + slen
            applied += 1
        else:
            result.append(buf[i])
            i += 1

    return bytes(result), applied

def main():
    with open(CW_PATH, 'rb') as f:
        data = f.read()
    print(f'Input size: {len(data):,} bytes')

    sections = parse_outer(data)
    print(f'Parsed {len(sections)} sections')

    # Target sections that have pre-formatted Chinese strings
    TARGET_SECTIONS = {'item_data', 'text_data', 'task_data', 'dungeon_data',
                       'scene_data', 'mon_data', 'meridian_data', 'skill_data'}

    new_sections = []
    total_applied = 0

    for name, sec_bytes in sections:
        if name in TARGET_SECTIONS:
            new_sec, applied = translate_strings_in_section(bytes(sec_bytes), ATTR_SUBS)
            if applied > 0:
                print(f'  {name}: applied {applied} substring translations')
                total_applied += applied
            else:
                new_sec = bytes(sec_bytes)
        else:
            new_sec = bytes(sec_bytes)
        new_sections.append((name, new_sec))

    print(f'Total: {total_applied}')
    new_data = build_outer(new_sections)
    print(f'New size: {len(new_data):,} bytes')

    with open(CW_PATH, 'wb') as f:
        f.write(new_data)
    print(f'Written: {CW_PATH}')

if __name__ == '__main__':
    main()
