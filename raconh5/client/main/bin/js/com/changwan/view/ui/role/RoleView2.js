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
var RoleView2 = /** @class */ (function (_super) {
    __extends(RoleView2, _super);
    function RoleView2(owner, index, value) {
        if (index === void 0) { index = -1; }
        if (value === void 0) { value = -1; }
        var _this = _super.call(this) || this;
        _this._upgradeEffectList = {};
        _this.touchChildren = true;
        _this._owner = owner;
        _this.start();
        _this.addEvent();
        if (index != -1)
            _this.showOtherView(index, value);
        return _this;
    }
    RoleView2.prototype.createSkillItem = function (x, y, btnName) {
        if (btnName === void 0) { btnName = ""; }
        var result = new RoleSkillItem2();
        result.move(x, y);
        if (btnName != "")
            result.btnName = btnName;
        this.addChild(result);
        return result;
    };
    RoleView2.prototype.createEquipItem = function (pos) {
        var result = new RoleEquipItem2(pos + 1);
        if (pos == 0)
            result.y = 170;
        else if (pos == 1)
            result.y = 335;
        else if (pos == 2)
            result.y = 500;
        else if (pos == 3)
            result.y = 665;
        else if (pos == 4) {
            result.x = 579;
            result.y = 170;
        }
        else if (pos == 5) {
            result.x = 579;
            result.y = 335;
        }
        else if (pos == 6) {
            result.x = 579;
            result.y = 500;
        }
        else if (pos == 7) {
            result.x = 579;
            result.y = 665;
        }
        this.addChild(result);
        return result;
    };
    RoleView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._fightingImg = BitmapRes.create("common_fighting_png", 173, 774);
        this._fightingImg.touchEnabled = true;
        this.addChild(this._fightingImg);
        this._fighting = Manager.pool.create(NumImgView2);
        this._fighting.x = this._fightingImg.x + 150;
        this._fighting.y = this._fightingImg.y + 15;
        this.addChild(this._fighting);
        this._zhanliImg = BitmapRes.create("common_zhanli_png", 215, 780, 102, 57);
        this.addChild(this._zhanliImg);
        this._checkAttrBtn = new Button();
        this._checkAttrBtn.x = 148;
        this._checkAttrBtn.y = 854;
        this._checkAttrBtn.width = 200;
        this._checkAttrBtn.height = 80;
        this._checkAttrBtn.skinName = "Button1Skin";
        this.addChild(this._checkAttrBtn);
        this._checkAttrImg = BitmapRes.create("role_checkAttr_png", 157, 867, 181, 52);
        this.addChild(this._checkAttrImg);
        this._onekeyEquipBtn = new Button();
        this._onekeyEquipBtn.x = 372;
        this._onekeyEquipBtn.y = 855;
        this._onekeyEquipBtn.width = 200;
        this._onekeyEquipBtn.height = 80;
        this._onekeyEquipBtn.label = "";
        this._onekeyEquipBtn.skinName = "Button2Skin";
        this.addChild(this._onekeyEquipBtn);
        this._onekeyEquipImg = BitmapRes.create("role_onkeyEquip_png", 381, 869, 181, 52);
        this.addChild(this._onekeyEquipImg);
        this._worldImg = BitmapRes.create("role_shijie_png", 30, 53);
        this._worldImg.touchEnabled = true;
        this.addChild(this._worldImg);
        this._skillItems = [];
        for (var i = 0; i < 4; i++) {
            if (i == 0)
                this._skillItems[i] = this.createSkillItem(37, 878, "role_skillImg1_png");
            else if (i == 1)
                this._skillItems[i] = this.createSkillItem(188, 951, "role_skillImg2_png");
            else if (i == 2)
                this._skillItems[i] = this.createSkillItem(421, 951);
            else if (i == 3)
                this._skillItems[i] = this.createSkillItem(569, 878);
        }
        this._skillItems[0].showLock = !OpenCVO.isOpen(OpenConst.ID_SHENBING);
        this._skillItems[1].showLock = !OpenCVO.isOpen(OpenConst.ID_CLOAK);
        // this._skillItems[1].showIcon = Manager.model.getCloak().checkActiveCloak();
        this._equipItems = [];
        for (var i = 0; i < 8; i++) {
            this._equipItems[i] = this.createEquipItem(i);
        }
        // Manager.control.getEquip().equipStrengthenQuery();
        // Manager.control.getSoldier().query();
        this.showAnimation();
    };
    RoleView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
        this._checkAttrBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._onekeyEquipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getSoldier().addEventListener(SoldierEvent.SOLDIER_INFO_UPDATE, this.onUpdateSoldierInfoHandler, this);
        for (var i = 0; i < 4; i++) {
            this._skillItems[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillItemHandler, this);
        }
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST, this.updateOneKeyRED, this);
        this._fightingImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._worldImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    RoleView2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
        this._checkAttrBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._onekeyEquipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getSoldier().removeEventListener(SoldierEvent.SOLDIER_INFO_UPDATE, this.onUpdateSoldierInfoHandler, this);
        for (var i = 0; i < 4; i++) {
            this._skillItems[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillItemHandler, this);
        }
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST, this.updateOneKeyRED, this);
        this._fightingImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._worldImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    RoleView2.prototype.onUpdateEquipInfoHandler = function (e) {
        this.drawRoleInfo();
    };
    RoleView2.prototype.onItemUpdateHandler = function (e) {
        if (e.params == 2) {
            this.invalidate("drawEquipRed");
        }
    };
    RoleView2.prototype.updateOneKeyRED = function (e) {
        this.invalidate("drawOneKeyRED");
    };
    RoleView2.prototype.onUpdateSoldierInfoHandler = function (e) {
        this.invalidate("drawSoldRed");
    };
    RoleView2.prototype.onSkillItemHandler = function (e) {
        var index = this._skillItems.indexOf(e.currentTarget);
        if (index == -1)
            return;
        this.showOtherView(index);
    };
    RoleView2.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._fightingImg:
            case this._checkAttrBtn:
                Manager.view.show(21 /* RoleAttrView */);
                break;
            case this._onekeyEquipBtn:
                this.clickOneKeyWear(e);
                break;
            case this._worldImg:
                Manager.view.show(137 /* WorldLevelView */);
                break;
        }
    };
    RoleView2.prototype.clickOneKeyWear = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.WEAR_EQUIP)
            return;
        if (!OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP, true))
            return;
        var list = Manager.model.getItems().oneKeyUpgradeEquipList;
        if (list.length > 0) {
            this._oneKeyUpgradeEquipList = list;
            Manager.control.getEquip().equipOneKey(list);
        }
    };
    RoleView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawEquipRed();
        this.drawOneKeyRED();
        this.drawSoldRed();
        this.drawRoleInfo();
        //引导(放在start会导致视图没添加到panel，获取parent为空)
        if (Manager.model.getGuide().curID == GuideID.PET_UPGRADE) {
            var pos = this.parent.localToGlobal(this.x, this.y);
            Manager.control.getTask().showGuide(pos, 245, 1205, this.petGuideCB, this, false);
        }
        if (Manager.model.getGuide().curID == GuideID.WEAR_EQUIP) {
            var pos = this._onekeyEquipBtn.parent.localToGlobal(this._onekeyEquipBtn.x, this._onekeyEquipBtn.y);
            Manager.control.getTask().showGuide(pos, this._onekeyEquipBtn.width >> 1, this._onekeyEquipBtn.height >> 1, this.wearGuideCB, this, false);
        }
    };
    RoleView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawEquipRed"))
            this.drawEquipRed();
        if (this.isInvalid("drawOneKeyRED"))
            this.drawOneKeyRED();
        if (this.isInvalid("drawSoldRed"))
            this.drawSoldRed();
        if (this.isInvalid("drawRoleInfo"))
            this.drawRoleInfo();
    };
    RoleView2.prototype.drawOneKeyRED = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP))
            return;
        var show = Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2;
        if (show) {
            if (this._onekeyRed == null)
                this._onekeyRed = BitmapRes.create("common_red_icon_png", 539, 849, 35, 35);
            this.addChild(this._onekeyRed);
        }
        else {
            if (this._onekeyRed != null && this._onekeyRed.parent)
                this.removeChild(this._onekeyRed);
        }
    };
    RoleView2.prototype.drawEquipRed = function () {
        this._skillItems[1].showIcon = Manager.model.getCloak().checkActiveCloak();
    };
    RoleView2.prototype.drawSoldRed = function () {
        this._skillItems[0].showIcon = Manager.model.getSoldier().checkCanUpgrade();
    };
    RoleView2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (Manager.model.getGuide().curID == GuideID.WEAR_EQUIP)
            Manager.control.getTask().hideGuide();
        if (Manager.render.contains(this.hidePnl, this))
            Manager.render.remove(this.hidePnl, this);
        if (this._zhanliImg) {
            Manager.pool.push(this._zhanliImg);
            this._zhanliImg = null;
        }
        if (this._fightingImg) {
            Manager.pool.push(this._fightingImg);
            this._fightingImg = null;
        }
        if (this._checkAttrImg) {
            Manager.pool.push(this._checkAttrImg);
            this._checkAttrImg = null;
        }
        if (this._onekeyEquipImg) {
            Manager.pool.push(this._onekeyEquipImg);
            this._onekeyEquipImg = null;
        }
        if (this._onekeyRed) {
            Manager.pool.push(this._onekeyRed);
            this._onekeyRed = null;
        }
        if (this._worldImg) {
            Manager.pool.push(this._worldImg);
            this._worldImg = null;
        }
        if (this._checkAttrBtn != null) {
            this._checkAttrBtn.dispose();
            this._checkAttrBtn = null;
        }
        if (this._onekeyEquipBtn != null) {
            this._onekeyEquipBtn.dispose();
            this._onekeyEquipBtn = null;
        }
        if (this._fighting) {
            Manager.pool.push(this._fighting);
            this._fighting = null;
        }
        for (var i = 0; i < 8; i++) {
            this._equipItems[i].dispose();
        }
        this._equipItems = null;
        for (var i = 0; i < 4; i++) {
            this._skillItems[i].dispose();
        }
        this._skillItems = null;
        if (this._animation) {
            this._animation.dispose();
            this._animation = null;
        }
        this._owner = null;
        if (this._upgradeEffectList) {
            for (var i = 1; i <= 8; i++) {
                if (this._upgradeEffectList[i]) {
                    Manager.pool.push(this._upgradeEffectList[i]);
                    this._upgradeEffectList[i] = null;
                    delete this._upgradeEffectList[i];
                }
            }
            this._upgradeEffectList = null;
        }
    };
    RoleView2.prototype.showOtherView = function (index, value) {
        if (value === void 0) { value = -1; }
        switch (index) {
            case 0:
                if (OpenCVO.isOpen(OpenConst.ID_SHENBING, true))
                    this._owner.showView(SoldierView, value);
                break;
            case 1:
                if (OpenCVO.isOpen(OpenConst.ID_CLOAK, true))
                    this._owner.showView(CloakView, value);
                break;
        }
    };
    RoleView2.prototype.showAnimation = function () {
        this._animation = new RoleAnimation();
        this._animation.reuse(Manager.model.self.attrInfo.clothes, Manager.model.self.attrInfo.weapon, Manager.model.self.attrInfo.wing);
        this.addChild(this._animation);
        this._animation.x = -280;
        this._animation.y = -140;
    };
    RoleView2.prototype.drawRoleInfo = function () {
        for (var i = 0; i < 8; i++) {
            this._equipItems[i].clear();
        }
        var equips = Manager.model.getItems().equipList;
        var itemInfo;
        for (var i = 0; i < 8; i++) {
            itemInfo = equips.get(i + 1);
            if (itemInfo)
                this._equipItems[i].updateRoleInfo(itemInfo);
        }
        // this._fighting.setValue(Manager.model.self.attrInfo.fight, "nums_fighting_");
        this._fighting.setValue(Manager.model.self.attrInfo.fight, "nums_fighting_", 25);
        if (this._oneKeyUpgradeEquipList && this._oneKeyUpgradeEquipList.length > 0) {
            for (var i = 0; i < this._oneKeyUpgradeEquipList.length; i++) {
                var effect = this._upgradeEffectList[this._oneKeyUpgradeEquipList[i].cvo.pos];
                if (!effect) {
                    effect = Manager.animation.createEffectAnimation("Qianghua");
                    effect.x = -63;
                    effect.y = -57;
                    effect.touchEnabled = false;
                }
                effect.play();
                this._equipItems[this._oneKeyUpgradeEquipList[i].cvo.pos - 1].addChild(effect);
            }
            this._oneKeyUpgradeEquipList = null;
        }
    };
    RoleView2.prototype.wearGuideCB = function () {
        this.clickOneKeyWear(null);
        Manager.control.getTask().hideGuide();
        Manager.render.add(this.hidePnl, this, 3000, 1, null, true);
    };
    RoleView2.prototype.hidePnl = function () {
        Manager.view.hide(17 /* RolePanel */);
    };
    RoleView2.prototype.petGuideCB = function () {
        Manager.link.link(LinkType.PANEL_ROLE, RoleIndex.PET);
    };
    return RoleView2;
}(RenderSprite));
//# sourceMappingURL=RoleView2.js.map