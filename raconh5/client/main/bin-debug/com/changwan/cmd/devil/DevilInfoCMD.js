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
 * 魔神降临数据
 * liangyan
 * create 2018-04-10
*/
var DevilInfoCMD = (function (_super) {
    __extends(DevilInfoCMD, _super);
    function DevilInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_INFO;
        return _this;
    }
    DevilInfoCMD.prototype.receive = function (pi) {
        var kingInfo = new DevilKingInfo();
        kingInfo.id = pi.readInt64();
        kingInfo.name = pi.readUTF();
        kingInfo.career = pi.readByte();
        Manager.model.getDevil().lastKingInfo = kingInfo;
    };
    return DevilInfoCMD;
}(BaseCMD));
__reflect(DevilInfoCMD.prototype, "DevilInfoCMD");
//# sourceMappingURL=DevilInfoCMD.js.map