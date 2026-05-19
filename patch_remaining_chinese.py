#!/usr/bin/env python3
"""
Scan .original cw.txt for remaining Chinese strings and apply translations
using actual offsets found in the original (already-partially-translated) file.
"""
import struct, re, json, shutil, os

CW_PATH = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302/resource/res/cw.txt'
ORIG_PATH = CW_PATH + '.original'

# Comprehensive translation map for remaining Chinese strings
TRANS = {
    # Gem descriptions prefix
    '可在”锻造-宝石”中镶嵌': 'Can be inlaid in “Forge-Gems”',
    # Item names
    '强化石': 'Enh Stone',
    '用于提升人物装备的强化等级': 'Used to upgrade equipment enhancement level',
    '强化防具套装石': 'DEF Set Enh Stone',
    '合成防具强化套装的必要材料': 'Required material for crafting DEF set',
    '攻击套装石': 'ATK Set Stone',
    '合成首饰套装的必要材料': 'Required material for crafting jewelry set',
    '改名卡': 'Rename Card',
    '用于人物改名': 'Used to rename your character',
    '演武令牌': 'Arena Token',
    '持有该令牌，可以开启演武场，进入演武场厮杀可获得海量经验': 'Hold this token to open the Arena and gain massive EXP from battles',
    '金玉令牌': 'Gold Vault Token',
    '持有该令牌，可以进入金玉堂，盗取海量银币、元宝': 'Hold this token to enter the Gold Vault and steal massive silver/gems',
    '寻宝符': 'Treasure Talisman',
    '用于寻宝': 'Used for treasure hunting',
    '经脉突破丹': 'Meridian Breakthrough Pill',
    '用于人物经脉突破': 'Used for meridian breakthrough',
    '命玉': 'Fate Gem',
    '用于猎命，获得命格': 'Used for fate hunting to obtain fate patterns',
    '聚元丹': 'Yuan Gathering Pill',
    '用于突破聚元阶段': 'Used to break through Yuan Gathering stage',
    '进阶丹': 'Advancement Pill',
    '聚积天地灵性凝聚而成，长期喂食可使墨宠具有灵性，用于墨宠进阶升星使用': 'Refined from spiritual energy; feed pets to awaken their spirit. Used for pet advancement and star upgrades',
    '使用后可提升墨宠属性加成：\n生命+100\n攻击+20': 'Use to enhance pet attribute bonuses:\nHP+100\nATK+20',
    '悟性丹': 'Comprehension Pill',
    '使用后可提升墨宠属性加成百分比：\n生命+1%\n攻击+1%': 'Use to enhance pet attribute bonus percentages:\nHP+1%\nATK+1%',
    '墨宠技能书': 'Pet Skill Book',
    '使用后可提升墨宠技能等级': 'Use to upgrade pet skill level',
    '上古巨猿': 'Ancient Giant Ape',
    '使用该道具，可召唤让人闻风丧胆的上古巨猿作为你的墨宠': 'Use this item to summon the fearsome Ancient Giant Ape as your pet',
    '翡翠墨玉': 'Jade Ink Stone',
    '雪疥虫': 'Snow Tick',
    '用于角色转生（1转），野外挂机掉落': 'Used for character reincarnation (1st), drops from idle farming',
    '乌金丸': 'Dark Gold Pill',
    '用于角色转生（2转），野外挂机掉落': 'Used for character reincarnation (2nd), drops from idle farming',
    '冰续草': 'Ice Renewal Herb',
    '用于角色转生（3转），野外挂机掉落': 'Used for character reincarnation (3rd), drops from idle farming',
    '冰续丹': 'Ice Renewal Pill',
    '用于角色转生（4转），野外挂机掉落': 'Used for character reincarnation (4th), drops from idle farming',
    '玄铁石': 'Dark Iron Stone',
    '锦缎': 'Brocade',
    '宫廷皇室御用贡品，编制披风必备神品': 'Royal court tribute; essential material for crafting cloaks',
    '九天缎': 'Nine Heavens Silk',
    '宫廷皇室御用贡品，轻柔丝滑，做成服饰深受达官贵人喜爱': 'Royal court tribute; soft silk fabric favored by nobles for clothing',
    '白龙鱼服': 'White Dragon Robe',
    '激活称号': 'Activate Title',
    # Attribute keywords (already in JS hook but adding here for binary)
    '攻击': 'ATK',
    '气血': 'HP',
    '防御': 'DEF',
    '破甲': 'Pen',
    '命中': 'Hit',
    '闪避': 'Eva',
    '暴击': 'Crit',
    '坚韧': 'TEN',
    '战力': 'Power',
    '生命': 'HP',
    # Additional consumables/items
    '银币不足': 'Insufficient silver',
    '元宝不足': 'Insufficient gems',
}

def parse_outer(data):
    idx = 0
    count = data[idx]; idx += 1
    sections = []
    while idx < len(data) and len(sections) < count:
        if idx + 2 > len(data):
            break
        nlen = struct.unpack_from('>H', data, idx)[0]; idx += 2
        if idx + nlen > len(data):
            break
        name = data[idx:idx+nlen].decode('utf-8', errors='replace'); idx += nlen
        if idx + 4 > len(data):
            break
        dlen = struct.unpack_from('>I', data, idx)[0]; idx += 4
        if idx + dlen > len(data):
            break
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

CJK = re.compile(r'[一-鿿㐀-䶿＀-￯]+')
CTRL = re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f]')

def scan_chinese(buf):
    found = []
    i = 0
    while i + 2 <= len(buf):
        try:
            slen = struct.unpack_from('>H', buf, i)[0]
            if 1 <= slen <= 500:
                s = buf[i+2:i+2+slen]
                if len(s) == slen:
                    t = s.decode('utf-8')
                    if CJK.search(t) and not CTRL.search(t):
                        found.append((i, t))
                        i += 2 + slen
                        continue
        except Exception:
            pass
        i += 1
    return found

def apply_section_translations(sec_bytes, trans_map):
    """Scan section for Chinese strings and apply translations."""
    buf = bytes(sec_bytes)
    hits = scan_chinese(buf)
    by_offset = {}
    for offset, text in hits:
        if text in trans_map:
            en = trans_map[text]
            if en != text:
                by_offset[offset] = (text, en)

    if not by_offset:
        return buf, 0

    items = sorted(by_offset.items())
    chunks = []
    cursor = 0
    applied = 0
    for offset, (cn, en) in items:
        cn_b = cn.encode('utf-8')
        en_b = en.encode('utf-8')
        if offset < cursor:
            continue
        chunks.append(buf[cursor:offset])
        chunks.append(struct.pack('>H', len(en_b)))
        chunks.append(en_b)
        cursor = offset + 2 + len(cn_b)
        applied += 1

    chunks.append(buf[cursor:])
    return b''.join(chunks), applied

def main():
    # Load the already-applied cw.txt (result of apply_all_translations.py)
    with open(CW_PATH, 'rb') as f:
        data = f.read()
    print(f'Input size: {len(data):,} bytes')

    sections = parse_outer(data)
    print(f'Parsed {len(sections)} sections')

    new_sections = []
    total_applied = 0

    for name, sec_bytes in sections:
        new_sec, applied = apply_section_translations(sec_bytes, TRANS)
        if applied > 0:
            print(f'  {name}: applied {applied}')
            total_applied += applied
        new_sections.append((name, new_sec))

    print(f'Total additional: {total_applied}')

    new_data = build_outer(new_sections)
    print(f'New size: {len(new_data):,} bytes')

    with open(CW_PATH, 'wb') as f:
        f.write(new_data)
    print(f'Written: {CW_PATH}')

if __name__ == '__main__':
    main()
