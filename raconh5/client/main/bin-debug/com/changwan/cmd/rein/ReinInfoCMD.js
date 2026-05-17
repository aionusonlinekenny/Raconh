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
 * 转生信息协议
 * liangyan
 * create 2017-12-14
*/
var ReinInfoCMD = (function (_super) {
    __extends(ReinInfoCMD, _super);
    function ReinInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.REIN_INFO;
        return _this;
    }
    // protected processOut(pkg:TCPPacketOut):void{}
    ReinInfoCMD.prototype.receive = function (pi) {
        Manager.model.getRein().bossCount = pi.readShort();
        Manager.model.getRein().dispatchEvent(new ReinEvent(ReinEvent.REIN_INFO));
    };
    return ReinInfoCMD;
}(BaseCMD));
__reflect(ReinInfoCMD.prototype, "ReinInfoCMD");
//# sourceMappingURL=ReinInfoCMD.js.map