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
var EquipPanel = (function (_super) {
    __extends(EquipPanel, _super);
    function EquipPanel() {
        var _this = _super.call(this) || this;
        _this.strengthenEffectList = {};
        _this.skinName = Manager.path.getSkinName("equip", "EquipPanelSkin");
        return _this;
    }
    EquipPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        Manager.control.getEquip().equipPanel = this;
        this._func.touchEnabled = false;
        this._equipItemList.touchEnabled = false;
        this.baseIconList = [this._baseIcon1, this._baseIcon2, this._baseIcon3, this._baseIcon4, this._baseIcon5, this._baseIcon6, this._baseIcon7, this._baseIcon8];
        for (var i_1 = 0; i_1 < this.baseIconList.length; i_1++) {
            this.baseIconList[i_1].touchEnabled = false;
        }
        this._itemList = [this._equipItem1, this._equipItem2, this._equipItem3, this._equipItem4, this._equipItem5, this._equipItem6, this._equipItem7, this._equipItem8];
        for (var i = 0; i < this._itemList.length; i++) {
            this._itemList[i].count = 0;
            this._itemList[i].setStrengthenLevel(0);
        }
        this.redImgList = [];
        for (var i_2 = 1; i_2 <= 8; i_2++)
            this.redImgList.push(this["_redImg" + i_2]);
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.x = this._fightImg.x + 330;
            this._fighting.y = this._fightImg.y + 15;
            this.addChild(this._fighting);
        }
        this._fighting.setValue(0, "nums_fighting_", 25);
        this._menuBtnContent = [];
        if (OpenCVO.isOpen(OpenConst.ID_STRENGTHEN))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon1_png", imgClick: "equip_btnIcon1_png" });
        if (OpenCVO.isOpen(OpenConst.ID_GEM))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon2_png", imgClick: "equip_btnIcon2_png" });
        if (OpenCVO.isOpen(OpenConst.ID_ZHUHUN))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon3_png", imgClick: "equip_btnIcon3_png" });
        if (OpenCVO.isOpen(OpenConst.ID_SUIT))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon4_png", imgClick: "equip_btnIcon4_png" });
        if (OpenCVO.isOpen(OpenConst.ID_STARUP))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "starUp_icon_png", imgClick: "starUp_icon_png" });
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent, true);
        this.basePanel.scrollerList.itemList.layout.gap = -10;
    };
    EquipPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._curItemIndex = 0;
        //Manager.control.getItems().itemsQuery(ItemsType.BAG);
    };
    EquipPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onEquipUpdateHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onEquipUpdateHandler, this);
        this._topBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
            }
        }
    };
    EquipPanel.prototype.removeEvent = function () {
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onEquipUpdateHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onEquipUpdateHandler, this);
        this._topBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
            }
        }
        _super.prototype.removeEvent.call(this);
    };
    EquipPanel.prototype.onEquipUpdateHandler = function (e) {
        this.checkCanStrengthenTenTime();
        this.checkCanUpgradeGem();
        this.checkCanZhuhun();
        this.checkCanSuitUpgrade();
        this.checkCanStarUp();
    };
    EquipPanel.prototype.checkCanStrengthenTenTime = function () {
        var strengthenBtn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (strengthenBtn)
            strengthenBtn.setIconShow(Manager.model.getEquip().checkCanStrengthen());
    };
    EquipPanel.prototype.checkCanUpgradeGem = function () {
        var gemBtn = this.basePanel.scrollerList.itemList.getElementAt(1);
        if (gemBtn)
            gemBtn.setIconShow(Manager.model.getEquip().checkGemCanPuton());
    };
    EquipPanel.prototype.checkCanZhuhun = function () {
        var zhuhunBtn = this.basePanel.scrollerList.itemList.getElementAt(2);
        if (zhuhunBtn)
            zhuhunBtn.setIconShow(Manager.model.getEquip().checkCanZhuhun());
    };
    EquipPanel.prototype.checkCanStarUp = function () {
        var starUpBtn = this.basePanel.scrollerList.itemList.getElementAt(4);
        if (starUpBtn)
            starUpBtn.setIconShow(Manager.model.getStarUp().checkCoin());
    };
    EquipPanel.prototype.checkCanSuitUpgrade = function () {
        var suitBtn = this.basePanel.scrollerList.itemList.getElementAt(3);
        if (suitBtn)
            suitBtn.setIconShow(Manager.model.getEquip().checkCanSuitUpgrade());
    };
    EquipPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                // Manager.panel.hide(this);
                Manager.view.hide(12 /* EquipPanel */);
                break;
            case this._topBtn:
                this.curView.showAttrTips();
                break;
        }
    };
    EquipPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var isBack = false;
        switch (this.basePanel.scrollerList.itemList.selectedIndex) {
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_GEM, true);
                break;
            case 2:
                isBack = !OpenCVO.isOpen(OpenConst.ID_ZHUHUN, true);
                break;
            case 3:
                isBack = !OpenCVO.isOpen(OpenConst.ID_SUIT, true);
                break;
            case 4:
                isBack = !OpenCVO.isOpen(OpenConst.ID_STARUP, true);
        }
        if (isBack) {
            if (this._curFuncIndex == undefined || this._curFuncIndex < 0)
                this._curFuncIndex = 0;
            this.basePanel.scrollerList.itemList.selectedIndex = this._curFuncIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        if (this.curView) {
            if (this.curView.parent)
                this.curView.parent.removeChild(this.curView);
            this.curView.dispose();
        }
        for (var i = 0; i < this._itemList.length; i++) {
            this._itemList[i].setStrengthenLevel(0);
            this.redImgList[i].visible = false;
        }
        this._curFuncIndex = this.basePanel.scrollerList.itemList.selectedIndex;
        if (this._curFuncIndex == 0)
            this._topBtn.visible = false;
        else
            this._topBtn.visible = true;
        switch (this._curFuncIndex) {
            case 0:
                this.curView = new StrengthenView(this);
                this._func.addChild(this.curView);
                break;
            case 1:
                this.curView = new GemView(this);
                this._func.addChild(this.curView);
                break;
            case 2:
                this.curView = new ZhuhunView(this);
                this._func.addChild(this.curView);
                break;
            case 3:
                this.curView = new SuitView(this);
                this.addChild(this.curView);
                break;
            case 4:
                //this._equipItemList.visible = false;
                this.curView = new StarUpView(this);
                this._func.addChild(this.curView);
                break;
        }
    };
    EquipPanel.prototype.onClickItemHandler = function (e) {
        var index = this._itemList.indexOf(e.currentTarget);
        if (index == -1)
            return;
        var isShowTips = e.data ? true : false;
        if (this._itemList[index])
            this._itemList[index].isShowTips = isShowTips;
        if (this.curView instanceof GemView || this.curView instanceof ZhuhunView) {
            // if(index == this._curItemIndex) return;
            if (this._itemList[this._curItemIndex])
                this._itemList[this._curItemIndex].selected = false;
            this._curItemIndex = index;
            if (this._itemList[this._curItemIndex]) {
                this._itemList[this._curItemIndex].isShowTips = isShowTips;
                this._itemList[this._curItemIndex].selected = true;
                this.curView.updateSelectItem();
            }
        }
    };
    EquipPanel.prototype.setGemBack = function (value) {
        if (this.curView instanceof GemView) {
            this.showCgEffect();
            this.curView.setGemBack(value);
        }
    };
    EquipPanel.prototype.getEquipItemList = function () {
        return this._equipItemList;
    };
    EquipPanel.prototype.showCgEffect = function () {
        this._chenggongEffect = Manager.animation.createEffectAnimation("suc");
        this._chenggongEffect.x = Math.round((this.width - 512) / 2);
        this._chenggongEffect.y = Math.round((this.height - 258) / 2) + 150;
        this._chenggongEffect.touchEnabled = false;
        this._chenggongEffect.play();
        if (!this._chenggongEffect.parent)
            this.addChild(this._chenggongEffect);
    };
    EquipPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.curView)
            this.curView.dispose();
        this.curView = null;
        if (this.basePanel) {
            this.basePanel.dispose();
            this.basePanel = null;
        }
        this._titleImg = null;
        if (this._equipName)
            this._equipName.dispose();
        this._equipName = null;
        this._topBtn = null;
        this._fightImg = null;
        this._func = null;
        this._equipItemList = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                Manager.pool.push(this._itemList[i]);
                this._itemList[i] = null;
            }
        }
        this._itemList = null;
        this._menuBtnContent = null;
        this.curRoleInfo = null;
        if (this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting = null;
        if (this._chenggongEffect)
            Manager.pool.push(this._chenggongEffect);
        this._chenggongEffect = null;
        if (this.strengthenEffectList) {
            for (var i = 1; i <= 8; i++) {
                if (this.strengthenEffectList[i])
                    Manager.pool.push(this.strengthenEffectList[i]);
                this.strengthenEffectList[i] = null;
            }
            this.strengthenEffectList = null;
        }
    };
    return EquipPanel;
}(Panel));
__reflect(EquipPanel.prototype, "EquipPanel");
//# sourceMappingURL=EquipPanel.js.map