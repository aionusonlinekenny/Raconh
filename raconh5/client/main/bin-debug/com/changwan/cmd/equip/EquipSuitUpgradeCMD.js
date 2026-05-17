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
var EquipSuitUpgradeCMD = (function (_super) {
    __extends(EquipSuitUpgradeCMD, _super);
    function EquipSuitUpgradeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SUIT_UPGRADE;
        return _this;
    }
    EquipSuitUpgradeCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.pos);
    };
    EquipSuitUpgradeCMD.prototype.receive = function (pi) {
        var status = pi.readByte();
        if (status) {
            FloatTips.addTips(LangCVO.getContent("equip28"), Color.WHITE);
            Manager.control.getEquip().equipPanel.showCgEffect();
        }
    };
    return EquipSuitUpgradeCMD;
}(BaseCMD));
__reflect(EquipSuitUpgradeCMD.prototype, "EquipSuitUpgradeCMD");
//# sourceMappingURL=EquipSuitUpgradeCMD.js.map