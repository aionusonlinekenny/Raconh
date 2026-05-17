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
 *author Anydo
 *create 2018-1-8
 *description
*/
var ArenaJumpBtnView = (function (_super) {
    __extends(ArenaJumpBtnView, _super);
    function ArenaJumpBtnView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaJumpBtnViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaJumpBtnView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArenaJumpBtnView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArenaJumpBtnView.prototype.onResizeHandler = function (e) {
        this.x = 0; //Manager.global.gameMain.stage.stageWidth - this.width;
        this.y = 987;
    };
    ArenaJumpBtnView.prototype.onClickHandler = function (e) {
        if (!Manager.model.getArena().isPlaying)
            return;
        Manager.model.getArena().showResultToolView();
    };
    ArenaJumpBtnView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onResizeHandler(null);
        Manager.layer.tipsLayer.addChild(this);
    };
    ArenaJumpBtnView.prototype.hide = function () {
        ObjectUtil.remove(this);
        this.dispose();
    };
    ArenaJumpBtnView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._btn = null;
        }
    };
    return ArenaJumpBtnView;
}(UIComponent));
__reflect(ArenaJumpBtnView.prototype, "ArenaJumpBtnView");
//# sourceMappingURL=ArenaJumpBtnView.js.map