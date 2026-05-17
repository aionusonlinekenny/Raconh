var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 表情信息
 * liangyan
 * create 2017-11-13
*/
var FaceInfo = (function () {
    function FaceInfo(src, index) {
        this._src = src;
        this._index = index;
    }
    Object.defineProperty(FaceInfo.prototype, "src", {
        get: function () { return this._src; },
        set: function (value) { this._src = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceInfo.prototype, "index", {
        get: function () { return this._index; },
        set: function (value) { this._index = value; },
        enumerable: true,
        configurable: true
    });
    return FaceInfo;
}());
__reflect(FaceInfo.prototype, "FaceInfo");
//# sourceMappingURL=FaceInfo.js.map