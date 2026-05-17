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
 * 17.12.27
 * 穿戴;
 *  */
var LifeGridWareCMD = (function (_super) {
    __extends(LifeGridWareCMD, _super);
    function LifeGridWareCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LIFEGRID_WARE;
        return _this;
    }
    LifeGridWareCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.index);
        pkg.writeInt(this.id);
    };
    LifeGridWareCMD.prototype.receive = function (ip) {
        var pos = ip.readByte();
        Manager.model.getLifeGrid().returnWare(pos);
    };
    return LifeGridWareCMD;
}(BaseCMD));
__reflect(LifeGridWareCMD.prototype, "LifeGridWareCMD");
//# sourceMappingURL=LifeGridWareCMD.js.map