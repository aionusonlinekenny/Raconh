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
 * drq
 * 签到Control
 * 2018.3.23
 */
var QiandaoControl = (function (_super) {
    __extends(QiandaoControl, _super);
    function QiandaoControl() {
        return _super.call(this) || this;
    }
    QiandaoControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SIGH_INFO, QiandaoInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_DAILY_SIGN, QiandaoSignCMD);
        Manager.socket.addCMD(Protocol.CMD_DAILY_AWARD, QiandaoAwardCMD);
    };
    //发
    QiandaoControl.prototype.sendInitInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SIGH_INFO);
        cmd.send();
    };
    QiandaoControl.prototype.sendSign = function (day) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_DAILY_SIGN);
        cmd._day = day;
        cmd.send();
    };
    QiandaoControl.prototype.sendAward = function (sec) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_DAILY_AWARD);
        cmd._sec = sec;
        cmd.send();
    };
    return QiandaoControl;
}(BaseControl));
__reflect(QiandaoControl.prototype, "QiandaoControl");
//# sourceMappingURL=QiandaoControl.js.map