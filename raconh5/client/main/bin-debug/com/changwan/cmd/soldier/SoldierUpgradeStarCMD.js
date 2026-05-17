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
 * Simon
 * 2017.12.21
 * 兵魂升星
 * */
var SoldierUpgradeStarCMD = (function (_super) {
    __extends(SoldierUpgradeStarCMD, _super);
    function SoldierUpgradeStarCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SHENBING_UPGRADE_START;
        return _this;
    }
    SoldierUpgradeStarCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    SoldierUpgradeStarCMD.prototype.receive = function (ip) {
        var id = ip.readShort();
        var star = ip.readByte();
        Manager.model.getSoldier().upgradeStar(id, star);
    };
    return SoldierUpgradeStarCMD;
}(BaseCMD));
__reflect(SoldierUpgradeStarCMD.prototype, "SoldierUpgradeStarCMD");
//# sourceMappingURL=SoldierUpgradeStarCMD.js.map