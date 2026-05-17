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
 * 加载外部图片视图
 * luzhihong
 * create 2017-11-02
 */
var BitmapRemote = (function (_super) {
    __extends(BitmapRemote, _super);
    function BitmapRemote() {
        var _this = _super.call(this) || this;
        _this._bitmap = Manager.pool.create(egret.Bitmap);
        _this.addChild(_this._bitmap);
        return _this;
    }
    BitmapRemote.prototype.load = function (path, tWidth, tHeight, callback, thisObj) {
        if (tWidth === void 0) { tWidth = -1; }
        if (tHeight === void 0) { tHeight = -1; }
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (this._path == path)
            return;
        //停止加载上一个
        if (this._path != null)
            Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        this._path = path;
        this._width = tWidth;
        this._height = tHeight;
        this._callback = callback;
        this._thisObj = thisObj;
        if (this._path == null) {
            this._bitmap.bitmapData = null; //空路径
        }
        else {
            Manager.loader.load(this._path, this.onLoadImgComplete, this, ResourceGCType.COMMON); //开始加载
        }
    };
    BitmapRemote.prototype.pool = function () {
        Manager.pool.push(this);
    };
    BitmapRemote.prototype.setSize = function (tWidth, tHeight) {
        if (this._width == tWidth && this._height == tHeight)
            return;
        this._width = tWidth;
        this._height = tHeight;
        if (this._bitmap.bitmapData) {
            this.width = this._height;
            this.height = this._height;
        }
    };
    BitmapRemote.prototype.onLoadImgComplete = function (loader /*data:egret.Texture*/) {
        this._bitmap.bitmapData = loader.data;
        // if(!this._bitmap.bitmapData)
        // {
        //     this._bitmap.texture = loader.data;
        // }
        if (this._width > 0)
            this._bitmap.scaleX = this._width / this._bitmap.width;
        if (this._height > 0)
            this._bitmap.scaleY = this._height / this._bitmap.height;
        this.width = this._bitmap.width;
        this.height = this._bitmap.height;
        if (this._callback != null && this._thisObj != null) {
            this._callback.call(this._thisObj);
        }
    };
    BitmapRemote.prototype.unuse = function () {
        if (this._path != null)
            Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        ObjectUtil.removes(this);
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this.x = 0;
        this.y = 0;
        this._width = 0;
        this._height = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this._path = null;
        this.filters = [];
        this.visible = true;
        this.rotation = 0;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        if (this.mask)
            this.mask = null;
    };
    BitmapRemote.prototype.reuse = function (path, tWidth, tHeight) {
        if (path === void 0) { path = null; }
        if (tWidth === void 0) { tWidth = -1; }
        if (tHeight === void 0) { tHeight = -1; }
        if (this._bitmap == null) {
            this._bitmap = Manager.pool.create(egret.Bitmap);
            this.addChild(this._bitmap);
        }
        this._bitmap.bitmapData = null;
        if (!!path)
            this.load(path, tWidth, tHeight);
    };
    BitmapRemote.prototype.getWidth = function () {
        return (this._width > 0) ? this._width : this.width;
    };
    BitmapRemote.prototype.getHeight = function () {
        return (this._height > 0) ? this._height : this.height;
    };
    BitmapRemote.prototype.getBitmap = function () {
        return this._bitmap;
    };
    BitmapRemote.prototype.dispose = function () {
        if (this._path != null)
            Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        ObjectUtil.removes(this);
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this._path = null;
    };
    return BitmapRemote;
}(UIComponent));
__reflect(BitmapRemote.prototype, "BitmapRemote");
//# sourceMappingURL=BitmapRemote.js.map