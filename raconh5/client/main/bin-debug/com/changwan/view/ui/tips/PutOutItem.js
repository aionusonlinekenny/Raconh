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
 * pzx
 * 18.3.26
 * 出产途径item
 */
var PutOutItem = (function (_super) {
    __extends(PutOutItem, _super);
    function PutOutItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "PutOutItemSkin");
        return _this;
    }
    PutOutItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
        this._pathBg1.touchEnabled = true;
    };
    PutOutItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._pathBg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenViewHandler, this);
    };
    PutOutItem.prototype.removeEvent = function () {
        this._pathBg1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenViewHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    PutOutItem.prototype.onOpenViewHandler = function (e) {
        Manager.view.hide(this.viewId);
        Manager.link.link(this._openViewId, this._tap);
    };
    PutOutItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    PutOutItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    PutOutItem.prototype.setData = function (data) {
        this._str = data;
        this.invalidate(InvalidationType.DATA);
    };
    PutOutItem.prototype.drawData = function () {
        var any = this.spin(this._str);
        this._pathBg1.load(Manager.path.getPanelUiImgPath("tips/" + any.resImg, "png"));
        this._pathtxt1.text = any.name;
        this._tuijianImg1.visible = any.hots == 1;
        this._openViewId = any.viewId;
        this._tap = any.tab;
    };
    PutOutItem.prototype.spin = function (str) {
        var reg = /{|}| /g;
        str = str.replace(reg, "");
        var arr = str.split(",");
        var obj = {};
        obj.hots = Number(arr[1]);
        obj.resImg = arr[2];
        obj.name = arr[3];
        obj.viewId = Number(arr[4]);
        var tab = "0"; //页签默认0
        if (arr[5]) {
            tab = arr[5];
        }
        obj.tab = tab;
        return obj;
    };
    PutOutItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this._pathBg1 = Manager.pool.create(BitmapRemote);
        this.addChildAt(this._pathBg1, 0);
    };
    PutOutItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    PutOutItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        Manager.pool.push(this._pathBg1);
        this._pathBg1 = null;
        this.x = 0;
        this.y = 0;
        if (isRemove) {
            this._pathtxt1.dispose();
            this._pathtxt1 = null;
            this.removeChild(this._tuijianImg1);
            this._tuijianImg1 = null;
        }
    };
    PutOutItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return PutOutItem;
}(UIComponent));
__reflect(PutOutItem.prototype, "PutOutItem");
//# sourceMappingURL=PutOutItem.js.map