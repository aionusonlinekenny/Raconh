// RaconH English Translation Hook v19
(function(){
var _m={
// --- First recharge panel (must precede 充值→Recharge component) ---
'首充豪礼':'First Recharge Gift',
'首充奖励至少充值':'First Recharge: min. recharge ',
'元可领':'yuan to claim',
// --- System announcements (substrings after {0} substitution) ---
// NOTE: template uses 战力榜 (not Power榜); 战力→Power runs LATER so key must use original
'叱咤风云，笑傲江湖。战力榜第一名':'Power Rank #1 ',
'回到了龙门客栈，势必再掀起一场腥风血雨':' has returned to Dragon Gate Inn!',
'[系统]':'[System]','[系统提示]':'[System]',
// --- Login / Server ---
'账号':'Account','密码':'Password','选择区服':'Select Server','点击换服':'Switch Server',
'切换区服':'Switch Server','区服':'Server','充值':'Recharge',
// --- Dungeon unlock conditions ---
'到达剧情副本第':'Reach Story Ch.','关后开启':'to unlock',
// --- Feature names ---
'门派成员':'Guild Members','职位':'Role',
'墨宠':'Pet','命格':'Destiny','绝学':'Skills','聚宝蟾':'Treasure','等级礼':'Lv.Gift',
'七日礼':'7-Day Gift','自动任务':'Auto Task','日常任务':'Daily Quest','盟会正殿':'Guild Hall','盟会职位':'Guild Rank',
'盟会试炼':'Guild Trial','冲榜竞技':'PvP Rank','充值活动':'Top-up Event',
'装扮':'Costume','称号':'Title','论剑台':'Duel Arena','神兵':'Weapon','摆摊':'Market',
'魔神入侵':'Devil Raid','好友系统':'Friends','神器':'Artifact','功能预告':'Preview',
// --- Skill book names (juexue_data) — appear in 【】 in Hall of Heroes announcements ---
'罗汉伏魔功':'Luohan Devil Fist','圣火令神功':'Sacred Flame Art','大金刚掌':'Great Vajra Palm',
'神门十三剑':'Thirteen Gate Swords','大九天手':'Nine Heavens Hand','空明拳':'Void Clarity Fist',
'乾坤大挪移':'Universe Transfer','九阴真经':'Nine Yin Classic','七伤拳':'Seven Injury Fist',
'纯阳无极功':'Pure Yang Art','混元功':'Primal Unity Art','碧波掌法':'Blue Wave Palm',
'凌波微步':'Rippling Steps','玉萧剑法':'Jade Flute Sword','太极拳剑':'Tai Chi Sword',
'两仪剑法':'Yin-Yang Sword','绕指柔剑':'Supple Sword','易筋经':'Muscle Classic',
'伏虎拳':'Tiger Fist',
// --- Active skill names (skill_data) ---
'凌霄剑法':'Soaring Sword Art','狂风快剑':'Gale Sword','雷霆万钧':'Thunder Strike',
'碧海潮生':'Ocean Surge','凌烟剑法':'Misty Sword Art','落英神剑':'Petal Sword',
'万剑归宗':'Myriad Swords','北冥神功':'North Sea Art',
'无视冷却':'Ignore CD','附加冰冻':'Freeze','附加中毒':'Poison',
'无视防御':'Ignore DEF','必定暴击':'Guaranteed Crit','闪避反伤':'Dodge Counter',
'附加沉默':'Silence','附加眩晕':'Stun',
// --- Item descriptions ---
'最强群攻':'Max AOE','全屏大招':'Full AOE','杀怪效率提升':'Kill EFF+','杀怪效率+':'Kill EFF+',
'极品武器':'Premium Weapon',
'绝世武学':'Supreme Arts','龙战八荒':'Dragon Realm',
// --- Item tooltip ---
'激活或提升':'Activate or upgrade ','类型：':'Type: ','通用':'Universal',
// --- Treasure hunt UI ---
'积分：':'Points: ','积分不足':'Insufficient points','寻宝记录':'Hunt Records',
'每次寻宝获得3万银币，同时必得绝学心法\n寻宝10次必得紫色品质以上绝学心法':
    'Each hunt: 30,000 Silver + guaranteed Skill Book\n10x hunt: guaranteed Purple-quality or above Skill Book',
// --- Common UI labels ---
'战斗力':'Combat Power','战力：':'Power: ','战力:':'Power:','战力':'Power',
'恭喜{0}击杀{1}，获得珍贵物品：{2}！':'Congrats! {0} defeated {1}, got: {2}!',
'未知错误':'Unknown error',
'背包或仓库为空':'Bag/storage empty',
'空间不足':'No space',
'位置已被占用':'Slot occupied',
'不可穿戴装备':'Cannot equip',
'已穿戴':'Equipped',
'绑定元宝不足':'Insufficient bound gems',
'物品数量错误':'Invalid qty',
'此技能不能升级':'Skill cannot level up',
'技能组CD冷却中':'Skill group CD',
'您当前还未进入场景':'Not in scene yet',
'系统出错，请稍候再试':'System error. Retry.',
'创建角色失败':'Create char failed',
'背包空间不足':'Bag full',
'物品使用玩家等级不够':'Level too low',
'物品不能使用':'Cannot use',
'仓库已满':'Storage full',
'装备等级不能高于角色等级':'Gear lvl > char lvl',
'铸魂失败':'Soul Cast failed',
'铸魂等级已满':'Soul Cast max',
'铸魂配置出错，请联系GM更新配置！':'Soul Cast config error. Contact GM.',
'强化成功':'Enhanced!',
'功能未开启':'Feature locked',
'组队等级不足！':'Party lvl too low!',
'已有队伍！':'Already in party!',
'创建队伍失败！':'Create party failed!',
'队伍不存在！':'Party not found!',
'您不是队长！':'Not the leader!',
'不能操作自己！':'Cannot target self!',
'{0}成为了队长！':'{0} is now leader!',
'您的仇人{0}上线了！':'Enemy {0} is online!',
'您的仇人{0}下线了！':'Enemy {0} went offline.',
'好友已达上限':'Friends list full',
'对方不在线':'Offline',
'副本进入次数已满！':'Dungeon limit reached!',
'上个副本评分太低！':'Last dungeon score too low!',
'副本已达到最高层':'Max dungeon floor',
'已经在副本里面！':'Already in dungeon!',
'在其它活动里面！':'In another activity!',
'正在PK！':'In PvP!',
'副本中不能传送':'No teleport in dungeon',
'活动中不能传送':'No teleport in event',
'道具不足，无法进入副本':'Need items to enter',
'转生奖励':'Rebirth Reward',
'背包满了，请注意查收！':'Bag full — check mail!',
'副本奖励':'Dungeon Reward',
'离线奖励':'Offline Reward',
'奖励领取成功！':'Reward claimed!',
'使用成功！':'Used!',
'已领取':'Claimed',
'声望不足':'Low reputation',
'威望不足':'Low prestige',
'坐骑升阶功能未开放':'Mount upgrade locked',
'转生后可继续使用！':'Use again after rebirth!',
'今日寻宝次数已满':'Daily treasure limit',
'藏宝地空空如也！':'Treasure spot empty!',
'空间破碎，进入了未知异域！':'Space shattered!',
'抽奖次数不足':'Low lottery attempts',
'寻宝获得了{0}':'Found: {0}',
'已签到':'Checked in',
'今天已参与火眼金睛活动':'Sharp Eye done today',
'火眼金睛活动未开始':'Sharp Eye not started',
'没有权限':'No permission',
'成就奖励已领取':'Achievement claimed',
'装备升星成功':'Star-up success!',
'装备升星失败':'Star-up failed',
'该装备不能升星':'Cannot star up',
'没有升星材料':'No star-up mats',
'购买失败':'Buy failed',
'可购买次数不足':'Buy limit reached',
'启用称号失败':'Title activate failed',
'你已经有该称号':'Already have title',
'你没有该称号':'No such title',
'你正在使用该称号':'Title already active',
'传功活动未开始':'Training not started',
'宗主修改了公告：{0}':'Guild notice: {0}',
// --- Chat system ---
'该玩家不在线或不存在！':'Player offline/not found!',
'您已被禁止发言！':'You are muted!',
'世界聊天功能{0}级开放！':'World chat: Lv.{0}+',
'您说话太快了，请休息一下！':'Slow down!',
'私聊功能{0}级开放！':'PM: Lv.{0}+',
'不能和自己聊天！':'Cannot chat with self!',
'宗门聊天功能{0}级开放！':'Guild chat: Lv.{0}+',
// --- Attribute stats ---
'极品属性':'Bonus Stats','铸魂属性':'Soul Stats','套装效果':'Set Effect',
'强化等级':'Enh Level','强化石':'Enh Stone',
'攻击增加':'ATK+','防御增加':'DEF+','破甲增加':'Pen+','命中增加':'Hit+',
'闪避增加':'Eva+','暴击增加':'Crit+','坚韧增加':'TEN+','气血增加':'HP+',
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
'血精石(5级)':'Blood Crystal Lv.5','血精石(6级)':'Blood Crystal Lv.6',
'血精石(7级)':'Blood Crystal Lv.7','血精石(8级)':'Blood Crystal Lv.8',
'血精石(9级)':'Blood Crystal Lv.9','血精石(10级)':'Blood Crystal Lv.10',
'可在"锻造-宝石"中镶嵌':'Inlay in Forge-Gems',
'激活称号':'Activate Title',
'生命恢复':'HP Regen','伤害加深':'DMG Amp','伤害减免':'DMG Reduce',
'暴击几率':'Crit Rate','命中几率':'Hit Rate','闪避几率':'Evasion Rate',
'气血上限':'Max HP','气血':'HP','攻击':'ATK','防御':'DEF','破甲':'Pen',
'命中':'Hit','闪避':'Eva','暴击':'Crit','坚韧':'TEN',
'战力':'Power','等级':'Level','移动':'Speed','生命':'HP',
'伤害加成':'DMG Bonus',
'未激活':'Inactive','已激活':'Active',
'普通':'Normal','精英':'Elite','史诗':'Epic','传说':'Legendary',
'次数不足':'Insuf. attempts','银币不足':'Insuf. silver','元宝不足':'Insuf. gems',
'武器':'Weapon','项链':'Necklace','戒指':'Ring',
'腰带':'Belt','头盔':'Helmet','铠甲':'Armor','手套':'Gloves','鞋子':'Boots',
'查看属性':'View Attrs','一键装备':'One-key Equip',
'角色':'Character','背包':'Backpack','仓库':'Storage',
'出售':'Sell','丢弃':'Discard','使用':'Use',
'品质':'Quality','绑定':'Bound','未绑定':'Unbound',
// --- Scene names with component-word conflicts (must precede 经验/银币/副本/盟会) ---
'银币副本':'Silver Dungeon','经验副本':'EXP Dungeon',
'击杀':'Kill','经验':'EXP','银币':'Silver','元宝':'Gems',
'掉落':'Drop','采集':'Gather','怪物':'Monster','场景':'Scene',
'战力：':'Power:','气血：':'HP:','攻击：':'ATK:','防御：':'DEF:',
// --- Common UI ---
'开始游戏':'Start Game','进入游戏':'Enter Game','创建角色':'Create Char',
'确定':'OK','取消':'Cancel','关闭':'Close','返回':'Back',
'分钟':'min','回城':'Return',
'改名卡':'Rename Card',
'请输入新名字：':'Enter new name:',
'请输入新名字:':'Enter new name:',
'名字最长5个字':'Max 5 characters',
'现任掌门：':'Guild Master: ','虚位以待':'Vacant',
'钢铁之心':'Steel Heart',
'钻石特权加成':'Diamond Privilege Bonus ',
'升级':'Level Up','装备':'Equip','镶嵌':'Inlay','宝石':'Gem','铸魂':'Soul Cast',
'任务':'Quest','九霄塔':'Sky Tower','演武场':'Arena','金玉堂':'Treasure Hall',
'盟会守军':'Guild Guard','盟会守卫':'Guild Defender',
'挑战':'Challenge','关卡排名':'Stage Rank','盟会':'Guild',
'第':'Ch.','级':'Lv.','关':'Stage','层':'Floor',
'爬塔副本':'Tower Dungeon','聚元副本':'Origin Dungeon',
'全民副本':'All-Server Dungeon',
'剧情副本':'Story','副本':'Dungeon','关卡':'Level',
'全民':'All-Server','珍稀掉落':'Rare Drops',
'铸魂配置出错，请联系GM更新配置！':'Soul Cast cfg error - contact GM!',
'伤害':'DMG','血量':'HP','技能':'Skill','冷却':'CD','强化':'Enh',
// --- Task names (pure Chinese — no pre-translated component words) ---
'初试身手':'First Steps','小试牛刀':'Warm Up','扑朔迷离':'Mysterious',
'凌烟问道':'Hall Quest','凌烟阁寻宝':'Hall Treasure Hunt',
'英雄试炼':'Hero Trial','面对强敌':'Face a Foe',
'突飞猛进':'Rapid Growth','从容应对':'Steady',
'黑夜降临':'Night Falls','声名鹊起':'Rising Fame',
'深陷重围':'Surrounded','阁主试炼':'Hall Master Trial',
'加入一个盟会':'Join a Guild','浴血抗敌':'Bloody Battle','学成下山':'Training Complete',
'初探缥缈录':'First Dungeon','切磋武艺':'Sparring',
'琅琊练体':'Langya Training','试炼开始':'Trial Begins',
'独孤试炼':'Lone Trial','师兄弟切磋':'Brother Sparring',
'老阁主的惩罚':"Master's Punishment",
'刺探敌情':'Spy on Enemy','江湖秘闻':'Jianghu Secrets',
'独闯决神殿':'Solo Temple','路遇阻挠':'Road Blocked',
'神殿奇闻':'Temple Tales','龙门渡之行':'Dragon Gate Journey',
'决神试炼':'Divine Trial','凌云问道':'Lingyun Quest',
'凌云奇遇':'Lingyun Adventure','登顶凌云山':'Summit Lingyun',
'夜探孤影楼':'Shadow Tower Night','孤声飘影':'Shadow Echo',
'再探山海阁':'Sea Hall Revisit','捕风捉影':'Chasing Shadows',
'孤影秘闻':'Shadow Secrets','玉门关军报':'Jade Gate Report',
'再会玉门关':'Jade Gate Return','长河落日':'River Sunset',
'整装待发':'Ready to Go','风起长林':'Wind in Changlin',
'前线补给':'Frontline Supply','沉船迷案':'Shipwreck Mystery',
'鬼火幽冥':'Ghost Fire','势如水火':'Fire and Water',
'宋浮反水':'Betrayal','问道琅琊':'Langya Quest',
'扶风医堂':'Fufeng Clinic','及时赶到':'Arriving in Time',
'转生之路':'Rebirth Path','水落石出':'Truth Revealed',
'长林军魂':'Changlin Warriors','河堤查案':'Riverside Investigation',
'山海问道':'Sea Hall Quest','兄弟相见':'Brothers Meet',
'危机重重':'Crisis','江湖势力':'Jianghu Forces',
'江湖传闻':'Jianghu Rumors','盟会考验':'Guild Test',
// --- Mixed keys: post-translation combos (components ran before these) ---
'Guild Rank达到2阶':'Guild Rank 2','Guild Rank达到3阶':'Guild Rank 3',
'Ch.一Guild':'Top Guild',
'加入一个Guild':'Join a Guild',
'Skill满级时':'(max level)','Skill总Level':'Skill Level Total ',
'一本Skills':'Skill Books',
'Enh一次':'Enhance x1 ',
'Stage开启':' Stage Unlock',
'Power达到':'Reach Power ',
'Challenge个人':'Challenge Solo ',
// --- Component words (order: longer patterns first) ---
'夺取':'Obtain ','夺回':'Reclaim ',
'碎片':' Shard','熔炼':'Smelt ',
'进阶':'Upgrade ','升到':'Reach ',
'10阶':'Rank 10','9阶':'Rank 9','8阶':'Rank 8','7阶':'Rank 7','6阶':'Rank 6',
'5阶':'Rank 5','4阶':'Rank 4','3阶':'Rank 3','2阶':'Rank 2','1阶':'Rank 1',
'阶':'Rank',
'激活':'Activate ',
'穿戴':'Wear ','个人':'Solo ',
'全身':'Full ',
'普通捐献':'Normal Donation','高级捐献':'Premium Donation','捐献':'Donate',
'贡献':' Contrib','剩余次数':'Remaining: ',
'寻找':'Find ','无双':'Peerless ',
'传闻':' Rumor','秘闻':' Secrets',
'风声':' Rumors','一次':'x1 ','一颗':' ',
// --- Task status & common UI labels ---
'(完成)':'(Done)','进行中':'In Progress',
'查看排名':'View Ranking',
'排名：':'Rank: ','名字：':'Name: ','名字':'Name',
'请输入新Name: ':'Enter new name:','请输入新Name:':'Enter new name:',
'1RankDisciple':'Rank 1 Disciple','2RankDisciple':'Rank 2 Disciple',
'3RankDisciple':'Rank 3 Disciple','4RankDisciple':'Rank 4 Disciple',
'5RankDisciple':'Rank 5 Disciple',
'通关：':'Clear: ','时间：':'Time: ',
'盟贡：':'Contrib: ',
'挑战次数不足':'Attempts insufficient',
'先完成任务':'Finish tasks first',
'活动未开启':'Event not started',
'背包已满，是否一键熔炼':'Bag full — smelt all?',
'恭喜你挑战胜利！':'Challenge victory!',
'连胜':'Win Streak','盟内排名：':'Guild Rank: ',
// --- NPC names (npc_data) ---
'邱莫言':'Qiu Moyan','花满堂':'Hua Mantang','沈万山':'Shen Wanshan',
'大风':'Da Feng','战北野':'Zhan Beiye',
'神秘':'Mysterious ','长孙无极':'Changsun Wuji',
'宗越':'Zong Yue','云痕':'Yun Hen',
// --- Feature names (additions) ---
'经脉':'Meridian',
// --- Loot / reward notifications ---
'获得：':'Obtained: ','获得了':'obtained ',
// --- Skill description components ---
'再战':'Fight Again ','对BOSS':'vs BOSS ',
// Mixed key: 伤害→DMG fires before 对BOSS check
'对BOSSDMG':'vs BOSS DMG',
// --- Monster names (mon_data) ---
// Compound names first (before shorter component-word entries below)
'魔化修罗':'Demon Shura','璇玑密探':'Jade Spy',
'白衣剑客':'White Swordsman','荒原狼':'Wasteland Wolf',
'蒙面刺客':'Masked Assassin','大肚守军':'Gate Guard',
'琅琊阁弟子':'Langya Disciple','启竹溪守军':'Qizhu Guard',
'屠刀刺客':'Blade Assassin','黑衣刺客':'Shadow Assassin',
'大同叛军':'Datong Rebel','暗夜刺客':'Night Assassin',
'禁军':'Imperial Guard','曹少钦':'Cao Shaoqin',
'文神雕像':'Scholar Statue','武神雕像':'Warrior Statue',
'文武化身':'Sage Avatar','玄武':'Xuanwu',
'蒙烈':'Meng Lie','邪妖天师':'Evil Warlock',
'炼狱将魂':'Infernal Soul','岩灵傀儡':'Stone Golem',
'炎火妖姬':'Flame Demoness','潮汐将魂':'Tide Soul',
'萧平章':'Xiao Pingzhang','云魂':'Cloud Soul',
'雾隐':'Mist Phantom','星辉':'Starlight',
'修罗':'Shura','千绵':'Qian Mian',
'蓝月':'Blue Moon','狂狮':'Fierce Lion',
'铁成':'Tie Cheng','释羽':'Shi Yu',
'司徒':'Situ','少钦':'Shao Qin',
'月魄':'Moon Soul','玉衡':'Yu Heng',
'雷动':'Thunder Strike','寻亦':'Xun Yi',
'烟杀':'Smoke Kill','玄策':'Xuan Ce',
'墨羽':'Ink Wing','圣灵':'Holy Spirit',
'血影':'Blood Shadow','昊阳':'Hao Yang',
'擎天':'Sky Pillar','御皇神':'Imperial God',
'攻城援军':'Siege Support','攻城勇士':'Siege Warrior',
'岩魂':'Rock Soul','炎魂':'Flame Soul',
'海岩傀儡':'Sea Golem',
'缥缈录小怪':'Dungeon Minion',
// --- Title names (title_data) ---
'初露峥嵘':'Rising Star','第一盟会':'Top Guild',
'入室弟子':'Inner Disciple','谁与争锋':'Unrivaled',
'笑傲江湖':'Jianghu Legend','木秀于林':'Outstanding',
'一枝独秀':'Stand Alone','刀光剑影':'Blade Master',
'孤影傲世':'Lone Shadow','英勇神武':'Valiant',
'神机百变':'Mastermind','丹凤朝阳':'Rising Phoenix',
'一骑绝尘':'Supreme Rider','出神入化':'Transcendent',
'命格无双':'Destiny Master','电光火石':'Lightning Fast',
'流光溢彩':'Radiant','横扫千军':'Army Sweeper',
'独孤求败':'Lone Champion','登峰造极':'Pinnacle',
'惊鸿绝影':'Fleeting Shadow','超凡出神':'Divine Spirit',
'御龙在天':'Dragon Rider',
// --- Scene / dungeon names (scene_data) ---
'龙门渡':'Dragon Ferry','凌云山':'Lingyun Mt.',
'玉门关':'Jade Gate Pass','金陵':'Jinling',
'七宿山':'Seven Stars Mt.','乾陵魔窟':'Demon Cave',
'江湖风云':'Jianghu Storm','守城神将':'City Guardian',
'皇城对战':'Imperial Battle','皇城战':'Imperial War',
'缥缈录':'Misty Records',
// --- Guild role labels ---
'弟子':'Disciple','宗主':'Guild Master',
'护法':'Guild Elder','长老':'Elder',
'决神殿':'Divine Temple',
// --- Mixed key: post-translation combo (魔神→Devil Raid fires first) ---
'Devil Raid抢夺':'Devil Raid',
// --- Robot player name components (common words in bot names) ---
'幻影':'Phantom ','无尽':'Endless ','无极':'Boundless ',
'天劫':'Sky Tribulation ','天绝':'Sky End ','天锐':'Sky Edge ',
'孤傲':'Lone Pride ','月蚀':'Eclipse ','逍遥':'Free Spirit ',
'沧狼':'Blue Wolf ','浣花':'Lotus ','流星':'Meteor ',
'潜龙':'Hidden Dragon ','独醉':'Lone Drunk ','嗜血':'Bloodthirsty ',
'暗影':'Dark Shadow '
};
function _rep(s){
    if(typeof s!=='string'||!s)return s;
    for(var k in _m)if(s.indexOf(k)>=0)s=s.split(k).join(_m[k]);
    return s;
}
var _an={10:'Speed',11:'Max HP',12:'HP',13:'ATK',14:'DEF',15:'Pen',
    16:'Hit',17:'Eva',18:'Crit',19:'TEN',20:'HP Regen',21:'EXP+',
    22:'DMG+',23:'DMG-',24:'Crit%',25:'CritRes',26:'CritDMG+',
    27:'CritDMG-',28:'Hit%',29:'Eva%',30:'HP%',31:'ATK%',32:'DEF%',33:'Pen%'};
function _fixAttrCVO(){
    if(typeof AttrCVO!=='undefined'&&AttrCVO._data){
        for(var id in _an){var i=AttrCVO._data[parseInt(id)];if(i){i.name=_an[id];i.shortName=_an[id];}}
    }
}
function _patch(){
    if(typeof AttrDescTypeEx!=='undefined'&&AttrDescTypeEx.getAttrName&&!AttrDescTypeEx.__cwP){
        AttrDescTypeEx.__cwP=true;
        var _g=AttrDescTypeEx.getAttrName;
        AttrDescTypeEx.getAttrName=function(id){return _rep(_g.call(this,id));};
    }
    if(typeof AttrVoInfo!=='undefined'&&AttrVoInfo.prototype&&AttrVoInfo.prototype.desc&&!AttrVoInfo.prototype.__cwD){
        AttrVoInfo.prototype.__cwD=true;
        var _d=AttrVoInfo.prototype.desc;
        AttrVoInfo.prototype.desc=function(t,e){return _rep(_d.call(this,t,e));};
    }
    if(typeof HtmlUtil!=='undefined'){
        if(HtmlUtil.setTextFlow&&!HtmlUtil.__cwS){
            HtmlUtil.__cwS=true;var _s=HtmlUtil.setTextFlow;
            HtmlUtil.setTextFlow=function(tf,s){return _s.call(this,tf,_rep(s));};
        }
        if(HtmlUtil.addColorTag&&!HtmlUtil.__cwC){
            HtmlUtil.__cwC=true;var _c=HtmlUtil.addColorTag;
            HtmlUtil.addColorTag=function(t,c){return _c.call(this,_rep(t),c);};
        }
    }
    if(typeof egret!=='undefined'&&egret.HtmlTextParser&&egret.HtmlTextParser.prototype&&!egret.HtmlTextParser.prototype.__cwHP){
        egret.HtmlTextParser.prototype.__cwHP=true;
        var _php=egret.HtmlTextParser.prototype.parser;
        egret.HtmlTextParser.prototype.parser=function(s){return _php.call(this,_rep(s));};
    }
    if(typeof egret!=='undefined'&&egret.TextField&&egret.TextField.prototype){
        var p=egret.TextField.prototype;
        if(!p.__cwT){
            var _td=Object.getOwnPropertyDescriptor(p,'text');
            if(_td&&_td.set){p.__cwT=true;Object.defineProperty(p,'text',{get:_td.get,set:function(v){_td.set.call(this,_rep(v));},configurable:true,enumerable:_td.enumerable});}
        }
        if(!p.__cwH){
            var _hd=Object.getOwnPropertyDescriptor(p,'htmlText');
            if(_hd&&_hd.set){p.__cwH=true;Object.defineProperty(p,'htmlText',{get:_hd.get,set:function(v){_hd.set.call(this,_rep(v));},configurable:true,enumerable:_hd.enumerable});}
        }
        if(!p.__cwTF){
            var _tfd=Object.getOwnPropertyDescriptor(p,'textFlow');
            if(_tfd&&_tfd.set){
                p.__cwTF=true;
                Object.defineProperty(p,'textFlow',{get:_tfd.get,set:function(v){
                    if(v&&v.length){
                        var vv=[];
                        for(var i=0;i<v.length;i++){
                            var item=v[i];
                            if(item&&typeof item.text==='string'){
                                vv.push({text:_rep(item.text),style:item.style});
                            } else { vv.push(item); }
                        }
                        _tfd.set.call(this,vv);
                    } else { _tfd.set.call(this,v); }
                },configurable:true,enumerable:_tfd.enumerable});
            }
        }
        if(typeof eui!=='undefined'&&eui.Label&&eui.Label.prototype&&!eui.Label.prototype.__cwL){
            var lp=eui.Label.prototype,_ld=Object.getOwnPropertyDescriptor(lp,'text');
            if(_ld&&_ld.set){lp.__cwL=true;Object.defineProperty(lp,'text',{get:_ld.get,set:function(v){_ld.set.call(this,_rep(v));},configurable:true,enumerable:_ld.enumerable});}
        }
        if(typeof eui!=='undefined'&&eui.Label&&eui.Label.prototype&&!eui.Label.prototype.__cwLH){
            var lp=eui.Label.prototype,_ldh=Object.getOwnPropertyDescriptor(lp,'htmlText');
            if(_ldh&&_ldh.set){lp.__cwLH=true;Object.defineProperty(lp,'htmlText',{get:_ldh.get,set:function(v){_ldh.set.call(this,_rep(v));},configurable:true,enumerable:_ldh.enumerable});}
        }
    }
    _fixAttrCVO();
    _retranslate();
}
function _retranslate(){
    var s=(typeof egret!=='undefined')&&egret.stage;
    if(!s)return;
    function walk(d){
        if(!d)return;
        try{
            if(d.isFlow){
                var tf=d.textFlow;
                if(tf&&tf.length){
                    var needsRetrans=false;
                    for(var fi=0;fi<tf.length;fi++){
                        if(tf[fi]&&typeof tf[fi].text==='string'&&_rep(tf[fi].text)!==tf[fi].text){needsRetrans=true;break;}
                    }
                    if(needsRetrans)d.textFlow=tf;
                }
            } else {
                var t=d.text;
                if(typeof t==='string'&&t.length&&_rep(t)!==t)d.text=t;
            }
            var h=d.htmlText;
            if(typeof h==='string'&&h.length&&_rep(h)!==h)d.htmlText=h;
        }catch(e){}
        try{var n=d.numChildren;for(var i=0;i<n;i++)walk(d.getChildAt(i));}catch(e){}
    }
    walk(s);
}
document.title='EN v6';
_patch();
var _t=setInterval(function(){_patch();},500);
setTimeout(function(){
    clearInterval(_t);
    setInterval(function(){_retranslate();},3000);
},15000);
})();
