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
 * 激活
 *  */
var SoldierActivateCMD = (function (_super) {
    __extends(SoldierActivateCMD, _super);
    function SoldierActivateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SHENBING_ACTIVATE;
        return _this;
    }
    SoldierActivateCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    SoldierActivateCMD.prototype.receive = function (ip) {
        var id = ip.readShort();
        var star = ip.readByte();
        Manager.model.getSoldier().activate(id, star);
    };
    return SoldierActivateCMD;
}(BaseCMD));
__reflect(SoldierActivateCMD.prototype, "SoldierActivateCMD");
//# sourceMappingURL=SoldierActivateCMD.js.map