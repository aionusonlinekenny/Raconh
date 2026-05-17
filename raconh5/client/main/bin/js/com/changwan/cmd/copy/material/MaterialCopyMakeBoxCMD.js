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
var MaterialCopyMakeBoxCMD = /** @class */ (function (_super) {
    __extends(MaterialCopyMakeBoxCMD, _super);
    function MaterialCopyMakeBoxCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MATERIAL_COPY_MAKE_BOX;
        return _this;
    }
    MaterialCopyMakeBoxCMD.prototype.receive = function (pi) {
        var x = pi.readInt();
        var y = pi.readInt();
        var id = pi.readShort();
        if (id == CopyConst.ID_JUYUAN) {
            Manager.model.getJuyuan().setCopyAni(x, y); //聚元
        }
        else {
            Manager.model.getMaterialCopy().createCollection(x, y);
        }
    };
    return MaterialCopyMakeBoxCMD;
}(BaseCMD));
//# sourceMappingURL=MaterialCopyMakeBoxCMD.js.map