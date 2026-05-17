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
 * 技能格子
 * liangyan
 * create 2017-11-18
*/
var SkillGrid = (function (_super) {
    __extends(SkillGrid, _super);
    function SkillGrid() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("skill", "SkillGridSkin");
        return _this;
    }
    SkillGrid.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_UPDATE, this.onSkillUpdateHandler, this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillUpdateHandler, this);
    };
    SkillGrid.prototype.removeEvent = function () {
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_UPDATE, this.onSkillUpdateHandler, this);
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SkillGrid.prototype.setData = function () {
        if (!this._cvo)
            return;
        this._info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
        this._back.source = this._info ? "common_itemBg_png" : "common_itemBg_lock_png";
        if (this._info)
            this._img.load(Manager.path.getSkillIconPath(this._cvo.icon));
    };
    SkillGrid.prototype.onSkillUpdateHandler = function (e) {
        if (e.type == SkillEvent.SKILL_UPDATE || (e.type == SkillEvent.SKILL_SINGLE_UPDATE && this._cvo && this._cvo.groupID == e.params)) {
            this.setData();
        }
    };
    Object.defineProperty(SkillGrid.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        set: function (value) {
            if (this._cvo == value)
                return;
            this._cvo = value;
            this.setData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillGrid.prototype, "canUpgrade", {
        get: function () {
            if (!this._cvo || !this._info)
                return false;
            this._info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
            if (this._info.level >= Manager.model.self.attrInfo.level || this._info.isMaxLevel())
                return false;
            var loss = this._info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(this._info.level);
            if (Manager.model.self.attrInfo.coin >= loss)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    SkillGrid.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._img);
        this._back = null;
        if (this._img)
            Manager.pool.push(this._img);
        this._img = null;
        this._cvo = null;
        this._info = null;
    };
    return SkillGrid;
}(UIComponent));
__reflect(SkillGrid.prototype, "SkillGrid");
//# sourceMappingURL=SkillGrid.js.map