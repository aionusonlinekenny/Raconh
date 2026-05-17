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
 * 17.12.27
 * 猎命
 *  */
var LifeGridHuntCMD = /** @class */ (function (_super) {
    __extends(LifeGridHuntCMD, _super);
    function LifeGridHuntCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LIFEGRID_HUNT;
        return _this;
    }
    LifeGridHuntCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    LifeGridHuntCMD.prototype.receive = function (ip) {
        var type = ip.readByte();
        var ln = ip.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var info = new ItemsModelInfo();
            info.base_id = ip.readInt();
            info.bind = ip.readByte() == 1;
            info.quantity = ip.readInt();
            arr.push(info);
        }
        Manager.model.getLifeGrid().returnHunt(arr, type);
    };
    return LifeGridHuntCMD;
}(BaseCMD));
//# sourceMappingURL=LifeGridHuntCMD.js.map