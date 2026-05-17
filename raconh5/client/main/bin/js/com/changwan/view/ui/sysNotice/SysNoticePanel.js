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
 * 17.12.18
 * 预告
 */
var SysNoticePanel = /** @class */ (function (_super) {
    __extends(SysNoticePanel, _super);
    function SysNoticePanel() {
        var _this = _super.call(this, false) || this;
        _this._index = -1;
        return _this;
    }
    SysNoticePanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(985);
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysNotice_yugaotu_png", imgClick: "sysNotice_yugaotu_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysNotice_btn_1_png", imgClick: "sysNotice_btn_1_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    SysNoticePanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(80 /* SysNoticePanel */);
                break;
        }
    };
    SysNoticePanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1 || index == this._index)
            return;
        this._index = index;
        if (index == 1 && !OpenCVO.isOpen(OpenConst.ID_PLOT_COPY, true)) {
            this.basePanel.scrollerList.itemList.selectedIndex = 0;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        if (this._curView != null) {
            this._curView.dispose();
            this.basePanel.backImg.source = "common_panelBg_png";
        }
        switch (index) {
            case 0:
                this._curView = new SysNoticeView();
                // this.basePanel.setBottomBackTop(1280);
                break;
            case 1:
                this._curView = new MainCopyView();
                // this.basePanel.setBottomBackTop(985);
                break;
        }
        this.basePanel.addChildAt(this._curView, 2);
        this.basePanel.title = "sysNotice_title_" + this._index + "_png";
    };
    SysNoticePanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.basePanel != null) {
            this.basePanel.dispose();
            this.basePanel = null;
        }
        if (this._curView != null) {
            this._curView.dispose();
            this._curView = null;
        }
    };
    return SysNoticePanel;
}(Panel));
//# sourceMappingURL=SysNoticePanel.js.map