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
 * 兑换活动 control
 * 2018.4.19
 */
var ExchangeControl = (function (_super) {
    __extends(ExchangeControl, _super);
    function ExchangeControl() {
        return _super.call(this) || this;
    }
    ExchangeControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_EXCHANGE_INFO, ExchangeInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_EXCHANGE, ExchangeCMD);
    };
    //发
    ExchangeControl.prototype.sendInitInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_EXCHANGE_INFO);
        cmd.send();
    };
    ExchangeControl.prototype.sendExchange = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_EXCHANGE);
        cmd._id = id;
        cmd.send();
    };
    return ExchangeControl;
}(BaseControl));
__reflect(ExchangeControl.prototype, "ExchangeControl");
//# sourceMappingURL=ExchangeControl.js.map