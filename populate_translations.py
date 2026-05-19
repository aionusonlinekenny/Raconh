#!/usr/bin/env python3
"""
populate_translations.py

Reads cw.txt (original/backup), extracts ALL Chinese strings, applies
translations from multiple sources, and saves cw_translations.json in
PHP admin format: {key: {cn, en, section, ...}}
"""

import struct, re, os, json, sys

BASE = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302'
TOOLS = '/home/user/Raconh/raconh5/tools'
CW_PATH = f'{BASE}/resource/res/cw.txt'
OUTPUT_PATH = f'{BASE}/cw_translations.json'

# ── Import TRANSLATIONS dict from translate_cw.py ──────────────────────────────
sys.path.insert(0, '/home/user/Raconh')
from translate_cw import TRANSLATIONS as LANG_TRANSLATIONS

# ── CJK detection ──────────────────────────────────────────────────────────────
CJK = re.compile(r'[一-鿿㐀-䶿]')

def has_chinese(s):
    return bool(CJK.search(s))

# ── Comprehensive CN_TO_EN dictionary ─────────────────────────────────────────
CN_TO_EN = {
    # scene_data
    '七宿山': 'Seven Stars Mountain',
    '乾陵魔窟': 'Qianling Demon Cave',
    '守城神将': 'City Defense General',
    '山海阁': 'Mountain Sea Pavilion',
    '江湖风云': 'Wulin Turbulence',
    '滑索剧情起跳1': 'Zipline Story Launch 1',
    '滑索剧情起跳2': 'Zipline Story Launch 2',
    '爬塔副本': 'Tower Dungeon',
    '爬塔副本2': 'Tower Dungeon 2',
    '玉门关': 'Jade Gate Pass',
    '皇城对战': 'Imperial City PvP',
    '皇城战': 'Imperial City War',
    '经验副本': 'EXP Dungeon',
    '缥缈录': 'Misty Records',
    '聚元副本': 'Essence Dungeon',
    '论剑台': 'Arena',
    '金陵': 'Jinling',
    '银币副本': 'Silver Dungeon',
    '魔神抢夺': 'Demon God Raid',
    '龙门': 'Dragon Gate',
    '龙门渡': 'Dragon Gate Ferry',
    '副本1': 'Dungeon 1',
    '副本2': 'Dungeon 2',
    '副本3': 'Dungeon 3',
    '副本4': 'Dungeon 4',
    '副本5': 'Dungeon 5',
    '副本6': 'Dungeon 6',
    '副本7': 'Dungeon 7',
    '副本8': 'Dungeon 8',
    '副本9': 'Dungeon 9',
    '副本10': 'Dungeon 10',
    '全民副本': 'World Dungeon',
    '剧情副本2跳跃点': 'Story Dungeon 2 Jump Point',

    # task_data
    '全身强化+3{0}': 'Full Gear Enhancement +3{0}',
    '全身强化+5{0}': 'Full Gear Enhancement +5{0}',
    '再会玉门关{0}': 'Return to Jade Gate{0}',
    '再探山海阁{0}': 'Revisit Mountain Sea{0}',
    '凌云奇遇{0}': 'Cloud Adventure{0}',
    '凌云问道{0}': 'Cloud Path of Dao{0}',
    '凌烟问道{0}': 'Lingyan Path of Dao{0}',
    '凌烟阁寻宝{0}': 'Lingyan Hall Treasure Hunt{0}',
    '初探缥缈录{0}': 'First Visit to Misty Records{0}',
    '初试身手{0}': 'First Test of Skills{0}',
    '刺探敌情{0}': 'Enemy Reconnaissance{0}',
    '前线补给': 'Frontline Supply',
    '加入一个盟会{0}': 'Join a Guild{0}',
    '势如水火': 'Fire and Water',
    '升到30级{0}': 'Reach Level 30{0}',
    '升到60级{0}': 'Reach Level 60{0}',
    '升到70级{0}': 'Reach Level 70{0}',
    '升到80级{0}': 'Reach Level 80{0}',
    '升级一次技能{0}': 'Level Up a Skill{0}',
    '危机重重{0}': 'Crisis Deepens{0}',
    '及时赶到': 'Arrive in Time',
    '墨宠现世': 'Pet Awakening',
    '墨宠等级达到2阶{0}': 'Pet Reaches Tier 2{0}',
    '夜探孤影楼{0}': 'Night Recon of Lone Shadow Tower{0}',
    '夜探深宫{0}': 'Night Infiltration of Deep Palace{0}',
    '夺取神器碎片{0}': 'Capture Artifact Fragment{0}',
    '夺回神器': 'Reclaim the Artifact',
    '孤声飘影{0}': 'Lonely Echo{0}',
    '学成下山{0}': 'Descend After Training{0}',
    '宋浮反水': "Song Fu's Betrayal",
    '寻找神器': 'Search for the Artifact',
    '山海问道{0}': 'Mountain Sea Path of Dao{0}',
    '师兄弟切磋{0}': 'Sparring with Disciples{0}',
    '引导一次盟会试炼{0}': 'Guide a Guild Trial{0}',
    '强化一次装备{0}': 'Enhance an Item{0}',
    '战力达到12000{0}': 'Reach 12,000 Power{0}',
    '战力达到25000{0}': 'Reach 25,000 Power{0}',
    '战力达到35000{0}': 'Reach 35,000 Power{0}',
    '战力达到50000{0}': 'Reach 50,000 Power{0}',
    '战力达到5000{0}': 'Reach 5,000 Power{0}',
    '扑朔迷离{0}': 'Bewildering Mystery{0}',
    '扶风医堂': 'Fufeng Medical Hall',
    '技能总等级150{0}': 'Total Skill Level 150{0}',
    '技能总等级240{0}': 'Total Skill Level 240{0}',
    '挑战个人BOSS{0}': 'Challenge Solo BOSS{0}',
    '无双神兵': 'Peerless Divine Weapon',
    '水落石出': 'Truth Revealed',
    '江湖势力{0}': 'Wulin Factions{0}',
    '江湖秘闻{0}': 'Wulin Secrets{0}',
    '沉船迷案': 'Shipwreck Mystery',
    '河堤查案{0}': 'River Embankment Investigation{0}',
    '浴血抗敌{0}': 'Bloody Resistance{0}',
    '深陷重围{0}': 'Surrounded{0}',
    '激活一本绝学{0}': 'Activate a Skill Tome{0}',
    '激活墨宠{0}': 'Activate Pet{0}',
    '激活墨宠碎片{0}': 'Activate Pet Fragment{0}',
    '激活神器碎片{0}': 'Activate Artifact Fragment{0}',
    '熔炼一次装备{0}': 'Smelt an Item{0}',
    '独孤试炼{0}': 'Dugu Trial{0}',
    '独闯决神殿{0}': 'Alone in the Divine Hall{0}',
    '穿戴装备{0}': 'Equip Gear{0}',
    '神器传闻{0}': 'Artifact Legend{0}',
    '英雄试炼': 'Hero Trial',
    '小试牛刀{0}': 'Test the Waters{0}',
    '面对强敌{0}': 'Face Strong Foes{0}',
    '突飞猛进{0}': 'Rapid Progress{0}',
    '从容应对{0}': 'Handle Calmly{0}',
    '黑夜降临{0}': 'Darkness Falls{0}',
    '声名鹊起{0}': 'Rising Fame{0}',
    '进阶墨宠{0}': 'Advance Pet{0}',

    # mon_data
    '修罗': 'Asura',
    '千绵': 'Qianmian',
    '圣灵': 'Holy Spirit',
    '天机': 'Heavenly Plan',
    '宗越': 'Zong Yue',
    '寻亦': 'Xun Yi',
    '岩灵傀儡': 'Stone Golem',
    '岩魂': 'Stone Soul',
    '御皇神': 'Imperial God',
    '擎天': 'Sky Pillar',
    '攻城勇士': 'Siege Warrior',
    '攻城援军': 'Siege Reinforcements',
    '文武化身': 'Wen-Wu Avatar',
    '文神雕像': 'Civil God Statue',
    '昊阳': 'Hao Yang',
    '武神雕像': 'War God Statue',
    '海岩傀儡': 'Sea Rock Golem',
    '潮汐将魂': 'Tidal General Soul',
    '炎火妖姬': 'Flame Demoness',
    '炎魂': 'Flame Soul',
    '炼狱将魂': 'Purgatory General Soul',
    '烟杀': 'Smoke Slayer',
    '狂狮': 'Mad Lion',
    '玄武': 'Black Tortoise',
    '玄策': 'Xuan Ce',
    '玉衡': 'Yu Heng',
    '盟会守军': 'Guild Troops',
    '盟会守卫': 'Guild Guard',
    '缥缈录小怪': 'Misty Records Mob',
    '蒙烈': 'Meng Lie',
    '蓝月': 'Blue Moon',
    '血影': 'Blood Shadow',
    '邪妖天师': 'Evil Demon Master',
    '释羽': 'Shi Yu',
    '铁成': 'Tie Cheng',
    '雷动': 'Thunder Strike',
    '魔化修罗': 'Corrupted Asura',
    '墨羽': 'Mo Yu',

    # dungeon place names
    '丹鼎塔': 'Elixir Cauldron Tower',
    '九宫寺': 'Nine Palace Temple',
    '云烟旗': 'Cloud Mist Banner',
    '云烟舍': 'Cloud Mist House',
    '元阳殿': 'Yuan Yang Hall',
    '兽皇岛': 'Beast Emperor Island',
    '凤王榭': 'Phoenix King Pavilion',
    '同悲祠': 'Shared Sorrow Shrine',
    '天仙刹': 'Celestial Temple',
    '天罗峰': 'Heaven Net Peak',
    '天问亭': 'Sky Question Pavilion',
    '掩月楼': 'Veil Moon Tower',
    '无双坞': 'Peerless Fort',
    '无定城': 'Wandering City',
    '昇阳谷': 'Rising Sun Valley',
    '朱雀庵': 'Vermilion Bird Hermitage',
    '极乐谷': 'Bliss Valley',
    '极寒村': 'Frozen Village',
    '森罗教': 'Forest Order Cult',
    '涅槃盟': 'Nirvana League',
    '火狐谷': 'Fire Fox Valley',
    '焚月帮': 'Moon Burn Gang',
    '焚魂界': 'Soul Burn Realm',
    '玄云涯': 'Dark Cloud Cliff',
    '玄雾楼': 'Dark Mist Tower',
    '真武殿': 'Zhenwu Hall',
    '碧炎宇': 'Blue Flame Palace',
    '离火楼': 'Separation Fire Tower',
    '穿云寺': 'Cloud Piercing Temple',
    '紫凰轩': 'Purple Phoenix Pavilion',
    '紫微派': 'Purple Star Sect',
    '紫霄刹': 'Purple Heavens Temple',
    '苍羽楼': 'Azure Wing Tower',
    '蚀日盟': 'Eclipse League',
    '赤月观': 'Red Moon Observatory',
    '赤焰涯': 'Red Flame Cliff',
    '邪月坊': 'Evil Moon Quarter',
    '银羽阙': 'Silver Wing Palace',
    '阿兰若': 'Aranya Hermitage',
    '陨日亭': 'Fallen Sun Pavilion',
    '雷鸣阙': 'Thunder Roar Palace',
    '飞花堂': 'Flying Flower Hall',
    '龙吟崖': 'Dragon Cry Cliff',
    '经验、装备': 'EXP & Gear',
    '聚元': 'Yuan Gathering',
    '装备、宝石': 'Gear & Gems',
    '主线副本': 'Story Dungeon',
    '缥缈录副本': 'Misty Records Dungeon',
    '个人BOSS': 'Solo BOSS',

    # pet_data
    '上古巨猿': 'Ancient Gorilla',
    '墨宠小Q': 'Pet Q',
    '异火魔灵': 'Demon Fire Spirit',
    '无心刺客': 'Heartless Assassin',
    '熔岩巨兽': 'Lava Giant',
    '猎空': 'Sky Hunter',
    '蚩尤战车': 'Chi You War Chariot',
    '钢铁之心': 'Iron Heart',
    '铠甲龙龟': 'Armored Dragon Turtle',

    # skill_data
    '50%概率立即清除技能冷却时间': '50% chance to reset skill cooldown',
    '不灭': 'Immortal',
    '宠物普攻': 'Pet Basic Attack',
    '宠物群攻': 'Pet AoE Attack',
    '无视冷却': 'Ignore Cooldown',
    '无视防御': 'Ignore Defense',
    '虚弱': 'Weakness',
    '闪避反伤': 'Dodge Retaliation',
    '附加中毒': 'Add Poison',
    '附加冰冻': 'Add Freeze',
    '附加沉默': 'Add Silence',
    '附加眩晕': 'Add Stun',
    '使用技能一定概率使主目标中毒，使主目标每秒掉血%，持续*秒': 'Skill: X% chance to poison target, draining X% HP/sec for Xs',
    '使用技能一定概率使主目标冰冻': 'Skill: X% chance to freeze target',
    '使用技能一定概率使主目标沉默，目标只能使用普攻，持续*秒': 'Skill: X% chance to silence target (basic attack only) for Xs',
    '使用技能一定概率使主目标眩晕': 'Skill: X% chance to stun target',
    '使用技能一定概率使主目标防御降低%，持续*秒，冷却*秒': 'Skill: X% chance to reduce target DEF by X% for Xs (cd: Xs)',
    '使用技能一定概率使自身回复血量%': 'Skill: X% chance to restore X% HP',
    '持续*秒免伤%，冷却*秒': 'Reduce DMG by X% for Xs (cd: Xs)',
    '自身暴击时触发，暴击率100%，持续*秒，冷却时间*秒': 'On own crit: +100% Crit Rate for Xs (cd: Xs)',
    '自身闪避时触发，伤害提升50%，持续*秒，冷却时间*秒': 'On own dodge: +50% DMG for Xs (cd: Xs)',

    # item_data
    '一万银票': '10,000 Silver Note',
    '七星龙渊': 'Seven Star Dragon Abyss',
    '万剑·中毒': 'Ten Thousand Swords - Poison',
    '万剑·反伤': 'Ten Thousand Swords - Retaliate',
    '万剑·群攻': 'Ten Thousand Swords - AoE',
    '万剑·速攻': 'Ten Thousand Swords - Swift',
    '万里飞沙': 'Ten-thousand Li Sandstorm',
    '中经验丹': 'Medium EXP Pill',
    '乌金丸': 'Black Gold Pill',
    '九天缎': 'Nine Heavens Silk',
    '九州帝皇': 'Nine Provinces Emperor',
    '九阴真经': 'Nine Yin Manual',
    '互动礼包': 'Interaction Gift Pack',
    '传功厚礼': 'Training Gift',
    '传说绝学箱': 'Legendary Skill Tome Box',
    '使用可获得1000元宝': 'Use to get 1000 Gems',
    '侠骨多情': 'Chivalrous Heart',
    '凌波微步': 'Lingbo Steps',
    '凤魂液': 'Phoenix Soul Essence',
    '冬雪宝盒': 'Winter Snow Treasure Box',
    '初级经验丹': 'Beginner EXP Pill',
    '初级资质丹': 'Beginner Aptitude Pill',
    '冰晶棍': 'Ice Crystal Staff',
    '冰晶弓': 'Ice Crystal Bow',
    '分解石': 'Dismantle Stone',
    '功法残卷': 'Skill Fragment Scroll',
    '功法宝箱': 'Skill Tome Box',
    '双倍经验宝盒': 'Double EXP Treasure Box',
    '双倍经验符': 'Double EXP Talisman',
    '古代刀': 'Ancient Blade',
    '古代剑': 'Ancient Sword',
    '召唤石': 'Summon Stone',
    '发现宝贝': 'Discovery Treasure',
    '大型经验丹': 'Large EXP Pill',
    '大经验丹': 'Large EXP Pill (Giant)',
    '套装石': 'Set Stone',
    '宝石合成器': 'Gem Synthesizer',
    '宝石精华': 'Gem Essence',
    '宝石鉴别师': 'Gem Appraiser',
    '宠物进阶丹': 'Pet Advancement Pill',
    '宠物合成秘卷': 'Pet Fusion Manual',
    '小型经验丹': 'Small EXP Pill',
    '小经验丹': 'Small EXP Pill (Mini)',
    '山盟海誓': 'Eternal Vow',
    '带绑定元宝礼包': 'Bound Gem Gift Pack',
    '常用装备礼包': 'Common Gear Gift Pack',
    '幻灵锁链': 'Phantom Soul Chain',
    '强化石': 'Enhancement Stone',
    '强化至3': 'Enhance to +3',
    '强化至5': 'Enhance to +5',
    '心法集': 'Technique Collection',
    '心法残卷': 'Technique Fragment',
    '攻击套装石': 'ATK Set Stone',
    '攻击套装礼包': 'ATK Set Gift Pack',
    '普通刀': 'Normal Blade',
    '普通剑': 'Normal Sword',
    '月魂液': 'Moon Soul Essence',
    '月魄液': 'Moon Spirit Essence',
    '月魂石': 'Moon Soul Stone',
    '月魄石': 'Moon Spirit Stone',
    '木剑': 'Wooden Sword',
    '木刀': 'Wooden Blade',
    '材料礼包': 'Material Gift Pack',
    '武魂石': 'Battle Soul Stone',
    '武魂液': 'Battle Soul Essence',
    '每日签到礼包': 'Daily Check-in Gift',
    '活跃度礼包': 'Activity Gift Pack',
    '活跃度箱': 'Activity Chest',
    '炎雀弓': 'Flame Sparrow Bow',
    '灵石': 'Spirit Stone',
    '灵玉': 'Spirit Jade',
    '灵宠碎片': 'Sprite Fragment',
    '炼化石': 'Refinement Stone',
    '炼心丹': 'Heart Refinement Pill',
    '熔炼石': 'Smelting Stone',
    '玉佩': 'Jade Pendant',
    '玉璧': 'Jade Disc',
    '玄铁棍': 'Dark Iron Staff',
    '玄铁弓': 'Dark Iron Bow',
    '玄铁剑': 'Dark Iron Sword',
    '玄铁刀': 'Dark Iron Blade',
    '甲铠': 'Iron Armor',
    '白马啸西风': 'White Horse West Wind',
    '白骨鞭': 'Bone Whip',
    '盟会令牌': 'Guild Token',
    '盟会经验礼包': 'Guild EXP Gift',
    '盟会贡献礼包': 'Guild Contribution Gift',
    '盟会邮件': 'Guild Mail',
    '神器碎片': 'Artifact Fragment',
    '礼品袋': 'Gift Bag',
    '精英装备礼包': 'Elite Gear Gift Pack',
    '绝学秘籍': 'Skill Secret Manual',
    '翡翠刀': 'Jade Blade',
    '翡翠剑': 'Jade Sword',
    '翡翠棍': 'Jade Staff',
    '翡翠弓': 'Jade Bow',
    '翡翠铠甲': 'Jade Armor',
    '翡翠甲': 'Jade Plate Armor',
    '职业限定礼包': 'Class-Limited Gift Pack',
    '茅草刀': 'Straw Blade',
    '茅草剑': 'Straw Sword',
    '葫芦': 'Gourd',
    '蓝冥石(1级)': 'Sapphire Lv.1',
    '蓝冥石(2级)': 'Sapphire Lv.2',
    '蓝冥石(3级)': 'Sapphire Lv.3',
    '蓝冥石(4级)': 'Sapphire Lv.4',
    '蓝冥石(5级)': 'Sapphire Lv.5',
    '蓝冥石(6级)': 'Sapphire Lv.6',
    '蓝冥石(7级)': 'Sapphire Lv.7',
    '蓝冥石(8级)': 'Sapphire Lv.8',
    '蓝冥石(9级)': 'Sapphire Lv.9',
    '蓝冥石(10级)': 'Sapphire Lv.10',
    '血月宝盒': 'Blood Moon Treasure Box',
    '装备合成图': 'Gear Craft Blueprint',
    '装备鉴定书': 'Gear Identification Scroll',
    '装备鉴别师': 'Gear Appraiser',
    '补给箱': 'Supply Box',
    '誓约之戒': 'Vow Ring',
    '誓约之链': 'Vow Chain',
    '誓约之缘': 'Vow Bond',
    '赤月铠甲': 'Red Moon Armor',
    '赤月甲': 'Red Moon Plate',
    '赤月刀': 'Red Moon Blade',
    '赤月剑': 'Red Moon Sword',
    '赤月棍': 'Red Moon Staff',
    '赤月弓': 'Red Moon Bow',
    '赤血丸': 'Blood Crimson Pill',
    '赤血符': 'Blood Crimson Talisman',
    '进阶令': 'Advancement Token',
    '道具合成': 'Item Craft',
    '道具合成图': 'Item Craft Blueprint',
    '通用材料包': 'General Material Pack',
    '通用礼包': 'General Gift Pack',
    '金刀': 'Golden Blade',
    '金剑': 'Golden Sword',
    '金棍': 'Golden Staff',
    '金弓': 'Golden Bow',
    '金甲': 'Golden Armor',
    '银票': 'Silver Note',
    '银铠': 'Silver Armor',
    '银月宝盒': 'Silver Moon Treasure Box',
    '铁刀': 'Iron Blade',
    '铁剑': 'Iron Sword',
    '铁棍': 'Iron Staff',
    '铁弓': 'Iron Bow',
    '铁甲': 'Iron Armor',
    '镶嵌礼包': 'Inlay Gift Pack',
    '锋芒刀': 'Sharp Edge Blade',
    '锻造材料': 'Forging Material',
    '防御套装石': 'DEF Set Stone',
    '雷霆之怒': 'Thunder Rage',
    '飞剑': 'Flying Sword',
    '飞刀': 'Flying Blade',
    '高级刀': 'Superior Blade',
    '高级剑': 'Superior Sword',
    '高级棍': 'Superior Staff',
    '高级弓': 'Superior Bow',
    '高级经验丹': 'Advanced EXP Pill',
    '高级资质丹': 'Advanced Aptitude Pill',
    '鬼影弓': 'Ghost Shadow Bow',
    '魔剑': 'Demon Sword',
    '魔龙斩': 'Demon Dragon Slash',
    '黄金铠甲': 'Golden Armor',
    '黑剑': 'Black Sword',
    '龙纹铠甲': 'Dragon Scale Armor',

    # npc_data
    '云痕': 'Yun Hen',
    '大风': 'Da Feng',
    '战北野': 'Zhan Beiye',
    '沈万山': 'Shen Wanshan',
    '神秘墨宠': 'Mystery Pet',
    '花满堂': 'Hua Mantang',
    '邱莫言': 'Qiu Moyan',
    '长孙无极': 'Changsun Wuji',

    # attr_power_data
    '伤害减免': 'DMG Reduction',
    '伤害加深': 'DMG Amplify',
    '暴击加成': 'Crit Bonus',
    '经验加成': 'EXP Bonus',
    '闪避几率': 'Dodge Rate',

    # activity_data
    '参与': 'Participate',
    '消费': 'Spend',
    '进阶': 'Advance',

    # buff_data
    '变元宝': 'Gem Conversion',
    '回血动画': 'HP Recovery Anim',
    '战意': 'Battle Spirit',
    '燃烧遮罩': 'Burn Overlay',
    '爬塔加伤': 'Tower DMG Boost',
    '皇城战闪避': 'Imperial War Dodge',
    '银币加成': 'Silver Bonus',
    '鼓舞': 'Inspire',

    # cloak_data
    '大漠黄沙': 'Desert Sands',
    '白龙鱼服': 'White Dragon Disguise',
    '翠袍金绫': 'Jade Robe',
    '锦墨如烟': 'Ink Silk Mist',

    # sys_notice_data
    '{0}\n一入江湖岁月催': '{0}\nJianghu — where time flies by',
    '{0}\n唐门暗器,例无虚发': '{0}\nTang Clan hidden weapons never miss',
    '升星': 'Star Upgrade',
    '单人BOSS': 'Solo BOSS',
    '套装': 'Set Equipment',
    '暗器': 'Hidden Weapon',
    '珍宝': 'Treasure',
    '珍宝阁': 'Treasure Pavilion',
    '盟会': 'Guild',
    '经脉': 'Meridians',
    '背饰': 'Back Ornament',

    # fashion_data
    '一转获得': 'Obtained at Rebirth 1',
    '三转获得': 'Obtained at Rebirth 3',
    '九州帝王': 'Nine Provinces Emperor',
    '二转获得': 'Obtained at Rebirth 2',
    '四转获得': 'Obtained at Rebirth 4',
    '浪迹天涯': 'Wanderer',
    '瀚海青龙': 'Azure Dragon of the Sea',
    '盟会争霸': 'Guild Championship',

    # guild_data
    '1阶旗主': 'Tier 1 Banner Chief',
    '2阶散人': 'Tier 2 Wanderer',
    '3阶散人': 'Tier 3 Wanderer',
    '5阶散人': 'Tier 5 Wanderer',

    # guild_war_data
    '盟内排50名及以后': 'Guild Rank 50+',
    '盟内排名第 6-10': 'Guild Rank 6-10',
    '盟内排名第11-15': 'Guild Rank 11-15',
    '盟内排名第16-20': 'Guild Rank 16-20',
    '盟内排名第21-30': 'Guild Rank 21-30',
    '盟内排名第31-50': 'Guild Rank 31-50',
    '盟内积分排名第3': 'Guild Points Rank #3',
    '盟内积分排名第4': 'Guild Points Rank #4',
    '盟内积分排名第5': 'Guild Points Rank #5',

    # daily_activity_data
    '每周二四六19:00开启': 'Opens Tue/Thu/Sat at 19:00',
    '每天': 'Daily',

    # vip_data
    '升级VIP可以获得更多特权和奖励': 'Level up VIP for more perks and rewards',
    '| |升级VIP可以获得更多特权和奖励': '| |Level up VIP for more perks and rewards',

    # sys_privilege_data
    '钻石': 'Diamond',
    '黄金': 'Gold',

    # training_data
    '1.5倍传功': 'x1.5 Training',
    '2倍传功': 'x2 Training',
    '普通传功': 'Normal Training',

    # sys_invest_data
    '半月卡': 'Bi-weekly Card',
    '等级投资': 'Level Investment',

    # laird_data
    '上贡': 'Tribute',
    '加料': 'Add Treats',
    '打蜡': 'Polish',
    '打赏': 'Reward',
    '折磨': 'Torment',
    '按摩': 'Massage',
    '逛街': 'Shopping',
    '鞭打': 'Whip',

    # dialog_data
    '七宿山地势险要，东厂密探无处不在，务必小心！': 'Seven Stars Mountain is treacherous — imperial spies lurk everywhere. Be careful!',
    '击杀守护兽，可获得银币加成': 'Defeat the guardian beast to get a Silver bonus!',
    '多谢提醒，风萧萧兮易水寒，下次相见定与兄台不醉不归！': 'Thanks for the warning! "The wind howls, the river runs cold" — next time we meet, we drink till dawn!',
    '如今东厂宦官专权，蒙蔽圣上，残害忠良，以至名不聊生！': 'The Eastern Agency eunuchs have seized power, deceiving the Emperor and persecuting the loyal. Lives are in ruin!',
    '如今东厂宦官专权，蒙蔽圣上，残害忠良，以至民不聊生！今天我就要替天行道！': 'The Eastern Agency eunuchs tyrannize the realm, deceiving the Emperor. Today I act for justice!',
    '宫内皇子争斗不休，小皇子危在旦夕，还请侠士出手，保护小皇子安全逃出皇宫': 'The princes wage endless strife within the palace. The young prince is in danger — help him escape!',
    '据悉圣上会前往七宿山祭祀，东厂会借此机会铲除异己。': 'Word is the Emperor visits Seven Stars Mountain to make offerings. The Agency will use this to eliminate rivals.',
    '提升经验效率可获得更多经验': 'Increase EXP efficiency to earn more EXP!',
    '此番大闹七宿山一定引起朝廷注意，山后那巨大的石雕好像隐藏着什么宝物！速去看看。': 'This commotion at Seven Stars Mountain will alert the court. That giant stone carving behind the peak hides something — go check!',
    '没想到七宿山后竟是如此！': 'Never expected this behind Seven Stars Mountain!',
    '码头处有渔船接应，让墨宠在此挡住追兵~！': 'A fishing boat waits at the dock — have your pet hold off the pursuers!',
    '竟然偷袭本督，不管你跑到天涯海角，都要将你碎尸万段！': 'You dare ambush me?! No matter where you flee, I will tear you to pieces!',
    '还请少侠即刻启程，速速前往七宿山！': 'Please, young hero — depart at once for Seven Stars Mountain!',

    # juexue_data
    '两仪剑法': 'Two Poles Swordplay',
    '乾坤大挪移': 'Heaven-Earth Shift',
    '圣火令神功': 'Sacred Flame Divine Art',
    '大九天手': 'Grand Nine Heavens Palm',
    '太极拳剑': 'Tai Chi Fist and Sword',
    '玉萧剑法': 'Jade Flute Swordplay',
    '碧波掌法': 'Azure Wave Palm',
    '神门十三剑': 'Spirit Gate Thirteen Swords',
    '空明拳': 'Void Clarity Fist',
    '绕指柔剑': 'Finger Wrap Gentle Sword',

    # sharp_eye_data
    '上衣': 'Jacket',
    '令牌': 'Token',
    '八卦': 'Bagua',
    '六边形': 'Hexagon',
    '兵器': 'Weapon',
    '动物图案': 'Animal Pattern',
    '卷轴': 'Scroll',
    '圆的物品': 'Round Item',
    '字母': 'Letter',
    '宝石': 'Gem',
    '帽子': 'Hat',
    '手套': 'Gloves',
    '招财猫': 'Lucky Cat',
    '挂穗': 'Tassel',
    '捣蛋猫': 'Naughty Cat',
    '汉字': 'Chinese Character',
    '液体': 'Liquid',
    '瓶子': 'Bottle',
    '白色物品': 'White Item',
    '盒子': 'Box',
    '紫色物品': 'Purple Item',
    '红色物品': 'Red Item',
    '纸制品': 'Paper Item',
    '绿色物品': 'Green Item',
    '蓝色物品': 'Blue Item',
    '衣物': 'Clothing',
    '钱财': 'Money',
    '鞋子': 'Shoes',
    '饰品': 'Accessory',
    '黑色物品': 'Black Item',

    # dun_exp_data guild ranks
    '供奉': 'Keeper',
    '堂主': 'Hall Master',
    '太尊': 'Grand Master',
    '护法': 'Dharma Protector',
    '旗主': 'Banner Chief',
    '法王': 'Dharma King',
    '舵主': 'Helmsman',
    '长老': 'Elder',
    '散人': 'Wanderer',

    # open_data features
    '世界聊天': 'World Chat',
    '九霄塔': 'Nine Heavens Tower',
    '充值活动': 'Recharge Event',
    '全民BOSS': 'World BOSS',
    '冲榜竞技': 'Rankings Competition',
    '摆摊': 'Stall',
    '斗地主': 'Dou Di Zhu',
    '演武场': 'Training Grounds',
    '神兵': 'Divine Weapon',
    '私聊': 'Private Chat',
    '称号': 'Title',
    '金玉堂': 'Golden Jade Hall',
    '魔神入侵': 'Demon God Invasion',
    '装扮': 'Costume',

    # text_data
    '3v3争霸房间不存在！': '3v3 battle room does not exist!',
    '3v3争霸房间人数已满！': '3v3 battle room is full!',
    '3v3争霸活动正式开启！来不及解释了，快进场！{0}': '3v3 Battle has officially begun! No time to explain — get in there! {0}',
    "<font color='#12fe00'>删除仇人成功</font>": "<font color='#12fe00'>Enemy removed</font>",
    "<font color='#12fe00'>删除好友成功</font>": "<font color='#12fe00'>Friend removed</font>",
    "<font color='#12fe00'>升星成功！</font>": "<font color='#12fe00'>Star upgrade successful!</font>",
    "<font color='#12fe00'>升级成功！</font>": "<font color='#12fe00'>Level up successful!</font>",
    "<font color='#12fe00'>取消拉黑成功</font>": "<font color='#12fe00'>Unblocked successfully</font>",
    "<font color='#12fe00'>成功入队！</font>": "<font color='#12fe00'>Joined team!</font>",
    "<font color='#12fe00'>成功删除二级密码</font>": "<font color='#12fe00'>Secondary password deleted</font>",
    "<font color='#12fe00'>成功发送入队申请，请耐心等待答复！</font>": "<font color='#12fe00'>Team join request sent — please wait for a reply!</font>",
    "<font color='#12fe00'>成功发送组队邀请，请耐心等待答复</font>": "<font color='#12fe00'>Team invite sent — please wait for a reply</font>",
    "<font color='#12fe00'>成功发送邀请好友</font>": "<font color='#12fe00'>Friend invite sent</font>",
    "<font color='#12fe00'>成功解锁二级密码</font>": "<font color='#12fe00'>Secondary password unlocked</font>",
    "<font color='#12fe00'>成功设置二级密码</font>": "<font color='#12fe00'>Secondary password set</font>",
    "<font color='#12fe00'>成长丹使用成功</font>": "<font color='#12fe00'>Growth Pill used successfully</font>",
    "<font color='#12fe00'>祝福值+{0}</font>": "<font color='#12fe00'>Blessing +{0}</font>",
    "<font color='#12fe00'>请求已发送，请等待回应！</font>": "<font color='#12fe00'>Request sent — please wait for a reply!</font>",
    "<font color='#12fe00'>阵法激活成功！</font>": "<font color='#12fe00'>Formation activated!</font>",
    "<font color='#29b113'>兑换成功</font>": "<font color='#29b113'>Exchange successful</font>",
    "<font color='#29b113'>提升品质成功</font>": "<font color='#29b113'>Quality upgraded successfully</font>",
    "<font color='#29b113'>皇城焰火活动已开始</font>，炎京城已刷出大量烟花，燃放烟花<font color='#29b113'>可获得丰厚奖励</font>！": "<font color='#29b113'>Imperial City Fireworks has begun!</font> Fireworks have appeared in Yanjing — set them off for <font color='#29b113'>rich rewards</font>!",
    'BOSS已经死亡': 'BOSS has been defeated',
    'xxx出售了{0}': 'xxx sold {0}',
    "{0} 正在市场寄售 {1}，售价为 <font color='#ff8400'>{2}</font> 元宝，欲购从速！ {3}": "{0} is selling {1} on the market for <font color='#ff8400'>{2}</font> Gems — get it fast! {3}",
    '{0}上线了！': '{0} is online!',
    '{0}下线了！': '{0} has gone offline!',
    "<font color='#ec1932'>{0}级开启私聊！</font>": "<font color='#ec1932'>Private chat unlocks at Level {0}!</font>",
    "<font color='#ec1932'>兑换所需技能点数不足</font>": "<font color='#ec1932'>Insufficient skill points to exchange</font>",
    "<font color='#ec1932'>已开始护送，不能刷新品质</font>": "<font color='#ec1932'>Escort in progress — cannot refresh quality</font>",
    "<font color='#ec1932'>已达到最高品质</font>": "<font color='#ec1932'>Maximum quality reached</font>",
    "<font color='#ec1932'>当前所有技能次数已达上限，不能继续获得</font>": "<font color='#ec1932'>All skill uses are at max — cannot gain more</font>",
    "<font color='#ec1932'>技能兑换已达上限</font>": "<font color='#ec1932'>Skill exchange limit reached</font>",
    "<font color='#ec1932'>护送次数已满</font>": "<font color='#ec1932'>Escort attempts are full</font>",
    "<font color='#ec1932'>未开始护送，不能提交</font>": "<font color='#ec1932'>Escort not started — cannot submit</font>",
    "<font color='#ec1932'>未离开指定区域</font>": "<font color='#ec1932'>Have not left the designated area</font>",
    "<font color='#ec1932'>未进入指定区域</font>": "<font color='#ec1932'>Have not entered the designated area</font>",
    "<font color='#ec1932'>该技能使用次数不足</font>": "<font color='#ec1932'>Insufficient skill uses</font>",
    "<font color='#ff4949'>升星失败！</font>": "<font color='#ff4949'>Star upgrade failed!</font>",
    "<font color='#ff4949'>升星材料不足！</font>": "<font color='#ff4949'>Insufficient star upgrade materials!</font>",
    "<font color='#ff4949'>升级所需材料不足！</font>": "<font color='#ff4949'>Insufficient upgrade materials!</font>",
    "<font color='#ff4949'>您输入的原密码错误，请重新输入！</font>": "<font color='#ff4949'>Incorrect original password — please try again!</font>",
    "<font color='#ff4949'>激活条件不满足</font>": "<font color='#ff4949'>Activation conditions not met</font>",
    "<font color='#ff4949'>资质丹使用已达上限，提升坐骑阶数可继续使用</font>": "<font color='#ff4949'>Aptitude Pill use limit reached — advance mount tier to continue</font>",

    # text_data server messages
    '元宝不足': 'Insufficient Gems',
    '绑定元宝不足': 'Insufficient Bound Gems',
    '物品数量错误': 'Invalid item quantity',
    '物品绑定信息错误': 'Item binding error',
    '测试公告:恭喜{0}获得xxx': 'Test announcement: Congrats {0} for getting xxx',
    '未知错误': 'Unknown error',
    '服务器真忙，请稍后再试': 'Server is busy, please try again later',
    '背包或仓库为空': 'Bag or warehouse is empty',
    '物品操作系统错误': 'Item system error',
    '空间不足': 'Insufficient space',
    '没有找到物品': 'Item not found',
    '位置已被占用': 'Slot already occupied',
    '超出最大空间格': 'Exceeded max slots',
    '只能转移到背包': 'Can only transfer to bag',
    '背包已满': 'Bag is full',
    '礼包配置表错误': 'Gift pack config error',
    '礼包产出匹配错误': 'Gift pack reward match error',
    '不可穿戴装备': 'Cannot equip this item',
    '已穿戴': 'Already equipped',
    '物品整理失败': 'Item sort failed',
    '技能不存在': 'Skill does not exist',
    '技能已达最大等级': 'Skill at max level',
    '此技能不能升级': 'This skill cannot be leveled up',
    '技能组CD冷却中': 'Skill group on cooldown',
    '攻击CD冷却中': 'Attack on cooldown',
    '技能CD冷却中': 'Skill on cooldown',
    '技能配置错误': 'Skill config error',
    '灵宠技能CD冷却中': 'Spirit pet skill on cooldown',
    '目标地图不支持传送': 'Target map does not support teleport',
    '地图不存在': 'Map does not exist',
    '您当前还未进入场景': 'You have not entered a scene',
    '系统繁忙，获取失败': 'System busy, fetch failed',
    '系统出错，请稍候再试': 'System error, please try again',
    '系统出错': 'System error',
    '创建角色失败': 'Character creation failed',
    '系统繁忙': 'System busy',
    '加载角色数据出错': 'Error loading character data',
    '等级不符合': 'Level requirement not met',
    '性别不符合': 'Gender requirement not met',
    '未定义的条件类型': 'Undefined condition type',
    '操作条件不满足': 'Operation condition not met',
    '该采集物已消失': 'Gathering node has disappeared',
    '该场景元素已经被占用了': 'Scene element already occupied',
    '找不到怪物配置': 'Monster config not found',
    '不是采集物': 'Not a gathering node',
    '非法的采集类型': 'Invalid gathering type',
    '距离目标太远了': 'Too far from target',
    '坐标点非法': 'Invalid coordinates',
    '删除邮件失败': 'Mail deletion failed',
    '此邮件没有附件或已经领取过了': 'Mail has no attachment or was already claimed',
    '背包空间不足': 'Bag space insufficient',
    '角色不存在': 'Character does not exist',
    '物品使用玩家等级不够': 'Player level too low to use item',
    '物品不能使用': 'Item cannot be used',
    '无此物品配置': 'Item config not found',
    '扣除背包物品失败': 'Failed to deduct bag item',
    '随机物品配置错误': 'Random item config error',
    '元宝卡使用失败': 'Gem Card use failed',
    '绑定元宝卡使用失败': 'Bound Gem Card use failed',
    '攻击点超出技能攻击距离': 'Attack point exceeds skill range',
    '当前状态无法发起攻击': 'Cannot attack in current state',
    '输入内容含有限制文字，请重新输入': 'Input contains restricted words, please re-enter',
    '输入内容含有限制字符': 'Input contains restricted characters',
    '输入内容字数超过限定数': 'Input exceeds character limit',
    '仓库已满': 'Warehouse is full',
    '增加物品失败': 'Failed to add item',
    '删除物品失败': 'Failed to delete item',
    '非法的物品数量': 'Invalid item quantity',
    '商品已经更新，请重新打开商城界面获取最新的商品信息': 'Shop updated — please reopen the store to get the latest info',
    '沉默状态下只能进行普通攻击！': 'Silenced — only basic attacks allowed!',
    '养成资质丹未开始使用': 'Aptitude Pill not yet started',
    '养成资质丹已达到上限': 'Aptitude Pill limit reached',
    '没有养成数据': 'No training data',
    '养成成长丹未开始使用': 'Growth Pill not yet started',
    '养成成长丹已达到上限': 'Growth Pill limit reached',
    '养成已达到最大阶级': 'Training max tier reached',
    '养成已领取进阶奖励': 'Training advancement reward already claimed',
    '养成装备位置错误': 'Training gear slot error',
    '养成装备不存在': 'Training gear does not exist',
    '养成装备已穿上': 'Training gear already equipped',
    '已达购买上限': 'Purchase limit reached',
}

# ── Pattern matching functions ─────────────────────────────────────────────────

def apply_patterns(text):
    """Try to translate text using pattern matching. Returns (en_text, matched_pattern) or (None, None)."""

    # 第N关 独孤诀 → Stage N: Dugu's Path
    m = re.fullmatch(r'第(\d+)关\s*独孤诀', text)
    if m:
        return f"Stage {m.group(1)}: Dugu's Path", 'stage_dugu'

    # 第N关 聚元 → Stage N: Yuan Gathering
    m = re.fullmatch(r'第(\d+)关\s*聚元', text)
    if m:
        return f"Stage {m.group(1)}: Yuan Gathering", 'stage_yuan'

    # N级 (just digits+级) → Lv.N
    m = re.fullmatch(r'(\d+)级', text)
    if m:
        return f"Lv.{m.group(1)}", 'level'

    # N阶 (just digits+阶) → Tier N
    m = re.fullmatch(r'(\d+)阶', text)
    if m:
        return f"Tier {m.group(1)}", 'tier'

    # Meridian tiers
    meridian_map = {
        '任脉': 'Ren Meridian', '督脉': 'Du Meridian', '冲脉': 'Chong Meridian',
        '带脉': 'Dai Meridian', '阳维': 'Yang Wei', '阴维': 'Yin Wei',
        '阳跷': 'Yang Qiao', '阴跷': 'Yin Qiao',
    }
    for cn_m, en_m in meridian_map.items():
        m = re.fullmatch(rf'{re.escape(cn_m)}(\d+)层', text)
        if m:
            return f"{en_m} Tier {m.group(1)}", 'meridian_tier'

    # <font color='#ec1932'>到达剧情副本第N关后开启</font>
    m = re.fullmatch(r"<font color='#ec1932'>到达剧情副本第(\d+)关后开启</font>", text)
    if m:
        return f"<font color='#ec1932'>Unlocks after Story Dungeon Stage {m.group(1)}</font>", 'dungeon_unlock'

    # 每天HH:MM开启 → Opens daily at HH:MM
    m = re.fullmatch(r'每天(\d{1,2}:\d{2})开启', text)
    if m:
        return f"Opens daily at {m.group(1)}", 'daily_open'

    # HH:MM开启 → Opens at HH:MM
    m = re.fullmatch(r'(\d{1,2}:\d{2})开启', text)
    if m:
        return f"Opens at {m.group(1)}", 'time_open'

    # item_data gear patterns
    gear_stat_map = {'攻击': 'ATK', '防御': 'DEF'}
    gear_grade_map = {'橙装': 'Orange Gear', '紫装': 'Purple Gear', '红装': 'Red Gear'}

    for stat_cn, stat_en in gear_stat_map.items():
        for grade_cn, grade_en in gear_grade_map.items():
            # N级X装
            m = re.fullmatch(rf'(\d+)级{re.escape(stat_cn)}{re.escape(grade_cn)}', text)
            if m:
                return f"Lv.{m.group(1)} {stat_en} {grade_en}", 'gear_level'
            # N阶X装
            m = re.fullmatch(rf'(\d+)阶{re.escape(stat_cn)}{re.escape(grade_cn)}', text)
            if m:
                return f"Tier {m.group(1)} {stat_en} {grade_en}", 'gear_tier'
            # BOSS有几率掉落N级X橙色装备
            m = re.fullmatch(rf'BOSS有几率掉落(\d+)级{re.escape(stat_cn)}橙色装备', text)
            if m:
                return f"BOSS: chance to drop Lv.{m.group(1)} {stat_en} Orange Gear", 'boss_drop_level'
            # BOSS有几率掉落N阶X橙色装备
            m = re.fullmatch(rf'BOSS有几率掉落(\d+)阶{re.escape(stat_cn)}橙色装备', text)
            if m:
                return f"BOSS: chance to drop Tier {m.group(1)} {stat_en} Orange Gear", 'boss_drop_tier'

    # N转刻印解锁 → Rebirth N Seal Unlock
    m = re.fullmatch(r'(\d+)转刻印解锁', text)
    if m:
        return f"Rebirth {m.group(1)} Seal Unlock", 'rebirth_seal_unlock'

    # N转后可激活技能的第M个刻印 → Seal M unlocked after Rebirth N
    m = re.fullmatch(r'(\d+)转后可激活技能的第(\d+)个刻印', text)
    if m:
        return f"Seal {m.group(2)} unlocked after Rebirth {m.group(1)}", 'rebirth_seal'

    # N转后可穿戴获得的M转披风：X → Rebirth N Cloak: X
    m = re.fullmatch(r'(\d+)转后可穿戴获得的(\d+)转披风：(.+)', text)
    if m:
        return f"Rebirth {m.group(1)} Cloak: {m.group(3)}", 'rebirth_cloak_name'

    # N转后可穿戴获得的N转装备 → Rebirth N Gear Unlocked
    m = re.fullmatch(r'(\d+)转后可穿戴获得的(\d+)转装备', text)
    if m:
        return f"Rebirth {m.group(1)} Gear Unlocked", 'rebirth_gear_unlocked'

    # N转披风解锁 → Rebirth N Cloak Unlock
    m = re.fullmatch(r'(\d+)转披风解锁', text)
    if m:
        return f"Rebirth {m.group(1)} Cloak Unlock", 'rebirth_cloak_unlock'

    # N转装备解锁 → Rebirth N Gear Unlock
    m = re.fullmatch(r'(\d+)转装备解锁', text)
    if m:
        return f"Rebirth {m.group(1)} Gear Unlock", 'rebirth_gear_unlock'

    # 使用可获得N元宝 → Use to get N Gems
    m = re.fullmatch(r'使用可获得(\d+)元宝', text)
    if m:
        return f"Use to get {m.group(1)} Gems", 'use_gems'

    # vip_data pipe-separated items
    if '|' in text:
        parts = text.split('|')
        translated_parts = []
        vip_map = {
            '开启专属VIP商城': 'Unlock VIP Store',
            'VIP专属礼包': 'VIP Exclusive Gift',
            '升级VIP可以获得更多特权和奖励': 'Level up VIP for more perks',
            ' ': ' ',
            '': '',
        }
        all_translated = True
        for part in parts:
            part_stripped = part.strip()
            if part_stripped == '' or part_stripped == ' ':
                translated_parts.append(part)
                continue
            if part_stripped in vip_map:
                translated_parts.append(vip_map[part_stripped])
                continue
            # 经验副本购买次数增加N次 → +N EXP Dungeon daily buys
            mp = re.fullmatch(r'经验副本购买次数增加(\d+)次', part_stripped)
            if mp:
                translated_parts.append(f"+{mp.group(1)} EXP Dungeon daily buys")
                continue
            # 金蟾聚宝购买次数增加N次 → +N Golden Toad daily buys
            mp = re.fullmatch(r'金蟾聚宝购买次数增加(\d+)次', part_stripped)
            if mp:
                translated_parts.append(f"+{mp.group(1)} Golden Toad daily buys")
                continue
            # 免费补签次数增加N次 → +N free check-in make-ups
            mp = re.fullmatch(r'免费补签次数增加(\d+)次', part_stripped)
            if mp:
                translated_parts.append(f"+{mp.group(1)} free check-in make-ups")
                continue
            # 竞技场挑战次数增加N次 → +N Arena challenge attempts
            mp = re.fullmatch(r'竞技场挑战次数增加(\d+)次', part_stripped)
            if mp:
                translated_parts.append(f"+{mp.group(1)} Arena challenge attempts")
                continue
            # part in CN_TO_EN
            if part_stripped in CN_TO_EN:
                translated_parts.append(CN_TO_EN[part_stripped])
                continue
            all_translated = False
            break
        if all_translated:
            return '|'.join(translated_parts), 'vip_pipe'

    # pet_data descriptions
    # 墨宠对周围<font color='#37B700'>N个</font>敌人造成<font color='#37B700'>X%+Ypoint</font>伤害
    m = re.fullmatch(r"墨宠对周围<font color='#37B700'>(\d+)个</font>敌人造成<font color='#37B700'>(.+?)\+(.+?)point</font>伤害", text)
    if m:
        return f"Pet deals <font color='#37B700'>{m.group(2)}+{m.group(3)}</font> DMG to <font color='#37B700'>{m.group(1)}</font> nearby enemies", 'pet_dmg'

    # 战斗中，每<font>Ns</font>为角色恢复<font>X%+Ypoint</font>气血
    m = re.fullmatch(r"战斗中，每<font color='#37B700'>(\d+s)</font>为角色恢复<font color='#37B700'>(.+?)\+(.+?)point</font>气血", text)
    if m:
        return f"In combat, restores <font color='#37B700'>{m.group(2)}+{m.group(3)}</font> HP every <font color='#37B700'>{m.group(1)}</font>", 'pet_hp_restore'

    # 有<font>10%</font>的概率增加自身<font>N%</font>破甲值，持续<font>Ns</font>
    m = re.fullmatch(r"有<font color='#37B700'>10%</font>的概率增加自身<font color='#37B700'>(\d+%)</font>破甲值，持续<font color='#37B700'>(\d+s)</font>", text)
    if m:
        return f"<font color='#37B700'>10%</font> chance to add <font color='#37B700'>{m.group(1)}</font> Pen for <font color='#37B700'>{m.group(2)}</font>", 'pet_pen'

    # 有<font>10%</font>的概率降低敌方<font>N%</font>攻击力，持续<font>Ns</font>
    m = re.fullmatch(r"有<font color='#37B700'>10%</font>的概率降低敌方<font color='#37B700'>(\d+%)</font>攻击力，持续<font color='#37B700'>(\d+s)</font>", text)
    if m:
        return f"<font color='#37B700'>10%</font> chance to reduce enemy ATK by <font color='#37B700'>{m.group(1)}</font> for <font color='#37B700'>{m.group(2)}</font>", 'pet_atk_debuff'

    # text_data font-colored success/failure patterns
    m = re.fullmatch(r"<font color='#12fe00'>(.+?)成功</font>", text)
    if m:
        content = m.group(1)
        if not has_chinese(content):
            return f"<font color='#12fe00'>{content} successful</font>", 'font_success'
        translated_content = CN_TO_EN.get(content)
        if translated_content:
            return f"<font color='#12fe00'>{translated_content} successful</font>", 'font_success'

    m = re.fullmatch(r"<font color='#ff4949'>(.+?)失败</font>", text)
    if m:
        content = m.group(1)
        if not has_chinese(content):
            return f"<font color='#ff4949'>{content} failed</font>", 'font_failed'
        translated_content = CN_TO_EN.get(content)
        if translated_content:
            return f"<font color='#ff4949'>{translated_content} failed</font>", 'font_failed'

    return None, None


# ── Binary parsing helpers ─────────────────────────────────────────────────────

def parse_outer(data):
    """Returns list of (section_name, bytes_data)."""
    pos = 0
    count = data[pos]; pos += 1
    sections = []
    for _ in range(count):
        name_len = struct.unpack_from('>H', data, pos)[0]; pos += 2
        name = data[pos:pos+name_len].decode('utf-8'); pos += name_len
        data_len = struct.unpack_from('>I', data, pos)[0]; pos += 4
        sec_data = bytes(data[pos:pos+data_len]); pos += data_len
        sections.append((name, sec_data))
    return sections


def scan_chinese(sec_bytes):
    """Find all length-prefixed CJK strings. Returns list of (offset, text)."""
    found = []
    i = 0
    buf = sec_bytes
    while i < len(buf) - 2:
        str_len = struct.unpack_from('>H', buf, i)[0]
        if 1 <= str_len <= 512 and i + 2 + str_len <= len(buf):
            try:
                candidate = buf[i+2:i+2+str_len].decode('utf-8')
                reenc = candidate.encode('utf-8')
                if len(reenc) == str_len and has_chinese(candidate):
                    found.append((i, candidate))
                    i += 2 + str_len
                    continue
            except UnicodeDecodeError:
                pass
        i += 1
    return found


# ── Translation lookup chain ───────────────────────────────────────────────────

def lookup_translation(text, section_name, sections_en_map, lang_en_map, sec_offset=None):
    """
    Try all translation sources in order. Returns (en_text, source) or (None, None).
    """
    # 1. CN_TO_EN dict (exact match)
    if text in CN_TO_EN:
        return CN_TO_EN[text], 'cn_to_en'

    # 2. LANG_TRANSLATIONS dict from translate_cw.py
    if text in LANG_TRANSLATIONS:
        return LANG_TRANSLATIONS[text], 'lang_translations'

    # 3. sections_en.json (keyed by sectionName|offset)
    if sec_offset is not None:
        key = f'{section_name}|{sec_offset}'
        if key in sections_en_map and sections_en_map[key] != text:
            val = sections_en_map[key]
            # Validate it's a pure string (no binary junk)
            if isinstance(val, str) and not any(ord(c) < 32 and c not in '\n\r\t' for c in val):
                return val, 'sections_en'

    # 4. Pattern matching
    en_text, pattern = apply_patterns(text)
    if en_text is not None:
        return en_text, f'pattern:{pattern}'

    return None, None


# ── Language section extraction & translation ──────────────────────────────────

def extract_language_section(sec_bytes, lang_en_map):
    """Extract all strings from language section, apply translations."""
    entries = []
    pos = 0
    table_count = sec_bytes[pos]; pos += 1
    for _ in range(table_count):
        name_len = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
        name = sec_bytes[pos:pos+name_len].decode('utf-8'); pos += name_len
        str_count = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
        for _ in range(str_count):
            sid = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
            slen = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
            sval = sec_bytes[pos:pos+slen].decode('utf-8'); pos += slen

            if not has_chinese(sval):
                continue

            key = f'lang|{name}|{sid}'
            en = ''
            source = ''

            # Try LANG_TRANSLATIONS
            if sval in LANG_TRANSLATIONS:
                en = LANG_TRANSLATIONS[sval]
                source = 'lang_translations'
            # Try CN_TO_EN
            elif sval in CN_TO_EN:
                en = CN_TO_EN[sval]
                source = 'cn_to_en'
            # Try lang_en.json (by section+id key like 'activity1')
            else:
                lkey = f'{name}{sid}'
                if lkey in lang_en_map and lang_en_map[lkey] != sval:
                    en = lang_en_map[lkey]
                    source = 'lang_en'
                else:
                    # Try pattern matching
                    en_p, pat = apply_patterns(sval)
                    if en_p:
                        en = en_p
                        source = f'pattern:{pat}'

            entries.append({
                'cn': sval,
                'en': en,
                'section': 'language',
                'table': name,
                'id': sid,
                'source': source,
            })
    return entries


# ── Main extraction and translation ───────────────────────────────────────────

def main():
    # Load source file (use .bak original if exists)
    orig_path = CW_PATH + '.bak'
    src_path = orig_path if os.path.exists(orig_path) else CW_PATH
    print(f'Reading from: {src_path}')

    with open(src_path, 'rb') as f:
        data = f.read()
    print(f'File size: {len(data):,} bytes')

    # Load sections_en.json
    sections_en_map = {}
    en_path = os.path.join(TOOLS, 'sections_en.json')
    if os.path.exists(en_path):
        with open(en_path, 'r', encoding='utf-8') as f:
            raw_sections_en = json.load(f)
        # Filter to only pure string values (not binary blobs)
        for k, v in raw_sections_en.items():
            if isinstance(v, str) and len(v) <= 512 and not any(ord(c) < 32 and c not in '\n\r\t' for c in v):
                sections_en_map[k] = v
        print(f'Loaded {len(sections_en_map)} usable entries from sections_en.json')

    # Load lang_en.json
    lang_en_map = {}
    lang_path = os.path.join(TOOLS, 'lang_en.json')
    if os.path.exists(lang_path):
        with open(lang_path, 'r', encoding='utf-8') as f:
            lang_en_map = json.load(f)
        print(f'Loaded {len(lang_en_map)} entries from lang_en.json')

    # Load existing cw_translations.json if it exists (to preserve existing non-empty translations)
    existing = {}
    if os.path.exists(OUTPUT_PATH):
        with open(OUTPUT_PATH, 'r', encoding='utf-8') as f:
            existing = json.load(f)
        print(f'Loaded {len(existing)} existing entries from cw_translations.json')

    # Parse outer sections
    sections = parse_outer(data)
    print(f'Parsed {len(sections)} top-level sections')

    # Build result dict
    result = {}

    # --- Language section ---
    for name, sec_bytes in sections:
        if name == 'language':
            lang_entries = extract_language_section(sec_bytes, lang_en_map)
            for entry in lang_entries:
                key = entry['key'] if 'key' in entry else f"lang|{entry['table']}|{entry['id']}"
                # Preserve existing non-empty translation
                if key in existing and existing[key].get('en', ''):
                    entry['en'] = existing[key]['en']
                    if not entry.get('source'):
                        entry['source'] = existing[key].get('source', 'existing')
                result[key] = {
                    'cn': entry['cn'],
                    'en': entry['en'],
                    'section': 'language',
                    'table': entry['table'],
                    'id': entry['id'],
                    'source': entry.get('source', ''),
                }
            break

    # --- Non-language sections (scan for CJK strings) ---
    # Track sections already seen to handle duplicate section names
    section_seen = {}
    for sec_name, sec_bytes in sections:
        if sec_name == 'language':
            continue

        # Handle duplicate section names
        if sec_name in section_seen:
            section_seen[sec_name] += 1
            display_name = f'{sec_name}_{section_seen[sec_name]}'
        else:
            section_seen[sec_name] = 1
            display_name = sec_name

        hits = scan_chinese(sec_bytes)
        for offset, text in hits:
            key = f'{display_name}|{offset}'
            cn_key = f'{sec_name}|{offset}'  # original key for sections_en lookup

            # Preserve existing non-empty translation
            if key in existing and existing[key].get('en', ''):
                en = existing[key]['en']
                source = existing[key].get('source', 'existing')
            else:
                en, source = lookup_translation(text, sec_name, sections_en_map, lang_en_map, offset)
                if en is None:
                    en = ''
                    source = ''

            result[key] = {
                'cn': text,
                'en': en,
                'section': display_name,
                'offset': offset,
                'source': source,
            }

    # Summary
    total = len(result)
    translated = sum(1 for v in result.values() if v.get('en', '').strip())
    coverage = translated / total * 100 if total else 0

    print(f'\n=== Summary ===')
    print(f'Total extracted Chinese strings: {total}')
    print(f'Translated:                      {translated}')
    print(f'Untranslated:                    {total - translated}')
    print(f'Coverage:                        {coverage:.1f}%')

    # Source breakdown
    sources = {}
    for v in result.values():
        s = v.get('source', '') or 'none'
        sources[s] = sources.get(s, 0) + 1
    print('\nBy source:')
    for src, cnt in sorted(sources.items(), key=lambda x: -x[1]):
        print(f'  {src}: {cnt}')

    # Save
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f'\nSaved to: {OUTPUT_PATH}')


if __name__ == '__main__':
    main()
