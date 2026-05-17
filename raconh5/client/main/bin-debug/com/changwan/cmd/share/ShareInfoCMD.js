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
 * 18.3.16
 * 分享
 *  */
var ShareInfoCMD = (function (_super) {
    __extends(ShareInfoCMD, _super);
    function ShareInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SHARE_INFO;
        return _this;
    }
    ShareInfoCMD.prototype.receive = function (ip) {
        var status = ip.readByte();
        Manager.model.getshare().returnShareInfo(status);
    };
    return ShareInfoCMD;
}(BaseCMD));
__reflect(ShareInfoCMD.prototype, "ShareInfoCMD");
//# sourceMappingURL=ShareInfoCMD.js.map