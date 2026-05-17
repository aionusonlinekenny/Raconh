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
 *
 * pzx
 * create 2018-3-16
 *  分享Control
 *
*/
var ShareControl = (function (_super) {
    __extends(ShareControl, _super);
    function ShareControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShareControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SHARE_INFO, ShareInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_SHARE_QUERY, ShareQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SHARE_REWARD, ShareRewardCMD);
    };
    ShareControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SHARE_QUERY);
        cmd.send();
    };
    ShareControl.prototype.shareInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SHARE_INFO);
        cmd.send();
    };
    ShareControl.prototype.reward = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SHARE_REWARD);
        cmd.send();
    };
    return ShareControl;
}(BaseControl));
__reflect(ShareControl.prototype, "ShareControl");
//# sourceMappingURL=ShareControl.js.map