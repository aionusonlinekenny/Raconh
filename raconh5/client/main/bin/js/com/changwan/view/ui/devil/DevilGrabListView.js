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
 * 魔神降临抢夺列表
 * liangyan
 * create 2018-04-10
*/
var DevilGrabListView = /** @class */ (function (_super) {
    __extends(DevilGrabListView, _super);
    function DevilGrabListView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("devil", "DevilGrabListViewSkin");
        return _this;
    }
    DevilGrabListView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._items = [];
    };
    DevilGrabListView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._grabBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().addEventListener(DevilEvent.DEVIL_GRAB_LIST_UPDATE, this.onUpdateHandler, this);
    };
    DevilGrabListView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._grabBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().removeEventListener(DevilEvent.DEVIL_GRAB_LIST_UPDATE, this.onUpdateHandler, this);
    };
    DevilGrabListView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    DevilGrabListView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    DevilGrabListView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    DevilGrabListView.prototype.drawData = function () {
        var infos = Manager.model.getDevil().grabInfos;
        var infoLen = infos != null ? infos.length : 0;
        if (infoLen > 5)
            infoLen = 5;
        var item;
        var offsetX = 0;
        var offsetY = 102;
        this.clearItem();
        for (var i = 0; i < infoLen; i++) {
            item = Manager.pool.create(DevilGrabItem);
            item.info = infos[i];
            item.x = offsetX;
            item.y = offsetY + i * 150;
            this.addChild(item);
            this._items.push(item);
        }
    };
    DevilGrabListView.prototype.onResizeHandler = function (e) {
        this.x = Manager.global.gameMain.stage.stageWidth - 150;
        // this.x = 0;
        this.y = 220;
    };
    DevilGrabListView.prototype.onTouchHandler = function (e) {
        Manager.render.add(this.askGrabInfo, this, 500, 1, null, true);
    };
    DevilGrabListView.prototype.onUpdateHandler = function (e) {
        var now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        this._cd = Math.round(Manager.model.getDevil().canGrabTime - now);
        if (this._cd > 0)
            Manager.render.add(this.countDown, this, 1000, 0, null, true);
        else {
            this._cdTxt.text = LangCVO.getContent("devil12"); //可抢夺
            this._cdTxt.textColor = Color.GREEN2;
        }
        this.invalidate(InvalidationType.DATA);
    };
    DevilGrabListView.prototype.countDown = function () {
        this._cd--;
        if (this._cd <= 0) {
            Manager.render.remove(this.countDown, this);
            this._cdTxt.text = LangCVO.getContent("devil12"); //可抢夺
            this._cdTxt.textColor = Color.GREEN2;
            this.onTouchHandler(null);
        }
        else {
            this._cdTxt.text = LangCVO.getContent("devil13", this._cd); //冷却:{0}秒
            this._cdTxt.textColor = Color.RED;
        }
    };
    DevilGrabListView.prototype.askGrabInfo = function () {
        Manager.control.getDevil().askGrabList();
    };
    DevilGrabListView.prototype.clearItem = function () {
        var len = this._items != null ? this._items.length : 0;
        for (var i = 0; i < len; i++) {
            Manager.pool.push(this._items[i]);
            this._items[i] = null;
        }
        this._items = [];
    };
    DevilGrabListView.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.tipsLayer.addChildAt(this, 0);
    };
    DevilGrabListView.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    DevilGrabListView.prototype.dispose = function () {
        Manager.render.remove(this.askGrabInfo, this);
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._grabBtn, this._cdTxt);
        this._grabBtn.dispose();
        this._grabBtn = null;
        this._cdTxt.dispose();
        this._cdTxt = null;
        this.clearItem();
    };
    return DevilGrabListView;
}(UIComponent));
//# sourceMappingURL=DevilGrabListView.js.map