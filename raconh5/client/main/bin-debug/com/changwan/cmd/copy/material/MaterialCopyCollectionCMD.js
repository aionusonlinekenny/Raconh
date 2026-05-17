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
 * 缥缈录生成宝箱
 * Simon
 * create 2018.3.16
 */
var MaterialCopyCollectionCMD = (function (_super) {
    __extends(MaterialCopyCollectionCMD, _super);
    function MaterialCopyCollectionCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MATERIAL_COPY_COLLECTION;
        return _this;
    }
    return MaterialCopyCollectionCMD;
}(BaseCMD));
__reflect(MaterialCopyCollectionCMD.prototype, "MaterialCopyCollectionCMD");
//# sourceMappingURL=MaterialCopyCollectionCMD.js.map