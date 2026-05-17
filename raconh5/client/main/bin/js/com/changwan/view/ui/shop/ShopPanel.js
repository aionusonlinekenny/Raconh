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
 * pzx
 * 17.11.23
 * 商城
 */
var ShopPanel = /** @class */ (function (_super) {
    __extends(ShopPanel, _super);
    function ShopPanel() {
        return _super.call(this, false) || this;
    }
    ShopPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var boo = Manager.model.getShop().treasureGarretModel.checkfreeTime();
        var boo2 = Manager.model.self.attrInfo.honor >= 500;
        this._menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "shop_daoju1_png", imgClick: "shop_daoju1_png", tapType: ShopType.GOLD_TYPE },
            //{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "shop_shenmi1_png", imgClick: "shop_shenmi2_png",tapType:2},
            { showRedIcon: boo2, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "shop_rongyu1_png", imgClick: "shop_rongyu1_png", tapType: ShopType.RONGYU_TYPE },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "vip_btn_png", imgClick: "vip_btn_png", tapType: ShopType.VIP_TYPE }
        ];
        if (OpenCVO.isOpen(OpenConst.ID_TREASURE_GARRET)) {
            this._menuBtnContent.unshift({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rein_zhenbaoge1_png", imgClick: "rein_zhenbaoge1_png", showRedIcon: boo, tapType: ShopType.TREASUREGARRET_TYPE });
        }
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    ShopPanel.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    ShopPanel.prototype.onIconShowHandler = function (e) {
        var btn;
        if (e.type == ShopEvent.TREASUREGARRET_UPDATE_EVENT) {
            btn = this.setPromptSign(0);
            var boo = Manager.model.getShop().treasureGarretModel.checkfreeTime();
            if (btn)
                btn.setIconShow(boo);
        }
        if (e.type == GameObjectAttrEvent.HONOR) {
            if (Manager.model.self.attrInfo.honor >= 500) {
                for (var i = this._menuBtnContent.length - 1; i > -1; i--) {
                    if (this._menuBtnContent[i].tapType == ShopType.RONGYU_TYPE) {
                        btn = this.setPromptSign(i);
                        break;
                    }
                }
                if (btn)
                    btn.setIconShow(true);
            }
        }
    };
    ShopPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getShop().treasureGarretModel.addEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR, this.onIconShowHandler, this);
    };
    ShopPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getShop().treasureGarretModel.removeEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR, this.onIconShowHandler, this);
    };
    ShopPanel.prototype.onClickHandler = function (e) {
        if (Manager.view.isOpening(18 /* ShopPanel */))
            Manager.view.hide(18 /* ShopPanel */);
        else if (Manager.view.isOpening(115 /* ShopPanelMulte */))
            Manager.view.hide(115 /* ShopPanelMulte */);
    };
    ShopPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var i = this.basePanel.scrollerList.itemList.selectedIndex;
        if (i == -1)
            return;
        var any = this._menuBtnContent[i];
        var index = any.tapType;
        if (this._curView) {
            this._curView.visible = false;
        }
        switch (index) {
            case ShopType.TREASUREGARRET_TYPE:
                if (this._bitimg == null) {
                    this._bitimg = Manager.pool.create(BitmapRemote);
                    this._bitimg.x = 0;
                    this._bitimg.y = 113;
                    this.basePanel.addChildAt(this._bitimg, 3);
                }
                this._bitimg.load(Manager.path.getReinPath("rein_treasure_zhuangshi", Extension.PNG));
                this._bitimg.visible = true;
                this.basePanel.backImg.source = "common_panelBg_png";
                this.basePanel.title = "shop_title0_png";
                // this.basePanel.bottomBackImg.source = "panel_bg2_png";
                this.basePanel.showBottomBack = true;
                if (!this._view) {
                    this._view = Manager.pool.create(TreasureGarretView);
                    this.addChild(this._view);
                }
                this._curView = this._view;
                if (this._shopView && this._shopView.visible)
                    this._shopView.visible = false;
                break;
            default:
                this.basePanel.title = "shop_shangcheng_png";
                // this.basePanel.bottomBackImg.source = "";
                this.basePanel.showBottomBack = false;
                if (index == ShopType.RONGYU_TYPE)
                    this.setTopGameMoney(GainLossVO.HONOR);
                else
                    this.setTopGameMoney(GainLossVO.COIN);
                if (this._bitimg)
                    this._bitimg.visible = false;
                if (!this._shopView) {
                    this._shopView = new ShopView;
                    this.addChild(this._shopView);
                }
                this._shopView.onFuncBtnChangeHandler(index);
                if (this._shopView && this._shopView.visible)
                    this._shopView.visible = false;
                this._curView = this._shopView;
                break;
        }
        this._curView.visible = true;
        if (index == ShopType.RONGYU_TYPE) {
            this.setTopGameMoney(GainLossVO.HONOR);
        }
        else if (index == ShopType.VIP_TYPE) {
            this.setTopGameMoney(GainLossVO.YUPEIXIAO_ITEM);
        }
        else {
            this.setTopGameMoney(GainLossVO.COIN);
        }
    };
    ShopPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.basePanel) {
            this.basePanel.dispose();
            this.basePanel = null;
        }
        if (ShopPanel.shopbuyView) {
            ShopPanel.shopbuyView.dispose();
            ShopPanel.shopbuyView = null;
        }
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        if (this._shopView) {
            this._shopView.dispose();
            this._shopView = null;
        }
        this._curView = null;
        this._menuBtnContent = null;
    };
    return ShopPanel;
}(Panel));
//# sourceMappingURL=ShopPanel.js.map