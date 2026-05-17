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
 * 转生controller
 * liangyan
 * create 2017-12-14
*/
var ReinControl = (function (_super) {
    __extends(ReinControl, _super);
    function ReinControl() {
        return _super.call(this) || this;
    }
    ReinControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.REIN_INFO, ReinInfoCMD);
        Manager.socket.addCMD(Protocol.REIN_APPLY, ReinApplyCMD);
    };
    /**转生信息 */
    ReinControl.prototype.reinInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.REIN_INFO);
        cmd.send();
    };
    /**转生申请 */
    ReinControl.prototype.reinApply = function () {
        var cmd = Manager.socket.getCMD(Protocol.REIN_APPLY);
        cmd.send();
    };
    return ReinControl;
}(BaseControl));
__reflect(ReinControl.prototype, "ReinControl");
//# sourceMappingURL=ReinControl.js.map