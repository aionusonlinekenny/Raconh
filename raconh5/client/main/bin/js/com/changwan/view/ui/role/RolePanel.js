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
 * 人物
 */
var RolePanel = /** @class */ (function (_super) {
    __extends(RolePanel, _super);
    function RolePanel() {
        return _super.call(this, false) || this;
        // this.skinName = Manager.path.getSkinName("role", "RolePanelSkin");
    }
    RolePanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // let jingboo:boolean = Manager.model.getJingMai().checkCoin();
        this._menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_jiaose_normal_png", imgClick: "role_jiaose_normal_png" }
            // { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_pifeng1_png", imgClick: "role_pifeng2_png" }
        ];
        if (OpenCVO.isOpen(OpenConst.ID_PET))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_pet_normal_png", imgClick: "role_pet_normal_png" });
        if (OpenCVO.isOpen(OpenConst.ID_DRESS))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_dress_normal_png", imgClick: "role_dress_normal_png" });
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    RolePanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.updateRole();
        this.updatePet();
        this.updateFashion();
    };
    RolePanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getJingMai().addEventListener(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT, this.updateJingMai, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST, this.updateRole, this);
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.updateFashion, this);
    };
    RolePanel.prototype.removeEvent = function () {
        Manager.model.getJingMai().removeEventListener(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT, this.updateJingMai, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST, this.updateRole, this);
        Manager.model.getDress().fashionModel.removeEventListener(FashionEvent.UPDATE, this.updateFashion, this);
        _super.prototype.removeEvent.call(this);
    };
    RolePanel.prototype.updateItem = function (e) {
        if (e.params != ItemsType.BAG)
            return;
        this.updateRole();
        this.updatePet();
        this.updateFashion();
    };
    RolePanel.prototype.updateRole = function (e) {
        if (!OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP))
            return;
        var btn = this.setPromptSign(0);
        if (btn) {
            btn.setIconShow(Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2
                || Manager.model.getSoldier().checkCanUpgrade()
                || Manager.model.getCloak().checkActiveCloak());
        }
    };
    RolePanel.prototype.updatePet = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.setPromptSign(1);
        if (btn)
            btn.setIconShow(Manager.model.getPet().checkCanOperate);
    };
    RolePanel.prototype.updateFashion = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.setPromptSign(2);
        if (btn)
            btn.setIconShow(Manager.model.getDress().fashionModel.hasCanActive || Manager.model.getDress().titleModel.hasCanActive);
    };
    RolePanel.prototype.updateJingMai = function (e) {
        var btn = this.setPromptSign(3);
        if (btn)
            btn.setIconShow(e.params);
    };
    RolePanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        //Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
        Manager.control.getEquip().equipStrengthenQuery();
    };
    RolePanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                if (this._view) {
                    if ((this._view instanceof CloakView) || (this._view instanceof SoldierView)) {
                        this._view.dispose();
                        this._view = null;
                        this.basePanel.scrollerList.itemList.selectedIndex = 0;
                        this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
                    }
                    else
                        Manager.view.hide(17 /* RolePanel */);
                }
                else
                    Manager.view.hide(17 /* RolePanel */);
                break;
        }
    };
    RolePanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        // if(index == RoleIndex.JINGMAI && !OpenCVO.isOpen(OpenConst.ID_JINGMAI, true))
        // {
        // 	this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
        // 	return;
        // }
        var isBack = false;
        switch (index) {
            case RoleIndex.PET:
                isBack = !OpenCVO.isOpen(OpenConst.ID_PET, true);
                break;
            case RoleIndex.DRESS:
                isBack = !OpenCVO.isOpen(OpenConst.ID_DRESS, true);
                break;
        }
        if (isBack) {
            this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        this.basePanel.title = "role_title" + (index + 1) + "_png";
        if (this._view) {
            if (this._view.parent)
                this._view.parent.removeChild(this._view);
            this._view.dispose();
            this._view = null;
            this.basePanel.backImg.y = 57;
            this.basePanel.backImg.height = 1223;
        }
        if (this._view2 != null) {
            this._view2.dispose();
            this._view2 = null;
            this.basePanel.backImg.y = 57;
            this.basePanel.backImg.height = 1223;
        }
        if (this._bgImg) {
            if (this._bgImg.parent)
                this._bgImg.parent.removeChild(this._bgImg);
            Manager.pool.push(this._bgImg);
            this._bgImg = null;
        }
        // this._bgImg;
        if (index != RoleIndex.ROLE) {
            if (this._roleBottomImg && this._roleBottomImg.parent)
                this._roleBottomImg.parent.removeChild(this._roleBottomImg);
        }
        switch (index) {
            case RoleIndex.ROLE:
                if (!this._roleBottomImg) {
                    this._roleBottomImg = Manager.pool.create(BitmapRemote);
                    this._roleBottomImg.x = 0;
                    this._roleBottomImg.y = Manager.config.gameHeight - 460;
                    this._roleBottomImg.load(PathInfo.getPath("res/role/role_bottom.png", LoaderType.IMAGE), 720, 450);
                }
                if (!this._roleBottomImg.parent)
                    this.basePanel.addChildAt(this._roleBottomImg, 1);
                // this.basePanel.bottomBackImg.source = "role_bottom_png";
                // this.basePanel.bottomBackImg.source = "";
                this.basePanel.showBottomBack = false;
                // this.basePanel.bottomBackImg.width = 720;
                // this.basePanel.setBottomBackTop(Manager.config.gameHeight - 460);
                // this.basePanel.backBtn.selected = false;
                this.basePanel.backImg.source = "";
                this._bgImg = Manager.pool.create(BitmapRemote);
                this._bgImg.load(PathInfo.getPath("res/role/role_bg.jpg", LoaderType.IMAGE));
                this._bgImg.x = this.basePanel.backImg.x;
                this._bgImg.y = this.basePanel.backImg.y + 30;
                this.basePanel.addChildAt(this._bgImg, 1);
                // this._view = Manager.pool.create(RoleView, this, this._showArgs);
                if (this._showArgs instanceof Array) {
                    if (this._showArgs.length > 0)
                        this._view2 = new RoleView2(this, Number(this._showArgs[0]), Number(this._showArgs[1]));
                    else
                        this._view2 = new RoleView2(this);
                }
                else
                    this._view2 = new RoleView2(this);
                break;
            case RoleIndex.PET:
                this.basePanel.backImg.source = "";
                this._bgImg = Manager.pool.create(BitmapRemote);
                this._bgImg.load(Manager.path.getPetPath("back", Extension.JPG));
                this._bgImg.y = 93;
                this.basePanel.addChildAt(this._bgImg, 1);
                this._view2 = new PetView2();
                break;
            case RoleIndex.DRESS:
                this.basePanel.backImg.source = "common_panelBg_png";
                this.basePanel.setBottomBackTop(Manager.config.gameHeight);
                this._view2 = new DressView2(this._showArgs);
                break;
            case RoleIndex.SOLDIER:
                this.basePanel.backImg.source = "common_panelBg_png";
                this.basePanel.showBottomBack = true;
                this.basePanel.setBottomBackTop(982);
                if (this._showArgs.length > 0)
                    this._view = Manager.pool.create(SoldierView, Number(this._showArgs[0]));
                else
                    this._view = Manager.pool.create(SoldierView);
                break;
            case RoleIndex.CLOAK:
                this.basePanel.backImg.source = "common_panelBg_png";
                this.basePanel.showBottomBack = true;
                this.basePanel.setBottomBackTop(982);
                this._view = Manager.pool.create(CloakView);
                break;
        }
        if (this._view && !this._view.parent) {
            this.addChild(this._view);
            this._oldIndex = index;
        }
        if (this._view2 && !this._view2.parent) {
            this.addChild(this._view2);
            this._oldIndex = index;
        }
        this._showArgs = null;
    };
    RolePanel.prototype.showView = function (clz, value) {
        if (value === void 0) { value = -1; }
        if (!this.basePanel)
            return;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        if (this._view2) {
            if (this._view2 instanceof RoleView2) {
                if (this._roleBottomImg && this._roleBottomImg.parent)
                    this._roleBottomImg.parent.removeChild(this._roleBottomImg);
            }
            this._view2.dispose();
            this._view2 = null;
        }
        if (clz == CloakView) {
            this.basePanel.title = "role_title7_png";
            this.basePanel.backImg.source = "common_panelBg_png";
            this.basePanel.showBottomBack = true;
        }
        if (clz == SoldierView) {
            this.basePanel.title = "soldier_title_png";
            this.basePanel.backImg.source = "common_panelBg_png";
            this.basePanel.showBottomBack = true;
        }
        // if(clz == PetView)
        // 	this.basePanel.title = "role_title2_png";
        // else
        // {
        this.basePanel.backImg.source = "common_panelBg_png";
        // this.basePanel.bottomBackImg.source ="panel_bg2_png";
        this.basePanel.showBottomBack = true;
        // }
        this.basePanel.setBottomBackTop(982);
        this._view = Manager.pool.create(clz, value);
        if (this._view && !this._view.parent)
            this.addChild(this._view);
        this.basePanel.scrollerList.itemList.selectedIndex = -1;
        this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    RolePanel.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    RolePanel.prototype.show = function (args) {
        if (args === void 0) { args = 0; }
        var tabIndex = 0;
        if (args instanceof Array) {
            if (args.length > 0)
                tabIndex = parseInt(args.shift());
            this._showArgs = args;
        }
        else {
            tabIndex = args; //为数字
            this._showArgs = null;
        }
        _super.prototype.show.call(this, tabIndex);
    };
    RolePanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._roleBottomImg);
        if (this._roleBottomImg)
            Manager.pool.push(this._roleBottomImg);
        this._roleBottomImg = null;
        if (this._view)
            this._view.dispose();
        this._view = null;
        if (this._view2)
            this._view2.dispose();
        this._view2 = null;
        this._menuBtnContent = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
    };
    return RolePanel;
}(Panel));
//# sourceMappingURL=RolePanel.js.map