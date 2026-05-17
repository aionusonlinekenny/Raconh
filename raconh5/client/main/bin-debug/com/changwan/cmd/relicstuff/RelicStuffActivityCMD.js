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
 * pzx
 * 18.3.9
 *　神器激活，碎片激活
 *  */
var RelicStuffActivityCMD = (function (_super) {
    __extends(RelicStuffActivityCMD, _super);
    function RelicStuffActivityCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_RELICSTUFF_ACTIVITY;
        return _this;
    }
    RelicStuffActivityCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
        pkg.writeByte(this.id);
    };
    RelicStuffActivityCMD.prototype.receive = function (ip) {
        var type = ip.readByte();
        var id = ip.readByte();
        Manager.model.getrelicstuff().setActivity(type, id);
    };
    return RelicStuffActivityCMD;
}(BaseCMD));
__reflect(RelicStuffActivityCMD.prototype, "RelicStuffActivityCMD");
//# sourceMappingURL=RelicStuffActivityCMD.js.map