// RaconH English Translation Hook v3
(function(){
var _m={
'极品属性':'Bonus Stats','铸魂属性':'Soul Stats','套装效果':'Set Effect',
'强化等级':'Enh Level','强化石':'Enh Stone','强化':'Enh',
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
'可在"锻造-宝石"中镶嵌':'Can be inlaid in Forge-Gems',
'激活称号':'Activate Title',
'生命恢复':'HP Regen','伤害加深':'DMG Amp','伤害减免':'DMG Reduce',
'暴击几率':'Crit Rate','命中几率':'Hit Rate','闪避几率':'Evasion Rate',
'气血上限':'Max HP','气血':'HP','攻击':'ATK','防御':'DEF','破甲':'Pen',
'命中':'Hit','闪避':'Eva','暴击':'Crit','坚韧':'TEN',
'战力':'Power','等级':'Level','移动':'Speed','生命':'HP',
'伤害加成':'DMG Bonus',
'未激活':'Inactive','已激活':'Active',
'普通':'Normal','精英':'Elite','史诗':'Epic','传说':'Legendary',
'次数不足':'Insufficient attempts','银币不足':'Insufficient silver','元宝不足':'Insufficient gems',
'武器':'Weapon','项链':'Necklace','戒指':'Ring',
'腰带':'Belt','头盔':'Helmet','铠甲':'Armor','手套':'Gloves','鞋子':'Boots',
'装备':'Equip','镶嵌':'Inlay','宝石':'Gem','铸魂':'Soul Cast',
'查看属性':'View Attrs','一键装备':'One-key Equip',
'角色':'Character','背包':'Backpack','仓库':'Storage',
'出售':'Sell','丢弃':'Discard','使用':'Use',
'品质':'Quality','绑定':'Bound','未绑定':'Unbound',
'击杀':'Kill','经验':'EXP','银币':'Silver','元宝':'Gems',
'掉落':'Drop','采集':'Gather','怪物':'Monster','场景':'Scene',
'战力：':'Power:','气血：':'HP:','攻击：':'ATK:','防御：':'DEF:'
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
document.title='EN v3';
_patch();
var _t=setInterval(function(){_patch();},500);
setTimeout(function(){clearInterval(_t);},15000);
})();
