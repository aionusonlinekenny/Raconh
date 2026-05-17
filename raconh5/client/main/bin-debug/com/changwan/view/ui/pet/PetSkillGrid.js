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
 *create 2018-1-31
 *description
*/
var PetSkillGrid = (function (_super) {
    __extends(PetSkillGrid, _super);
    function PetSkillGrid() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("pet", "PetSkillGridSkin");
        return _this;
    }
    PetSkillGrid.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getPet().addEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    };
    PetSkillGrid.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getPet().removeEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    };
    PetSkillGrid.prototype.onSkillUpdateHandler = function (e) {
        if (this._cvo.groupID != Number(e.params))
            return;
        this.updateLevel();
    };
    Object.defineProperty(PetSkillGrid.prototype, "cvo", {
        get: function () { return this._cvo; },
        set: function (value) {
            if (this._cvo == value)
                return;
            this._cvo = value;
            this._img.load(Manager.path.getSkillIconPath(this._cvo.icon));
            this.updateLevel();
        },
        enumerable: true,
        configurable: true
    });
    PetSkillGrid.prototype.updateLevel = function () {
        if (!this._cvo)
            return;
        var level = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        if (level > 0) {
            this._img.filters = null;
            this._txtLevel.text = "Lv." + level;
        }
        else {
            FilterUtil.setGrayFilter(this._img);
            var cvo = PetCVO.getCVOByNewSkillId(this._cvo.groupID);
            if (cvo != null)
                HtmlUtil.setTextFlow(this._txtLevel, LangCVO.getContent("pet15", Color.GREEN_STR_2, cvo.pinjie));
        }
    };
    // public get canUpgrade():boolean
    // {
    //     if(!this._cvo || !this._info) return false;
    //     this._info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
    //     if(this._info.level >= Manager.model.self.attrInfo.level || this._info.isMaxLevel()) return false;
    //     let loss = this._info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(this._info.level);
    //     if(Manager.model.self.attrInfo.coin >= loss) return true;
    //     return false;
    // }
    PetSkillGrid.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._txtLevel, this._img);
        if (this._txtLevel) {
            this._txtLevel.dispose();
            this._txtLevel = null;
        }
        if (this._img)
            Manager.pool.push(this._img);
        this._img = null;
        this._cvo = null;
    };
    return PetSkillGrid;
}(UIComponent));
__reflect(PetSkillGrid.prototype, "PetSkillGrid");
//# sourceMappingURL=PetSkillGrid.js.map