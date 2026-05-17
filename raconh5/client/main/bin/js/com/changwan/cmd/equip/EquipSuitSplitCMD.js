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
var EquipSuitSplitCMD = /** @class */ (function (_super) {
    __extends(EquipSuitSplitCMD, _super);
    function EquipSuitSplitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SUIT_SPLIT;
        return _this;
    }
    EquipSuitSplitCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.pos);
    };
    EquipSuitSplitCMD.prototype.receive = function (pi) {
        var status = pi.readByte();
        if (status)
            Manager.control.getEquip().suitInfoQuery();
    };
    return EquipSuitSplitCMD;
}(BaseCMD));
//# sourceMappingURL=EquipSuitSplitCMD.js.map