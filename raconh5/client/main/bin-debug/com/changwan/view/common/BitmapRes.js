/**
 * 动态加载资源位图
 * devil
 * create  2017-11-14
 * update
*/
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
var BitmapRes = (function (_super) {
    __extends(BitmapRes, _super);
    function BitmapRes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitmapRes.prototype.unuse = function () {
        this.touchEnabled = false;
        this._disposeFlag = false;
        this._callback = null;
        this._thisObj = null;
        if (this._name != null && this._name != "")
            Manager.loader.removeTexture(this._name, this.complete, this);
        this._name = null;
        Manager.pool.unuseBitmap(this);
        this.x = 0;
        this.y = 0;
        if (this.parent)
            this.parent.removeChild(this);
    };
    BitmapRes.create = function (name, x, y, width, height, callBack, target) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = -1; }
        if (height === void 0) { height = -1; }
        if (callBack === void 0) { callBack = null; }
        if (target === void 0) { target = null; }
        var result = Manager.pool.create(BitmapRes, name, callBack, target, width, height);
        result.x = x;
        result.y = y;
        return result;
    };
    BitmapRes.prototype.reuse = function (name, callback, thisObj, width, height) {
        if (name === void 0) { name = ""; }
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (width === void 0) { width = -1; }
        if (height === void 0) { height = -1; }
        this.bitmapData = null;
        this.texture = null;
        this._callback = callback;
        this._thisObj = thisObj;
        this._width = width;
        this._height = height;
        this._name = name;
        if (this._name != null && this._name != "")
            Manager.loader.loadTexture(name, this.complete, this);
    };
    Object.defineProperty(BitmapRes.prototype, "source", {
        set: function (value) {
            if (this._name == value)
                return;
            this.bitmapData = null;
            this.texture = null;
            Manager.loader.removeTexture(this._name, this.complete, this);
            this._name = value;
            if (value == null || value == "")
                return;
            Manager.loader.loadTexture(this._name, this.complete, this);
        },
        enumerable: true,
        configurable: true
    });
    BitmapRes.prototype.complete = function (texture) {
        if (!this._disposeFlag && texture) {
            this.texture = texture;
            this.width = this._width < 0 ? this.texture.textureWidth : this._width;
            this.height = this._height < 0 ? this.texture.textureHeight : this._height;
            if (this._callback != null)
                this._callback.call(this._thisObj);
        }
    };
    BitmapRes.prototype.setWidth = function (value) {
        this._width = value;
        if (this.texture) {
            this.width = value;
        }
    };
    BitmapRes.prototype.pool = function () {
        Manager.pool.push(this);
    };
    BitmapRes.prototype.getName = function () {
        return this._name;
    };
    BitmapRes.prototype.dispose = function () {
        if (this._name != null && this._name != "")
            Manager.loader.removeTexture(this._name, this.complete, this);
        if (this.parent != null)
            this.parent.removeChild(this);
        this.bitmapData = null;
        this.texture = null;
        this._disposeFlag = true;
    };
    return BitmapRes;
}(egret.Bitmap));
__reflect(BitmapRes.prototype, "BitmapRes", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=BitmapRes.js.map