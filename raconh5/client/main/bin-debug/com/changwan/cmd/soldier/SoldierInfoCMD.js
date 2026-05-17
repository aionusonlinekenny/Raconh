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
var SoldierInfoCMD = (function (_super) {
    __extends(SoldierInfoCMD, _super);
    function SoldierInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SHENBING_INFO;
        return _this;
    }
    SoldierInfoCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        Manager.model.getSoldier().curSoldierId = id;
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var id_1 = pi.readShort();
            var num = pi.readByte();
            Manager.model.getSoldier().getSoldierList().add(id_1, num);
        }
        Manager.model.getSoldier().dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_INFO_UPDATE));
    };
    return SoldierInfoCMD;
}(BaseCMD));
__reflect(SoldierInfoCMD.prototype, "SoldierInfoCMD");
//# sourceMappingURL=SoldierInfoCMD.js.map