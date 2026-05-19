#!/usr/bin/env python3
"""
Full cw.txt translation + default.thm.json + main.min.js patches.

Correct approach:
  1. Parse outer cw.txt structure (68 top-level sections)
  2. 'language' section: rebuild 49 subsections with TRANSLATIONS dict
  3. 'attr_desc_data': binary-replace Chinese attr names inside section only
  4. All other sections: apply sections_en.json offset-based translations
  5. Rebuild outer with correct per-section dataLen fields
"""

import struct, re, os, shutil, json

BASE = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302'
TOOLS = '/home/user/Raconh/raconh5/tools'

# ── Translation map for cw.txt language section (49 UI subsections) ──────────
TRANSLATIONS = {
    # activity
    '奖励：': 'Rewards:',
    '倒计时{0}s退出': 'Exit in {0}s',
    '退出即视为挑战失败，确定离开？': 'Leaving counts as a challenge failure. Confirm?',
    '查看排名': 'View Ranking',
    '关': 'Stage',
    '背包已满，是否一键熔炼': 'Bag full. Auto-smelt?',
    '先完成任务': 'Complete quest first',
    '活跃：': 'Activity:',
    '盟贡：': 'Guild Contribution:',
    '活动未开启': 'Event not open',

    # arena
    '排名降低至第{0}名': 'Rank dropped to #{0}',
    '排名上升至第{0}名': 'Rank rose to #{0}',
    '挑战次数不足': 'Insufficient challenges',
    '不能挑战自己': 'Cannot challenge yourself',
    '您的战力低于对方，可能会导致挑战失败，是否继续？': 'Your power is lower than the opponent. Continue?',
    '是否花费{0}元宝增加次数？': 'Spend {0} gems to add attempts?',
    '第{0}名': 'Rank #{0}',
    '请等待{0}秒后再刷新': 'Wait {0}s before refreshing',
    '名字：': 'Name:',
    '战力：': 'Power:',
    '排名：': 'Rank:',
    '恭喜你挑战胜利！': 'Challenge victory!',
    '击败对方': 'Defeated opponent',
    '提升至第{0}名': 'Rose to #{0}',
    '论剑台排名不变': 'Arena rank unchanged',
    '我的排名：': 'My Rank:',
    "每日排行奖励<font color='#37B700'>00:00</font>邮件发送": "Daily rank rewards sent at <font color='#37B700'>00:00</font> by mail",
    "每个成就奖励只能领取<font color='#37B700'>1次</font>": "Each achievement reward can only be claimed <font color='#37B700'>once</font>",
    '挑战次数：{0}/{1}': 'Challenges: {0}/{1}',
    '(VIP+{0})': '(VIP+{0})',
    '后回复1次': 'then +1 attempt',
    '次数已满，不需要购买。': 'Attempts full, no purchase needed.',
    '已达到最大可购买次数，购买失败。': 'Max purchase limit reached.',

    # artifact
    '每次寻宝获得3万银币，同时必得绝学心法\n寻宝10次必得紫色品质以上绝学心法':
        'Each search yields 30,000 silver + guaranteed skill tome.\n10 searches guarantee purple-quality skill tome.',
    "<u><font color = '#38b800'>寻宝记录</font></u>": "<u><font color = '#38b800'>Search Log</font></u>",
    '积分达到{0},可领取{1}': 'Reach {0} points to claim {1}',
    '【{0}】在凌烟阁中获得{1}，真是羡煞旁人！': '[{0}] obtained {1} in the Treasure Hall!',
    '积分不足': 'Insufficient points',
    "寻宝1次，获得<font color = '#38b800'>银币*30000</font>，获得{0}":
        "Search once, get <font color = '#38b800'>Silver*30000</font> + {0}",
    "寻宝10次，获得<font color = '#38b800'>银币*300000</font>，获得{0}":
        "Search 10x, get <font color = '#38b800'>Silver*300000</font> + {0}",

    # bag
    '仓 库': 'Warehouse',
    '该场景不能前往摆摊': 'Cannot set up stall in this area',

    # battle
    '传送中不能进行此操作。': 'Cannot do this while teleporting.',
    '跳跃中不能进行此操作。': 'Cannot do this while jumping.',
    '冲刺中不能进行此操作。': 'Cannot do this while dashing.',
    '战场中不能进行此操作。': 'Cannot do this in battle.',
    '副本中不能进行此操作。': 'Cannot do this in a dungeon.',
    '眩晕中不能进行此操作。': 'Cannot do this while stunned.',
    '禁止跳跃buff中。': 'Jump disabled by buff.',
    '嘲讽中不能进行此操作。': 'Cannot do this while taunted.',
    '沉默中不能进行此操作。': 'Cannot do this while silenced.',
    '您处于和平模式，不能进行PK！': 'You are in peace mode, cannot PK!',
    '目标已死亡': 'Target is dead',
    '目标处在不可走点': 'Target is on an invalid tile',
    '您和对方同在一个盟会，不能进行PK！': 'Cannot PK a guild member!',
    '不可攻击相同阵营的成员！': 'Cannot attack same faction members!',
    '对方处于安全区域，不能进行PK！': 'Target is in a safe zone!',
    '您处于安全区域，不能进行PK！': 'You are in a safe zone!',
    '滑行中不能进行此操作。': 'Cannot do this while sliding.',
    '骑风筝状态不能进行此操作。': 'Cannot do this while kite-riding.',
    '水上漂状态不能进行此操作。': 'Cannot do this while water-gliding.',

    # boss
    '伤害第一的玩家可获得击杀大奖，其他玩家可获得参与奖励':
        'Top damage player wins kill bonus; others receive participation rewards',
    '关注': 'Follow',
    '挑战次数：{0}': 'Challenges: {0}',
    '时间：': 'Time:',
    '通关：': 'Cleared:',
    'boss已被击杀': 'Boss defeated',
    '血量：': 'HP:',
    '后重生': 'then respawn',
    '恢复倒计时：': 'Recovery:',
    '战力:': 'Power:',
    '自身伤害:': 'My Damage:',
    '我的排名：{0}': 'My Rank: {0}',
    '名次: 无排名': 'Rank: Unranked',
    '名次：': 'Rank:',
    '上次伤害：': 'Last Damage:',

    # cashCow
    '距离下次刷新：': 'Next refresh in:',
    '已完成次数': 'Completions',
    '您已无法继续赚钱，请明天再来！': 'Daily limit reached. Come back tomorrow!',
    '等级限制{0}级才可以进': 'Requires Lv.{0} to enter',

    # club (guild)
    '角色等级达到{0}级': 'Reach character Lv.{0}',
    '墨宠达到{0}阶{1}星': 'Pet tier {0}, {1} stars',
    '战力达到{0}': 'Reach {0} power',
    '盟会成员已满': 'Guild is full',
    '已经在该盟会了': 'Already in this guild',
    '盟会不存在': 'Guild does not exist',
    '已申请盟会，请等待': 'Applied, please wait',
    '请先退出原盟会': 'Leave your current guild first',
    '该玩家不在线': 'Player is offline',
    '盟会金币：': 'Guild Gold:',
    '请先申请盟会': 'Apply to guild first',
    '职位：': 'Position:',
    '贡献：': 'Contribution:',
    '盟会无相关职位': 'No such position in guild',
    '您的职位不允许此操作': 'Your position does not allow this',
    '是否确认踢出该玩家？': 'Confirm kick this player?',
    '申请成员上限：': 'Applicant limit:',
    '已申请人数：': 'Applicants:',
    '请输入盟会名称：': 'Enter guild name:',
    '您已申请盟会': 'You have applied to a guild',

    # clubBF
    '净胜场：': 'Net Wins:',
    '候选人：': 'Candidates:',
    '按连胜高到低': 'Sort by Win Streak',
    '不再提示': "Don't show again",

    # clubLeaderWar
    '请预测': 'Please predict',
    '胜': 'Win',
    '负': 'Loss',

    # friends
    '该玩家不在线': 'Player is offline',
    '该玩家正在副本中': 'Player is in a dungeon',

    # item
    '通用': 'General',
    '获得：': 'Obtained:',
    '礼包': 'Gift Pack',
    '称号': 'Title',
    '攻击宝石': 'ATK Gem',
    '生命宝石': 'HP Gem',
    '防御宝石': 'DEF Gem',
    '命格': 'Destiny',
    '资产': 'Assets',
    '状态：绑定': 'Status: Bound',

    # juexue
    '未激活': 'Not activated',
    '已激活': 'Activated',

    # juyuan
    '升阶费用：': 'Upgrade cost:',
    '升阶材料：': 'Materials:',
    '当前：': 'Current:',
    '升阶后：': 'After upgrade:',
    '降阶后：': 'After downgrade:',
    '升阶': 'Upgrade Tier',
    '拥有：': 'Owned:',
    '所需：': 'Required:',
    '材料不足': 'Insufficient materials',

    # laird
    '流放结束时间：': 'Exile ends:',
    '倒计时：': 'Countdown:',
    '我的身份：': 'My Status:',
    '自由身': 'Free',
    '苦工': 'Laborer',
    '奴隶主': 'Master',
    '宣判流放时间（时）：': 'Exile duration (hours):',
    '是否确认对{0}实施流放{1}时？': 'Exile {0} for {1} hour(s)?',
    '你的身份为自由身。可以抓捕苦工、解救盟友，获得大量经验。':
        'You are free. Can capture laborers, rescue allies, and gain EXP.',
    '你的苦工': 'My laborers',
    '离线7天以上': 'Offline 7+ days',
    '干活时间满后自动提取经验': 'EXP auto-extracted when work time is full',
    '苦工等级：{0}级': 'Laborer Lv.{0}',
    '苦工经验：{0}': 'Laborer EXP: {0}',
    '干活时间：': 'Work time:',
    '干活经验：': 'Work EXP:',
    '流放': 'Exile',
    '贿赂': 'Bribe',
    '鞭打': 'Whip',
    '解救': 'Rescue',
    '苦工还在干活': 'Laborer still working',
    '苦工经验已满': 'Laborer EXP full',
    '抓捕次数：': 'Captures:',
    '解救次数：': 'Rescues:',
    '求救次数：': 'SOS Count:',

    # lifeGrid
    '高品质命格将与底品质命格融合，底品质命格消失，保留最高属性':
        'High-quality destiny merges with lower one; lower disappears, best stats kept',
    '融合后命格属性：': 'After merge:',
    '命格融合': 'Destiny Merge',
    '命格属性：': 'Destiny Stats:',
    '觉醒：': 'Awakening:',
    '未解锁': 'Locked',
    '未满阶': 'Not max tier',
    '品质：': 'Quality:',
    '已觉醒': 'Awakened',
    '觉醒后：': 'After awakening:',
    '橙色': 'Orange',
    '紫色': 'Purple',
    '红色': 'Red',
    '蓝色': 'Blue',

    # mail
    '无附件': 'No attachment',
    '邮件已过期': 'Mail expired',

    # market
    '是否确认购买{0}x{1}，共{2}': 'Buy {0}x{1} for {2} total?',
    '是否确认出售{0}x{1}，共{2}': 'Sell {0}x{1} for {2} total?',
    '是否确认发布该道具': 'Confirm listing this item?',
    '出售中': 'Listed',
    '你没有该道具': 'You do not have this item',
    '价格有误': 'Invalid price',
    '数量有误': 'Invalid quantity',
    '持有数量': 'Holding',
    '单价': 'Unit Price',
    '数量': 'Qty',
    '总价': 'Total',
    '已售出': 'Sold',
    '下架': 'Delist',
    '购买': 'Buy',
    '出售': 'Sell',
    '刷新': 'Refresh',
    '确认': 'Confirm',

    # material
    '合成': 'Craft',
    '材料：': 'Materials:',
    '合成材料不足': 'Insufficient craft materials',

    # offlineProfit
    '最大收益时间：': 'Max profit time:',
    '已经挂机了：': 'AFK time:',
    '您下线了{0}，获得经验': 'Offline {0}, earned EXP',
    '您下线了{0}，未获得收益，请激活vip特权': 'Offline {0}, no profit. Activate VIP.',

    # pet
    '资质：': 'Aptitude:',
    '心法：': 'Technique:',
    '属性：': 'Stats:',
    '等级：': 'Level:',
    '战力：': 'Power:',
    '购买次数已达上限': 'Purchase limit reached',
    '技能：': 'Skill:',
    '您的战力低于对方，可能会导致挑战失败，是否继续？': 'Power lower than opponent, continue?',

    # qiandao
    '今天已签到': 'Already checked in today',
    '累计签到{0}天': 'Total check-ins: {0}',
    '今日已补签': 'Already made up today',
    '无需补签': 'No make-up needed',
    '未签到天数：': 'Missed days:',
    '可补签次数：': 'Make-up chances:',

    # rank
    '总计：': 'Total:',
    '我的数据：': 'My Stats:',
    '战力数据：': 'Power Data:',
    '我的等级：': 'My Level:',
    '我的总等级：': 'My Total Level:',
    '我的境界：': 'My Realm:',
    '境界：': 'Realm:',

    # rechargeActivity
    '充值{0}元，可领取以下奖励：': 'Recharge {0} to claim rewards:',
    '充值{0}元宝，可领取以下奖励：': 'Spend {0} gems to claim rewards:',
    '限时活动，活动结束后将自动领取奖励': 'Limited event — rewards auto-claimed after event',
    '已充值：{0}': 'Recharged: {0}',
    '目标充值：{0}': 'Target: {0}',

    # rein (rebirth)
    '转生需要{0}级': 'Rebirth requires Lv.{0}',
    '再次转生需要经验达到满级': 'Rebirth again requires max EXP',
    '是否确认转生？': 'Confirm rebirth?',
    '转生成功！': 'Rebirth successful!',
    '当前经验：': 'Current EXP:',
    '转生后将重置等级': 'Level resets after rebirth',
    '最大转生次数已达到上限': 'Max rebirths reached',
    '转生条件：': 'Rebirth Requirements:',

    # relicstuff
    '当前元魂激活属性': 'Active Soul Stats',
    '元魂效果': 'Soul Effect',
    '等级不足': 'Level too low',
    '效果：': 'Effect:',
    '激活': 'Activate',

    # rename
    '请输入新名字：': 'Enter new name:',
    '名字长度不符合要求': 'Name length invalid',
    '名字不合法': 'Invalid name',
    '修改成功！': 'Changed successfully!',
    '确认修改名字？': 'Confirm name change?',
    '确认花费{0}修改名字？': 'Spend {0} to change name?',

    # revive
    '是否花费{0}元宝复活？': 'Spend {0} gems to revive?',
    '是否免费复活？': 'Revive for free?',

    # shop
    '<font color="#38b800">购买成功</font>': '<font color="#38b800">Purchase successful</font>',
    '下批珍宝刷新时间：': 'Next refresh:',
    '今天元宝可刷新次数已达到上限': 'Daily gem refresh limit reached',

    # skill
    '技能已满级': 'Skill at max level',
    '技能等级不可大于角色等级': 'Skill level cannot exceed character level',
    '全部技能已满级': 'All skills at max level',
    '冷却：{0}秒': 'Cooldown: {0}s',
    '范围：': 'Range:',
    '目标：{0}个': 'Targets: {0}',
    "转生：<font color='{0}'>{1}转</font>": "Rebirth: <font color='{0}'>{1}x</font>",

    # soldier
    '分解材料返还：': 'Dismantle returns:',
    '拆解成功后当前部位重置为未打造状态': 'Dismantling resets this slot to unforged',
    '并返还全部升阶消耗材料：': 'Returns all upgrade materials:',
    '高品质命格将与底品质命格融合底品质命格消失，保留最高属性':
        'High-quality destiny absorbs lower; best stats kept',

    # srv_rank
    '排名：': 'Rank:',

    # starUp
    '升星材料：': 'Star upgrade materials:',
    '升星概率：': 'Success rate:',
    '提升成功': 'Upgrade successful',
    '提升失败': 'Upgrade failed',

    # storm
    '已被其他玩家抓捕': 'Captured by another player',
    '你被{0}击败了': 'You were defeated by {0}',
    '你击败了{0}！': 'You defeated {0}!',
    '互动保护：': 'Interaction Protection:',
    '互动次数：': 'Interactions:',
    "今日互动：": "Today's Interactions:",
    "今日解救次数：": "Today's Rescues:",
    '倒计时后将在中立地区安全区自动复活': 'Will auto-revive in safe zone after countdown',
    '向你求救': 'Asking for rescue',
    '向您求救': 'Asking for your rescue',
    '互动保护时间内不可反抗或解救': 'Cannot resist or rescue during protection',
    '你的身份：': 'Your Status:',

    # SysInvest
    "是否花费<font color = '#38b800'>{0}元</font>购买<font color = '#38b800'>{1}</font>？\n（购买金额计算至VIP成长值，但不计算至当日其他充值活动）":
        "Spend <font color = '#38b800'>{0}</font> to buy <font color = '#38b800'>{1}</font>?\n(Counts toward VIP exp but not daily recharge events)",
    '累计登陆第{0}天，可领取{1}': 'Login {0} days total to claim {1}',
    '人物角色达到{0}，可领取{1}': 'Character reaches {0} to claim {1}',

    # SysNotice
    '{0}关开启': 'Stage {0} opens',

    # SysPrivilege
    "是否花费<font color = '#38b800'>{0}元</font>购买<font color = '#38b800'>{1}</font>特权卡？":
        "Spend <font color = '#38b800'>{0}</font> to buy <font color = '#38b800'>{1}</font> privilege card?",
    '尊贵黄金特权称号，战力飙升5888！': 'Prestigious Gold title — Power +5888!',
    '绝版钻石特权神宠，战力飙升38888！': 'Exclusive Diamond divine pet — Power +38888!',
    '元宝狂送无上限，每天免费领取！': 'Unlimited gem gifts — claim free daily!',
    '宝石、墨宠、转生属性加成！': 'Gem, Pet, Rebirth stat bonuses!',
    '挂机经验、挂机金币效率加成！': 'AFK EXP and gold efficiency bonus!',
    "体验时间：<font color = '#38b800'>{0}</font>\n挂机效益<font color = '#38b800'>+20%</font>":
        "Trial time: <font color = '#38b800'>{0}</font>\nAFK income <font color = '#38b800'>+20%</font>",

    # task
    '第1关通关或': 'Clear Stage 1 or',
    '自动任务开启后，可获得以下功能\n1、自动提交任务\n2、自动剧情副本':
        'Auto-quest enabled:\n1. Auto-submit quests\n2. Auto-story dungeons',
    '背包空间不足，请及时清理！': 'Bag space insufficient — please clear it!',
    '第{0}关': 'Stage {0}',
    '最强群攻 全屏大招': 'Ultimate AoE — Full-screen skill',
    '天下绝学 世出凌烟': 'Supreme arts of the realm',

    # title
    '称号属性': 'Title Stats',
    '称号效果': 'Title Effect',
    '装备称号': 'Equip Title',

    # training
    '活动开启时间：{0}': 'Event opens at: {0}',
    '{0}倍': 'x{0}',
    '额外': 'Bonus',
    '{0}倍传功中…': 'x{0} training in progress...',
    "倒计时{0}秒退出": "Exit in {0}s",
    '传功中无法操作': 'Cannot act while training',
    '本日已完成传功': 'Training done for today',
    '经验效率：': 'EXP efficiency:',
    '累计经验：': 'Total EXP:',
    '预计收益': 'Estimated income',
    '开启2倍传功收益更大，更有额外的奖励': 'x2 training gives more EXP and bonus rewards',
    '消耗：': 'Cost:',

    # vip
    "再充值<font color='#FD7100'>{0}元宝</font>成为VIP{1}":
        "Recharge <font color='#FD7100'>{0} gems</font> to reach VIP{1}",
    '已达VIP最高级': 'Max VIP reached',
    '成为VIP{0}': 'Become VIP{0}',

    # worldLeve
    '挑战失败，战力不足！': 'Challenge failed: insufficient power',
    '世界难度开启中，请等待': 'World difficulty opening, please wait',

    # worldMap
    '我的位置：': 'My Location:',
    '地图：': 'Map:',

    # copy
    '下一难度\n角色': 'Next difficulty:\nCharacter',
    "下一难度：角色达到<font color='#4eff00'>{0}</font>开启":
        "Next difficulty: Reach <font color='#4eff00'>{0}</font>",
}

# ── Attr name translations for attr_desc_data binary patching ─────────────────
# Applied WITHIN attr_desc_data section only (safe — sizes recalculated in outer)
ATTR_NAMES_IN_SECTION = {
    # long names (must be shorter or equal in UTF-8 bytes)
    '移动': 'Speed',        # 6 → 5 bytes ✓
    '气血': 'HP Max',       # 6 → 6 bytes ✓ (exact)
    '生命': 'HP',           # 6 → 2 bytes ✓
    '攻击': 'ATK',          # 6 → 3 bytes ✓
    '防御': 'DEF',          # 6 → 3 bytes ✓
    '破甲': 'Pen',          # 6 → 3 bytes ✓
    '命中': 'Hit',          # 6 → 3 bytes ✓
    '闪避': 'Eva',          # 6 → 3 bytes ✓
    '暴击': 'Crit',         # 6 → 4 bytes ✓
    '坚韧': 'TEN',          # 6 → 3 bytes ✓
    '生命恢复': 'HP Regen',  # 12 → 8 bytes ✓
    '经验加成': 'EXP+',     # 12 → 4 bytes ✓
    '伤害加深': 'DMG+',     # 12 → 4 bytes ✓
    '伤害减免': 'DMG-',     # 12 → 4 bytes ✓
    '暴击几率': 'Crit%',    # 12 → 5 bytes ✓
    '暴击抵抗': 'CritRes',  # 12 → 7 bytes ✓
    '暴伤加成': 'CritDMG+', # 12 → 8 bytes ✓
    '暴伤减免': 'CritDMG-', # 12 → 8 bytes ✓
    '命中几率': 'Hit%',     # 12 → 4 bytes ✓
    '闪避几率': 'Eva%',     # 12 → 4 bytes ✓
    '气血增加': 'HP',        # 12 → 2 bytes ✓ (display: "HP +N%" via AttrVoInfo)
    '攻击增加': 'ATK',      # 12 → 3 bytes ✓ (display: "ATK +N%")
    '防御增加': 'DEF',      # 12 → 3 bytes ✓
    '破甲增加': 'Pen',      # 12 → 3 bytes ✓
    '命中增加': 'Hit',      # 12 → 3 bytes ✓
    '闪避增加': 'Eva',      # 12 → 3 bytes ✓
    '暴击增加': 'Crit',     # 12 → 4 bytes ✓
    '坚韧增加': 'TEN',      # 12 → 3 bytes ✓
    '每5级气血': 'HP/5Lv',  # 13 → 6 bytes ✓
    '每5级攻击': 'ATK/5Lv', # 13 → 7 bytes ✓
    '每5级防御': 'DEF/5Lv', # 13 → 7 bytes ✓
    '每5级破甲': 'Pen/5Lv', # 13 → 7 bytes ✓
    '每5级命中': 'Hit/5Lv', # 13 → 7 bytes ✓
    '每5级闪避': 'Eva/5Lv', # 13 → 7 bytes ✓
    '每5级暴击': 'Crt/5Lv', # 13 → 7 bytes ✓
    '每5级坚韧': 'TEN/5Lv', # 13 → 7 bytes ✓
    # short names (same replacements but might overlap; OK since we replace all)
    '经验': 'EXP',          # 6 → 3 bytes ✓
    '加伤': 'DMG+',         # 6 → 4 bytes ✓
    '免伤': 'DMG-',         # 6 → 4 bytes ✓
    '暴率': 'CritR',        # 6 → 5 bytes ✓
    '暴抗': 'CrtRs',        # 6 → 5 bytes ✓
    '暴伤': 'CrtDM',        # 6 → 5 bytes ✓
    '命中率': 'HitR',       # 9 → 4 bytes ✓
    '闪避率': 'EvaR',       # 9 → 4 bytes ✓
}

# ── Outer cw.txt structure helpers ───────────────────────────────────────────

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


def build_outer(sections):
    """Rebuild cw.txt from list of (name, data) with correct size fields."""
    out = bytearray()
    out.append(len(sections))
    for name, sec_data in sections:
        name_b = name.encode('utf-8')
        out += struct.pack('>H', len(name_b)) + name_b
        out += struct.pack('>I', len(sec_data))
        out += sec_data
    return bytes(out)

# ── Language section (49 UI subsections) ──────────────────────────────────────

def translate_language_section(sec_bytes):
    """Parse 49 subsections, apply TRANSLATIONS, return rebuilt bytes."""
    # Load lang_en.json for additional translations (by section+id key)
    lang_en_path = os.path.join(TOOLS, 'lang_en.json')
    lang_en = {}
    if os.path.exists(lang_en_path):
        with open(lang_en_path, 'r', encoding='utf-8') as f:
            lang_en = json.load(f)

    pos = 0
    table_count = sec_bytes[pos]; pos += 1
    out = bytearray()
    out.append(table_count)

    translated = 0
    for _ in range(table_count):
        name_len = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
        name = sec_bytes[pos:pos+name_len].decode('utf-8'); pos += name_len
        str_count = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2

        out += struct.pack('>H', len(name.encode('utf-8'))) + name.encode('utf-8')
        out += struct.pack('>H', str_count)

        for _ in range(str_count):
            sid = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
            slen = struct.unpack_from('>H', sec_bytes, pos)[0]; pos += 2
            sval = sec_bytes[pos:pos+slen].decode('utf-8'); pos += slen

            # Try TRANSLATIONS dict first, then lang_en.json
            key = f'{name}{sid}'
            if sval in TRANSLATIONS:
                en_val = TRANSLATIONS[sval]
                translated += 1
            elif key in lang_en and lang_en[key] != sval:
                en_val = lang_en[key]
                translated += 1
            else:
                en_val = sval

            en_bytes = en_val.encode('utf-8')
            out += struct.pack('>H', sid)
            out += struct.pack('>H', len(en_bytes)) + en_bytes

    print(f'  Language section: translated {translated} strings')
    return bytes(out)

# ── Attr desc data section: binary replace attr names ─────────────────────────

def translate_attr_desc_section(sec_bytes):
    """Replace Chinese attr names within attr_desc_data using length-prefix pattern."""
    data = bytearray(sec_bytes)
    count = 0
    for cn, en in ATTR_NAMES_IN_SECTION.items():
        cn_b = cn.encode('utf-8')
        en_b = en.encode('utf-8')
        if len(en_b) > len(cn_b):
            continue  # can't expand without risking overflow
        old = struct.pack('>H', len(cn_b)) + cn_b
        new = struct.pack('>H', len(en_b)) + en_b
        n = bytes(data).count(old)
        if n > 0:
            data = bytearray(bytes(data).replace(old, new))
            count += n
    print(f'  attr_desc_data: replaced {count} attr name occurrences')
    return bytes(data)

# ── Generic section: apply sections_en.json translations ─────────────────────

CJK = re.compile(r'[一-鿿㐀-䶿]')


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
                if len(reenc) == str_len and CJK.search(candidate):
                    found.append((i, candidate))
                    i += 2 + str_len
                    continue
            except UnicodeDecodeError:
                pass
        i += 1
    return found


def apply_translations(sec_bytes, translations_by_offset):
    """Replace strings at specific byte offsets within sec_bytes."""
    if not translations_by_offset:
        return sec_bytes
    items = sorted(translations_by_offset.items())
    chunks = []
    cursor = 0
    buf = sec_bytes
    for offset, (original, translated) in items:
        orig_b = original.encode('utf-8')
        trans_b = translated.encode('utf-8')
        if offset < cursor:
            continue
        if offset + 2 + len(orig_b) > len(buf):
            continue
        stored_len = struct.unpack_from('>H', buf, offset)[0]
        if stored_len != len(orig_b):
            continue
        try:
            stored_str = buf[offset+2:offset+2+len(orig_b)].decode('utf-8')
        except UnicodeDecodeError:
            continue
        if stored_str != original:
            continue
        chunks.append(buf[cursor:offset])
        chunks.append(struct.pack('>H', len(trans_b)))
        chunks.append(trans_b)
        cursor = offset + 2 + len(orig_b)
    chunks.append(buf[cursor:])
    return b''.join(chunks)


def translate_generic_section(name, sec_bytes, sections_en, sections_cn):
    """Apply sections_en.json translations to a non-language section."""
    hits = scan_chinese(sec_bytes)
    translations_by_offset = {}
    replaced = 0
    for offset, text in hits:
        key = f'{name}|{offset}'
        if key in sections_en and sections_en[key] != text:
            translations_by_offset[offset] = (text, sections_en[key])
            replaced += 1
    if replaced > 0:
        result = apply_translations(sec_bytes, translations_by_offset)
        print(f'  {name}: translated {replaced} strings')
        return result
    return sec_bytes

# ── Main translation pipeline ─────────────────────────────────────────────────

def translate_cw(web_cw_path):
    with open(web_cw_path, 'rb') as f:
        data = f.read()
    print(f'Original size: {len(data):,} bytes')

    # Load sections_en.json (non-language section translations)
    sections_en = {}
    sections_cn = {}
    en_path = os.path.join(TOOLS, 'sections_en.json')
    cn_path = os.path.join(TOOLS, 'sections_cn.json')
    if os.path.exists(en_path):
        with open(en_path, 'r', encoding='utf-8') as f:
            sections_en = json.load(f)
    if os.path.exists(cn_path):
        with open(cn_path, 'r', encoding='utf-8') as f:
            sections_cn = json.load(f)

    sections = parse_outer(data)
    print(f'Parsed {len(sections)} top-level sections')

    new_sections = []
    for name, sec_bytes in sections:
        if name == 'language':
            new_sec = translate_language_section(sec_bytes)
        elif name == 'attr_desc_data':
            new_sec = translate_attr_desc_section(sec_bytes)
            # Also apply any sections_en overrides
            new_sec = translate_generic_section(name, new_sec, sections_en, sections_cn)
        else:
            new_sec = translate_generic_section(name, sec_bytes, sections_en, sections_cn)
        new_sections.append((name, new_sec))

    new_data = build_outer(new_sections)
    print(f'New size: {len(new_data):,} bytes')

    # Backup + write
    bak = web_cw_path + '.bak'
    if not os.path.exists(bak):
        shutil.copy2(web_cw_path, bak)
        print(f'Backup: {bak}')
    with open(web_cw_path, 'wb') as f:
        f.write(new_data)
    print(f'Written: {web_cw_path}')

# ── Patch default.thm.json ───────────────────────────────────────────────────

THM_TRANSLATIONS = {
    r't\.text\s*=\s*\\"攻击：\\"': 't.text = \\"Attack:\\"',
    r't\.text\s*=\s*\\"破甲：\\"': 't.text = \\"Armor Break:\\"',
    r't\.text\s*=\s*\\"战力：\\"': 't.text = \\"Power:\\"',
    r't\.text\s*=\s*\\"等级：\\"': 't.text = \\"Level:\\"',
    r't\.text\s*=\s*\\"职业：\\"': 't.text = \\"Class:\\"',
    r't\.text\s*=\s*\\"极品属性\\"': 't.text = \\"Legendary Stats\\"',
    r't\.text\s*=\s*\\"铸魂属性\\"': 't.text = \\"Soul Attributes\\"',
    r't\.text\s*=\s*\\"\(强化\+0\)\\"': 't.text = \\"(Enh+0)\\"',
    r't\.text\s*=\s*\\"无\\"': 't.text = \\"None\\"',
    r't\.text\s*=\s*\\"攻击套装\\"': 't.text = \\"Attack Set\\"',
    r't\.text\s*=\s*\\"防具套装\\"': 't.text = \\"Defense Set\\"',
    r't\.text\s*=\s*\\"宝石阶段属性\\"': 't.text = \\"Gem Tier Stats\\"',
    r't\.text\s*=\s*\\"铸魂阶段属性\\"': 't.text = \\"Soul Tier Stats\\"',
    r't\.text\s*=\s*\\"阶段奖励属性\\"': 't.text = \\"Tier Bonus Stats\\"',
    r't\.text\s*=\s*\\"所需材料\\"': 't.text = \\"Materials\\"',
    r't\.text\s*=\s*\\"未打造\\"': 't.text = \\"Unforged\\"',
    r't\.text\s*=\s*\\"套装效果\\"': 't.text = \\"Set Effect\\"',
    r't\.text\s*=\s*\\"（已激活）\\"': 't.text = \\"(Active)\\"',
    r't\.text\s*=\s*\\"（未激活）\\"': 't.text = \\"(Inactive)\\"',
    r't\.text\s*=\s*\\"（下级效果）\\"': 't.text = \\"(Next Tier)\\"',
    r't\.text\s*=\s*\\"详细属性\\"': 't.text = \\"Detailed Stats\\"',
    r't\.text\s*=\s*\\"排名：\\"': 't.text = \\"Rank:\\"',
    r't\.text\s*=\s*\\"仓 库\\"': 't.text = \\"Warehouse\\"',
    r't\.text\s*=\s*\\"单价\\"': 't.text = \\"Unit Price\\"',
    r't\.text\s*=\s*\\"数量\\"': 't.text = \\"Qty\\"',
    r't\.text\s*=\s*\\"总价\\"': 't.text = \\"Total\\"',
    r't\.text\s*=\s*\\"提 示\\"': 't.text = \\"Tip\\"',
    r't\.text\s*=\s*\\"提示\\"': 't.text = \\"Tips\\"',
    r't\.text\s*=\s*\\"奖励：\\"': 't.text = \\"Rewards:\\"',
    r't\.text\s*=\s*\\"奖励预览\\"': 't.text = \\"Reward Preview\\"',
    r't\.text\s*=\s*\\"寻宝记录\\"': 't.text = \\"Search Log\\"',
    r't\.text\s*=\s*\\"名字\\"': 't.text = \\"Name\\"',
    r't\.text\s*=\s*\\"名称\\"': 't.text = \\"Name\\"',
    r't\.text\s*=\s*\\"数据\\"': 't.text = \\"Stats\\"',
    r't\.text\s*=\s*\\"无职位\\"': 't.text = \\"No Title\\"',
    r't\.text\s*=\s*\\"在线\\"': 't.text = \\"Online\\"',
    r't\.text\s*=\s*\\"身份：\\"': 't.text = \\"Status:\\"',
    r't\.text\s*=\s*\\"自由\\"': 't.text = \\"Free\\"',
    r't\.text\s*=\s*\\"流放\\"': 't.text = \\"Exile\\"',
    r't\.text\s*=\s*\\"贿赂\\"': 't.text = \\"Bribe\\"',
    r't\.text\s*=\s*\\"鞭打\\"': 't.text = \\"Whip\\"',
    r't\.text\s*=\s*\\"抓捕次数：\\"': 't.text = \\"Captures:\\"',
    r't\.text\s*=\s*\\"解救次数：\\"': 't.text = \\"Rescues:\\"',
    r't\.text\s*=\s*\\"求救次数：\\"': 't.text = \\"SOS:\\"',
    r't\.text\s*=\s*\\"今日互动：\\"': 't.text = \\"Today Interactions:\\"',
    r't\.text\s*=\s*\\"今日解救次数：\\"': 't.text = \\"Today Rescues:\\"',
    r't\.text\s*=\s*\\"苦工名称：\\"': 't.text = \\"Laborer Name:\\"',
    r't\.text\s*=\s*\\"苦工等级：\\"': 't.text = \\"Laborer Level:\\"',
    r't\.text\s*=\s*\\"苦工经验：\\"': 't.text = \\"Laborer EXP:\\"',
    r't\.text\s*=\s*\\"干活时间：\\"': 't.text = \\"Work Time:\\"',
    r't\.text\s*=\s*\\"干活经验：\\"': 't.text = \\"Work EXP:\\"',
    r't\.text\s*=\s*\\"膜拜次数：\\"': 't.text = \\"Worships:\\"',
    r't\.text\s*=\s*\\"互动保护：\\"': 't.text = \\"Interaction Protection:\\"',
    r't\.text\s*=\s*\\"互动次数：\\"': 't.text = \\"Interactions:\\"',
    r't\.text\s*=\s*\\"查看排名\\"': 't.text = \\"View Ranking\\"',
    r't\.text\s*=\s*\\"全选\\"': 't.text = \\"Select All\\"',
    r't\.text\s*=\s*\\"全部升阶\\"': 't.text = \\"Upgrade All\\"',
    r't\.text\s*=\s*\\"净胜场：\\"': 't.text = \\"Net Wins:\\"',
    r't\.text\s*=\s*\\"候选人：\\"': 't.text = \\"Candidates:\\"',
    r't\.text\s*=\s*\\"战力\\"': 't.text = \\"Power\\"',
    r't\.text\s*=\s*\\"攻击\\"': 't.text = \\"ATK\\"',
    r't\.text\s*=\s*\\"防御\\"': 't.text = \\"DEF\\"',
    r't\.text\s*=\s*\\"生命\\"': 't.text = \\"HP\\"',
    r't\.text\s*=\s*\\"破甲\\"': 't.text = \\"Pen\\"',
    r't\.text\s*=\s*\\"觉醒：\\"': 't.text = \\"Awakening:\\"',
    r't\.text\s*=\s*\\"积分\\"': 't.text = \\"Points\\"',
    r't\.text\s*=\s*\\"级\\"': 't.text = \\"Lv\\"',
    r't\.text\s*=\s*\\"阶\\"': 't.text = \\"Tier\\"',
    r't\.text\s*=\s*\\"防守\\"': 't.text = \\"Defense\\"',
    r't\.text\s*=\s*\\"冷却时间：\\"': 't.text = \\"Cooldown:\\"',
    r't\.text\s*=\s*\\"时间：\\"': 't.text = \\"Time:\\"',
    r't\.text\s*=\s*\\"血量：\\"': 't.text = \\"HP:\\"',
    r't\.text\s*=\s*\\"名字名名名名\\"': 't.text = \\"Player Name\\"',
    r't\.text\s*=\s*\\"门派成员\\"': 't.text = \\"Sect Members\\"',
    r't\.text\s*=\s*\\"更换装备不影响所镶嵌的宝石\\"': 't.text = \\"Gems stay when switching gear\\"',
    r't\.text\s*=\s*\\"更换装备强化等级将完美继承\\"': 't.text = \\"Enhancement level transfers\\"',
    r't\.text\s*=\s*\\"更换装备铸魂等级将完美继承\\"': 't.text = \\"Soul-forge level transfers\\"',
    r't\.text\s*=\s*\\"一次可熔炼50件装备\\"': 't.text = \\"Smelt up to 50 items at once\\"',
    r't\.text\s*=\s*\\"全身宝石\+30\\"': 't.text = \\"All gems +30\\"',
    r't\.text\s*=\s*\\"全身铸魂\+30\\"': 't.text = \\"All soul-forge +30\\"',
    r't\.text\s*=\s*\\"品质：\\"': 't.text = \\"Quality:\\"',
    r't\.text\s*=\s*\\"已穿戴\\"': 't.text = \\"Equipped\\"',
    r't\.text\s*=\s*\\"可补签到次数：\\"': 't.text = \\"Make-up Check-ins:\\"',
    r't\.text\s*=\s*\\"累计签到次数：\\"': 't.text = \\"Total Sign-ins:\\"',
    r't\.text\s*=\s*\\"亲爱的玩家\\"': 't.text = \\"Dear Player\\"',
    r't\.text\s*=\s*\\"附件：\\"': 't.text = \\"Attachment:\\"',
    r't\.text\s*=\s*\\"聚元丹：\\"': 't.text = \\"Focus Pill:\\"',
    r't\.text\s*=\s*\\"宠物资质丹\\"': 't.text = \\"Pet Talent Pill\\"',
    r't\.text\s*=\s*\\"当前元魂激活属性\\"': 't.text = \\"Active Soul Stats\\"',
    r't\.text\s*=\s*\\"现任掌门：\\"': 't.text = \\"Current Master:\\"',
    r't\.text\s*=\s*\\"用时\\"': 't.text = \\"Time Used\\"',
    r't\.text\s*=\s*\\"点击换服\\"': 't.text = \\"Switch Server\\"',
    r't\.text\s*=\s*\\"点击空白区域关闭窗口\\"': 't.text = \\"Tap blank area to close\\"',
    r't\.text\s*=\s*\\"再充\\"': 't.text = \\"Recharge\\"',
    r't\.text\s*=\s*\\"成为VIP1\\"': 't.text = \\"Become VIP1\\"',
    r't\.text\s*=\s*\\"提升vip等级\\"': 't.text = \\"Upgrade VIP\\"',
    r't\.text\s*=\s*\\"每日0点结算\\"': 't.text = \\"Resets at midnight\\"',
    r't\.text\s*=\s*\\"每日排名奖励00:00邮件发送\\"': 't.text = \\"Daily rank rewards by mail at 00:00\\"',
    r't\.text\s*=\s*\\"每次成功提升都可增加人物10%的经验收益\\"': 't.text = \\"Each success grants +10% EXP gain\\"',
    # Additional thm patches for item tooltip sections
    r't\.text\s*=\s*\\"不再提示\\"': 't.text = \\"Don\'t show again\\"',
    r't\.text\s*=\s*\\"按连胜高到低\\"': 't.text = \\"Sort by Win Streak\\"',
}


def patch_thm(path):
    bak = path + '.bak'
    if not os.path.exists(bak):
        shutil.copy2(path, bak)
        print(f'Backup: {bak}')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    count = 0
    for pattern, replacement in THM_TRANSLATIONS.items():
        new_content, n = re.subn(pattern, replacement, content)
        if n > 0:
            content = new_content
            count += n
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Patched {count} strings in {path}')

# ── Patch main.min.js ────────────────────────────────────────────────────────

# Correct attr ID → English name map (confirmed from attr_desc_data binary)
ATTR_JS_OVERRIDE = r"""
(function() {
    var _orig = AttrDescTypeEx.getAttrName;
    var _attrMap = {
        10:'Speed',11:'HP Max',12:'HP',13:'ATK',14:'DEF',15:'Pen',
        16:'Hit',17:'Eva',18:'Crit',19:'TEN',20:'HP Regen',
        21:'EXP+',22:'DMG+',23:'DMG-',24:'Crit%',25:'CritRes',
        26:'CritDMG+',27:'CritDMG-',28:'Hit%',29:'Eva%',
        30:'HP+%',31:'ATK+%',32:'DEF+%',33:'Pen+%',
        34:'Hit+',35:'Eva+',36:'Crit+',37:'TEN+',
        38:'HP/5Lv',39:'ATK/5Lv',40:'DEF/5Lv',41:'Pen/5Lv',
        42:'Hit/5Lv',43:'Eva/5Lv',44:'Crt/5Lv',45:'TEN/5Lv'
    };
    AttrDescTypeEx.getAttrName = function(t) {
        if (_attrMap[t]) return _attrMap[t];
        var r = _orig.call(this, t);
        return r;
    };
})();
"""

JS_PATCHES = [
    ('（强化+', '(Enh+'),
    ('）","#38b800"', ')","#38b800"'),  # fix full-width closing paren after Enh+N
]

# Runtime text replacement for server-sent Chinese strings (added to end of main.min.js)
RUNTIME_TEXT_HOOK = r"""
// Runtime Chinese→English text replacement hook
(function(){
    var _m={
        '极品属性':'Bonus Stats','铸魂属性':'Soul Stats','套装效果':'Set Effect',
        '强化':'Enh','强化石':'Enh Stone',
        '攻击增加':'ATK','防御增加':'DEF','破甲增加':'Pen','命中增加':'Hit',
        '闪避增加':'Eva','暴击增加':'Crit','坚韧增加':'TEN','气血增加':'HP',
        '每5级攻击':'ATK/5Lv','每5级气血':'HP/5Lv','每5级防御':'DEF/5Lv',
        '每5级破甲':'Pen/5Lv','每5级命中':'Hit/5Lv','每5级闪避':'Eva/5Lv',
        '每5级暴击':'Crt/5Lv','每5级坚韧':'TEN/5Lv',
        '蓝冥石(1级)':'Sapphire Lv.1','蓝冥石(2级)':'Sapphire Lv.2',
        '蓝冥石(3级)':'Sapphire Lv.3','蓝冥石(4级)':'Sapphire Lv.4',
        '蓝冥石(5级)':'Sapphire Lv.5','蓝冥石(6级)':'Sapphire Lv.6',
        '蓝冥石(7级)':'Sapphire Lv.7','蓝冥石(8级)':'Sapphire Lv.8',
        '蓝冥石(9级)':'Sapphire Lv.9','蓝冥石(10级)':'Sapphire Lv.10',
        '血精石(1级)':'Blood Crystal Lv.1','血精石(2级)':'Blood Crystal Lv.2',
        '血精石(3级)':'Blood Crystal Lv.3','血精石(4级)':'Blood Crystal Lv.4',
        '血精石(5级)':'Blood Crystal Lv.5',
        '气血':'HP','攻击':'ATK','防御':'DEF','破甲':'Pen',
        '命中':'Hit','闪避':'Eva','暴击':'Crit','坚韧':'TEN',
        '战力':'Power','等级':'Level',
        '未激活':'Inactive','已激活':'Active',
        '普通':'Normal','精英':'Elite','史诗':'Epic',
        '次数不足':'Insufficient attempts','银币不足':'Insufficient silver',
    };
    function _rep(s){
        if(typeof s!=='string')return s;
        for(var k in _m)if(s.indexOf(k)>=0)s=s.split(k).join(_m[k]);
        return s;
    }
    // Patch HtmlUtil.addColorTag to translate text before adding color
    if(typeof HtmlUtil!=='undefined'&&HtmlUtil.addColorTag){
        var _orig=HtmlUtil.addColorTag;
        HtmlUtil.addColorTag=function(t,c){return _orig.call(this,_rep(t),c);};
    }
    // Patch via global setter hook - runs after egret loads
    var _patch=function(){
        if(typeof egret==='undefined'||!egret.TextField||!egret.TextField.prototype)return;
        var p=egret.TextField.prototype;
        // Try defineProperty approach
        var _d=null;
        try{_d=Object.getOwnPropertyDescriptor(p,'text');}catch(e){}
        if(_d&&_d.set&&!p.__cwPatched){
            p.__cwPatched=true;
            Object.defineProperty(p,'text',{get:_d.get,set:function(v){_d.set.call(this,_rep(v));},configurable:true,enumerable:_d.enumerable});
        }
    };
    if(typeof setTimeout!=='undefined')setTimeout(_patch,50);
    if(typeof setTimeout!=='undefined')setTimeout(_patch,500);
    if(typeof setTimeout!=='undefined')setTimeout(_patch,2000);
})();
"""


def patch_js(path):
    bak = path + '.bak'
    if not os.path.exists(bak):
        shutil.copy2(path, bak)
        print(f'Backup: {bak}')
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    count = 0
    for old, new in JS_PATCHES:
        n = content.count(old)
        if n > 0:
            content = content.replace(old, new)
            count += n
            print(f'  JS patched {n}x: {old!r} -> {new!r}')

    # Remove old (wrong) AttrCVO override if present, inject correct one
    inject_marker = 'AttrDescTypeEx.getAttrName'
    if '_attrMap' in content:
        # Remove old injection and re-inject with correct IDs
        old_inject_start = content.find('(function() {\n    var _orig = AttrDescTypeEx')
        if old_inject_start < 0:
            old_inject_start = content.find('// English attr name overrides')
        if old_inject_start >= 0:
            old_inject_end = content.find('})();', old_inject_start)
            if old_inject_end >= 0:
                old_inject_end += 5  # include '})();'
                content = content[:old_inject_start] + content[old_inject_end:]
                print('  Removed old AttrCVO override')
                count += 1

    # Find injection point
    idx = content.rfind(inject_marker)
    if idx >= 0:
        end_idx = content.find(';', idx)
        if end_idx >= 0 and '_attrMap' not in content:
            content = content[:end_idx+1] + ATTR_JS_OVERRIDE + content[end_idx+1:]
            count += 1
            print('  Injected corrected AttrCVO English override')

    # Inject runtime text replacement hook at end of file (once)
    if 'RUNTIME_TEXT_HOOK' not in content and '__cwPatched' not in content:
        content = content + RUNTIME_TEXT_HOOK
        count += 1
        print('  Injected runtime text replacement hook')

    with open(path, 'w', encoding='utf-8', errors='replace') as f:
        f.write(content)
    print(f'Total JS patches: {count}')

# ── Main ─────────────────────────────────────────────────────────────────────

CW_PATH = f'{BASE}/resource/res/cw.txt'
THM_PATH = f'{BASE}/resource/default.thm.json'
JS_PATH = f'{BASE}/main.min.js'

print('=== Translating cw.txt (web output) ===')
translate_cw(CW_PATH)

print()
print('=== Patching default.thm.json ===')
patch_thm(THM_PATH)

print()
print('=== Patching main.min.js ===')
patch_js(JS_PATH)

print()
print('Done!')
