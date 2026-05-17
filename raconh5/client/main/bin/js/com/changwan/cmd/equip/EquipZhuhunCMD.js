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
var EquipZhuhunCMD = /** @class */ (function (_super) {
    __extends(EquipZhuhunCMD, _super);
    function EquipZhuhunCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EQUIP_ZHUHUN;
        return _this;
    }
    EquipZhuhunCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.pos);
    };
    EquipZhuhunCMD.prototype.receive = function (pi) {
        var ret = pi.readByte();
        if (!ret) {
            Manager.model.getItems().dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT));
        }
        else {
            Manager.control.getEquip().equipPanel.showCgEffect();
        }
    };
    return EquipZhuhunCMD;
}(BaseCMD));
//# sourceMappingURL=EquipZhuhunCMD.js.map