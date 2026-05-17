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
 * 宠物技能操作界面
 * liangyan
 * create 2017-12-16
*/
var PetSkillView = (function (_super) {
    __extends(PetSkillView, _super);
    function PetSkillView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("pet", "PetSkillViewSkin");
        return _this;
    }
    PetSkillView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.onResizeHandler(null);
        this._baseView.titleImg.source = "pet_skill_title_png";
        this._baseView.diImgVisible = false;
        this._baseView.bgHeight = 370;
    };
    PetSkillView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeHandler, this);
        this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getPet().addEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    };
    PetSkillView.prototype.removeEvent = function () {
        this._upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeHandler, this);
        this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getPet().removeEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    PetSkillView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    PetSkillView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    PetSkillView.prototype.drawData = function () {
        if (!this._cvo)
            return;
        this._grid.cvo = this._cvo;
        var level = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        this._nameTxt.text = this._cvo.name + " Lv." + level;
        var levelCvo = PetSkillLevelCVO.getCVO(this._cvo.groupID, (level <= 0) ? 1 : level);
        HtmlUtil.setTextFlow(this._descTxt, levelCvo.des);
        if (level <= 0) {
            this._statusTxt.visible = true;
            this._condImg.visible = true;
            this._upgradeImg.visible = false;
            this._upgradeBtn.visible = false;
            this._redIcon.visible = false;
            var petCvo = PetCVO.getCVOByNewSkillId(this._cvo.groupID);
            this._condTxt.text = LangCVO.getContent("pet12", petCvo.pinjie, petCvo.star);
        }
        else {
            this._statusTxt.visible = false;
            this._condImg.visible = false;
            this._upgradeImg.visible = true;
            if (level >= SkillCVO.getCVO(this._cvo.groupID).maxLevel) {
                this._condTxt.text = LangCVO.getContent("pet13");
                this._upgradeBtn.visible = false;
                this._redIcon.visible = false;
            }
            else {
                var levelCvo2 = PetSkillLevelCVO.getCVO(this._cvo.groupID, level + 1);
                var bagCount = Manager.model.getItems().getCountItemById(levelCvo2.loss.baseId);
                var itemName = ItemsCVO.getCvo(levelCvo2.loss.baseId).name;
                var color = bagCount >= levelCvo2.loss.num ? Color.DEF_STR : Color.RED_STR;
                var msg = LangCVO.getContent("pet14", itemName, HtmlUtil.addColorTag("" + bagCount, color), levelCvo2.loss.num);
                HtmlUtil.setTextFlow(this._condTxt, msg);
                this._upgradeBtn.visible = true;
                this._redIcon.visible = levelCvo2.loss.isEnough();
            }
        }
    };
    PetSkillView.prototype.onUpgradeHandler = function (e) {
        var level = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        var levelCvo = PetSkillLevelCVO.getCVO(this._cvo.groupID, level + 1);
        if (!levelCvo.loss.isEnough(true)) {
            var itemInfo = ItemsCVO.getCvo(levelCvo.loss.baseId);
            Manager.view.show(9 /* ItemsTips */, itemInfo);
            return;
        }
        Manager.control.getPet().upgradePetSkill(this._cvo.groupID);
    };
    PetSkillView.prototype.onCloseHandler = function (e) {
        Manager.view.hide(47 /* PetSkillView */);
    };
    PetSkillView.prototype.onSkillUpdateHandler = function (e) {
        if (this._cvo.groupID != Number(e.params))
            return;
        this.invalidate(InvalidationType.DATA);
    };
    PetSkillView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    PetSkillView.prototype.show = function (cvo) {
        if (!this.parent) {
            this._cvo = cvo;
            Manager.layer.tipsLayer.addChild(this);
            this.invalidate(InvalidationType.DATA);
        }
    };
    PetSkillView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    PetSkillView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    PetSkillView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._baseView.dispose();
        this._baseView = null;
        this._grid.dispose();
        this._grid = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._statusTxt.dispose();
        this._statusTxt = null;
        this._condImg.bitmapData = null;
        this._condImg = null;
        this._descImg.bitmapData = null;
        this._descImg = null;
        this._condTxt.dispose();
        this._condTxt = null;
        this._descTxt.dispose();
        this._descTxt = null;
        this._upgradeBtn.dispose();
        this._upgradeBtn = null;
        this._redIcon.bitmapData = null;
        this._redIcon = null;
        this._cvo = null;
    };
    PetSkillView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._baseView, this._grid, this._nameTxt, this._statusTxt, this._condImg, this._descImg, this._condTxt, this._descTxt, this._upgradeBtn, this._redIcon);
        this._baseView.dispose();
        this._baseView = null;
        this._grid.dispose();
        this._grid = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._statusTxt.dispose();
        this._statusTxt = null;
        this._condImg.bitmapData = null;
        this._condImg = null;
        this._descImg.bitmapData = null;
        this._descImg = null;
        this._redIcon.bitmapData = null;
        this._redIcon = null;
        this._condTxt.dispose();
        this._condTxt = null;
        this._descTxt.dispose();
        this._descTxt = null;
        this._upgradeBtn.dispose();
        this._upgradeBtn = null;
    };
    return PetSkillView;
}(UIComponent));
__reflect(PetSkillView.prototype, "PetSkillView", ["IViewManager"]);
//# sourceMappingURL=PetSkillView.js.map