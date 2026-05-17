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
 *create 2017-11-10
 *description
*/
var SkillCVO = (function (_super) {
    __extends(SkillCVO, _super);
    function SkillCVO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tempCDTime = 0;
        _this._leftTime = 0;
        _this._isRunning = false;
        return _this;
    }
    SkillCVO.prototype.parseShape = function (type) {
        var str = "";
        switch (type) {
            case 1:
            case 2:
                str = LangCVO.getContent("common29"); //矩形
                break;
            case 3:
            case 4:
                str = LangCVO.getContent("common30"); //扇形
                break;
            case 5:
                str = LangCVO.getContent("common31"); //圆形
                break;
        }
        this.shape = str;
    };
    SkillCVO.prototype.parseOne = function (data) {
        this.groupID = data.readShort();
        this.name = data.readUTF();
        this.mainType = data.readByte();
        this.subType = data.readByte();
        this.type = data.readByte();
        this.upgradeCond = data.readUTF();
        this.upgradeCost = data.readUTF();
        this.mainGroup = data.readShort();
        this.beatBackDis = data.readShort();
        this.actOnType = data.readShort();
        this.maxRange = data.readShort();
        this.hitNum = data.readByte();
        this.parseShape(data.readByte());
        this.coldDownTime = data.readShort();
        this.commonColdDownTime = data.readShort();
        this.autoHookPriority = data.readShort();
        this.describe = data.readUTF();
        this.icon = data.readShort();
        this.bombIndex = data.readShort();
        this.effectType = data.readByte();
        // this.effectLineConfig = data.readUTF();
        // this.effectAreaConfig = data.readUTF();
        this.parseLineEffectConfig(data.readUTF());
        this.parseAreaEffectConfig(data.readUTF());
        this.activeSide = data.readByte();
        this.effectSelfID = data.readShort();
        this.effectTarID = data.readShort();
        this.targetEffectII = data.readByte();
        this.action = data.readByte();
        this.isDefault = data.readBoolean();
        this.shakeConfig = data.readUTF();
        this.screenTips = data.readShort();
        this.showIndex = data.readByte();
        this.script = data.readUTF();
        this.addFightValue = data.readShort();
        this.maxLevel = data.readShort();
    };
    SkillCVO.prototype.parseLineEffectConfig = function (config) {
        this.effectLineConfig = [];
        if (config == "")
            return;
        var arr = config.split("$");
        for (var i = 0; i < arr.length; i++) {
            var brr = arr[i].split("#");
            this.effectLineConfig.push(brr);
        }
    };
    SkillCVO.prototype.parseAreaEffectConfig = function (config) {
        this.effectAreaConfig = [];
        if (config == "")
            return;
        var arr = config.split("$");
        for (var i = 0; i < arr.length; i++) {
            var brr = arr[i].split("#");
            this.effectAreaConfig.push(brr);
        }
    };
    SkillCVO.parse = function (bytes) {
        SkillCVO._cvos = {};
        SkillFormulaCVO.cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new SkillCVO();
            cvo.parseOne(bytes);
            SkillCVO._cvos[cvo.groupID] = cvo;
        }
        var formulaCount = bytes.readShort();
        var formula;
        for (var j = 0; j < formulaCount; j++) {
            formula = new SkillFormulaCVO();
            formula.parse(bytes);
            if (!SkillFormulaCVO.cvos.hasOwnProperty(formula.type))
                SkillFormulaCVO.cvos[formula.type] = new Array();
            SkillFormulaCVO.cvos[formula.type].push(formula);
        }
    };
    SkillCVO.getCVO = function (groupID) {
        return SkillCVO._cvos[groupID];
    };
    /**根据分组id获取刻印关联的技能 */
    SkillCVO.getCVOsByGroup = function (groupID) {
        var result = [];
        var cvo;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.mainGroup == groupID)
                result.push(cvo);
        }
        if (result.length > 1)
            result.sort(function (a, b) { return (a.groupID > b.groupID ? 1 : -1); });
        return result;
    };
    /**根据类型获取关联的技能 */
    SkillCVO.getCVOsByType = function (mainType, subType, type) {
        var result = [];
        var cvo;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.mainType == mainType && cvo.subType == subType && cvo.type == type)
                result.push(cvo);
        }
        if (result.length > 1)
            result.sort(function (a, b) { return (a.groupID > b.groupID ? 1 : -1); });
        return result;
    };
    SkillCVO.getPetPanelSkills = function () {
        var result = [];
        var cvo;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.mainType == 2 && cvo.subType == 3 && !cvo.isDefault)
                result.push(cvo);
        }
        if (result.length > 1)
            result.sort(function (a, b) { return (a.groupID > b.groupID ? 1 : -1); });
        return result;
    };
    Object.defineProperty(SkillCVO.prototype, "isNeedTarget", {
        get: function () { return (this.actOnType > 1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "totalTime", {
        get: function () { return this._tempCDTime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "leftTime", {
        get: function () { return this._leftTime; },
        set: function (value) { this._leftTime = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "running", {
        get: function () { return this._isRunning; },
        enumerable: true,
        configurable: true
    });
    SkillCVO.prototype.clearCD = function () {
        this._leftTime = 0;
        this.render(0);
        this.setRunning(false);
    };
    SkillCVO.prototype.setRunning = function (value, coldDownTime) {
        if (coldDownTime === void 0) { coldDownTime = 0; }
        if (this._isRunning == value)
            return;
        this._isRunning = value;
        if (this._isRunning) {
            this.isCommonCD = false;
            this._tempCDTime = coldDownTime;
            this.start();
        }
        else
            this.stop();
    };
    /**
     * 设置公共冷却时间。
     */
    SkillCVO.prototype.setCommonRunning = function (value, commonCountDownTime) {
        if (commonCountDownTime === void 0) { commonCountDownTime = 0; }
        if (this._isRunning == value)
            return;
        this._isRunning = value;
        if (this._isRunning) {
            this.isCommonCD = true;
            this._tempCDTime = commonCountDownTime;
            this.start();
        }
        else
            this.stop();
    };
    SkillCVO.prototype.start = function () {
        this._leftTime = this._tempCDTime;
        Manager.render.add(this.render, this);
    };
    SkillCVO.prototype.stop = function () {
        Manager.render.remove(this.render, this);
    };
    SkillCVO.prototype.render = function (interval) {
        this._leftTime -= interval;
        // this.dispatchEvent(new GlobalEvent(GlobalEvent.COOL_DOWN_UPDATE));
        if (this._leftTime <= 0) {
            this.setRunning(false, 0);
            this._leftTime = 0;
            this.isCommonCD = false;
        }
    };
    Object.defineProperty(SkillCVO.prototype, "selfNeedPlayEffect", {
        get: function () { return this.effectSelfID != 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "targetNeedPlayEffect", {
        get: function () { return this.effectTarID != 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "hasConfigEffect", {
        get: function () {
            return (this.effectLineConfig.length > 0) || (this.effectAreaConfig.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "upgradeNeedCondition", {
        get: function () {
            return ((this.upgradeCond != "") || (this.upgradeCost != ""));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "actOnTypeIsSelf", {
        get: function () {
            return (this.actOnType & 1) == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "actOnTypeIsOtherPlayer", {
        get: function () {
            return (this.actOnType & 4) == 4 || (this.actOnType & 16) == 16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCVO.prototype, "actOnTypeIsMonster", {
        get: function () {
            return (this.actOnType & 2) == 2 || (this.actOnType & 8) == 8;
        },
        enumerable: true,
        configurable: true
    });
    SkillCVO.prototype.checkCanHitByGameObjectType = function (type) {
        if (this.actOnType == 0)
            return true;
        if (this.actOnTypeIsSelf)
            return true;
        else if (this.actOnTypeIsMonster && ((type == GameObjectType.MONSTER_NORMAL) || (type == GameObjectType.MONSTER_BOSS)))
            return true;
        else if (this.actOnTypeIsOtherPlayer && (type == GameObjectType.OTHER))
            return true;
        return false;
    };
    return SkillCVO;
}(egret.EventDispatcher));
__reflect(SkillCVO.prototype, "SkillCVO");
//# sourceMappingURL=SkillCVO.js.map