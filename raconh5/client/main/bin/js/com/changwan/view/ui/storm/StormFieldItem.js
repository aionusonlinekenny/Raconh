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
 * 江湖风云地区Item
 * luzh
 * 2018-4.20
 */
var StormFieldItem = /** @class */ (function (_super) {
    __extends(StormFieldItem, _super);
    function StormFieldItem() {
        return _super.call(this) || this;
    }
    StormFieldItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._img = Manager.pool.create(BitmapRemote, Manager.path.getStormPath("field" + this._fieldID + ".png"));
        this.addChild(this._img);
        this._back0 = BitmapRes.create("common_name_back_png", 39, -24, 63, 305);
        this.addChild(this._back0);
        this._back1 = BitmapRes.create("storm_di2_png", 316, 45);
        this.addChild(this._back1);
        this._clubName = BitmapRes.create("", 50, 23);
        this.addChild(this._clubName);
        this._fieldName = BitmapRes.create("storm_field_name_" + this._fieldID + "_png", 332, 74);
        this.addChild(this._fieldName);
    };
    StormFieldItem.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    StormFieldItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    StormFieldItem.prototype.onClickHandler = function (e) {
        Manager.view.show(154 /* StrongHoldPanel */);
    };
    StormFieldItem.prototype.reuse = function (fieldID, pos) {
        this._fieldID = fieldID;
        _super.prototype.reuse.call(this);
        this.x = pos.x;
        this.y = pos.y;
        this.touchEnabled = true;
        this.touchChildren = false;
    };
    StormFieldItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.pushes(this._img, this._back0, this._back1, this._clubName, this._fieldName);
        this._img = null;
        this._back0 = null;
        this._back1 = null;
        this._clubName = null;
        this._fieldName = null;
    };
    return StormFieldItem;
}(RenderSprite));
//# sourceMappingURL=StormFieldItem.js.map