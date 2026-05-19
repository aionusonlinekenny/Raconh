#!/usr/bin/env python3
"""
Translates Chinese strings in cw.txt (first 49 UI sections) and default.thm.json,
and patches main.min.js for dynamic strings and AttrCVO name overrides.
"""

import struct, re, os, shutil

# ── Translation map for cw.txt UI sections ──────────────────────────────────
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
    '奖励：': 'Rewards:',
    '通关：': 'Cleared:',
    'boss已被击杀': 'Boss defeated',
    '血量：': 'HP:',
    '后重生': 'then respawn',
    '挑战次数：{0}/{1}': 'Challenges: {0}/{1}',
    '恢复倒计时：': 'Recovery:',
    '战力:': 'Power:',
    '自身伤害:': 'My Damage:',
    '我的排名：{0}': 'My Rank: {0}',
    '当前挑战次数已用完': 'No challenges remaining',
    '退出再进入需要重新扣除次数，\n是否确定离开？': 'Re-entering costs another attempt.\nConfirm leave?',
    "<font color ='#ff2400'>{0}</font>击败了{1}级-{2}，获得了":
        "<font color ='#ff2400'>{0}</font> defeated Lv.{1} {2} and earned",
    '[个人Boss]': '[Personal Boss]',
    '[全民Boss]': '[World Boss]',
    '[爬塔Boss]': '[Tower Boss]',
    '每1小时恢复1次挑战次数': 'Recovers 1 challenge per hour',
    '{0}转可挑战': 'Available at {0} rebirths',
    '{0}级可挑战': 'Available at Lv.{0}',

    # cashCow
    '聚宝免费倒计时：{0}': 'Free Fortune: {0}',
    "今日可聚宝次数<font color='#00ff00'>（{0}）</font>":
        "Fortune attempts today<font color='#00ff00'>（{0}）</font>",
    "本次可获得<font color='#00ff00'>{0}（{1}%）</font>银币":
        "Earn <font color='#00ff00'>{0}（{1}%）</font> silver",
    "<u><font color='#00ff00'>提升vip等级</font></u>": "<u><font color='#00ff00'>Upgrade VIP</font></u>",
    "激活<font color='#00ff00'>钻石特权卡</font>，可以再领一次奖励，收益提升<font color='#ffaf00'>100%</font>":
        "Activate <font color='#00ff00'>Diamond VIP</font> to claim one more reward, +<font color='#ffaf00'>100%</font> bonus",
    '未达到领取登录天数': 'Login requirement not met',
    '剩余{0}份': '{0} remaining',
    '已领完': 'All claimed',

    # club (guild)
    '是否确定加入{0}盟会？（选择后无法更改）': 'Join guild [{0}]? (Cannot be undone)',
    '加入推荐的盟会可获得推荐好礼一份！': 'Join the recommended guild to get a welcome gift!',
    '当前选择为推荐盟会，加入后可获得推荐好礼一份！': 'Joining the recommended guild grants a welcome gift!',
    '虚位以待': 'Vacant',
    "剩余次数<font color='#38B800'>{0}</font>次": "Remaining: <font color='#38B800'>{0}</font>",
    '角色等级达到{0}级': 'Reach character Lv.{0}',
    '缥缈录达到{0}颗星': 'Reach {0} stars in Ethereal Record',
    '盟贡达到{0}/{1}': 'Guild contribution {0}/{1}',
    '墨宠达到{0}阶{1}星': 'Pet tier {0}, {1} stars',
    '强化总等级达到{0}级': 'Total enhancement Lv.{0}',
    '宝石总等级达到{0}级': 'Total gem Lv.{0}',
    '铸魂总等级达到{0}级': 'Total soul-forge Lv.{0}',
    '经脉总等级达到{0}级': 'Total meridian Lv.{0}',
    '剩余次数不足': 'Insufficient attempts',
    '风云聚会，龙翔九天，欢迎少侠加入本盟会。': 'Welcome to the guild, hero!',
    '获得{0}盟贡': 'Gained {0} guild contribution',
    '独秀峰': 'Solo Peak',
    '孤影楼': 'Shadow Tower',
    '决神殿': 'Divine Hall',

    # clubBF (guild battlefield)
    '击败对方{0}': 'Defeated {0}',
    '你被{0}击败': 'You were defeated by {0}',
    '你对守城BOSS造成{0}伤害': 'You dealt {0} damage to the defense boss',
    '守城BOSS剩余血量：{0}': 'Defense boss HP remaining: {0}',
    '连胜': 'Streak',
    '城门未被击破，守方获得胜利。': 'Gate held. Defenders win.',
    '{0}继续占领王城。': '{0} continues to hold the castle.',
    '城门被击破，攻方获得胜利。': 'Gate broken. Attackers win.',
    '{0}占领王城。': '{0} has captured the castle.',
    '我的盟会：': 'My Guild:',
    '胜': 'Win',
    '负': 'Loss',
    '我的积分：': 'My Points:',
    '盟内排名：': 'Guild Rank:',
    '战场开启时间：{0}月{1}日{2}-{3}（{4}）': 'Battlefield: {0}/{1} {2}-{3} ({4})',
    '{0}秒后可前往战场': 'Battlefield opens in {0}s',
    '总战力第一盟': 'Top Combat Power Guild',
    '您确定要退出战场？\n（30秒后可重回战场）': 'Leave battlefield?\n(Can return after 30s)',
    '防守': 'Defend',
    '进攻': 'Attack',
    '积分不足': 'Insufficient points',
    '已领取': 'Claimed',
    '可领取': 'Claimable',
    '{0}分可领': 'Claim at {0} pts',
    '击败守城兽后，积分较高的进攻盟会获胜': 'After defeating the guardian, the attacking guild with most points wins',
    '排名：': 'Rank:',
    '防守进攻人数：{0}/{1}': 'Defenders/Attackers: {0}/{1}',
    '己：{0}\n友：{1}': 'Self: {0}\nAllies: {1}',
    '援军': 'Reinforcement',
    '未知': 'Unknown',
    '战力：': 'Power:',
    '连胜：': 'Streak:',
    '你与该玩家同阵营，无需挑战': 'Same faction — no challenge needed',
    '重整旗鼓中，无法离开备战区！': 'Regrouping — cannot leave staging area!',
    '点击敌对玩家头像即可挑战': 'Tap enemy avatar to challenge',
    '当前盟会战力排行：': 'Guild Power Ranking:',
    "下一轮皇城战<font color='#4eff00'>{0}天</font>后开启": "Next Castle War opens in <font color='#4eff00'>{0} days</font>",
    "下一轮皇城战<font color='#4eff00'>{0}</font>后开启": "Next Castle War opens in <font color='#4eff00'>{0}</font>",
    '积分：': 'Points:',
    '确定花费      {0}清除CD吗？': 'Spend {0} to clear cooldown?',
    '防守方连胜{0}次，攻方获得以下战意属性': 'Defenders on {0}-win streak; attackers gain war spirit',
    '花费      {0}鼓舞，全盟成员攻击+10%': 'Spend {0} to boost all guild members ATK+10%',
    '恭喜你挑战胜利！': 'Victory!',

    # clubLeaderWar
    '未上榜': 'Unranked',
    "下一轮盟主争夺战<font color='#4eff00'>{0}</font>后开启":
        "Next Guild War opens in <font color='#4eff00'>{0}</font>",
    '{0}后回复1次': '+1 attempt in {0}',
    '击败对方{0}！': 'Defeated {0}!',
    '净胜场次已达{0}，当前排名第{1}名。': 'Net wins: {0}, current rank #{1}.',
    '倒计时{0}s退出': 'Exit in {0}s',
    '当前选择第{0}候选人{1}是否确认？': 'Confirm candidate #{0}: {1}?',
    '第{0}位候选人已满': 'Candidate slot #{0} is full',
    '已报名': 'Registered',
    '报名失败': 'Registration failed',
    '报名成功！': 'Registered successfully!',
    '膜拜数：': 'Worships:',
    '旗鼓相当的对手': 'Evenly matched opponent',
    '借钱不还的盟友': 'Deadbeat ally',
    '暗恋小师妹的同盟': 'Secret admirer ally',
    '英俊潇洒的师兄': 'Dashing senior',
    '小鸟依人的师妹': 'Gentle junior sister',
    '油腻的师姐': 'Greasy senior sister',
    '背后使绊子的盟友': 'Backstabbing ally',
    '大吃大喝的胖子': 'Gluttonous friend',
    '阴沉狡诈的盟友': 'Scheming ally',
    '还有{0}个入室弟子名额未任命': '{0} disciple slots still unassigned',
    '第一名：': '1st Place:',
    '第二名：': '2nd Place:',
    '第三名：': '3rd Place:',
    '候选人：': 'Candidates:',
    '净胜场：': 'Net Wins:',
    '只有盟主才能进行操作！': 'Guild master only!',
    '任命成功！': 'Appointed successfully!',
    '任命失败！': 'Appointment failed!',
    '今日已无膜拜次数！': 'No worships remaining today!',
    "下一轮盟主争夺战<font color='#4eff00'>{0}天</font>后开启":
        "Next Guild War opens in <font color='#4eff00'>{0} days</font>",
    '当前名次尚未产生敬请期待！': 'Rankings not yet determined — stay tuned!',

    # common
    '苍穹': 'Canopy',
    '扶风': 'Fufeng',
    '职业1111': 'Class',
    '等级：': 'Level:',
    '性别：': 'Gender:',
    '男': 'Male',
    '女': 'Female',
    '类型：': 'Type:',
    '需要达到{0}级': 'Requires Lv.{0}',
    '需要VIP达到{0}': 'Requires VIP{0}',
    '需要完成{0}任务': 'Complete {0} quest first',
    '(完成)': '(Done)',
    '转': 'Rebirth',
    '级': 'Lv',
    '亿': '00M',
    '万': 'k',
    '阶': 'Tier',
    '创建失败': 'Creation failed',
    '非法字符': 'Invalid character',
    '名字为空': 'Name is empty',
    '性别错误': 'Invalid gender',
    '服务器id错误': 'Invalid server ID',
    '需要完成指定任务': 'Complete the required quest',
    '需要通关{0}': 'Clear {0} first',
    '需要累计击杀全民boss{0}次': 'Kill World Boss {0} times',
    '正在副本中，请退出副本后进行操作': 'Please exit the dungeon first',
    '正在BOSS中，请退出BOSS后进行操作': 'Please exit the boss fight first',
    '矩形': 'Rectangle',
    '扇形': 'Fan',
    '圆形': 'Circle',
    '次数不足': 'Insufficient attempts',
    '元宝不足': 'Insufficient gems',
    '银币不足': 'Insufficient silver',
    '/分钟': '/min',
    '正在个人竞技中，请退出个人竞技后进行操作': 'Please exit the arena first',
    '元': 'Yuan',
    '需要达到{0}转': 'Requires {0} rebirths',
    '已领取': 'Claimed',
    '{0}不足': 'Insufficient {0}',
    '经验': 'EXP',
    '正在盟会战中，请退出盟会战后进行操作': 'Please exit the guild war first',
    '年': 'Y',
    '月': 'M',
    '日': 'D',
    '时': 'H',
    '分': 'Min',
    '秒': 'Sec',
    '周日': 'Sun',
    '周一': 'Mon',
    '周二': 'Tue',
    '周三': 'Wed',
    '周四': 'Thu',
    '周五': 'Fri',
    '周六': 'Sat',
    '已满级': 'Max Level',
    '{0}   {1}转{2}级': '{0}   Rebirth {1} Lv.{2}',
    '{0}   {1}级': '{0}   Lv.{1}',
    "<font color='#38b800'>可激活</font>": "<font color='#38b800'>Activatable</font>",
    '等级不足': 'Level too low',
    "<font color='#38b800'>系统开启</font>": "<font color='#38b800'>System Open</font>",
    '正在江湖风云争霸中，请退出后进行操作': 'Please exit the Tournament first',

    # copy (dungeon)
    '第{0}层': 'Floor {0}',
    "进入次数已满": "Entry limit reached",
    "副本次数：": "Dungeon Entries:",
    "冷却时间：": "Cooldown:",
    '购买次数已达上限，开通vip可获得更多购买次数，是否前往开通？':
        'Purchase limit reached. Upgrade VIP for more. Go to VIP?',
    '经验：': 'EXP:',
    '已击杀：': 'Killed:',
    '击杀{0}只怪可升到{1}评价': 'Kill {0} monsters to reach {1} rating',
    '已获得最高评价': 'Highest rating achieved',
    '每次成功提升都可增加人物10%的经验收益': 'Each success grants +10% EXP gain',
    '当前提升       经验+{0}%': 'Current boost: EXP+{0}%',
    '银币提升': 'Silver Boost',
    '元宝提升': 'Gem Boost',
    '{0}/次': '{0}/attempt',
    '冷却中': 'On cooldown',
    '是否花费{0}元宝购买1次挑战激活': 'Spend {0} gems for 1 challenge activation?',
    '银币提升已达上线，请用元宝提升': 'Silver boost maxed. Use gems instead.',
    '收益加成已达上限': 'Bonus gain at maximum',
    '银币+{0}%': 'Silver+{0}%',
    "祝福：<font color='#4eff00'>银币+{0}%</font>": "Blessing: <font color='#4eff00'>Silver+{0}%</font>",
    '累计银币：': 'Total Silver:',
    '累计元宝：': 'Total Gems:',
    '时间：': 'Time:',
    '经此一役，少侠只能遁入江湖，隐姓埋名躲避东厂追击。怎料，一场腥风血雨又将来临。':
        'After this battle, you must hide in the underworld to escape the Imperial Guards. But a new storm approaches...',
    '绝学、铸魂': 'Skills & Soul-Forge',
    "下一难度：盟会职位达到<font color='#4eff00'>{0}</font>":
        "Next difficulty: Guild rank <font color='#4eff00'>{0}</font>",
    '下一难度\n角色': 'Next difficulty:\nCharacter',
    "下一难度：角色达到<font color='#4eff00'>{0}</font>开启":
        "Next difficulty: Character Lv.<font color='#4eff00'>{0}</font>",
    "<font color='#38b800'>VIP</font>可购买额外次数": "<font color='#38b800'>VIP</font> can buy extra entries",

    # dailyrebate
    '{0}关开启': 'Stage {0} opens',

    # devil
    '剩余挑战次数不足，最少1次': 'Need at least 1 challenge remaining',
    '次数已达上限，无法购买更多次数。': 'Purchase limit reached.',
    '今日所有奖励已领取': 'All rewards claimed today',
    '已完成': 'Completed',
    '未完成': 'Not completed',
    '奖励已领': 'Reward claimed',
    '立即前往': 'Go now',
    '已全部完成': 'All done',
    '个人BOSS今日已被击杀': 'Personal boss defeated today',

    # equip
    '武器': 'Weapon',
    '项链': 'Necklace',
    '护符': 'Amulet',
    '玉佩': 'Jade',
    '头盔': 'Helmet',
    '衣服': 'Armor',
    '手套': 'Gloves',
    '鞋子': 'Boots',
    '材料不足无法强化': 'Insufficient materials to enhance',
    '装备强化等级不能超过人物等级': 'Enhancement level cannot exceed character level',
    '全身宝石{0}级': 'All gems Lv.{0}',
    '（已激活）': '(Activated)',
    '（下级效果）': '(Next tier effect)',
    '可升级': 'Upgradeable',
    '可替换': 'Replaceable',
    '宝石': 'Gem',
    '未镶嵌': 'Not socketed',
    '全身铸魂+': 'All Soul-Forge+',
    '请先穿上装备！': 'Please equip an item first!',
    '攻击套装': 'Attack Set',
    '防具套装': 'Defense Set',
    '未打造': 'Not Forged',
    '[{0}]件': '[{0}] pcs',
    '{0}{1}阶{2}({3}/{4})': '{0} Tier {1} {2}({3}/{4})',
    '[{0}]件激活：': '[{0}] pcs active:',
    '材料不足无法打造！': 'Insufficient materials to forge!',
    '当前未激活任何{0}加成': 'No {0} bonus active',
    '打造成功！': 'Forged successfully!',
    '装备没有打造不能分解！': 'Cannot dismantle unforged equipment!',
    '武': 'Wpn',
    '链': 'Nck',
    '符': 'Amu',
    '玉': 'Jad',
    '头': 'Hlm',
    '衣': 'Arm',
    '手': 'Glv',
    '鞋': 'Bts',
    '一': 'I',
    '二': 'II',
    '三': 'III',
    '四': 'IV',
    '五': 'V',
    '六': 'VI',
    '七': 'VII',
    '八': 'VIII',
    '九': 'IX',
    '十': 'X',
    '所需材料': 'Materials Required',
    '更换装备强化等级将完美继承': 'Enhancement level carries over when switching',
    '更换装备不影响所镶嵌的宝石': 'Gems stay socketed when switching equipment',

    # fireEye
    '开启': 'Open',
    '本次': 'This round',
    '上次': 'Previous',
    '共{0}元宝': '{0} gems total',
    '本次胜负': 'This round result',
    '猜对': 'Correct!',
    '猜错': 'Wrong!',
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
    '未激活': 'Not activated',

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
    '宝石阶段属性': 'Gem Tier Stats',
    '铸魂阶段属性': 'Soul Tier Stats',
    '阶段奖励属性': 'Tier Bonus Stats',

    # offlineProfit
    '离线超过8小时，只能获得80%收益': 'Offline 8+ hours: only 80% income',
    '挂机经验：': 'AFK EXP:',
    '挂机金币：': 'AFK Gold:',
    '提取时间：': 'Extract time:',
    '可提取：': 'Available:',
    '已满': 'Full',
    '距离满额：': 'Until full:',
    '挂机：': 'AFK:',
    '00小时00分（最多累计24小时收益）': '00h 00m (max 24h income)',

    # pet
    '无法幻化未激活外形！': 'Cannot transform to inactive form!',
    '当前已使用：{0}': 'Currently using: {0}',
    '当前可使用：{0}': 'Available: {0}',
    '剩余：{0}个': 'Remaining: {0}',
    '当前品阶可使用个数已满': 'This tier slot is full',
    '进阶材料不足': 'Insufficient upgrade materials',
    '消耗：{0}/{1}': 'Cost: {0}/{1}',
    '已是当前外形！': 'Already this form!',
    '使用资质丹成功': 'Talent pill used',
    '使用悟性丹成功': 'Insight pill used',
    '幻化成功': 'Transform successful',
    '宠物达到{0}阶{1}星': 'Pet reaches tier {0}, {1} stars',
    '技能已满级。': 'Skill at max level.',
    '消耗：{0}{1}/{2}': 'Cost: {0}{1}/{2}',
    "<font color='{0}'>{1}阶激活</font>": "<font color='{0}'>Tier {1} Activated</font>",

    # qiandao (sign-in)
    '第{0}天': 'Day {0}',
    '今日已签到': 'Signed in today',
    '补签': 'Make up',
    '可补签到次数：': 'Make-up sign-ins:',
    '累计签到次数：': 'Total sign-ins:',
    '每日0点结算': 'Resets daily at midnight',
    '签到': 'Sign In',
    '已签': 'Signed',
    '累计签到{0}天': 'Cumulative {0} days',

    # rank
    '战力：': 'Power:',
    '总等级：': 'Total Level:',
    '我的排行：': 'My Ranking:',
    '未入榜': 'Unranked',
    '我的战力：': 'My Power:',
    '我的等级：': 'My Level:',
    '我的总等级：': 'My Total Level:',
    '我的境界：': 'My Realm:',
    '境界：': 'Realm:',
    '等级：': 'Level:',

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
    '境界：': 'Realm:',
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
    '未激活': 'Not activated',
    '战力：': 'Power:',
    "转生：<font color='{0}'>{1}转</font>": "Rebirth: <font color='{0}'>{1}x</font>",

    # soldier
    '分解材料返还：': 'Dismantle returns:',
    '拆解成功后当前部位重置为未打造状态': 'Dismantling resets this slot to unforged',
    '并返还全部升阶消耗材料：': 'Returns all upgrade materials:',
    '高品质命格将与底品质命格融合底品质命格消失，保留最高属性':
        'High-quality destiny absorbs lower; best stats kept',

    # srv_rank
    '总计：': 'Total:',
    '我的数据：': 'My Stats:',
    '战力数据：': 'Power Data:',
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
    '今日互动：': "Today's Interactions:",
    '今日解救次数：': "Today's Rescues:",
    '倒计时后将在中立地区安全区自动复活': 'Will auto-revive in safe zone after countdown',
    '向你求救': 'Asking for rescue',
    '向您求救': 'Asking for your rescue',
    '互动保护时间内不可反抗或解救': 'Cannot resist or rescue during protection',
    '你的身份为自由身。可以抓捕苦工、解救盟友，获得大量经验。':
        'You are free. Capture laborers, rescue allies, earn EXP.',
    '你的身份：': 'Your Status:',
    '你被XXX击败了': 'You were defeated',
    '你击败了XXXX，成功抢夺了TA的苦工！': 'You defeated them and stole their laborer!',

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
}

# ── Attr name translations for binary replacement ────────────────────────────
ATTR_NAMES = {
    '移动': 'SPEED',
    '气血': 'HP',
    '生命': 'Life',
    '攻击': 'ATK',
    '防御': 'DEF',
    '破甲': 'Pen',
    '命中': 'Hit',
    '闪避': 'Eva',
    '暴击': 'Crit',
    '坚韧': 'TEN',
    '生命恢复': 'HP Regen',
    '经验加成': 'EXP Bonus',
    '伤害加深': 'DMG Boost',
    '伤害减免': 'DMG Reduce',
    '暴击几率': 'Crit Rate',
    '暴击抵抗': 'Anti-Crit',
    '暴伤加成': 'CritDMG+',
    '暴伤减免': 'CritDMG-',
    '命中几率': 'Hit Rate',
    '闪避几率': 'Eva Rate',
    '气血增加': 'HP Boost',
    '攻击增加': 'ATK Boost',
    '防御增加': 'DEF Boost',
    '破甲增加': 'Pen Boost',
    '命中增加': 'Hit Boost',
    '闪避增加': 'Eva Boost',
    '暴击增加': 'Crit Boost',
    '坚韧增加': 'TEN Boost',
    '每5级气血': 'HP/5Lv',
    '每5级攻击': 'ATK/5Lv',
    '每5级防御': 'DEF/5Lv',
    '每5级破甲': 'Pen/5Lv',
    '每5级命中': 'Hit/5Lv',
    '每5级闪避': 'Eva/5Lv',
    '每5级暴击': 'Crit/5Lv',
    '每5级坚韧': 'TEN/5Lv',
    '加伤': 'DMG+',
    '免伤': 'DMG-',
    '暴率': 'Crit%',
    '暴抗': 'CritRes',
    '暴伤': 'CritDMG',
    '命中率': 'HitRate',
    '闪避率': 'EvaRate',
}

# ── Parse and rebuild cw.txt UI sections ─────────────────────────────────────

def parse_cw_sections(data):
    """Parse the first 49 UI sections, return list of (name, {id: str}) tuples."""
    pos = 16  # after 1B magic, 2B+8B lang name, 4B total, 1B section count
    section_count = 49
    sections = []
    for _ in range(section_count):
        name_len = struct.unpack_from('>H', data, pos)[0]; pos += 2
        name = data[pos:pos+name_len].decode(); pos += name_len
        str_count = struct.unpack_from('>H', data, pos)[0]; pos += 2
        strings = {}
        for _ in range(str_count):
            sid = struct.unpack_from('>H', data, pos)[0]; pos += 2
            slen = struct.unpack_from('>H', data, pos)[0]; pos += 2
            sval = data[pos:pos+slen].decode('utf-8'); pos += slen
            strings[sid] = sval
        sections.append((name, strings))
    rest_start = pos
    return sections, rest_start


def rebuild_cw_sections(original_header, sections, rest_data):
    """Rebuild the binary with translated strings."""
    out = bytearray(original_header)
    for name, strings in sections:
        name_bytes = name.encode('utf-8')
        out += struct.pack('>H', len(name_bytes)) + name_bytes
        out += struct.pack('>H', len(strings))
        for sid in sorted(strings.keys()):
            s = strings[sid]
            translated = TRANSLATIONS.get(s, s)
            s_bytes = translated.encode('utf-8')
            out += struct.pack('>H', sid)
            out += struct.pack('>H', len(s_bytes))
            out += s_bytes
    out += rest_data
    return bytes(out)


def translate_attr_names_in_binary(data):
    """Replace Chinese attr names in the binary using length-prefixed search/replace."""
    for cn, en in ATTR_NAMES.items():
        cn_bytes = cn.encode('utf-8')
        en_bytes = en.encode('utf-8')
        if len(en_bytes) > len(cn_bytes):
            print(f'  SKIP (English longer): {cn!r} -> {en!r}')
            continue
        old = struct.pack('>H', len(cn_bytes)) + cn_bytes
        new = struct.pack('>H', len(en_bytes)) + en_bytes
        count = data.count(old)
        if count > 0:
            data = data.replace(old, new)
            print(f'  Replaced {count}x: {cn!r} -> {en!r}')
    return data


def translate_cw(path):
    data = open(path, 'rb').read()
    print(f'Original size: {len(data):,} bytes')

    # Parse
    sections, rest_start = parse_cw_sections(data)
    original_header = data[:16]
    rest_data = data[rest_start:]

    # Translate UI strings
    total_translated = 0
    for name, strings in sections:
        for sid, s in strings.items():
            if s in TRANSLATIONS:
                strings[sid] = TRANSLATIONS[s]
                total_translated += 1

    print(f'Translated {total_translated} UI strings in 49 sections')

    # Rebuild with translated UI sections
    new_data = rebuild_cw_sections(original_header, sections, rest_data)
    print(f'After UI section rebuild: {len(new_data):,} bytes')

    # Now replace attr names in the full binary (targets rest_data portion)
    print('Replacing attr names...')
    new_data = bytearray(new_data)
    new_data = bytearray(translate_attr_names_in_binary(bytes(new_data)))

    # Write backup + new file
    backup = path + '.bak'
    if not os.path.exists(backup):
        shutil.copy2(path, backup)
        print(f'Backup saved: {backup}')

    with open(path, 'wb') as f:
        f.write(new_data)
    print(f'Written: {path} ({len(new_data):,} bytes)')


# ── Patch default.thm.json ───────────────────────────────────────────────────

THM_TRANSLATIONS = {
    # EquipTips popup labels
    r't\.text\s*=\s*\\"攻击：\\"': 't.text = \\"Attack:\\"',
    r't\.text\s*=\s*\\"破甲：\\"': 't.text = \\"Armor Break:\\"',
    r't\.text\s*=\s*\\"战力：\\"': 't.text = \\"Power:\\"',
    r't\.text\s*=\s*\\"等级：\\"': 't.text = \\"Level:\\"',
    r't\.text\s*=\s*\\"职业：\\"': 't.text = \\"Class:\\"',
    r't\.text\s*=\s*\\"极品属性\\"': 't.text = \\"Legendary Stats\\"',
    r't\.text\s*=\s*\\"铸魂属性\\"': 't.text = \\"Soul Attributes\\"',
    r't\.text\s*=\s*\\"\(强化\+0\)\\"': 't.text = \\"(Enh+0)\\"',
    r't\.text\s*=\s*\\"无\\"': 't.text = \\"None\\"',
    # Common labels
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
    r't\.text\s*=\s*\\"战力：\\"': 't.text = \\"Power:\\"',
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
}


def patch_thm(path):
    backup = path + '.bak'
    if not os.path.exists(backup):
        shutil.copy2(path, backup)
        print(f'Backup: {backup}')

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

# AttrCVO name override: inject after AttrCVO definition
ATTR_JS_OVERRIDE = r"""
// English attr name overrides
(function() {
    var _orig = AttrDescTypeEx.getAttrName;
    var _attrMap = {
        1:'SPEED',11:'HP',12:'Life',13:'ATK',14:'DEF',15:'Pen',
        16:'Hit',17:'Eva',18:'Crit',19:'TEN',20:'HP Regen',
        21:'EXP+',22:'DMG+',23:'DMG-',24:'Crit%',25:'CritRes',
        26:'CritDMG+',27:'CritDMG-',28:'Hit%',29:'Eva%',
        30:'HP%',31:'ATK%',32:'DEF%',33:'Pen%',
        37:'HP/5Lv',38:'ATK/5Lv',39:'DEF/5Lv',40:'Pen/5Lv',
        41:'Hit/5Lv',42:'Eva/5Lv',43:'Crit/5Lv',44:'TEN/5Lv'
    };
    AttrDescTypeEx.getAttrName = function(t) {
        if (_attrMap[t]) return _attrMap[t];
        var r = _orig.call(this, t);
        return r;
    };
})();
"""

JS_PATCHES = [
    # Dynamic enhance string builder
    ('（强化+', '(Enh+'),
    # Static label in EquipTips skin (thm.js compiled into main.min.js)
    ('"攻击："', '"Attack:"'),
    ('"破甲："', '"Armor Break:"'),
    ('"极品属性"', '"Legendary Stats"'),
    ('"铸魂属性"', '"Soul Attributes"'),
    ('"(强化+0)"', '"(Enh+0)"'),
    ('"战力："', '"Power:"'),
    ('"等级："', '"Level:"'),
    ('"职业："', '"Class:"'),
]


def patch_js(path):
    backup = path + '.bak'
    if not os.path.exists(backup):
        shutil.copy2(path, backup)
        print(f'Backup: {backup}')

    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    count = 0
    for old, new in JS_PATCHES:
        n = content.count(old)
        if n > 0:
            content = content.replace(old, new)
            count += n
            print(f'  JS patched {n}x: {old!r} -> {new!r}')

    # Inject AttrCVO override near end of file (before closing IIFE or just append)
    # Find a good injection point: after "AttrCVO" class definition
    inject_marker = 'AttrDescTypeEx.getAttrName'
    idx = content.rfind(inject_marker)
    if idx >= 0:
        # Find end of the function/statement
        end_idx = content.find(';', idx)
        if end_idx >= 0:
            # Check we haven't already injected
            if '_attrMap' not in content:
                content = content[:end_idx+1] + ATTR_JS_OVERRIDE + content[end_idx+1:]
                count += 1
                print(f'  JS: Injected AttrCVO English override')

    with open(path, 'w', encoding='utf-8', errors='replace') as f:
        f.write(content)
    print(f'Total JS patches: {count}')


# ── Main ─────────────────────────────────────────────────────────────────────

BASE = '/home/user/Raconh/raconh5/client/main/bin-release/web/221211145302'

print('=== Translating cw.txt ===')
translate_cw(f'{BASE}/resource/cw/cw.txt')

print()
print('=== Patching default.thm.json ===')
patch_thm(f'{BASE}/resource/default.thm.json')

print()
print('=== Patching main.min.js ===')
patch_js(f'{BASE}/main.min.js')

print()
print('Done!')
