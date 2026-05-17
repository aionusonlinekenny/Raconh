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
 *create 2017-12-28
 *description
*/
var ArenaLogView = /** @class */ (function (_super) {
    __extends(ArenaLogView, _super);
    function ArenaLogView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaLogViewSkin");
        return _this;
    }
    ArenaLogView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._title.y = 145;
        this._popupView.viewY = 167;
        this._popupView.bgHeight = 939;
        this._popupView.diImgVisible = false;
        this._list.itemList.layout.gap = 5;
    };
    ArenaLogView.prototype.initData = function () {
        Manager.socket.sendOnlyProtocol(Protocol.ARENA_PK_LOG);
    };
    ArenaLogView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_LOG, this.updateLogData, this);
    };
    ArenaLogView.prototype.removeEvent = function () {
        this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_LOG, this.updateLogData, this);
        _super.prototype.removeEvent.call(this);
    };
    ArenaLogView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ArenaLogView.prototype.onCloseHandler = function (e) {
        Manager.view.hide(57 /* ArenaLogView */);
    };
    ArenaLogView.prototype.updateLogData = function (e) {
        var logs = e.params;
        this._list.initBtnListData(ArenaLogListItem, logs, true);
    };
    ArenaLogView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    ArenaLogView.prototype.hide = function () {
        this.dispose();
    };
    ArenaLogView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._list.dispose();
            this._list = null;
            this._popupView.dispose();
            this._popupView = null;
        }
    };
    return ArenaLogView;
}(UIComponent));
//# sourceMappingURL=ArenaLogView.js.map