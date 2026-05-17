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
 * vip面板
 * liangyan
 * create 2017-12-20
*/
var VipPanel = /** @class */ (function (_super) {
    __extends(VipPanel, _super);
    function VipPanel() {
        return _super.call(this, false) || this;
    }
    VipPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // this.basePanel.backBtn.selected = false;
        this._menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "vip_btn_png", imgClick: "vip_btn_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    VipPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.vipUpdate();
    };
    VipPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.vipUpdate, this);
        Manager.model.getVip().addEventListener(VipEvent.REWARDS_UPDATE, this.vipUpdate, this);
    };
    VipPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.vipUpdate, this);
        Manager.model.getVip().removeEventListener(VipEvent.REWARDS_UPDATE, this.vipUpdate, this);
    };
    VipPanel.prototype.vipUpdate = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (btn) {
            btn.setIconShow(Manager.model.getVip().hasCanFatch);
        }
    };
    VipPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        switch (index) {
            case 0:
                this.basePanel.title = "vip_title_png";
                this.basePanel.setBottomBackTop(1280);
                this._view = Manager.pool.create(VipView);
                break;
        }
        if (this._view && !this._view.parent)
            this.addChild(this._view);
    };
    VipPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(51 /* VipPanel */);
                break;
        }
    };
    /** 设置vip特权翻页 */
    VipPanel.prototype.setVipPage = function (value) {
        if (this._view instanceof VipView) {
            var vipview = this._view;
            vipview.setPage(value);
        }
    };
    VipPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
        this._menuBtnContent.length = 0;
    };
    return VipPanel;
}(Panel));
//# sourceMappingURL=VipPanel.js.map