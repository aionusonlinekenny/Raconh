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
var StrongHoldPanel = /** @class */ (function (_super) {
    __extends(StrongHoldPanel, _super);
    function StrongHoldPanel() {
        return _super.call(this, false) || this;
    }
    StrongHoldPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.title = "storm_field_title_png";
        var menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_1_png", imgClick: "storm_field_btn_1_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_2_png", imgClick: "storm_field_btn_2_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_3_png", imgClick: "storm_field_btn_3_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_4_png", imgClick: "storm_field_btn_4_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, menuBtnContent);
        this._view = ObjectUtil.createObj(StrongHoldView);
        this.basePanel.addChildAt(this._view, 2);
    };
    StrongHoldPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(154 /* StrongHoldPanel */);
                break;
        }
    };
    StrongHoldPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        this._view.fieldID = index + 1;
    };
    StrongHoldPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._view)
            this._view.dispose();
        this._view = null;
    };
    return StrongHoldPanel;
}(Panel));
//# sourceMappingURL=StrongHoldPanel.js.map