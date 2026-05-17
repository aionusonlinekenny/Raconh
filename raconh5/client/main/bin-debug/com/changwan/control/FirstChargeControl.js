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
 * 18.1.6
     * 充值豪礼control
     */
var FirstChargeControl = (function (_super) {
    __extends(FirstChargeControl, _super);
    function FirstChargeControl() {
        return _super.call(this) || this;
    }
    FirstChargeControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_FIRSTCHARGE, FitstChargeQueryCMD);
    };
    /**
     * 领奖
     */
    FirstChargeControl.prototype.reward = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_FIRSTCHARGE);
        cmd.send();
    };
    return FirstChargeControl;
}(BaseControl));
__reflect(FirstChargeControl.prototype, "FirstChargeControl");
//# sourceMappingURL=FirstChargeControl.js.map