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
var AnimationLayer = (function (_super) {
    __extends(AnimationLayer, _super);
    function AnimationLayer() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AnimationLayer.prototype, "isNormal", {
        get: function () { return this._isNormal; },
        enumerable: true,
        configurable: true
    });
    AnimationLayer.prototype.reuse = function (isNormal) {
        if (isNormal === void 0) { isNormal = true; }
        this._isNormal = isNormal;
    };
    AnimationLayer.prototype.unuse = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this._isNormal = true;
        this._datas = null;
        this.x = 0;
        this.y = 0;
        this.texture = null;
    };
    AnimationLayer.prototype.setLoadData = function (loader) {
        this._datas = loader.data.aniData;
    };
    AnimationLayer.prototype.updateFrame = function (current) {
        if (this.parent == null)
            return;
        if (this._datas == null || current > this._datas.totalFrames)
            return;
        var frameData = this._datas.getKeyFrameData(current);
        this.x = frameData.offX - 400;
        this.y = frameData.offY - 400;
        this.texture = frameData.texture;
    };
    AnimationLayer.prototype.clear = function () {
        this._datas = null;
        this.x = 0;
        this.y = 0;
        this.texture = null;
    };
    AnimationLayer.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this._datas = null;
        this.texture = null;
    };
    return AnimationLayer;
}(egret.Bitmap));
__reflect(AnimationLayer.prototype, "AnimationLayer", ["cw.IDispose", "cw.IPool"]);
//# sourceMappingURL=AnimationLayer.js.map