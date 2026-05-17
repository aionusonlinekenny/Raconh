/**
 * 表情信息
 * liangyan
 * create 2017-11-13
*/
var FaceInfo = /** @class */ (function () {
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
//# sourceMappingURL=FaceInfo.js.map