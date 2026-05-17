var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *author Anydo
 *create 2017-11-6
 *description
*/
var GameObjectAttrInfo = (function (_super) {
    __extends(GameObjectAttrInfo, _super);
    function GameObjectAttrInfo() {
        return _super.call(this) || this;
    }
    GameObjectAttrInfo.prototype.setValue = function (type, value) {
        var oldValue = this.getValue(type);
        if (oldValue == value)
            return;
        switch (type) {
            case AttrDescType.SPEED:
                this.speed = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateMoveSpeed();
                break;
            case AttrDescType.HP_MAX:
                this.hpMax = value;
                break;
            case AttrDescType.HP:
                this.hp = value;
                this._aliveInfo.attrUpdateBlood(oldValue);
                break;
            case AttrDescType.DMG:
                this.dmg = value;
                break;
            case AttrDescType.DEFENCE:
                this.defence = value;
                break;
            case AttrDescType.ARMOR:
                this.armor = value;
                break;
            case AttrDescType.HITRATE:
                this.hitrate = value;
                break;
            case AttrDescType.EVASION:
                this.evasion = value;
                break;
            case AttrDescType.CRITRATE:
                this.critrate = value;
                break;
            case AttrDescType.TENACITY:
                this.tenacity = value;
                break;
            case AttrDescType.RECOVER:
                this.recover = value;
                break;
            case AttrDescType.EXP_PER:
                this.exp_per = value;
                break;
            case AttrDescType.DMG_ENHANCE:
                this.dmg_enhance = value;
                break;
            case AttrDescType.DMG_REDUCE:
                this.dmg_reduce = value;
                break;
            case AttrDescType.CRITRATE_PER:
                this.critrate_per = value;
                break;
            case AttrDescType.ANTI_CRITRATE_PER:
                this.anti_critrate_per = value;
                break;
            case AttrDescType.CRITDMG_PER:
                this.critdmg_per = value;
                break;
            case AttrDescType.ANTI_CRITDMG_PER:
                this.anti_critdmg_per = value;
                break;
            case AttrDescType.HITRATE_PER:
                this.hitrate_per = value;
                break;
            case AttrDescType.EVASION_PER:
                this.evasion_per = value;
                break;
            case AttrDescType.DMG_PER:
                this.dmg_per = value;
                break;
            case AttrDescType.DEFENCE_PER:
                this.defence_per = value;
                break;
            case AttrDescType.ARMOR_PER:
                this.armor_per = value;
                break;
            case AttrDescType.HP_MAX_PER:
                this.hpMax_per = value;
                break;
            case AttrDescType.TURN_LIVE:
                this.zhuanshu = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.TURN_LIVE));
                break;
            case AttrDescType.LEVEL:
                this.level = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateLevel(oldValue);
                break;
            case AttrDescType.HONOR:
                this.honor = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.HONOR));
                break;
            case AttrDescType.GOLD:
                this.gold = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.GOLD));
                break;
            case AttrDescType.COIN:
                this.coin = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.COIN));
                break;
            case AttrDescType.EXP:
                this.exp = value;
                this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.EXP));
                break;
            case AttrDescType.EXP_MAX:
                this.expMax = value;
                break;
            case AttrDescType.FIGHT:
                this.fight = value;
                this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.FIGHT, this.fight - oldValue));
                break;
            case AttrDescType.UNION:
                this.union = value;
                break;
            case AttrDescType.BF_TYPE:
                this.bfType = value;
                break;
            case AttrDescType.PK_MODE:
                this.pkMode = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdatePkMode();
                break;
            case AttrDescType.TITLE_ID:
                this.titleId = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateTitle();
                break;
            case AttrDescType.GUILD_ID:
                this.guildID = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateGuild();
                break;
            case AttrDescType.GUILD_TYPE:
                this.guildType = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateGuild();
                break;
            case AttrDescType.GUILD_NAME:
                this.guildName = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateGuild();
                break;
            case AttrDescType.GUILD_JOB:
                this.guildJob = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateGuild();
                break;
            case AttrDescType.GUILD_CONTRI:
                this.guildContri = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.GUILDCONTRI));
                break;
            case AttrDescType.VIP_LEVEL:
                this.vipLevel = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateVipLevel();
                break;
            case AttrDescType.CLOTHES:
                this.clothes = value;
                break;
            case AttrDescType.WEAPON:
                this.weapon = value;
                break;
            case AttrDescType.WING:
                this.wing = value;
                break;
            case AttrDescType.HEAD_ICON:
                this.headIcon = value;
                break;
            case AttrDescType.NICKNAME:
                this.nickName = value;
                this._aliveInfo.attrUpdateNickname();
                this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.NICKNAME));
                break;
            case AttrDescType.JM_LEVEL:
                this.jmLevel = value;
                break;
            case AttrDescType.CAREER:
                this.career = value;
                break;
            case AttrDescType.GUILD_JOB_NAME:
                this.guildJobName = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdateGuild();
                break;
            case AttrDescType.PET_ANI:
                this.petAniID = value;
                if (!Manager.model.getMap().mapDataLoadComplete)
                    return;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.attrUpdatePet();
                break;
            case AttrDescType.DESTINY_SOUL:
                this.soul = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.SOUL));
                break;
            case AttrDescType.DESTINY_FRAG:
                this.destinyfrig = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.DESTINY_FRAG));
                break;
            case AttrDescType.TRAINING_TYPE:
                this.trainingType = value;
                break;
            case AttrDescType.TRAINING_POS:
                this.trainingPos = value;
                break;
            case AttrDescType.TRAINING_STATUS:
                this.isTraining = (value == 1);
                if (this._aliveInfo instanceof PlayerGameObjectInfo) {
                    if (this.isTraining)
                        Manager.model.getTraining().setPlayerSitHandler(this._aliveInfo);
                    else
                        this._aliveInfo.isTraining(false);
                }
                break;
            case AttrDescType.JUEXUE_AMBIT:
                this.juexue_ambit = value;
                if (this._aliveInfo instanceof PlayerGameObjectInfo)
                    this._aliveInfo.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.JUEXUE_AMBIT));
                break;
        }
        this.addAttrVersion(type);
    };
    GameObjectAttrInfo.prototype.addAttrVersion = function (type) {
        if (type < 10 || type > 37)
            return; //只有10~37的属性才影响战力计算
        if (this._aliveInfo instanceof SelfGameObjectInfo) {
            Manager.model.getItems().addAttrVersion();
        }
    };
    GameObjectAttrInfo.prototype.getValue = function (type) {
        switch (type) {
            case AttrDescType.SPEED:
                return this.speed;
            case AttrDescType.HP_MAX:
                return this.hpMax;
            case AttrDescType.HP:
                return this.hp;
            case AttrDescType.DMG:
                return this.dmg;
            case AttrDescType.DEFENCE:
                return this.defence;
            case AttrDescType.ARMOR:
                return this.armor;
            case AttrDescType.HITRATE:
                return this.hitrate;
            case AttrDescType.EVASION:
                return this.evasion;
            case AttrDescType.CRITRATE:
                return this.critrate;
            case AttrDescType.TENACITY:
                return this.tenacity;
            case AttrDescType.RECOVER:
                return this.recover;
            case AttrDescType.EXP_PER:
                return this.exp_per;
            case AttrDescType.DMG_ENHANCE:
                return this.dmg_enhance;
            case AttrDescType.DMG_REDUCE:
                return this.dmg_reduce;
            case AttrDescType.CRITRATE_PER:
                return this.critrate_per;
            case AttrDescType.ANTI_CRITRATE_PER:
                return this.anti_critrate_per;
            case AttrDescType.CRITDMG_PER:
                return this.critdmg_per;
            case AttrDescType.ANTI_CRITDMG_PER:
                return this.anti_critdmg_per;
            case AttrDescType.HITRATE_PER:
                return this.hitrate_per;
            case AttrDescType.EVASION_PER:
                return this.evasion_per;
            case AttrDescType.DMG_PER:
                return this.dmg_per;
            case AttrDescType.DEFENCE_PER:
                return this.defence_per;
            case AttrDescType.ARMOR_PER:
                return this.armor_per;
            case AttrDescType.HP_MAX_PER:
                return this.hpMax_per;
            case AttrDescType.TURN_LIVE:
                return this.zhuanshu;
            case AttrDescType.LEVEL:
                return this.level;
            case AttrDescType.HONOR:
                return this.honor;
            case AttrDescType.GOLD:
                return this.gold;
            case AttrDescType.COIN:
                return this.coin;
            case AttrDescType.EXP:
                return this.exp;
            case AttrDescType.EXP_MAX:
                return this.expMax;
            case AttrDescType.FIGHT:
                return this.fight;
            case AttrDescType.UNION:
                return this.union;
            case AttrDescType.BF_TYPE:
                return this.bfType;
            case AttrDescType.PK_MODE:
                return this.pkMode;
            case AttrDescType.TITLE_ID:
                return this.titleId;
            case AttrDescType.GUILD_ID:
                return this.guildID;
            case AttrDescType.GUILD_NAME:
                return this.guildName;
            case AttrDescType.GUILD_JOB:
                return this.guildJob;
            case AttrDescType.GUILD_CONTRI:
                return this.guildContri;
            case AttrDescType.VIP_LEVEL:
                return this.vipLevel;
            case AttrDescType.CLOTHES:
                return this.clothes;
            case AttrDescType.WEAPON:
                return this.weapon;
            case AttrDescType.WING:
                return this.wing;
            case AttrDescType.HEAD_ICON:
                return this.headIcon;
            case AttrDescType.NICKNAME:
                return this.nickName;
            case AttrDescType.JM_LEVEL:
                return this.jmLevel;
            case AttrDescType.CAREER:
                return this.career;
            case AttrDescType.GUILD_JOB_NAME:
                return this.guildJobName;
            case AttrDescType.PET_ANI:
                return this.petAniID;
            case AttrDescType.DESTINY_SOUL:
                return this.soul;
            case AttrDescType.DESTINY_FRAG:
                return this.destinyfrig;
            case AttrDescType.TRAINING_TYPE:
                return this.trainingType;
            case AttrDescType.TRAINING_POS:
                return this.trainingPos;
            case AttrDescType.TRAINING_STATUS:
                return this.isTraining;
            case AttrDescType.GUILD_TYPE:
                return this.guildType;
            case AttrDescType.JUEXUE_AMBIT:
                return this.juexue_ambit;
        }
        return -1;
    };
    GameObjectAttrInfo.prototype.reuse = function (aliveInfo) {
        this._aliveInfo = aliveInfo;
        this.speed = 0;
        this.hpMax = 0;
        this.hp = 0;
        this.dmg = 0;
        this.defence = 0;
        this.armor = 0;
        this.hitrate = 0;
        this.evasion = 0;
        this.critrate = 0;
        this.tenacity = 0;
        this.recover = 0;
        this.exp_per = 0;
        this.dmg_enhance = 0;
        this.dmg_reduce = 0;
        this.critrate_per = 0;
        this.anti_critrate_per = 0;
        this.critdmg_per = 0;
        this.anti_critdmg_per = 0;
        this.hitrate_per = 0;
        this.evasion_per = 0;
        this.level = 0;
        this.zhuanshu = 0;
        this.honor = 0;
        this.gold = 0;
        this.coin = 0;
        this.exp = 0;
        this.expMax = 0;
        this.fight = 0;
        this.union = 0;
        this.bfType = 0;
        this.pkMode = 0;
        this.titleId = 0;
        this.guildID = 0;
        this.guildName = "";
        this.guildJob = 0;
        this.guildContri = 0;
        this.vipLevel = 0;
        this.clothes = 0;
        this.weapon = 0;
        this.wing = 0;
        this.headIcon = 0;
        this.nickName = "";
        this.jmLevel = 0;
        this.career = 0;
        this.guildJobName = "";
        this.petAniID = 0;
        this.soul = 0;
        this.destinyfrig = 0;
        this.trainingType = 0;
        this.trainingPos = 0;
        this.isTraining = false;
        this.juexue_ambit = 0;
    };
    GameObjectAttrInfo.prototype.unuse = function () {
        this._aliveInfo = null;
    };
    GameObjectAttrInfo.prototype.dispose = function () {
        this._aliveInfo = null;
    };
    return GameObjectAttrInfo;
}(egret.EventDispatcher));
__reflect(GameObjectAttrInfo.prototype, "GameObjectAttrInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=GameObjectAttrInfo.js.map