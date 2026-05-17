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
 * 技能列表子项
 * liangyan
 * create 2017-11-18
*/
var SkillListItem = (function (_super) {
    __extends(SkillListItem, _super);
    function SkillListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("skill", "SkillListItemSkin");
        return _this;
    }
    SkillListItem.prototype.setData = function () {
        this._nameTxt.text = this._cvo.name;
        this.data.info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
        this._lvlTxt.text = this.data.info ? ("Lv：" + this.data.info.level) : LangCVO.getContent("skill7"); //未激活
        this.enabled = this.itemEnable;
        this.setRedIcon();
    };
    SkillListItem.prototype.setRedIcon = function () {
        Manager.render.add(this.setRedIconCB, this, 500, 1, null, true);
    };
    SkillListItem.prototype.setRedIconCB = function () {
        this._upgradeIcon.visible = this.itemEnable && (this.grid.canUpgrade || this.canActPassive);
    };
    Object.defineProperty(SkillListItem.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillListItem.prototype, "canActPassive", {
        /**道具激活被动技能 */
        get: function () {
            var cvos = SkillCVO.getCVOsByGroup(this._cvo.groupID);
            for (var i = 0; i < cvos.length; i++) {
                if (Manager.model.getSkill().getPassiveSkillStatus(cvos[i].groupID) == SkillTipsType.ACTIVE)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    SkillListItem.prototype.playEff = function () {
        this.setData();
        this.disposeEff();
        this._upgradeEff = Manager.animation.createEffectAnimation("upActive", 0, true, true);
        if (!this._upgradeEff.parent)
            this.grid.addChild(this._upgradeEff);
    };
    SkillListItem.prototype.disposeEff = function () {
        if (this._upgradeEff) {
            Manager.pool.push(this._upgradeEff);
            this._upgradeEff = null;
        }
    };
    SkillListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchChildren = false;
    };
    SkillListItem.prototype.dataChanged = function () {
        var cvo = this.data.cvo;
        if (cvo == null)
            return;
        if (this._cvo == cvo)
            return;
        this._cvo = cvo;
        this.grid.cvo = cvo;
        this.setData();
    };
    Object.defineProperty(SkillListItem.prototype, "itemEnable", {
        get: function () {
            return this.data && this.data.info != null;
        },
        enumerable: true,
        configurable: true
    });
    SkillListItem.prototype.dispose = function () {
        Manager.render.remove(this.playEff, this);
        Manager.render.remove(this.setRedIconCB, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this.grid, this._nameTxt, this._lvlTxt, this._upgradeIcon, this._upgradeEff);
        this.grid = null;
        this._nameTxt = null;
        this._lvlTxt = null;
        this._upgradeIcon.bitmapData = null;
        this._upgradeIcon = null;
        this.disposeEff();
        this._cvo = null;
    };
    SkillListItem.HEIGHT = 145;
    return SkillListItem;
}(ItemRenderer));
__reflect(SkillListItem.prototype, "SkillListItem");
//# sourceMappingURL=SkillListItem.js.map