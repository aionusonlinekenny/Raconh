#!/usr/bin/env python3
"""
Translate Chinese text attributes in EXML skin files to English.
Applies to both source and bin-release directories.
"""
import os, re, sys

# ── Translation map (Chinese → English) ───────────────────────────────────────
TRANSLATIONS = {
    # ── Stats / Attributes ──
    "战力": "Power",
    "总战力：": "Total Power: ",
    "我的战力：0": "My Power: 0",
    "攻击": "Attack",
    "攻击+": "ATK+",
    "攻击+10%": "ATK+10%",
    "攻击+10%\n破甲+10%": "ATK+10%\nArmor+10%",
    "攻击+100 生命+1000": "ATK+100 HP+1000",
    "攻击+99 防御+99": "ATK+99 DEF+99",
    "攻击+9999": "ATK+9999",
    "攻击套装": "Attack Set",
    "攻击：": "ATK:",
    "防御": "Defense",
    "防守": "Defense",
    "生命": "HP",
    "生命+10%\n防御+10%": "HP+10%\nDEF+10%",
    "破甲": "Armor Break",
    "破甲：": "Armor Break:",
    "血量：": "HP:",
    "详细属性": "Detailed Stats",
    "宝石阶段属性": "Gem Stage Stats",
    "铸魂属性": "Soul Stats",
    "铸魂阶段属性": "Soul Stage Stats",
    "当前元魂激活属性": "Active Soul Stats",
    "阶段奖励属性": "Stage Reward Stats",
    "套装效果": "Set Effect",
    "极品属性": "Epic Stats",
    "数据": "Stats",

    # ── Main Menu / Navigation ──
    "人物": "Character",
    "技能": "Skills",
    "锻造": "Forge",
    "背包": "Bag",
    "盟会": "Guild",
    "天机阁": "Relics",
    "凌烟阁": "Hall of Fame",
    "福利": "Welfare",
    "贵族": "Noble",
    "自动任务": "Auto Quest",
    "查看排名": "Rankings",
    "数量": "Qty",
    "名称": "Name",
    "名称名称名称": "Name Name Name",
    "状态：": "Status:",
    "全选": "Select All",
    "提 示": "Notice",
    "提示": "Tip",
    "在线": "Online",
    "无": "None",
    "级": "Lv",
    "阶": "Stage",
    "单价": "Price",
    "总价": "Total",
    "原价:": "Original:",
    "现价:": "Price:",
    "补": "Replenish",
    "用时": "Time Used",
    "积分": "Points",
    "积分：0": "Points: 0",
    "积分：9999": "Points: 9999",
    "排名：0": "Rank: 0",
    "排名：1": "Rank: 1",
    "排名：未上榜": "Rank: Unranked",
    "我的排名：": "My Rank:",
    "我的排行：未入榜": "My Rank: Unranked",
    "我的积分：9999": "My Points: 9999",
    "净胜场：": "Net Wins:",
    "我的净胜场：": "My Net Wins:",
    "连胜：0": "Win Streak: 0",
    "第1名": "Rank #1",
    "数量": "Quantity",

    # ── Guild / Alliance ──
    "盟会贡献：": "Guild Contribution:",
    "盟会：盟会名字": "Guild: Guild Name",
    "盟内排名：99": "Guild Rank: 99",
    "盟内积分排名第1": "Guild Points Rank #1",
    "盟贡：x10": "Guild Contrib: x10",
    "盟主争夺战结束后，第一名将获得盟主之位": "After Guild War ends, #1 becomes Guild Master",
    "盟主可任命盟会成员为入室弟子": "Guild Master can appoint members as disciples",
    "我的盟会：胜": "My Guild: Win",
    "下一轮盟主争夺战00:00:00后开启": "Next Guild War opens in 00:00:00",
    "未加入盟会禁止发言": "Join a guild to chat here",
    "门派成员": "Guild Members",
    "现任掌门：": "Current Master:",
    "无职位": "No Position",
    "还有0个入室弟子名额未任命": "0 disciple slots remaining",
    "是否确定加入雄霸天下世家？（选择后无法更改）": "Join this guild? (Cannot be changed)",
    "加入推荐的世家可获得推荐好礼一份！": "Join a recommended guild for bonus rewards!",
    "防守方连胜99次，攻方获得以下战意属性": "If defenders win 99 times, attackers gain morale stats",
    "防守进攻人数：0/0": "Defenders/Attackers: 0/0",
    "城门被成功击破，攻方获得胜利。": "The gate is destroyed. Attackers win!",
    "花费      {0}鼓舞，全盟成员攻击+10%": "Spend {0} Morale, all guild ATK+10%",

    # ── Combat / Battle ──
    "战斗中有一定几率提升宠物自身攻击力10%": "In battle, chance to boost pet ATK by 10%",
    "点击敌对玩家头像即可挑战": "Tap enemy avatar to challenge",
    "伤害第一的玩家可获得击杀大奖，其他玩家可获得参与奖励": "Top damage player gets kill reward, others get participation reward",
    "恭喜你挑战胜利！": "Challenge Cleared!",
    "活动为限时挑战，请尽量在良好网络环境的安全区开始挑战": "Limited-time challenge — start in a safe area with good connection",
    "活动结束倒计时：": "Event ends in:",

    # ── VIP / Charge ──
    "成为VIP1": "Become VIP1",
    "在充值100元宝成为VIP1": "Recharge 100 Gold to become VIP1",
    "再充": "Recharge",
    "元宝提升": "Gold Boost",
    "银币提升": "Silver Boost",
    "钻石卡特权": "Diamond Card Privilege",
    "1元": "¥1",
    "体验卡剩余时间：": "Trial Card Time Left:",
    "9折": "10% Off",

    # ── Equipment / Items ──
    "已穿戴": "Equipped",
    "未打造": "Unforged",
    "(已抽干)": "(Drained)",
    "(强化+0)": "(Enhance+0)",
    "(未打造)": "(Unforged)",
    "全身宝石+30": "All Gem Slots +30",
    "全身铸魂+30": "All Soul Slots +30",
    "全部升阶": "Upgrade All",
    "更换装备不影响所镶嵌的宝石": "Swapping gear keeps gems intact",
    "一次可熔炼50件装备": "Smelt up to 50 items at once",
    "拆解成功后当前部位重置为未打造状态": "After disassembly, slot resets to unforged",
    "头  衣  手  鞋  符": "Head  Body  Hands  Feet  Rune",
    "背包已满！": "Bag Full!",
    "所需材料": "Required Materials",
    "并返还全部升阶消耗材料：": "Returns all upgrade materials:",
    "成功率：70%": "Success Rate: 70%",
    "升级条件": "Upgrade Requirements",
    "觉醒：": "Awakening:",
    "1、包中、穿戴中的红色1星、2星装备可以升星": "1★/2★ red gear in bag or equipped can be star-upgraded",
    "物品名称物品": "Item Name",
    "道具名称X1": "Item Name x1",
    "请找到以下物品": "Find the following items",
    "血精石(3级)": "Blood Stone (Lv3)",
    "宠物资质丹": "Pet Aptitude Pill",
    "宠物达到3阶": "Pet reaches Stage 3",
    "宠物进阶丹：10/20": "Pet Advance Pill: 10/20",
    "聚元丹：": "Energy Pill:",
    "奖励预览": "Reward Preview",
    "奖励：": "Reward:",
    "获得奖励：": "Reward Obtained:",
    "获得经验：": "EXP Gained:",
    "新手礼包": "Starter Pack",

    # ── Dungeon / Instance ──
    "挑战次数：": "Attempts:",
    "挑战次数：8/10": "Attempts: 8/10",
    "剩余挑战次数1次": "1 Attempt Left",
    "剩余次数5次": "5 Attempts Left",
    "剩余次数：2/2": "Attempts Left: 2/2",
    "剩余：2个": "Remaining: 2",
    "第1/10 关": "Stage 1/10",
    "下一难度\n下一难度": "Next Difficulty\nNext Difficulty",
    "下一难度：盟会职位达到{0}、当前难度sss通关": "Next: Guild rank {0} & clear current difficulty",
    "200级可挑战": "Unlocks at Lv.200",
    "30级可挑战": "Unlocks at Lv.30",
    "达到999级可挑战": "Unlocks at Lv.999",
    "通关：": "Cleared:",
    "当前：11关": "Current: Stage 11",
    "第几章": "Chapter",
    "难度总星级达到{0}星，可领取：{1}": "Reach {0}★ total to claim: {1}",
    "活跃：x10": "Activity: x10",

    # ── Landlord / Serf system ──
    "你的身份为自由身。可以抓捕苦工、解救盟友，获得大量经验。": "You are Free. Capture serfs or rescue allies for great EXP.",
    "你的身份：": "Your Status:",
    "身份：": "Status:",
    "自由": "Free",
    "自由身": "Free",
    "苦工名称：": "Serf Name:",
    "苦工等级：": "Serf Level:",
    "苦工经验：": "Serf EXP:",
    "干活时间：": "Work Time:",
    "干活经验：": "Work EXP:",
    "苦工干活时间满释放会自动提取经验": "EXP auto-collected when serf work time is full",
    "抓捕次数：": "Capture Attempts:",
    "解救次数：": "Rescue Attempts:",
    "互动次数：": "Interactions:",
    "今日互动：": "Today's Interactions:",
    "今日解救次数：": "Today's Rescues:",
    "求救次数：": "SOS Count:",
    "流放": "Exile",
    "鞭打": "Whip",
    "贿赂": "Bribe",
    "倒酒": "Pour Wine",
    "膜拜次数：": "Worship Count:",
    "互动保护时间内不可反抗或解救": "Cannot resist or rescue during interaction protection",
    "互动保护：": "Interaction Protection:",
    "离线7天以上": "Offline 7+ days",
    "离线超过8小时，只能获得80%收益": "Offline 8+ hours: only 80% income",
    "暂时没有手下败将": "No defeated rivals yet",
    "提取经验：": "Extract EXP:",

    # ── Sign-in / Daily ──
    "可补签到次数：": "Make-up Sign-ins:",
    "累计签到次数：": "Total Sign-ins:",
    "每日0点结算": "Daily reset at 00:00",
    "每日排名奖励00:00邮件发送": "Daily rank rewards sent by mail at 00:00",
    "次数：": "Count:",
    "冷却时间：": "Cooldown:",
    "恢复倒计时：00：28：00": "Recovery: 00:28:00",
    "确定花费      100清除CD吗？": "Spend 100 to clear cooldown?",
    "00:00:00后回复1次": "Restore 1 use in 00:00:00",
    "00小时00分（最多累计24小时收益）": "00h 00m (Max 24h income)",
    "周一三五20:00-20:20": "Mon/Wed/Fri 20:00-20:20",

    # ── Hall of Fame / Artifact ──
    "【角色名字】在凌烟阁中获得【珍稀道具】，真是羡煞旁人": "[Player] obtained [Rare Item] in Hall of Fame!",
    "【1角色名字】在凌烟阁中获得【珍稀道具】，真是羡煞旁人": "[Player1] obtained [Rare Item] in Hall of Fame!",
    "【5角色名字】在凌烟阁中获得【珍稀道具】，真是羡煞旁人": "[Player5] obtained [Rare Item] in Hall of Fame!",
    "记录击败首领掉落的珍稀道具、装备": "Records rare drops from boss kills",
    "寻宝记录": "Treasure Log",

    # ── Arena ──
    "对手：": "Opponent:",
    "99胜": "99 Wins",
    "点击敌对玩家头像即可挑战": "Tap enemy avatar to challenge",

    # ── Chat / System ──
    "与XXX私聊中": "Private chat with XXX",
    "向你求救": "Calling for help",
    "向您求救": "Calling for your help",
    "附件：": "Attachment:",
    "（未读）": "(Unread)",
    "亲爱的玩家": "Dear Player",

    # ── World / Map ──
    "地图名称": "Map Name",
    "乾灵虚占领王城。": "Qianlingxu has captured the Royal City.",
    "乾灵虚积分：9999": "Qianlingxu Points: 9999",
    "济风堂积分：9999": "Jifengtang Points: 9999",
    "鬼影山": "Ghost Shadow Mountain",
    "长林府": "Changlin Manor",
    "测试服": "Test Server",
    "点击换服": "Switch Server",

    # ── Player names / Placeholders ──
    "玩家名": "Player",
    "玩家名字": "Player Name",
    "玩家名字啊": "Player Name",
    "名字": "Name",
    "名字名名名名": "Name",
    "名字名字名字名字": "Name Name Name",
    "名名名名名 5转999级": "Player 5th Rebirth Lv.999",
    "Lv.21 玩家名字": "Lv.21 Player",
    "Lv.40 玩家名字": "Lv.40 Player",
    "大神": "Master",
    "大神大神大神": "Master",
    "服服服服": "Server",
    "高富帅": "Top Player",
    "英雄Lv.1": "Hero Lv.1",
    "角色名字七个字": "Character Name",
    "账号：": "Account:",
    "测试测试": "Test",
    "高峰期d d": "Peak Hours",

    # ── Misc UI ──
    "全身宝石+30": "All Gems +30",
    "当前可使用：30": "Available: 30",
    "当前已使用：6": "Used: 6",
    "当前提升       经验+10%": "Current Boost: EXP+10%",
    "每次成功提升都可增加人物10%的经验收益": "Each successful boost adds 10% EXP income",
    "候选人：": "Candidate:",
    "倒计时3s退出": "Exit in 3s",
    "倒计时后将在中立地区安全区自动复活": "Auto-revive in neutral safe zone after countdown",
    "点击空白区域关闭窗口": "Tap blank area to close",
    "你击败了XXXX，成功抢夺了TA的苦工！": "You defeated XXXX and captured their serf!",
    "你被XXX击败了": "You were defeated by XXX",
    "您被摩羯伊妮击杀了": "You were killed by MoJieYiNi",
    "[抢夺]你抢夺连月林的奴隶成功获得了TA的奴隶龙登峰。": "[Raid] You captured LianYueLin's slave LongDengFeng.",
    "[逍遥11阶]盟主大神": "[Free Stage 11] Guild Master",
    "s40.盟主大神": "s40.Guild Master",
    "四转": "4th Rebirth",
    "99转999级": "99th Rebirth Lv.999",
    "友：9999": "Friend: 9999",
    "1扣": "-1",
    "1级": "Lv.1",
    "1阶": "Stage 1",
    "9999亿": "999.9B",
    "9999亿/9999亿": "999.9B/999.9B",
    "9999分": "9999 pts",
    "999分可领\n（5/6）": "999pts claimable\n(5/6)",
    "20万/次": "200K/use",
    "星数：10": "Stars: 10",
    "绝代风华": "Peerless Beauty",
    "绝命风华": "Deadly Grace",
    "玄元剑": "Xuanyuan Sword",
    "虚位以待": "Vacancy",
    "（下级效果）": "(Lower Effect)",
    "（已激活）": "(Activated)",
    "（特权卡效果可叠加）": "(Privilege effects stack)",
    "各位大侠！奔赴将于今日10:00开始进行 停机维护，预计维护时间为30分钟，还请 各位大侠见谅啊！                                                  XX游戏运营组": "Attention! Server maintenance begins at 10:00 today, estimated 30 minutes. We apologize for the inconvenience. — Game Operations Team",
    "活跃：x10": "Active: x10",
    "激活                ，可以再领一次奖励，收益提升         元宝": "Activate to claim reward again and earn extra Gold",
    "最新消息最新消息最新消息": "Latest News",
    "最强群攻 全屏大招": "Ultimate AoE — Full Screen Strike",
}

# ── Apply translations to all EXML files ──────────────────────────────────────
SKIN_DIRS = [
    "raconh5/client/main/resource/game_skins",
    "raconh5/client/main/bin-release/web/221211145302/resource/game_skins",
]

def translate_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for zh, en in TRANSLATIONS.items():
        # Replace inside text="..." attributes
        content = content.replace(f'text="{zh}"', f'text="{en}"')
        # Replace inside label="..." attributes
        content = content.replace(f'label="{zh}"', f'label="{en}"')
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

base = os.path.dirname(os.path.abspath(__file__))
total_files = 0
changed_files = 0

for skin_dir in SKIN_DIRS:
    full_dir = os.path.join(base, skin_dir)
    if not os.path.exists(full_dir):
        print(f"SKIP (not found): {skin_dir}")
        continue
    for root, _, files in os.walk(full_dir):
        for fname in files:
            if fname.endswith('.exml'):
                total_files += 1
                if translate_file(os.path.join(root, fname)):
                    changed_files += 1

print(f"Done: {changed_files}/{total_files} EXML files updated")

# Also patch main.min.js for the few strings hardcoded there
JS_FILES = [
    "raconh5/client/main/bin-release/web/221211145302/main.min.js",
]
JS_PATCHES = {
    '"总战力："': '"Total Power:"',
    '"未加入盟会禁止发言"': '"Join a guild to chat"',
    '"盟会"': '"Guild"',
    '"背包已满！"': '"Bag Full!"',
}
for js_rel in JS_FILES:
    js_path = os.path.join(base, js_rel)
    if not os.path.exists(js_path):
        continue
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for zh, en in JS_PATCHES.items():
        content = content.replace(zh, en)
    if content != original:
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched JS: {js_rel}")
