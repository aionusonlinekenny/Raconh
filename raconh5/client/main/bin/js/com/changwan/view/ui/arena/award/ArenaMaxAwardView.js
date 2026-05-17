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
 *create 2018-1-11
 *description
*/
var ArenaMaxAwardView = /** @class */ (function (_super) {
    __extends(ArenaMaxAwardView, _super);
    function ArenaMaxAwardView() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.skinName = Manager.path.getSkinName("arena", "ArenaMaxAwardViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaMaxAwardView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.disposeItems();
        this._goodItems = [];
        var len = this._vos.length;
        var item;
        for (var i = 0; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = i * 130;
            item.data = this._vos[i].item;
            this._itemBox.addChild(item);
            this._goodItems.push(item);
        }
        this._itemBox.x = (444 - len * 130) / 2;
        this._btnPic.touchEnabled = false;
        this._redIcon.visible = this._enabled;
        if (this._enabled)
            this._btnOk.filters = null;
        else
            FilterUtil.setGrayFilter(this._btnOk);
    };
    ArenaMaxAwardView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArenaMaxAwardView.prototype.removeEvent = function () {
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ArenaMaxAwardView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ArenaMaxAwardView.prototype.onCloseHandler = function (e) {
        Manager.view.hide(61 /* ArenaMaxAwardView */);
    };
    ArenaMaxAwardView.prototype.onOkHandler = function (e) {
        if (this._callBack != null) {
            this._callBack.actCallBack();
            Manager.pool.push(this._callBack);
            this._callBack = null;
        }
        Manager.view.hide(61 /* ArenaMaxAwardView */);
    };
    ArenaMaxAwardView.prototype.disposeItems = function () {
        if (this._goodItems == null)
            return;
        for (var i = 0; i < this._goodItems.length; i++) {
            Manager.pool.push(this._goodItems[i]);
        }
        this._goodItems = null;
    };
    ArenaMaxAwardView.prototype.show = function (vos, enabled, callBack) {
        if (callBack === void 0) { callBack = null; }
        this._vos = vos;
        this._enabled = enabled;
        this._callBack = callBack;
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    ArenaMaxAwardView.prototype.hide = function () {
        this.dispose();
    };
    ArenaMaxAwardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._btnOk.dispose();
            this._btnOk = null;
            this._txtTitle.dispose();
            this._txtTitle = null;
            this._btnPic = null;
            this._btnClose = null;
            this._itemBox = null;
            this._group = null;
            this._redIcon = null;
        }
        this.disposeItems();
        this._vos = null;
        if (this._callBack != null) {
            Manager.pool.push(this._callBack);
            this._callBack = null;
        }
    };
    return ArenaMaxAwardView;
}(UIComponent));
//# sourceMappingURL=ArenaMaxAwardView.js.map