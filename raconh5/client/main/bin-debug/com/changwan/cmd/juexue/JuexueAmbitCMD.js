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
 * 18.3.1
 * 境界升级
 *  */
var JuexueAmbitCMD = (function (_super) {
    __extends(JuexueAmbitCMD, _super);
    function JuexueAmbitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_JUEXUE_AMBIT;
        return _this;
    }
    JuexueAmbitCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    JuexueAmbitCMD.prototype.receive = function (ip) {
        var i = ip.readShort();
        Manager.model.getjuexue().updateAmbitLv(i);
    };
    return JuexueAmbitCMD;
}(BaseCMD));
__reflect(JuexueAmbitCMD.prototype, "JuexueAmbitCMD");
//# sourceMappingURL=JuexueAmbitCMD.js.map