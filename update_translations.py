import json, re

TRANS_FILE = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302/cw_translations.json'
with open(TRANS_FILE, encoding='utf-8') as f:
    data = json.load(f)

# ── Full CN→EN dictionary ────────────────────────────────────────────────────
D = {
    # Short attribute names (in items/gems)
    '生命': 'HP', '防御': 'DEF', '命中': 'Hit', '暴击': 'Crit',
    '攻击': 'ATK', '破甲': 'Pen', '气血': 'HP', '闪避': 'Eva', '坚韧': 'TEN',

    # Juexue (martial arts) names
    '七伤拳': 'Seven Injury Fist', '两仪剑法': 'Liangyi Sword Style',
    '九阴真经': 'Nine Yin Manual', '乾坤大挪移': 'Cosmos Palm',
    '伏虎拳': 'Tiger Subduing Fist', '凌波微步': 'Lingbo Microstep',
    '圣火令神功': 'Sacred Fire Token Art', '大九天手': 'Great Nine Heavens Palm',
    '大金刚掌': 'Great Diamond Palm', '太极拳剑': 'Taichi Sword',
    '易筋经': 'Muscle-Bone Forging', '混元功': 'Chaos Origin Art',
    '玉萧剑法': 'Jade Flute Sword Style', '碧波掌法': 'Blue Wave Palm',
    '神门十三剑': 'Thirteen Sword Gates', '空明拳': 'Void Clarity Fist',
    '纯阳无极功': 'Pure Yang Limitless Art', '绕指柔剑': 'Finger-Winding Soft Sword',
    '罗汉伏魔功': 'Arhat Demon Subduing Art', '龙爪功': 'Dragon Claw Art',
    '七伤拳': 'Seven Injury Fist',

    # Weapon soul skill seals (凌烟, 凌霄, 北冥, 狂风, 碧海, 落英, 雷霆, 万剑)
    '万剑·中毒': 'Ten Thousand Swords: Poison', '万剑·反伤': 'Ten Thousand Swords: Counter',
    '万剑·群攻': 'Ten Thousand Swords: AoE', '万剑·速攻': 'Ten Thousand Swords: Quick',
    '凌烟·回血': 'Lingyan: Lifesteal', '凌烟·强攻': 'Lingyan: Power ATK',
    '凌烟·必暴': 'Lingyan: Guaranteed Crit', '凌烟·群攻': 'Lingyan: AoE',
    '凌霄·回血': 'Lingxiao: Lifesteal', '凌霄·强攻': 'Lingxiao: Power ATK',
    '凌霄·必暴': 'Lingxiao: Guaranteed Crit', '凌霄·群攻': 'Lingxiao: AoE',
    '北冥·强攻': 'Beiming: Power ATK', '北冥·沉默': 'Beiming: Silence',
    '北冥·穿透': 'Beiming: Penetrate', '北冥·群攻': 'Beiming: AoE',
    '狂风·免伤': 'Kuangfeng: DMG Reduce', '狂风·冰冻': 'Kuangfeng: Freeze',
    '狂风·群攻': 'Kuangfeng: AoE', '狂风·速攻': 'Kuangfeng: Quick',
    '碧海·强攻': 'Bihai: Power ATK', '碧海·沉默': 'Bihai: Silence',
    '碧海·穿透': 'Bihai: Penetrate', '碧海·群攻': 'Bihai: AoE',
    '落英·免伤': 'Luoying: DMG Reduce', '落英·眩晕': 'Luoying: Stun',
    '落英·群攻': 'Luoying: AoE', '落英·速攻': 'Luoying: Quick',
    '雷霆·中毒': 'Leiting: Poison', '雷霆·反伤': 'Leiting: Counter',
    '雷霆·群攻': 'Leiting: AoE', '雷霆·速攻': 'Leiting: Quick',

    # Ingot/honor cards
    '10元宝卡': '10 Ingot Card', '100元宝卡': '100 Ingot Card', '1000元宝卡': '1000 Ingot Card',
    '10荣誉卡': '10 Honor Card', '100荣誉卡': '100 Honor Card', '1000荣誉卡': '1000 Honor Card',
    '一万银票': '10K Silver Note', '十万银票': '100K Silver Note', '百万银票': '1M Silver Note',

    # Consumables / crafting
    '命格晶石': 'Destiny Crystal', '命格碎片': 'Destiny Fragment',
    '命格礼包（测）': 'Destiny Gift Pack (Test)', '命玉': 'Fate Jade', '命魂': 'Fate Soul',
    '经脉突破丹': 'Meridian Breakthrough Pill', '聚元丹': 'Yuan Gathering Pill',
    '悟性丹': 'Comprehension Pill', '进阶丹': 'Advancement Pill',
    '冰续丹': 'Ice Continuation Pill', '冰续草': 'Ice Continuation Herb',
    '玄铁石': 'Black Iron Stone', '九天缎': 'Nine Heavens Silk',
    '翡翠墨玉': 'Jade Ink Stone', '锦缎': 'Brocade', '雪疥虫': 'Snow Itch Worm',
    '寻宝符': 'Treasure Hunt Talisman', '改名卡': 'Rename Card',
    '强化石': 'Enhancement Stone', '攻击套装石': 'ATK Set Stone',
    '强化防具套装石': 'DEF Enh Set Stone',
    '合成防具强化套装的必要材料': 'Required material for DEF enhancement set',
    '合成首饰套装的必要材料': 'Required material for accessory set',
    '墨宠技能书': 'Mo Pet Skill Book', '绝学境界值': 'Juexue Mastery',
    '宗门贡献': 'Sect Contribution', '皇城战积分': 'Castle War Points',
    '宫廷皇室御用贡品，编制披风必备神品': 'Royal court tribute, essential for crafting cloaks',
    '宫廷皇室御用贡品，轻柔丝滑，做成服饰深受达官贵人喜爱': 'Royal court tribute, soft silk favored by nobles',
    '中经验丹': 'Medium EXP Pill', '大经验丹': 'Large EXP Pill', '小经验丹': 'Small EXP Pill',
    '乌金丸': 'Black Gold Pill',

    # Pets
    '上古巨猿': 'Ancient Giant Ape',
    '使用该道具，可召唤让人闻风丧胆的上古巨猿作为你的墨宠': 'Use to summon the legendary Ancient Giant Ape as your Mo Pet',
    '招财猫': 'Fortune Cat', '捣蛋猫': 'Mischievous Cat',

    # Tokens/access items
    '演武令牌': 'Combat Token', '金玉令牌': 'Gold Jade Token', '金玉满堂': 'Hall of Gold Jade',
    '持有该令牌，可以开启演武场，进入演武场厮杀可获得海量经验': 'Holding this token opens the Combat Arena for massive EXP',
    '持有该令牌，可以进入金玉堂，盗取海量银币、元宝': 'Holding this token opens the Gold Hall to steal silver and ingots',

    # Fashion/costume names
    '九州帝皇': 'Emperor of Nine Provinces', '城主时装激活（时效）': 'City Lord Costume Activation (Timed)',
    '侠骨多情': 'Chivalrous and Sentimental', '浪迹天涯': 'Wandering the Horizon',
    '瀚海青龙': 'Sea Azure Dragon', '万里飞沙': 'Ten Thousand Miles of Sand',
    '锦墨如烟': 'Ink Mist Brocade', '翠袍金绫': 'Emerald Robe Gold Silk',
    '白龙鱼服': 'White Dragon Fish Suit', '大漠黄沙': 'Desert Yellow Sand',
    '离魂幽梦': 'Soul Departing Dream',

    # Gear (orange/purple/red, ATK/DEF)
    '攻击橙装': 'ATK Orange Gear', '攻击紫装': 'ATK Purple Gear', '攻击红装': 'ATK Red Gear',
    '防御橙装': 'DEF Orange Gear', '防御紫装': 'DEF Purple Gear', '防御红装': 'DEF Red Gear',

    # Reincarnation items
    '1转装备解锁': '1st Rebirth Equipment Unlock',
    '2转装备解锁': '2nd Rebirth Equipment Unlock',
    '3转装备解锁': '3rd Rebirth Equipment Unlock',
    '4转装备解锁': '4th Rebirth Equipment Unlock',
    '1转刻印解锁': '1st Rebirth Seal Unlock',
    '2转刻印解锁': '2nd Rebirth Seal Unlock',
    '3转刻印解锁': '3rd Rebirth Seal Unlock',
    '4转刻印解锁': '4th Rebirth Seal Unlock',
    '1转披风解锁': '1st Rebirth Cloak Unlock',
    '2转披风解锁': '2nd Rebirth Cloak Unlock',
    '3转披风解锁': '3rd Rebirth Cloak Unlock',
    '4转披风解锁': '4th Rebirth Cloak Unlock',
    '1转后可激活技能的第1个刻印': 'Activate 1st skill seal after 1st Rebirth',
    '2转后可激活技能的第2个刻印': 'Activate 2nd skill seal after 2nd Rebirth',
    '3转后可激活技能的第3个刻印': 'Activate 3rd skill seal after 3rd Rebirth',
    '4转后可激活技能的第4个刻印': 'Activate 4th skill seal after 4th Rebirth',
    '1转后可穿戴获得的1转装备': 'Equipment available after 1st Rebirth',
    '2转后可穿戴获得的2转装备': 'Equipment available after 2nd Rebirth',
    '3转后可穿戴获得的3转装备': 'Equipment available after 3rd Rebirth',
    '4转后可穿戴获得的4转装备': 'Equipment available after 4th Rebirth',
    '1转后可穿戴获得的1转披风：锦墨如烟': 'Cloak after 1st Rebirth: Ink Mist Brocade',
    '2转后可穿戴获得的2转披风：翠袍金陵': 'Cloak after 2nd Rebirth: Emerald Robe',
    '3转后可穿戴获得的3转披风：白龙鱼服': 'Cloak after 3rd Rebirth: White Dragon Suit',
    '4转后可穿戴获得的4转披风：大漠黄沙': 'Cloak after 4th Rebirth: Desert Sand',

    # Use descriptions
    '使用可获得1000元宝': 'Use to obtain 1000 Ingots',
    '使用可获得100元宝': 'Use to obtain 100 Ingots',
    '使用可获得10元宝': 'Use to obtain 10 Ingots',
    '使用可获得400元宝': 'Use to obtain 400 Ingots',
    '使用可获得一万银币': 'Use to obtain 10,000 Silver',
    '使用可获得一百万银币': 'Use to obtain 1,000,000 Silver',
    '使用可获得十万银币': 'Use to obtain 100,000 Silver',
    '使用后可提升墨宠属性加成百分比：\n生命+1%\n攻击+1%': 'Increases Mo Pet attribute % bonus:\nHP+1%\nATK+1%',
    '使用后可提升墨宠属性加成：\n生命+100\n攻击+20': 'Increases Mo Pet attribute bonus:\nHP+100\nATK+20',
    '使用后可提升墨宠技能等级': 'Use to increase Mo Pet skill level',
    '用于人物改名': 'Use for character rename',
    '用于人物经脉突破': 'Use for character meridian breakthrough',
    '用于寻宝': 'Use for treasure hunting',
    '用于提升人物装备的强化等级': 'Use to increase equipment enhancement level',
    '用于猎命，获得命格': 'Use for Fate Hunt to obtain Destiny',
    '用于突破聚元阶段': 'Use to break through Yuan Gathering stage',
    '用于角色转生（1转），野外挂机掉落': 'Use for character rebirth (1st), drops while AFK',
    '用于角色转生（2转），野外挂机掉落': 'Use for character rebirth (2nd), drops while AFK',
    '用于角色转生（3转），野外挂机掉落': 'Use for character rebirth (3rd), drops while AFK',
    '用于角色转生（4转），野外挂机掉落': 'Use for character rebirth (4th), drops while AFK',
    '分解后可获得命魂200': 'Dismantle to get 200 Fate Soul',
    '分解后可获得命魂500': 'Dismantle to get 500 Fate Soul',
    '分解后可获得命魂1600': 'Dismantle to get 1600 Fate Soul',
    '分解后可获得命魂3800': 'Dismantle to get 3800 Fate Soul',

    # Juexue boxes
    '传说绝学箱': 'Legendary Juexue Box', '卓越绝学箱': 'Outstanding Juexue Box',
    '史诗绝学箱': 'Epic Juexue Box', '绝世绝学箱': 'Supreme Juexue Box',
    '互动礼包': 'Interaction Gift Pack', '传功厚礼': 'Skill Training Gift',
    '江湖风云结算礼包': 'Jianghu Finale Gift Pack',
    '皇城战参与礼包': 'Castle War Participation Pack',
    '皇城战胜利礼包': 'Castle War Victory Pack',

    # Miscellaneous
    '稀有属性（测）': 'Rare Attribute (Test)', '装备包（测）': 'Equipment Pack (Test)',
    '命格礼包（测）': 'Destiny Pack (Test)',
    '绝世武学，龙战八荒。最强群攻，全屏大招，杀怪效率提升100%。': 'Supreme martial art, dragon battles the wild. Strongest AoE, full-screen ultimate, 100% more kill efficiency.',

    # Skill seal activation descriptions
    '用于激活万剑归宗刻印。\n激活效果：50%概率立即清除技能冷却时间': 'Activates Ten Thousand Swords seal.\nEffect: 50% chance to reset skill cooldown',
    '用于激活凌烟剑法刻印。\n激活效果：使用技能一定概率使自身回复血量10%': 'Activates Lingyan Sword seal.\nEffect: Skill has chance to recover 10% HP',
    '用于激活凌霄剑法刻印。\n激活效果：使用技能一定概率使自身回复血量10%': 'Activates Lingxiao Sword seal.\nEffect: Skill has chance to recover 10% HP',
    '用于激活狂风快剑刻印。\n激活效果：50%概率立即清除技能冷却时间': 'Activates Kuangfeng Sword seal.\nEffect: 50% chance to reset skill cooldown',
    '用于激活狂风快剑刻印。\n激活效果：使用技能一定概率使主目标冰冻': 'Activates Kuangfeng Sword seal.\nEffect: Skill has chance to freeze target',
    '用于激活狂风快剑刻印。\n激活效果：持续7秒免伤10%，冷却30秒': 'Activates Kuangfeng Sword seal.\nEffect: 10% DMG reduction for 7s, 30s cooldown',
    '用于激活落英神剑刻印。\n激活效果：50%概率立即清除技能冷却时间': 'Activates Luoying Sword seal.\nEffect: 50% chance to reset skill cooldown',
    '用于激活落英神剑刻印。\n激活效果：使用技能一定概率使主目标眩晕': 'Activates Luoying Sword seal.\nEffect: Skill has chance to stun target',
    '用于激活落英神剑刻印。\n激活效果：持续7秒免伤10%，冷却30秒': 'Activates Luoying Sword seal.\nEffect: 10% DMG reduction for 7s, 30s cooldown',
    '用于激活雷霆万钧刻印。\n激活效果：50%概率立即清除技能冷却时间': 'Activates Leiting seal.\nEffect: 50% chance to reset skill cooldown',

    # Attr power data
    '伤害减免': 'DMG Reduction', '伤害加深': 'DMG Amplify', '命中几率': 'Hit Rate',
    '暴伤减免': 'Crit DMG Reduction', '暴伤加成': 'Crit DMG Bonus',
    '暴击减少': 'Crit Rate Reduction', '暴击加成': 'Crit Rate Bonus',
    '生命上限': 'Max HP', '经验加成': 'EXP Bonus', '闪避几率': 'Evasion Rate',

    # Buff data
    '免伤加成': 'DMG Reduction Buff', '必定暴击': 'Guaranteed Crit',
    '无视防御': 'Ignore Defense', '燃烧遮罩': 'Burning Shield', '眩晕': 'Stun',
    '闪避反伤': 'Evasion Counter', '附加中毒': 'Poison', '附加冰冻': 'Freeze',
    '附加沉默': 'Silence',

    # Daily activity
    '10:00开启': 'Opens at 10:00', '15:00开启': 'Opens at 15:00',
    '20:00开启': 'Opens at 20:00', '21:00开启': 'Opens at 21:00',
    '主城传功': 'City Training', '人物': 'Character', '冲榜': 'Rank Push',
    '凌烟阁': 'Hall of Fame', '分享': 'Share', '商城': 'Shop',
    '每周一、三、五  20点': 'Mon/Wed/Fri 20:00', '每周二、四、六  20点': 'Tue/Thu/Sat 20:00',
    '挑战好友': 'Challenge Friend', '答题赢奖': 'Quiz for Prizes',
    '精英怪副本': 'Elite Monster Dungeon',

    # Activity data
    '互动': 'Interactive', '充值': 'Recharge', '冲脉': 'Meridian', '升级': 'Level Up',
    '参与': 'Participate', '寻宝': 'Treasure Hunt', '强化': 'Enhance',
    '挑战': 'Challenge', '捐献': 'Donate',

    # Sys notice / event types
    '九霄塔': 'Nine Heavens Tower', '全民BOSS': 'World Boss', '升星': 'Star Up',
    '单人BOSS': 'Solo Boss', '大盟主': 'Grand Guild Master', '套装': 'Set',
    '斗地主': 'Fight the Landlord', '暗器': 'Hidden Weapon',
    '{0}\n一入江湖岁月催': '{0}\nTime waits for no one in the Jianghu',
    '{0}\n唐门暗器,例无虚发': '{0}\nTang Clan hidden weapons never miss',

    # Sharp eye categories
    '令牌': 'Token', '六边形': 'Hexagon', '兵器': 'Weapon', '动物图案': 'Animal Pattern',
    '卷轴': 'Scroll', '圆的物品': 'Round Object', '帽子': 'Hat', '挂穗': 'Tassel',
    '木板': 'Board', '汉字': 'Chinese Character', '盔甲': 'Armor',
    '武器': 'Weapon', '首饰': 'Accessory', '符文': 'Rune',

    # Juexue data tiers
    '1阶': 'Tier 1', '2阶': 'Tier 2', '3阶': 'Tier 3', '4阶': 'Tier 4',
    '5阶': 'Tier 5', '6阶': 'Tier 6', '7阶': 'Tier 7',

    # Meridian celestial tiers
    '一重天': 'Celestial Tier 1', '二重天': 'Celestial Tier 2', '三重天': 'Celestial Tier 3',
    '四重天': 'Celestial Tier 4', '五重天': 'Celestial Tier 5', '六重天': 'Celestial Tier 6',
    '七重天': 'Celestial Tier 7', '八重天': 'Celestial Tier 8', '九重天': 'Celestial Tier 9',

    # Guild war data
    '盟内积分排名第1': 'Guild Score Rank #1', '盟内积分排名第2': 'Guild Score Rank #2',

    # Arena
    '第1名': 'Rank 1',

    # Scene data (remaining map names)
    '七宿山': 'Seven Lodges Mountain', '个人BOSS1': 'Solo Boss 1',
    '个人BOSS2': 'Solo Boss 2', '个人BOSS3': 'Solo Boss 3', '个人BOSS4': 'Solo Boss 4',
    '个人BOSS5': 'Solo Boss 5', '个人BOSS6': 'Solo Boss 6', '个人BOSS7': 'Solo Boss 7',
    '个人BOSS8': 'Solo Boss 8', '个人BOSS9': 'Solo Boss 9', '个人BOSS10': 'Solo Boss 10',
    '全民BOSS场景': 'World Boss Scene', '皇城战': 'Castle War',

    # Dungeon remaining
    '七曜塔': 'Seven Luminaries Tower', '主线副本': 'Story Dungeon',
    '九宫寺': 'Nine Palace Temple', '云烟旗': 'Cloud Mist Flag', '云烟舍': 'Cloud Mist House',
    '同悲祠': 'Shared Grief Shrine', '天仙刹': 'Celestial Temple',
    '天罗峰': 'Heaven Net Peak', '天问亭': 'Heaven Query Pavilion',
    '掩月楼': 'Moon Shroud Tower', '散花台': 'Flower Scatter Stage',
    '朱雀台': 'Vermilion Bird Stage', '梦回临安': 'Dream of Linan',
    '残云关': 'Remnant Cloud Pass', '碎星楼': 'Star Shatter Tower',
    '聚元': 'Yuan Gathering', '聚元副本': 'Yuan Gathering Dungeon',
    '金牌副本': 'Gold Medal Dungeon', '银牌副本': 'Silver Medal Dungeon',
    '铜牌副本': 'Bronze Medal Dungeon', '爬塔副本': 'Tower Dungeon',
    '金币副本': 'Gold Dungeon', '经验副本': 'EXP Dungeon', '银币副本': 'Silver Dungeon',

    # Monster names (remaining)
    '乾陵魔神': 'Qianling Demon God', '云魂': 'Cloud Spirit',
    '修罗': 'Asura', '千绵': 'Thousand Silk', '司徒': 'Situ',
    '圣灵': 'Holy Spirit', '墨羽': 'Ink Feather', '夜叉王': 'Yaksha King',
    '夜摩天': 'Yama Heaven', '大风': 'Great Wind',

    # skill data remaining
    '50%概率立即清除技能冷却时间': '50% chance to instantly reset skill cooldown',
    '不灭': 'Undying',
    '使用技能一定概率使主目标中毒，使主目标每秒掉血%，持续*秒': 'Skill has chance to poison target, dealing %HP/s for *s',
    '使用技能一定概率使主目标冰冻': 'Skill has chance to freeze target',
    '使用技能一定概率使主目标沉默，目标只能使用普攻，持续*秒': 'Skill has chance to silence target for *s',
    '使用技能一定概率使主目标眩晕': 'Skill has chance to stun target',
    '使用技能一定概率使主目标防御降低%，持续*秒，冷却*秒': 'Skill has chance to reduce target DEF by % for *s',
    '使用技能一定概率使自身回复血量%': 'Skill has chance to recover % HP',

    # pet data (点 = points)
    '点': 'pts',

    # VIP gift packs with 专 character  
    '专属礼包': 'Exclusive Gift Pack',
}

# ── Pattern translators ──────────────────────────────────────────────────────
def translate_pattern(cn, sec):
    cn = cn.strip()

    # Juexue seal activation: 激活或提升绝学<font...>NAME</font>
    m = re.match(r"激活或提升绝学<font color='#37B700'>(.+?)</font>$", cn)
    if m:
        skill = D.get(m.group(1), m.group(1))
        return f"Activate or upgrade Juexue <font color='#37B700'>{skill}</font>"

    # Gear name patterns: Nlevel + type + quality
    gear_lev = r'^(\d+)级(攻击|防御)(橙装|紫装|红装)$'
    m = re.match(gear_lev, cn)
    if m:
        tp = {'攻击': 'ATK', '防御': 'DEF'}[m.group(2)]
        q = {'橙装': 'Orange', '紫装': 'Purple', '红装': 'Red'}[m.group(3)]
        return f"Lv.{m.group(1)} {tp} {q} Gear"

    gear_tier = r'^(\d+)阶(攻击|防御)(橙装|紫装|红装)$'
    m = re.match(gear_tier, cn)
    if m:
        tp = {'攻击': 'ATK', '防御': 'DEF'}[m.group(2)]
        q = {'橙装': 'Orange', '紫装': 'Purple', '红装': 'Red'}[m.group(3)]
        return f"Tier {m.group(1)} {tp} {q} Gear"

    # BOSS drop descriptions
    boss_lev = r'^BOSS有几率掉落(\d+)级(攻击|防御)(橙色|紫色|红色)装备$'
    m = re.match(boss_lev, cn)
    if m:
        tp = {'攻击': 'ATK', '防御': 'DEF'}[m.group(2)]
        q = {'橙色': 'Orange', '紫色': 'Purple', '红色': 'Red'}[m.group(3)]
        return f"Boss has chance to drop Lv.{m.group(1)} {tp} {q} Equipment"

    boss_tier = r'^BOSS有几率掉落(\d+)阶(攻击|防御)(橙色|紫色|红色)装备$'
    m = re.match(boss_tier, cn)
    if m:
        tp = {'攻击': 'ATK', '防御': 'DEF'}[m.group(2)]
        q = {'橙色': 'Orange', '紫色': 'Purple', '红色': 'Red'}[m.group(3)]
        return f"Boss has chance to drop Tier {m.group(1)} {tp} {q} Equipment"

    boss_plain = r'^BOSS有几率掉落(攻击|防御)(橙装|紫装|红装)$'
    m = re.match(boss_plain, cn)
    if m:
        tp = {'攻击': 'ATK', '防御': 'DEF'}[m.group(1)]
        q = {'橙装': 'Orange', '紫装': 'Purple', '红装': 'Red'}[m.group(2)]
        return f"Boss has chance to drop {tp} {q} Gear"

    # open_data: <font color='#ec1932'>到达剧情副本第N关后开启</font>
    m = re.match(r"<font color='#ec1932'>到达剧情副本第(\d+)关后开启</font>$", cn)
    if m:
        return f"<font color='#ec1932'>Unlocks after Story Dungeon Stage {m.group(1)}</font>"

    m = re.match(r"<font color='#ec1932'>(\d+)级开启(.+)</font>$", cn)
    if m:
        what = D.get(m.group(2), m.group(2))
        return f"<font color='#ec1932'>Unlocks {what} at Lv.{m.group(1)}</font>"

    m = re.match(r"<font color='#ec1932'>(\d+)级开启</font>$", cn)
    if m:
        return f"<font color='#ec1932'>Unlocks at Lv.{m.group(1)}</font>"

    # text_data: HTML font color strings with Chinese
    m = re.match(r"<font color='([^']+)'>(.+?)</font>$", cn)
    if m:
        inner = m.group(2)
        # Leave for manual or JS hook
        return None

    # VIP gift pack: 1.VIPNxx Exclusive Gift Pack (has partial translation)
    m = re.match(r'^1\.VIP(\d+)专属礼包$', cn)
    if m:
        return f'1. VIP{m.group(1)} Exclusive Gift Pack'

    # Meridian layers already handled except 任脉N层
    m = re.match(r'^(任|督|冲|带|阴维|阳维|阴跷|阳跷)脉(\d+)层$', cn)
    if m:
        names = {'任': 'Ren', '督': 'Du', '冲': 'Chong', '带': 'Dai',
                 '阴维': 'Yin Wei', '阳维': 'Yang Wei', '阴跷': 'Yin Qiao', '阳跷': 'Yang Qiao'}
        nm = names.get(m.group(1), m.group(1))
        return f"{nm} Meridian Tier {m.group(2)}"

    # Guild ranks: N阶散人 etc.
    ranks = {'散人': 'Wanderer', '弟子': 'Disciple', '旗主': 'Flag Master',
             '堂主': 'Hall Master', '护法': 'Law Protector', '舵主': 'Helmsman',
             '供奉': 'Tribute', '长老': 'Elder', '法王': 'Dharma King', '太尊': 'Grand Venerable'}
    m = re.match(r'^(\d+)阶(' + '|'.join(ranks.keys()) + r')$', cn)
    if m:
        return f'Tier {m.group(1)} {ranks[m.group(2)]}'

    # pet_data: partially translated, has 点 remaining
    m = re.search(r'(\d+)点', cn)
    if m and sec == 'pet_data':
        return cn.replace('点', 'pts')

    return None

# ── Apply all translations ───────────────────────────────────────────────────
added = 0
for k, v in data.items():
    if v.get('en') and v['en'].strip():
        continue
    cn = v.get('cn', '').strip()
    sec = v.get('section', '')

    # Direct dict lookup
    if cn in D:
        v['en'] = D[cn]
        v['source'] = 'full_dict'
        added += 1
        continue

    # Pattern
    result = translate_pattern(cn, sec)
    if result:
        v['en'] = result
        v['source'] = 'full_pattern'
        added += 1
        continue

total = len(data)
translated = sum(1 for v in data.values() if v.get('en') and v['en'].strip())
print(f'Added: {added}')
print(f'Total: {translated}/{total} ({100*translated/total:.1f}%)')

with open(TRANS_FILE, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print('Saved.')
