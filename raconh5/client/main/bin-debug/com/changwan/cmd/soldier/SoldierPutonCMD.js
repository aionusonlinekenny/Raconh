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
 * 穿戴
 *  */
var SoldierPutonCMD = (function (_super) {
    __extends(SoldierPutonCMD, _super);
    function SoldierPutonCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SHENBING_PUTON;
        return _this;
    }
    SoldierPutonCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    SoldierPutonCMD.prototype.receive = function (ip) {
        var id = ip.readShort();
        Manager.model.getSoldier().currentId = id;
    };
    return SoldierPutonCMD;
}(BaseCMD));
__reflect(SoldierPutonCMD.prototype, "SoldierPutonCMD");
//# sourceMappingURL=SoldierPutonCMD.js.map