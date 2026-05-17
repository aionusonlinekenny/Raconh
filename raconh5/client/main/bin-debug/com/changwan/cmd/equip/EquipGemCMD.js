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
var EquipGemCMD = (function (_super) {
    __extends(EquipGemCMD, _super);
    function EquipGemCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EQUIP_GEM;
        return _this;
    }
    EquipGemCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.pos);
        pkg.writeShort(this.itemList.length);
        for (var i = 0; i < this.itemList.length; i++) {
            pkg.writeInt(this.itemList[i]);
        }
    };
    EquipGemCMD.prototype.receive = function (pi) {
        var ret = pi.readByte();
        Manager.control.getEquip().equipPanel.setGemBack(ret);
        Manager.model.getEquip().dispatchEvent(new EquipEvent(EquipEvent.GEM_UPDATE_EVENT));
    };
    return EquipGemCMD;
}(BaseCMD));
__reflect(EquipGemCMD.prototype, "EquipGemCMD");
//# sourceMappingURL=EquipGemCMD.js.map