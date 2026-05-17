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
 * 技能刻印格子
 * liangyan
 * create 2017-11-18
*/
var SkillMarkGrid = /** @class */ (function (_super) {
    __extends(SkillMarkGrid, _super);
    function SkillMarkGrid() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.skinName = Manager.path.getSkinName("skill", "SkillMarkSkin");
        return _this;
    }
    SkillMarkGrid.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    SkillMarkGrid.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillupdateHandler, this);
    };
    SkillMarkGrid.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillupdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SkillMarkGrid.prototype.onTouchHandler = function (e) {
        if (!this._cvo)
            return;
        Manager.pool.create(SkillTips, this._status, this._cvo);
    };
    SkillMarkGrid.prototype.onSkillupdateHandler = function (e) {
        if (this._cvo && this._cvo.groupID == e.params) {
            this.disposeEff();
            this._actEff = Manager.animation.createEffectAnimation("actPassive", 0, true, true);
            if (!this._actEff.parent)
                this.addChild(this._actEff);
        }
    };
    SkillMarkGrid.prototype.disposeEff = function () {
        if (this._actEff) {
            Manager.pool.push(this._actEff);
            this._actEff = null;
        }
    };
    SkillMarkGrid.prototype.setStatus = function () {
        this._lockBack.visible = this._normalBack.visible = this._skillIcon.visible = this._addIcon.visible = false;
        this._bubble.update(0);
        switch (this._status) {
            case SkillTipsType.AWAKE:
                this._lockBack.visible = true;
                break;
            case SkillTipsType.ACTIVE:
                this._normalBack.visible = this._addIcon.visible = true;
                this._bubble.update(1, true, false);
                break;
            case SkillTipsType.GO_SHOP:
                this._normalBack.visible = this._addIcon.visible = true;
                break;
            case SkillTipsType.HAS_ACT:
                this._normalBack.visible = this._skillIcon.visible = true;
                break;
            default:
                break;
        }
    };
    Object.defineProperty(SkillMarkGrid.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        set: function (value) {
            this._cvo = value;
            if (!this._cvo)
                return;
            this._skillIcon.load(Manager.path.getSkillIconPath(this._cvo.icon));
            this._nameTxt.text = this._cvo.name;
            this._status = Manager.model.getSkill().getPassiveSkillStatus(this._cvo.groupID);
            this.setStatus();
        },
        enumerable: true,
        configurable: true
    });
    SkillMarkGrid.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._lockBack, this._normalBack, this._addIcon, this._skillIcon, this._nameTxt, this._actEff);
        this._lockBack = null;
        this._normalBack = null;
        if (this._skillIcon)
            Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
        this._addIcon = null;
        this._nameTxt = null;
        this.disposeEff();
        this._cvo = null;
    };
    return SkillMarkGrid;
}(UIComponent));
//# sourceMappingURL=SkillMarkGrid.js.map