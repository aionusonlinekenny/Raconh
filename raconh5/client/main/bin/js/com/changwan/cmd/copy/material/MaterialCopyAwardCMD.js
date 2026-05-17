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
 * 缥缈录奖励
 * Simon
 * create 2018.3.16
 */
var MaterialCopyAwardCMD = /** @class */ (function (_super) {
    __extends(MaterialCopyAwardCMD, _super);
    function MaterialCopyAwardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MATERIAL_COPY_AWARD;
        return _this;
    }
    MaterialCopyAwardCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.awardId);
    };
    MaterialCopyAwardCMD.prototype.receive = function (pi) {
        var awardId = pi.readShort();
        Manager.model.getMaterialCopy().getAwardId = awardId;
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.control.getDrop().showAlert(list);
        Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_GET_AWARD_CELL));
    };
    return MaterialCopyAwardCMD;
}(BaseCMD));
//# sourceMappingURL=MaterialCopyAwardCMD.js.map