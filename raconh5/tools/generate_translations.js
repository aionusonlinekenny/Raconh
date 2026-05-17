/**
 * Tự động tạo bản dịch cho sections_en.json
 * Dùng pattern matching cho equipment, gems, skills, titles, monsters
 * Run: node generate_translations.js
 */

const fs = require('fs');
const path = require('path');

const CN_FILE = path.join(__dirname, 'sections_cn.json');
const EN_FILE = path.join(__dirname, 'sections_en.json');

const cn = JSON.parse(fs.readFileSync(CN_FILE, 'utf8'));
const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf8'));

// ── Equipment slot suffixes ───────────────────────────────────────────────────

const SLOT = {
    '剑': "Sword", '链': "Necklace", '符': "Talisman",
    '佩': "Pendant", '冠': "Helmet", '袍': "Armor",
    '手': "Gloves", '靴': "Boots",
};

// ── Equipment set names (male) ────────────────────────────────────────────────

const EQUIP_SETS = {
    '君子':     'Gentleman',
    '白鸿':     'White Swan',
    '麒麟':     'Kirin',
    '逍遥':     'Wanderer',
    '天罡':     'Celestial',
    '噬灵':     'Soul Devourer',
    '龙渊':     'Dragon Abyss',
    '镇岳断魂': 'Mountain Breaker',
    '刑天炼狱': 'Infernal',
    '游龙惊涛': 'Dragon Wave',
    '君临天下': 'Supreme',
    '淑女':     'Graceful',
    '落雁':     'Fallen Swan',
    '流芳':     'Everlasting',
    '秋水':     'Autumn Waters',
    '冰清':     'Pure Ice',
    '缥缈':     'Ethereal',
    '霓凰':     'Rainbow Phoenix',
    '雪照倾城': 'Snow City',
    '沧海无心': 'Boundless Ocean',
    '有凤来仪': 'Phoenix Arrival',
    '百鸟朝凰': 'Bird King',
};

function translateEquip(name) {
    for (const [set, eng] of Object.entries(EQUIP_SETS)) {
        for (const [slotCN, slotEN] of Object.entries(SLOT)) {
            if (name === set + slotCN) return `${eng}'s ${slotEN}`;
            if (name === set + slotCN + '+') return `${eng}'s ${slotEN}+`;
        }
    }
    return null;
}

// ── Gem translations ──────────────────────────────────────────────────────────

const GEM_TYPES = {
    '红晶石': 'Ruby',
    '绿宝石': 'Emerald',
    '蓝宝石': 'Sapphire',
    '紫晶石': 'Amethyst',
    '黑曜石': 'Obsidian',
};

function translateGem(name) {
    const m = name.match(/^(.+?)\((\d+)级\)$/);
    if (m) {
        const base = GEM_TYPES[m[1]];
        if (base) return `${base} Lv.${m[2]}`;
    }
    return null;
}

// ── Direct string dictionary ──────────────────────────────────────────────────

const DICT = {
    // Items — materials
    '强化石':         'Enhancement Stone',
    '凤魂液':         'Phoenix Soul Essence',
    '龙魂丹':         'Dragon Soul Pill',
    '防具套装石':     'Defense Set Stone',
    '强化防具套装石': 'Enhanced Defense Set Stone',
    '攻击套装石':     'Attack Set Stone',
    '强化攻击套装石': 'Enhanced Attack Set Stone',
    '改名卡':         'Rename Card',
    '元宝':           'Diamond',
    '银币':           'Silver',
    '绑定元宝':       'Bound Diamond',
    '经验丹':         'EXP Pill',
    '体力丹':         'Stamina Pill',
    '资质丹':         'Aptitude Pill',
    '悟性丹':         'Comprehension Pill',
    // Item descriptions
    '用于提升人物装备的强化等级': 'Used to enhance equipment level',
    '用于提升人物装备的铸魂等级': 'Used to upgrade soul cast level',
    '合成防具套装的必要材料':     'Required material for Defense Set',
    '合成防具强化套装的必要材料': 'Required material for Enhanced Defense Set',
    '合成首饰套装的必要材料':     'Required material for Accessory Set',
    '合成首饰强化套装的必要材料': 'Required material for Enhanced Accessory Set',
    // Gem descriptions
    '可在"锻造-宝石"中镶嵌': 'Can be socketed in Forge → Gems',
    // Titles
    '初露峥嵘': 'Rising Star',
    '第一盟会': 'Top Guild',
    '入室弟子': 'Inner Disciple',
    '谁与争锋': 'Peerless',
    '笑傲江湖': 'Smiling Hero',
    '木秀于林': 'Outstanding',
    '一枝独秀': 'Unrivaled',
    '刀光剑影': 'Blade Dance',
    '孤影傲世': 'Lone Shadow',
    '英勇神武': 'Heroic Warrior',
    '神机百变': 'Master Tactician',
    '丹凤朝阳': 'Phoenix Sun',
    '一骑绝尘': 'Dust Rider',
    '出神入化': 'Grand Master',
    '命格无双': 'Unmatched Fate',
    '电光火石': 'Lightning Flash',
    '流光溢彩': 'Radiant',
    '横扫千军': 'Conqueror',
    '独孤求败': 'Seeking Defeat',
    '登峰造极': 'Pinnacle',
    '惊鸿绝影': 'Fleeting Phantom',
    '超凡出神': 'Transcendent',
    '御龙在天': 'Dragon Rider',
    '测试称号，发送道具测试': 'Title description',
    // Skills — names
    '出生普攻':   'Basic Attack',
    '凌霄剑法':   'Skypierce Sword Art',
    '狂风快剑':   'Gale Sword',
    '雷霆万钧':   'Thunder Clash',
    '碧海潮生':   'Ocean Tide',
    '龙战八荒':   'Dragon Fury',
    '凌烟剑法':   'Lingyan Sword Art',
    '落英神剑':   'Falling Petal Sword',
    '万剑归宗':   'Thousand Swords',
    '北冥神功':   'Northern Abyss Art',
    '增加目标':   'Extra Targets',
    '伤害加成':   'Damage Boost',
    '附加技能':   'Bonus Skill',
    // Skills — common description fragments
    '增加攻击目标': 'Increases attack targets to',
    '增加技能伤害': 'Increases skill damage by',
    // Monsters
    '测试怪1':      'Test Monster',
    '璇玑密探':     'Xuanji Spy',
    '白衣剑客':     'White-robed Swordsman',
    '荒原狼':       'Wild Wolf',
    '蒙面刺客':     'Masked Assassin',
    '大肚守军':     'Fat Guard',
    '琅琊阁弟子':   'Langya Disciple',
    '启竹溪守军':   'Qizhu Creek Guard',
    '屠刀刺客':     'Blade Assassin',
    '黑衣刺客':     'Black-robed Assassin',
    '大同叛军':     'Datong Rebel',
    '暗夜刺客':     'Night Assassin',
    '禁军':         'Imperial Guard',
    '曹少钦':       'Cao Shaoqin',
    '精英禁军':     'Elite Imperial Guard',
    '禁军统领':     'Guard Captain',
    '守城将军':     'Castle General',
    // Buffs — visible names
    '眩晕':     'Stun',
    '冰冻':     'Freeze',
    '中毒':     'Poison',
    '燃烧':     'Burn',
    '减速':     'Slow',
    '沉默':     'Silence',
    '嘲讽':     'Taunt',
    '无敌':     'Invincible',
    '必定暴击': 'Guaranteed Crit',
    '免伤加成': 'Damage Reduction',
    // Attributes
    '气血': 'HP',
    '攻击': 'Attack',
    '防御': 'Defense',
    '破甲': 'Armor Break',
    '命中': 'Hit Rate',
    '闪避': 'Evasion',
    '暴击': 'Crit Rate',
    '坚韧': 'Tenacity',
    '生命': 'HP',
    '经验': 'EXP',
    '移动': 'Move Speed',
    // Misc
    '已领取': 'Claimed',
    '未开启': 'Locked',
    '活动未开启': 'Event not available',
    '盟会战': 'Guild War',
};

// ── Skill description pattern translator ──────────────────────────────────────

function translateSkillDesc(s) {
    // Pattern: 对(前方|附近)<font ..>N个</font>目标造成<font ..>X%+{0}</font>的伤害
    let t = s;
    t = t.replace(/对前方/, 'Deals damage to ')
         .replace(/对附近/, 'Deals damage to nearby ')
         .replace(/个<\/font>目标造成/, ' </font>targets for ')
         .replace(/的伤害$/, '');
    if (t !== s) return t;
    // Pattern: 增加攻击目标<font ..>N个</font>
    t = s.replace(/增加攻击目标/, 'Increases targets to ').replace(/个$/, '').replace(/<\/font>个/, '</font>');
    if (t !== s) return t;
    // Pattern: 增加技能伤害<font ..>X%</font>
    t = s.replace(/增加技能伤害/, 'Increases skill damage by ');
    if (t !== s) return t;
    return null;
}

// ── Main translation function ─────────────────────────────────────────────────

function translate(key, text) {
    // 1. Direct dictionary
    if (DICT[text]) return DICT[text];
    // 2. Equipment name
    const eq = translateEquip(text);
    if (eq) return eq;
    // 3. Gem name
    const gem = translateGem(text);
    if (gem) return gem;
    // 4. Skill description
    const skill = translateSkillDesc(text);
    if (skill) return skill;
    // 5. Gem stat description (攻击<font>+N</font> etc)
    if (/^(攻击|气血|防御|战力)<font/.test(text)) {
        return text.replace('攻击', 'ATK').replace('气血', 'HP').replace('防御', 'DEF').replace('战力', 'PWR');
    }
    return null; // untranslated — keep original
}

// ── Apply translations ────────────────────────────────────────────────────────

let translated = 0;
let skipped = 0;

for (const key of Object.keys(cn)) {
    const original = cn[key];
    const result = translate(key, original);
    if (result && result !== original) {
        en[key] = result;
        translated++;
    } else {
        skipped++;
    }
}

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2), 'utf8');
console.log(`✓ Translated: ${translated} strings`);
console.log(`  Skipped (untranslated): ${skipped}`);
console.log(`  Total: ${translated + skipped}`);
console.log(`→ ${EN_FILE}`);
console.log('Now run: node translate_sections.js repack');
