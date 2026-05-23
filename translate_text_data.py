#!/usr/bin/env python3
"""
Translate text_data (and sys_notice_data) section of cw.txt.
Patches strings IN-PLACE by finding [2B len][utf-8 bytes] and replacing
with [2B new_len][new_utf-8 bytes].  Shorter replacements are safe;
longer ones are skipped with a warning.
"""
import struct, os, shutil, sys

CW_PATH = os.path.join(os.path.dirname(__file__),
    'raconh5/client/main/bin-release/web/221211145302/resource/res/cw.txt')

# ── Translation table ────────────────────────────────────────────────────────
# Key   = exact Chinese string stored in cw.txt
# Value = English replacement
# Keep the same {0}, {1} … placeholders; only translate surrounding Chinese.
TRANSLATIONS = {

    # ── System announcement templates ────────────────────────────────────────
    '叱咤风云，笑傲江湖。战力榜第一名{0}回到了龙门客栈，势必再掀起一场腥风血雨':
        'Power Rank #1 {0} has returned to Dragon Gate Inn!',
    '恭喜{0}击杀{1}，获得珍贵物品：{2}！':
        'Congrats! {0} defeated {1} and obtained rare item: {2}!',
    '{0}小心翼翼的打开{1}，竟然获得了{2}！':
        '{0} carefully opened {1} and obtained {2}!',
    '恭喜{0}进行了首次任意充值，领取了{1}等珍稀道具奖励！{2}':
        'Congrats! {0} made their first top-up and received {1} rare rewards! {2}',
    '恭喜{0}历经千锤百炼，完成{1}转目标，Power暴涨！':
        'Congrats! {0} completed {1} rebirths — Power surged!',
    '风起云涌，神器<font color=\'#ffae00\'>{0}</font>横空出世，{1}将其收入囊中，如虎添翼！':
        'The legendary artifact <font color=\'#ffae00\'>{0}</font> has appeared! {1} claimed it!',
    '{0}激活了酷炫神兵{1}，称霸寰宇，指日可待！':
        '{0} activated legendary weapon {1}!',
    '{0}激活了炫彩时装{1}，锦衣玉带，光彩照人！':
        '{0} activated costume {1}!',
    '{0}所向披靡，超群绝伦，全身装备激活至<font color=\'#ffae00\'>{1}阶套装</font>！':
        '{0} activated full <font color=\'#ffae00\'>{1}-tier set</font>!',
    '{0}闭目静修，打通了任督二脉，经脉提升至<font color=\'#ffae00\'>{1}</font>!':
        '{0} broke through meridians to <font color=\'#ffae00\'>{1}</font>!',
    '{0}机缘过人，探秘绝世经要，习得武学{1}，必成一代大侠！':
        '{0} mastered the ultimate skill {1}!',
    '{0}脚踏七星，天命所归，激活了稀世{1}命格！':
        '{0} activated the rare destiny {1}!',
    '{0}金戈铁马，气冲斗牛，全身装备强化达到了<font color=\'#ffae00\'>{1}</font>级！':
        '{0} enhanced all gear to <font color=\'#ffae00\'>{1}</font>!',
    '{0}物华天宝，气冲斗牛，全身装备铸魂达到了<font color=\'#ffae00\'>{1}</font>级！':
        '{0} soul-cast all gear to <font color=\'#ffae00\'>{1}</font>!',
    '{0}九霄塔率先通关至<font color=\'#ffae00\'>{1}</font>层，横刀立马，一骑绝尘！':
        '{0} is first to clear Sky Tower floor <font color=\'#ffae00\'>{1}</font>!',
    '{0}剧情副本率先通关至<font color=\'#ffae00\'>{1}</font>关，一马当先，风头无两！':
        '{0} is first to clear Story Ch.<font color=\'#ffae00\'>{1}</font>!',
    '{0}激活了霸气背饰<font color=\'#ffae00\'>{1}</font>，翩若惊鸿，巧夺天工！':
        '{0} activated back ornament <font color=\'#ffae00\'>{1}</font>!',
    '{0}励精图治，缥缈录达到<font color=\'#ffae00\'>{1}</font>星，激活新的宝箱奖励！':
        '{0} reached <font color=\'#ffae00\'>{1}</font> stars in the Mystic Record!',
    '小伙惊呆！{0}运气爆棚，在抽奖福利中获得{1}！':
        'Amazing! {0} got lucky and won {1} in the lottery!',

    # ── Hall of Heroes / Lingyan skill lottery ───────────────────────────────
    '【{0}】在凌烟阁中获得{1}，真是羡煞旁人！':
        '{0} obtained {1} in the Hall of Heroes!',

    # ── Treasure hunt result messages ─────────────────────────────────────────
    "寻宝1次，获得<font color = '#38b800'>银币*30000</font>，获得{0}":
        "1x Hunt: <font color = '#38b800'>Silver*30000</font> + {0}",
    "寻宝10次，获得<font color = '#38b800'>银币*300000</font>，获得{0}":
        "10x Hunt: <font color = '#38b800'>Silver*300000</font> + {0}",

    # ── Market broadcast ──────────────────────────────────────────────────────
    "{0} 正在市场寄售 {1}，售价为 <font color='#ff8400'>{2}</font> 元宝，欲购从速！ {3}":
        "{0} listed {1} on market for <font color='#ff8400'>{2}</font> gems! {3}",

    # ── Online / offline ──────────────────────────────────────────────────────
    '{0}上线了！': '{0} logged in!',
    '{0}下线了！': '{0} logged off!',

    # ── Heaven Lord (天尊) event ───────────────────────────────────────────────
    '天尊山已经降临，夺得灵宝之气最多者将成为新一任天尊！{0}':
        'The Heaven Lord descends! Top Aura collector becomes new Heaven Lord! {0}',
    '本次天尊夺宝结束，现宣布新一任天尊的名字——{0}，他将在史册留名！':
        'Heaven Lord event over! The new Heaven Lord is {0}!',
    '{0}守住<font color=\'#ffae00\'>{1}</font>到最后一刻，成功吸收其中的大量灵气！':
        '{0} held <font color=\'#ffae00\'>{1}</font> to the last second, absorbing great spirit energy!',
    '{0}摇动骰子，掷出了<font color=\'#29b113\'>{1}</font>点！':
        '{0} rolled <font color=\'#29b113\'>{1}</font> on the dice!',

    # ── Guild broadcasts ──────────────────────────────────────────────────────
    '{0}被禁言五分钟': '{0} muted for 5 min',
    '宗门悬赏任务已经刷新，数量有限，先抢先得！{0}':
        'Guild bounty quests refreshed! Limited — hurry! {0}',
    '{0}赠送{1}给{2}，看来有一腿！': '{0} gifted {1} to {2}! Must be close!',
    "{0}（战力：{1}）为宗门捐献了元宝{2}，加了{3}贡献,为宗门圣物增加{4}成长值":
        "{0} (Power:{1}) donated {2} gems, +{3} contrib, +{4} artifact growth",
    "{0}（战力：{1}）为宗门捐献了宗门令*{2}，加了{3}贡献,为宗门圣物增加{4}成长值":
        "{0} (Power:{1}) donated {2} guild tokens, +{3} contrib, +{4} artifact growth",
    "{0}（战力：{1}）申请加入宗门，请批准！{3}":
        "{0} (Power:{1}) applied to join the guild! {3}",
    "{0}发布了一份招募启示：<font color='#29b113'>{1}</font>广纳人才，入门者均可获得宗门圣物护佑，能力提升。{2}":
        "{0} is recruiting: <font color='#29b113'>{1}</font> — join for guild artifact buffs! {2}",
    '恭喜！本宗门守卫难度提升至{0}级，守卫宗门活动将获得更多的奖励！':
        'Guild defense upgraded to level {0} — earn more rewards!',

    # ── Killing God (杀神) PvP event ──────────────────────────────────────────
    '杀破苍穹，惊天泣鬼！杀神之路正式开启，通天之路，谁主沉浮！{0}':
        'The Killing God path is open — who will reign supreme? {0}',
    '本次杀神之路结束，现宣布新一任通天杀神的名字——<font color=\'#ff4949\'>{0}</font>，他将在史册留名！':
        'Killing God event over! The new Killing God: <font color=\'#ff4949\'>{0}</font>!',

    # ── Party finder ──────────────────────────────────────────────────────────
    "<font color='#c7ba6c'>{0}正寻找仙友一起挑战【{1}(Lv.{2})】，要求战力{3}！{4}</font>":
        "<font color='#c7ba6c'>{0} seeks allies for 【{1}(Lv.{2})】 Power req:{3}! {4}</font>",
    "<font color='#c7ba6c'>{0}正寻找仙友一起挑战【{1}(Lv.{2})】，无战斗力限制！{3}</font>":
        "<font color='#c7ba6c'>{0} seeks allies for 【{1}(Lv.{2})】 no Power req! {3}</font>",

    # ── Treasure hunt BOSS invasion ───────────────────────────────────────────
    '【{0}】在寻宝时不小心破坏了封印，一大波狂暴BOSS入侵{1}-{2}线，维护世界和平的时候到啦！':
        '【{0}】broke a seal while hunting! Wild BOSSes raid {1}-{2}! Go defend!',

    # ── 3v3 championship ──────────────────────────────────────────────────────
    '3v3争霸活动正式开启！来不及解释了，快进场！{0}':
        '3v3 Championship started! Get in there! {0}',
    '{0}采旗成功！': '{0} got the flag!',
    '{0}击杀了{1},成功夺取旗帜！': '{0} killed {1} and seized the flag!',
    '{0}离开战场，旗帜重新刷新！': '{0} left — flag reset!',
    '{0}交付旗帜，取得胜利！': '{0} delivered the flag! Victory!',

    # ── Sword upgrade ─────────────────────────────────────────────────────────
    "<font color='#c7ba6c'>{0}</font>将仙剑品质提升至<font color='#e9c002'>乾坤仙剑</font>，获得<font color='#e9c002'>60绑定元宝</font>奖励！":
        "<font color='#c7ba6c'>{0}</font> upgraded sword to <font color='#e9c002'>Qian Kun Sword</font>, got <font color='#e9c002'>60 bound gems</font>!",

    # ── Free-for-all (群雄逐鹿) event ─────────────────────────────────────────
    '群雄逐鹿活动正式开始！抢boss、抢矿石、抢人头，鹿死谁手，一战而定！{0}':
        'Free-for-all started! Grab BOSSes, ores, and kills — who wins? {0}',
    '恭喜{0}的全体成员击杀{1}，获得15秒优先采集权！':
        '{0} all killed {1}, gained 15s priority harvest!',

    # ── Tribulation (渡劫) ────────────────────────────────────────────────────
    '恭喜{0}渡劫成功，获得{1}！': '{0} survived tribulation! Got {1}!',
    '{0}大展神威，击杀渡劫者，夺得{1}！': '{0} slew the challenger and claimed {1}!',

    # ── Investment ────────────────────────────────────────────────────────────
    '玩家{0}成功购买百倍投资，财源滚滚来！': '{0} bought the 100x Investment! Wealth rolls!',
    '玩家{0}成功购买投资计划，一本万利！': '{0} bought the Investment Plan! Big profits!',

    # ── Rebirth (different wording variant) ──────────────────────────────────
    '恭喜{0}历经千锤百炼，完成{1}转目标，战力暴涨！':
        'Congrats! {0} completed {1} rebirths — Power surged!',

    # ── BOSS top-3 (variant format) ──────────────────────────────────────────
    '{0}在<font color=\'#c7ba6c\'>【BOSS】{1}（{2}转{3}级）</font>中投出前3名，获得{4}！':
        '{0} ranked top 3 on <font color=\'#c7ba6c\'>[BOSS]{1}({2} Reb.{3})</font>, got {4}!',
    '{0}在<font color=\'#c7ba6c\'>【全民BOSS】{1}</font>击杀中伤害排名第四，获得{2}！':
        '{0} ranked #4 damage on <font color=\'#c7ba6c\'>[All-Server BOSS]{1}</font>, got {2}!',
    '{0}在<font color=\'#c7ba6c\'>【全民BOSS】{1}</font>击杀中伤害排名第五，获得{2}！':
        '{0} ranked #5 damage on <font color=\'#c7ba6c\'>[All-Server BOSS]{1}</font>, got {2}!',
    '<font color=\'#c7ba6c\'>【BOSS】{0}（{1}转{2}级）</font>血量已少于{3}%，摧毁BOSS护盾有机会获得奖励！{4}':
        '<font color=\'#c7ba6c\'>[BOSS]{0}({1} Reb.{2})</font> HP below {3}%! Destroy shield for a reward! {4}',
    '<font color=\'#c7ba6c\'>【BOSS】{0}（{1}转{2}级）</font>血量已<font color=\'#c7ba6c\'>少于{3}%</font>，摧毁BOSS护盾有机会获得奖励！{4}':
        '<font color=\'#c7ba6c\'>[BOSS]{0}({1} Reb.{2})</font> HP <font color=\'#c7ba6c\'>below {3}%</font>! Destroy shield for reward! {4}',

    # ── Kill streak (variant wording) ─────────────────────────────────────────
    '战报：<font color=\'#c7ba6c\'>{0}完成<font color=\'#ff4949\'>10连杀</font>，正主宰着战场的生死！</font>':
        'Report: <font color=\'#c7ba6c\'>{0} on a <font color=\'#ff4949\'>10-kill streak</font>, dominating!</font>',
    '战报：<font color=\'#c7ba6c\'>{0}完成<font color=\'#ff4949\'>20连杀</font>，领地战之神非他莫属！</font>':
        'Report: <font color=\'#c7ba6c\'>{0} on a <font color=\'#ff4949\'>20-kill streak</font>, territory war god!</font>',
    '战报：<font color=\'#c7ba6c\'>{0}完成<font color=\'#ff4949\'>20连杀</font>，杀神之位舍他其谁！</font>':
        'Report: <font color=\'#c7ba6c\'>{0} on a <font color=\'#ff4949\'>20-kill streak</font>, born Killing God!</font>',

    # ── Imperial War (皇城战) ─────────────────────────────────────────────────
    '[{0}]{1}对皇神将造成最后一击！在[{2}]{3}带领下，{4}夺得胜利！':
        '[{0}]{1} final blow to the Imperial General! [{2}]{3} leads {4} to Victory!',
    '[{0}]{1}对皇神将造成最后一击！{2}夺得胜利！':
        '[{0}]{1} final blow to the Imperial General! {2} wins!',
    '在[{0}]{1}的带领以及援军对皇神将的最后一击下，{2}夺得胜利！':
        '[{0}]{1} led the charge! Reinforcements struck the final blow — {2} wins!',
    '受到援军的强力援助，皇神将被击败！{0}夺得胜利！':
        'Reinforcements crushed the Imperial General! {0} wins!',
    '在[{0}]{1}的带领下，{2}防守成功，夺得胜利！':
        '[{0}]{1} leads {2} to a successful defense! Victory!',
    '{0}全体英勇抗敌，防守成功，夺得胜利！':
        '{0} fought bravely — defense succeeded! Victory!',

    # ── Territory / outpost ───────────────────────────────────────────────────
    '据点{0}正在被偷袭，请速速前往防守！': 'Outpost {0} is under attack! Go defend!',
    '江湖纷争，错综复杂，{0}占领了{1}，持续获得奖励！':
        '{0} captured {1}! Earning ongoing rewards!',
    '风云天下，逆水行舟，{0}占领{1}统领了势力{2}，结算时将获得丰厚奖励！':
        '{0} captured {1} and controls territory {2} — great rewards at settlement!',
    "<font color='#c7ba6c'>宗门<font color='#12fe00'>{0}</font>所持有领地<font color='#12fe00'>{1}</font>的旗帜已被摧毁，宗门<font color='#12fe00'>{2}</font>拥有了旗帜的优先采集权！</font>":
        "<font color='#c7ba6c'>Guild <font color='#12fe00'>{0}</font>'s <font color='#12fe00'>{1}</font> flag destroyed! Guild <font color='#12fe00'>{2}</font> has priority harvest!</font>",
    "<font color='#c7ba6c'>宗门<font color='#12fe00'>{0}</font>的<font color='#12fe00'>{1}</font>采集了领地<font color='#12fe00'>{2}</font>的旗帜，暂时拥有了该领地的所属权，大家快攻击领地旗帜进行抢夺吧！</font>":
        "<font color='#c7ba6c'>Guild <font color='#12fe00'>{0}</font>'s <font color='#12fe00'>{1}</font> seized <font color='#12fe00'>{2}</font> flag! Attack the flag to contest it!</font>",
    "宗门-<font color='#12fe00'>{0}</font>持有领地-<font color='#12fe00'>{1}</font>的旗帜满15分钟，该旗帜已被永久持有，不会继续受到伤害！":
        "Guild-<font color='#12fe00'>{0}</font> held territory-<font color='#12fe00'>{1}</font> flag 15 min! Flag permanently secured!",

    # ── World BOSS champion ───────────────────────────────────────────────────
    '恭喜[{0}]{1}获得世界BOSS活动霸主之位！':
        '[{0}]{1} won the World BOSS Champion!',
    '恭喜[{0}]{1}摇出{2}点，获得魔神幸运大奖：{3}！':
        '[{0}]{1} rolled {2} pts, won Demon God prize: {3}!',
    '杀破苍穹，惊天泣鬼！杀神之路正式开启！{0}':
        'Killing God path open! {0}',
    '本次天尊夺宝结束！新一任天尊：{0}':
        'Heaven Lord event ended! New Heaven Lord: {0}',

    # ── Gear enhancement broadcast ────────────────────────────────────────────
    '{0}金戈铁马，气吞万里，全身装备强化达到了<font color=\'#ffae00\'>{1}</font>级！':
        '{0} enhanced all gear to <font color=\'#ffae00\'>{1}</font>!',
    '{0}镶嵌了{1}，流光溢彩，熠熠生辉！': '{0} inlaid {1} — radiant!',

    # ── Mount / equip advancement ─────────────────────────────────────────────
    "<font color='#12fe00'>恭喜{0}</font>将坐骑成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫坐骑<font color='#ffae00'>{2}</font>，实力暴涨，还收获了大批迷妹！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded mount to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! Power surged! {3}",
    "<font color='#12fe00'>恭喜{0}</font>将机甲成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫机甲<font color='#ffae00'>{2}</font>，从此再也不用担心灵宠的安全！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded mecha to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! Pets are safe! {3}",
    "<font color='#12fe00'>恭喜{0}</font>将神兵成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫神兵<font color='#ffae00'>{2}</font>，称霸寰宇，指日可待！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded divine weapon to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! Dominance incoming! {3}",
    "<font color='#12fe00'>恭喜{0}</font>将法轮成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫法轮<font color='#ffae00'>{2}</font>，实力暴涨，还解锁了新的逼格！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded wheel to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! New power unlocked! {3}",
    "<font color='#12fe00'>恭喜{0}</font>将喷饰成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫喷饰<font color='#ffae00'>{2}</font>，实力暴涨，吓坏了隔壁老王！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded sprayer to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! Everyone is amazed! {3}",
    "<font color='#12fe00'>恭喜{0}</font>将火器成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫火器<font color='#ffae00'>{2}</font>，实力暴涨，风光无限！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded firearm to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! Limitless glory! {3}",
    "<font color='#12fe00'>恭喜{0}</font>将仙盾成功进阶至<font color='#12fe00'>{1}阶</font>，激活了酷炫仙盾<font color='#ffae00'>{2}</font>，实力暴涨，从此走上人生巅峰！{3}":
        "<font color='#12fe00'>Congrats {0}</font> upgraded celestial shield to <font color='#12fe00'>{1}</font>, activated <font color='#ffae00'>{2}</font>! Peak reached! {3}",

    # ── Chat unlock ───────────────────────────────────────────────────────────
    "<font color='#ff4949'>传讯聊天功能{0}级开放！</font>":
        "<font color='#ff4949'>Whisper chat at level {0}!</font>",
    "<font color='#ff4949'>场景聊天功能{0}级开放！</font>":
        "<font color='#ff4949'>Area chat unlocks at level {0}!</font>",

    # ── Kill / combat announcements ───────────────────────────────────────────
    '{0}在【BOSS】{1}（{2}转{3}级）击杀中对其造成最后一击，获得{4}！':
        '{0} dealt the killing blow to [BOSS] {1} (Reb.{2} Lv.{3}) and got {4}!',
    '{0}在<font color=\'#c7ba6c\'>（{2}转{3}级）【BOSS】{1}</font>击杀中伤害排名第一，获得{4}！':
        '{0} ranked #1 damage on <font color=\'#c7ba6c\'>[BOSS]{1}(Reb.{2} Lv.{3})</font> and got {4}!',
    '{0}在<font color=\'#c7ba6c\'>（{2}转{3}级）【BOSS】{1}</font>击杀中伤害排名第二，获得{4}！':
        '{0} ranked #2 damage on <font color=\'#c7ba6c\'>[BOSS]{1}</font> and got {4}!',
    '{0}在<font color=\'#c7ba6c\'>（{2}转{3}级）【BOSS】{1}</font>击杀中伤害排名第三，获得{4}！':
        '{0} ranked #3 damage on <font color=\'#c7ba6c\'>[BOSS]{1}</font> and got {4}!',
    '{0}在<font color=\'#c7ba6c\'>【BOSS】{1}（{2}转{3}级）</font>击杀中伤害排名第一，获得{4}！':
        '{0} ranked #1 damage on <font color=\'#c7ba6c\'>[BOSS]{1}</font> and got {4}!',
    '{0}在<font color=\'#c7ba6c\'>【BOSS】{1}（{2}转{3}级）</font>击杀中对其造成最后一击，获得{4}！':
        '{0} dealt killing blow to <font color=\'#c7ba6c\'>[BOSS]{1}</font> and got {4}!',
    '{0}在<font color=\'#c7ba6c\'>【全民BOSS】{1}</font>击杀中伤害排名第一，获得{2}！':
        '{0} ranked #1 damage on <font color=\'#c7ba6c\'>[All-Server BOSS]{1}</font>, got {2}!',
    '{0}在<font color=\'#c7ba6c\'>【全民BOSS】{1}</font>击杀中伤害排名第二，获得{2}！':
        '{0} ranked #2 damage on <font color=\'#c7ba6c\'>[All-Server BOSS]{1}</font>, got {2}!',
    '{0}在<font color=\'#c7ba6c\'>【全民BOSS】{1}</font>击杀中伤害排名第三，获得{2}！':
        '{0} ranked #3 damage on <font color=\'#c7ba6c\'>[All-Server BOSS]{1}</font>, got {2}!',
    '{0}在<font color=\'#c7ba6c\'>【个人BOSS】{1}</font>中成功击杀BOSS，获得{2}！':
        '{0} defeated <font color=\'#c7ba6c\'>[Solo BOSS]{1}</font> and got {2}!',

    # ── Kill streak ───────────────────────────────────────────────────────────
    '战报：<font color=\'#c7ba6c\'>{0}完成<font color=\'#ff4949\'>5连杀</font>，谁来阻挡他的锋芒！</font>':
        'Report: <font color=\'#c7ba6c\'>{0} achieved a <font color=\'#ff4949\'>5-kill streak</font>!</font>',
    '战报：<font color=\'#c7ba6c\'>{0}完成<font color=\'#ff4949\'>10连杀</font>，他主宰着战场的生死！</font>':
        'Report: <font color=\'#c7ba6c\'>{0} is on a <font color=\'#ff4949\'>10-kill streak</font>!</font>',
    '战报：<font color=\'#c7ba6c\'>{0}完成<font color=\'#ff4949\'>20连杀</font>，天尊之位舍他其谁！</font>':
        'Report: <font color=\'#c7ba6c\'>{0} is on a <font color=\'#ff4949\'>20-kill streak</font>!</font>',
    '{0}终结了{1}的超神之路，我们为他欢呼！':
        '{0} ended {1}\'s kill streak!',

    # ── Guild / alliance ──────────────────────────────────────────────────────
    '{0}（Power：{1}）申请加入宗门，请批准！': '{0} (Power:{1}) applied to join the guild!',
    '恭喜{0}（Power：{1}）加入宗门！': 'Congrats! {0} (Power:{1}) joined the guild!',
    '很遗憾，{0}（Power：{1}）退出宗门！': '{0} (Power:{1}) left the guild.',
    '宗主将{0}（Power：{1}）任免为{2}！': 'Guild Master promoted {0} (Power:{1}) to {2}!',
    '宗主修改了公告：{0}': 'Guild notice updated: {0}',
    '[{0}]{1}吹响集结号，鼓舞全盟成员，<font color=\'#29b113\'>ATK+30%</font>！':
        '[{0}]{1} rallied the guild! <font color=\'#29b113\'>ATK+30%</font>!',

    # ── Chat restrictions ─────────────────────────────────────────────────────
    '<font color=\'#ff4949\'>该玩家不在线或不存在！</font>':
        '<font color=\'#ff4949\'>Player is offline or does not exist!</font>',
    '<font color=\'#ff4949\'>您已被禁止发言！</font>':
        '<font color=\'#ff4949\'>You are banned from chatting!</font>',
    '<font color=\'#ff4949\'>世界聊天功能{0}级开放！</font>':
        '<font color=\'#ff4949\'>World chat unlocks at level {0}!</font>',
    '<font color=\'#ff4949\'>您说话太快了，请休息一下！</font>':
        '<font color=\'#ff4949\'>You are chatting too fast. Please slow down!</font>',
    '<font color=\'#ff4949\'>私聊功能{0}级开放！</font>':
        '<font color=\'#ff4949\'>Private chat unlocks at level {0}!</font>',
    '<font color=\'#ff4949\'>不能和自己聊天！</font>':
        '<font color=\'#ff4949\'>You cannot chat with yourself!</font>',
    '<font color=\'#ff4949\'>错误的私聊对象！</font>':
        '<font color=\'#ff4949\'>Invalid chat target!</font>',
    '<font color=\'#ff4949\'>宗门聊天功能{0}级开放！</font>':
        '<font color=\'#ff4949\'>Guild chat unlocks at level {0}!</font>',

    # ── Common error messages ─────────────────────────────────────────────────
    '未知错误':                    'Unknown error',
    '服务器真忙，请稍后再试':      'Server is busy. Please try again.',
    '背包或仓库为空':              'Bag or storage is empty',
    '物品操作系统错误':            'Item operation error',
    '空间不足':                    'Insufficient space',
    '没有找到物品':                'Item not found',
    '位置已被占用':                'Slot already occupied',
    '超出最大空间格':              'Exceeded max slots',
    '只能转移到背包':              'Can only move to bag',
    '背包已满':                    'Bag is full',
    '不可穿戴装备':                'Cannot equip this item',
    '已穿戴':                      'Already equipped',
    '物品整理失败':                'Item sort failed',
    '绑定元宝不足':                'Insufficient bound gems',
    '物品数量错误':                'Invalid item quantity',
    '物品绑定信息错误':            'Item bind info error',
    '技能不存在':                  'Skill not found',
    '技能已达最大等级':            'Skill at max level',
    '此技能不能升级':              'This skill cannot be upgraded',
    '技能组CD冷却中':              'Skill group on cooldown',
    '技能CD冷却中':                'Skill on cooldown',
    '技能配置错误':                'Skill config error',
    '姿势不对，无法传送':          'Invalid state for teleport',
    '传送中，请耐心等候':          'Teleporting, please wait...',
    '地图不存在':                  'Map not found',
    '您当前还未进入场景':          'You have not entered the scene',
    '系统繁忙，获取失败':          'System busy, please retry',
    '系统出错，请稍候再试':        'System error. Please try again.',
    '系统出错':                    'System error',
    '创建角色失败':                'Character creation failed',
    '系统繁忙':                    'System busy',
    '等级不符合':                  'Level requirement not met',
    '操作条件不满足':              'Conditions not met',
    '距离目标太远了':              'Too far from target',
    '等级未达到该场景要求':        'Level too low for this area',
    '背包空间不足':                'Insufficient bag space',
    '物品使用玩家等级不够':        'Player level too low to use this item',
    '物品不能使用':                'Item cannot be used',
    '仓库已满':                    'Storage is full',
    '非法的物品数量':              'Invalid item amount',
    '该物品已经过期':              'This item has expired',
    '获取排行榜数据失败':          'Failed to get ranking data',
    '装备等级不能高于角色等级':    'Gear level cannot exceed character level',
    '铸魂失败':                    'Soul Cast failed',
    '铸魂等级已满':                'Soul Cast at max level',
    '强化成功':                    'Enhancement successful!',
    '达到最大强化等级了！':        'Max enhancement level reached!',
    '功能未开启':                  'Feature not unlocked',

    # ── Queue / party ─────────────────────────────────────────────────────────
    '组队等级不足！':              'Level too low to form party!',
    '已有队伍！':                  'Already in a party!',
    '创建队伍失败！':              'Failed to create party!',
    '队伍不存在！':                'Party does not exist!',
    '不在队伍中！':                'Not in a party!',
    '您不是队长！':                'You are not the party leader!',
    '不能操作自己！':              'Cannot target yourself!',
    '队伍已满！':                  'Party is full!',
    '角色不在线或者不存在！':      'Player is offline or not found!',
    '对方等级不足！':              'Target\'s level is too low!',
    '对方已经有队伍！':            'Target already has a party!',
    '对方不在线！':                'Target is offline!',
    '{0}进入了队伍！':             '{0} joined the party!',
    '{0}离开了队伍！':             '{0} left the party!',
    '{0}成为了队长！':             '{0} became the party leader!',

    # ── Enemy / friend ────────────────────────────────────────────────────────
    '您的仇人{0}上线了！':         'Your enemy {0} has come online!',
    '您的仇人{0}下线了！':         'Your enemy {0} has gone offline.',
    '好友已达上限':                'Friends list is full',
    '仇人已达上限':                'Enemy list is full',
    '对方已经是您的好友，请勿重复添加！': 'Already your friend!',
    '对方已经是您的仇人，请勿重复添加！': 'Already your enemy!',
    '对方不在线':                  'Target is offline',

    # ── Dungeon ───────────────────────────────────────────────────────────────
    '副本不存在！':                'Dungeon not found!',
    '副本进入次数已满！':          'Dungeon entry limit reached!',
    '上个副本评分太低！':          'Too low a score in the last dungeon!',
    '副本已达到最高层':            'Reached max dungeon floor',
    '未通关上一层，不能挑战':      'Clear previous floor first',
    '已经在副本里面！':            'Already inside a dungeon!',
    '在其它活动里面！':            'Currently in another activity!',
    '已经死亡！':                  'Already dead!',
    '正在PK！':                    'In PvP combat!',
    '正在传送！':                  'Teleporting!',
    '副本中不能传送':              'Cannot teleport inside dungeon',
    '活动中不能传送':              'Cannot teleport during event',
    '道具不足，无法进入副本':      'Insufficient items to enter dungeon',

    # ── Rewards / mail ────────────────────────────────────────────────────────
    '转生奖励':                    'Rebirth Reward',
    '背包满了，请注意查收！':      'Bag is full — please check your mail!',
    '任务奖励':                    'Quest Reward',
    '副本奖励':                    'Dungeon Reward',
    '离线奖励':                    'Offline Reward',
    '经验副本奖励':                'EXP Dungeon Reward',
    '由于您中途掉线，给予如下补偿！': 'Disconnection compensation:',
    '论剑台每日结算':              'Arena Daily Settlement',
    '全民boss奖励':                'All-Server BOSS Reward',
    '皇城战胜利奖励':              'Imperial War Victory Reward',
    '皇城战参与奖励':              'Imperial War Participation Reward',
    '已领取此领地奖励！':          'Territory reward already claimed!',
    '奖励领取成功！':              'Reward claimed successfully!',
    '已领取':                      'Already claimed',
    '使用成功！':                  'Used successfully!',

    # ── Misc UI feedback ──────────────────────────────────────────────────────
    '吆喝冷却中，剩余：{0}秒':    'Shout on cooldown: {0}s remaining',
    '您已加入队伍，无法申请入队！': 'Already in a party — cannot apply!',
    '目标队伍已满员，无法申请入队！': 'Target party is full!',
    '对方已成功入队！':            'Player joined the party!',
    '转生数已达到最大值':          'Max rebirths reached',
    '寄售的物品不存在':            'Listed item not found',
    '绑定物品不能寄售':            'Bound items cannot be listed',
    '物品数量不足':                'Insufficient item quantity',
    '购买失败':                    'Purchase failed',
    '可购买次数不足':              'Insufficient purchase attempts',
    '称号配置错误':                'Title config error',
    '启用称号失败':                'Failed to activate title',
    '你已经有该称号':              'You already have this title',
    '你没有该称号':                'You do not have this title',
    '你正在使用该称号':            'This title is already active',
    '保存技能成功！':              'Skills saved!',
    '重命名技能成功！':            'Skill renamed!',
    '等级不够，不能参与此活动':    'Level too low for this activity',
    '当前在其他活动中，不能参与此活动': 'Already in another activity',
    '活动未开启，不能参与此活动':  'Activity is not open yet',
    '今日已参与过传功活动':        'Already participated in training today',
    '传功活动未开始':              'Training event has not started',
    '没有权限':                    'No permission',
    '成就奖励已领取':              'Achievement reward claimed',
    '成就未完成，不可领取':        'Achievement not completed',
    '今日寻宝次数已满':            'Daily treasure hunt limit reached',
    '没有更好属性可刷出来':        'No better attributes available',
    '该装备不能升星':              'This gear cannot get star-up',
    '没有升星材料':                'No star-up materials',
    '装备升星成功':                'Gear star-up successful!',
    '装备升星失败':                'Gear star-up failed',
    '声望不足':                    'Insufficient reputation',
    '转生后可继续使用！':          'Available again after rebirth!',
    '坐骑升阶功能未开放':          'Mount upgrade not unlocked yet',
    '威望不足':                    'Insufficient prestige',
    '已签到':                      'Already checked in',
    '今天已参与火眼金睛活动':      'Already participated in Sharp Eye today',
    '火眼金睛活动未开始':          'Sharp Eye event has not started',
    '抽奖次数不足':                'Insufficient lottery attempts',
    '寻宝获得了{0}':               'Treasure found: {0}',
    '藏宝地空空如也！':            'The treasure spot is empty!',
    '空间破碎，进入了未知异域！':  'Space shattered — entering the unknown realm!',
}


def load_cw(path):
    with open(path, 'rb') as f:
        return bytearray(f.read())


def save_cw(path, data):
    bak = path + '.bak'
    if not os.path.exists(bak):
        shutil.copy2(path, bak)
        print(f'  Backup: {bak}')
    with open(path, 'wb') as f:
        f.write(data)


def replace_string(data, old_cn: str, new_en: str) -> tuple[bytearray, bool]:
    """
    Find [2B BE len][old_cn utf-8] in data and replace content in-place.

    CRITICAL: The 2B length field MUST stay as len(old_b) so the binary
    parser advances by the original number of bytes and stays aligned.
    The English string is padded with trailing spaces to fill the old slot.
    The game displays the string (with harmless trailing spaces trimmed by
    the UI renderer), and subsequent fields are parsed correctly.
    """
    old_b = old_cn.encode('utf-8')
    new_b = new_en.encode('utf-8')

    if len(new_b) > len(old_b):
        print(f'  SKIP (new longer by {len(new_b)-len(old_b)}B): {old_cn[:35]}')
        return data, False

    # Needle: length field (original) + original string bytes
    needle = struct.pack('>H', len(old_b)) + old_b
    idx = data.find(needle)
    if idx < 0:
        return data, False

    # Replacement: keep length field = len(old_b), pad string with spaces
    padded = new_b + b' ' * (len(old_b) - len(new_b))
    # Length field unchanged — parser reads len(old_b) bytes and stays aligned
    replacement = struct.pack('>H', len(old_b)) + padded
    data[idx:idx + len(needle)] = replacement
    return data, True


def main():
    print(f'Loading {CW_PATH}')
    data = load_cw(CW_PATH)

    ok = skip = 0
    for cn, en in TRANSLATIONS.items():
        data, success = replace_string(data, cn, en)
        if success:
            ok += 1
            print(f'  ✓ {cn[:45]}')
        else:
            # String might not exist or is already translated
            skip += 1

    save_cw(CW_PATH, data)
    print(f'\nDone: {ok} translated, {skip} skipped (not found or too long)')
    print(f'File: {CW_PATH}')


if __name__ == '__main__':
    main()
