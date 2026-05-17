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
 * 缥缈录信息
 * Simon
 * create 2018.3.16
 */
var MaterialCopyInfoCMD = /** @class */ (function (_super) {
    __extends(MaterialCopyInfoCMD, _super);
    function MaterialCopyInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MATERIAL_COPY_INFO;
        return _this;
    }
    MaterialCopyInfoCMD.prototype.receive = function (pi) {
        Manager.model.getMaterialCopy().getAwardId = pi.readShort();
        Manager.model.getMaterialCopy().curStar = pi.readInt();
        Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_GET_AWARD_CELL));
    };
    return MaterialCopyInfoCMD;
}(BaseCMD));
//# sourceMappingURL=MaterialCopyInfoCMD.js.map