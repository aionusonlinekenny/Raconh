// RaconH English Translation Hook v7
(function(){
var _m={
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
'墨宠':'Pet','命格':'Destiny','绝学':'Skills','聚宝蟾':'Treasure','等级礼':'Lv.Gift',
'七日礼':'7-Day Gift','日常任务':'Daily Quest','盟会正殿':'Guild Hall','盟会职位':'Guild Rank',
'盟会试炼':'Guild Trial','冲榜竞技':'PvP Rank','充值活动':'Top-up Event',
'装扮':'Costume','称号':'Title','论剑台':'Duel Arena','神兵':'Weapon','摆摊':'Market',
'魔神入侵':'Devil Raid','好友系统':'Friends','神器':'Artifact','功能预告':'Preview',
// --- Item descriptions ---
'最强群攻':'Max AOE','全屏大招':'Full AOE','杀怪效率提升':'Kill EFF+',
'绝世武学':'Supreme Arts','龙战八荒':'Dragon Realm',
// --- Error / system messages (strings too long to fit in cw.txt binary) ---
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
'击杀':'Kill','经验':'EXP','银币':'Silver','元宝':'Gems',
'掉落':'Drop','采集':'Gather','怪物':'Monster','场景':'Scene',
'战力：':'Power:','气血：':'HP:','攻击：':'ATK:','防御：':'DEF:',
// --- Common UI ---
'开始游戏':'Start Game','进入游戏':'Enter Game','创建角色':'Create Char',
'确定':'OK','取消':'Cancel','关闭':'Close','返回':'Back',
'升级':'Level Up','装备':'Equip','镶嵌':'Inlay','宝石':'Gem','铸魂':'Soul Cast',
'任务':'Quest','九霄塔':'Sky Tower','演武场':'Arena','金玉堂':'Treasure Hall',
'挑战':'Challenge','关卡排名':'Stage Rank','盟会':'Guild',
'第':'Ch.','级':'Lv.','关':'Stage','层':'Floor',
'剧情副本':'Story','副本':'Dungeon','关卡':'Level',
'全民':'All-Server','珍稀掉落':'Rare Drops',
'铸魂配置出错，请联系GM更新配置！':'Soul Cast cfg error - contact GM!',
'伤害':'DMG','血量':'HP','技能':'Skill','冷却':'CD','强化':'Enh'
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
    if(typeof egret!=='undefined'&&egret.TextField&&egret.TextField.prototype){
        var p=egret.TextField.prototype;
        if(!p.__cwT){
            var _td=Object.getOwnPropertyDescriptor(p,'text');
            if(_td&&_td.set){p.__cwT=true;Object.defineProperty(p,'text',{get:_td.get,set:function(v){_td.set.call(this,_rep(v));},configurable:true,enumerable:_td.enumerable});}
        }
        if(typeof eui!=='undefined'&&eui.Label&&eui.Label.prototype&&!eui.Label.prototype.__cwL){
            var lp=eui.Label.prototype,_ld=Object.getOwnPropertyDescriptor(lp,'text');
            if(_ld&&_ld.set){lp.__cwL=true;Object.defineProperty(lp,'text',{get:_ld.get,set:function(v){_ld.set.call(this,_rep(v));},configurable:true,enumerable:_ld.enumerable});}
        }
    }
    _fixAttrCVO();
}
document.title='EN v6';
_patch();
var _t=setInterval(function(){_patch();},500);
setTimeout(function(){clearInterval(_t);},15000);
})();
