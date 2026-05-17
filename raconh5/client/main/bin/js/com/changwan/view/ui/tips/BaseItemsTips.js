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
 * 2017.11.6
 * BaseItemsTips
 */
var BaseItemsTips = /** @class */ (function (_super) {
    __extends(BaseItemsTips, _super);
    function BaseItemsTips() {
        return _super.call(this) || this;
        // this.onResizeHandler(null);
    }
    BaseItemsTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
    };
    BaseItemsTips.prototype.setData = function (value) {
        this._data = value;
        this.invalidate(InvalidationType.DATA);
        this.visible = false;
    };
    BaseItemsTips.prototype.show = function (value) {
        if (value === void 0) { value = null; }
        this.setData(value);
        Manager.layer.tipsLayer.addChild(this);
    };
    BaseItemsTips.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    BaseItemsTips.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._data)
            this.drawData();
    };
    BaseItemsTips.prototype.drawData = function () {
        this.visible = true;
    };
    // protected addEvent():void
    // {
    // 	super.addEvent();
    // 	GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    // }
    // protected removeEvent():void
    // {
    // 	GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    // 	super.removeEvent();
    // }
    // private onResizeHandler(e:GlobalEvent):void
    // {
    // 	this.width = Manager.global.gameMain.stage.stageWidth;
    // }
    BaseItemsTips.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.reuse.call(this);
        this.touchChildren = true;
    };
    BaseItemsTips.prototype.hide = function () {
        this._data = null;
        this.dispose();
    };
    return BaseItemsTips;
}(UIComponent));
//# sourceMappingURL=BaseItemsTips.js.map