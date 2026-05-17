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
var EquipGemPickOffCMD = /** @class */ (function (_super) {
    __extends(EquipGemPickOffCMD, _super);
    function EquipGemPickOffCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EQUIP_GEM_PICKOFF;
        return _this;
    }
    EquipGemPickOffCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.pos);
        pkg.writeByte(this.gemPos);
    };
    EquipGemPickOffCMD.prototype.receive = function (pi) {
        Manager.model.getEquip().dispatchEvent(new EquipEvent(EquipEvent.GEM_UPDATE_EVENT));
    };
    return EquipGemPickOffCMD;
}(BaseCMD));
//# sourceMappingURL=EquipGemPickOffCMD.js.map