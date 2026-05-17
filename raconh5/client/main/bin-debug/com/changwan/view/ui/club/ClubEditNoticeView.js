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
 * 宗门公告
 */
var ClubEditNoticeView = (function (_super) {
    __extends(ClubEditNoticeView, _super);
    function ClubEditNoticeView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("club", "ClubEditNoticeViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubEditNoticeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._tipBaseView.titleImg.source = "club_notice_png";
        this._input.textDisplay.textColor = 0x7C6E62;
        this._input.textDisplay.height = 200;
        this._input.textDisplay.multiline = true;
        this._input.textDisplay.wordWrap = true;
        this._input.textDisplay.maxChars = 30;
        this._btnImg.touchEnabled = false;
        this.onResizeHandler(null);
    };
    ClubEditNoticeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._tipBaseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubEditNoticeView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._tipBaseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubEditNoticeView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    ClubEditNoticeView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._tipBaseView.closeBtn:
                Manager.view.hide(49 /* ClubEditNoticeView */);
                break;
            case this._btn:
                Manager.control.getClub().modifyAlter(this._input.text);
                Manager.view.hide(49 /* ClubEditNoticeView */);
                break;
        }
    };
    ClubEditNoticeView.prototype.show = function (desc) {
        Manager.layer.tipsLayer.addChild(this);
        this._input.text = desc;
    };
    ClubEditNoticeView.prototype.hide = function () {
        Manager.layer.tipsLayer.removeChild(this);
    };
    ClubEditNoticeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._input, this._btn, this._btnImg);
        if (this._input)
            this._input.dispose();
        this._input = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        this._btnImg = null;
        this._tipBaseView = null;
    };
    return ClubEditNoticeView;
}(UIComponent));
__reflect(ClubEditNoticeView.prototype, "ClubEditNoticeView");
//# sourceMappingURL=ClubEditNoticeView.js.map