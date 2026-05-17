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
 * 盟主战
 * Simon
 * 2018.2.2
 */
var ClubLeaderWarPanel = (function (_super) {
    __extends(ClubLeaderWarPanel, _super);
    function ClubLeaderWarPanel() {
        return _super.call(this, false) || this;
    }
    ClubLeaderWarPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.title = "clubLeaderWar_title_png";
        var menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubLeaderWar_funcBtn1_png", imgClick: "clubLeaderWar_funcBtn1_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    ClubLeaderWarPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                // Manager.view.hide(ViewID.ClubLeaderWarPanel);
                break;
        }
    };
    ClubLeaderWarPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        if (this.curView && this.curView.parent)
            this.curView.parent.removeChild(this.curView);
        this._curFuncIndex = this.basePanel.scrollerList.itemList.selectedIndex;
        switch (this._curFuncIndex) {
            case 0:
                this._clubLeaderWarView = Manager.pool.create(ClubLeaderWarView);
                if (!this._clubLeaderWarView.parent)
                    this.addChild(this._clubLeaderWarView);
                this.curView = this._clubLeaderWarView;
                break;
        }
    };
    ClubLeaderWarPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._clubLeaderWarView)
            this._clubLeaderWarView.dispose();
        this._clubLeaderWarView = null;
    };
    return ClubLeaderWarPanel;
}(Panel));
__reflect(ClubLeaderWarPanel.prototype, "ClubLeaderWarPanel");
//# sourceMappingURL=ClubLeaderWarPanel.js.map