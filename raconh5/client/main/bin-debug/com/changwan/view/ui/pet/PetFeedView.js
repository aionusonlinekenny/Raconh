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
 * 宠物喂养界面
 * liangyan
 * create 2017-12-16
*/
var PetFeedView = (function (_super) {
    __extends(PetFeedView, _super);
    function PetFeedView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("pet", "PetFeedViewSkin");
        return _this;
    }
    PetFeedView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._baseView.titleImg.source = "pet_feed_label2_png";
        this._baseView.diImgVisible = false;
        this._baseView.bgHeight = 370;
    };
    PetFeedView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    PetFeedView.prototype.removeEvent = function () {
        this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    PetFeedView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    PetFeedView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    PetFeedView.prototype.drawLayout = function () {
        this._item0.reuse(ItemsConst.PET_ZZD);
        this._item1.reuse(ItemsConst.PET_WXD);
    };
    PetFeedView.prototype.onTouchHandler = function (e) {
        Manager.view.hide(46 /* PetFeedView */);
    };
    PetFeedView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    PetFeedView.prototype.show = function () {
        if (!this.parent) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
            this.invalidate(InvalidationType.LAYOUT);
        }
    };
    PetFeedView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    PetFeedView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    PetFeedView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._baseView.dispose();
        this._baseView = null;
        this._item0.dispose();
        this._item0 = null;
        this._item1.dispose();
        this._item1 = null;
    };
    PetFeedView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._baseView, this._item0, this._item1);
        this._baseView.dispose();
        this._baseView = null;
        this._item0.dispose();
        this._item0 = null;
        this._item1.dispose();
        this._item1 = null;
    };
    return PetFeedView;
}(UIComponent));
__reflect(PetFeedView.prototype, "PetFeedView", ["IViewManager"]);
//# sourceMappingURL=PetFeedView.js.map