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
 * 18.2.8
     * 寻宝Control
     */
var ArtifactControl = (function (_super) {
    __extends(ArtifactControl, _super);
    function ArtifactControl() {
        return _super.call(this) || this;
    }
    ArtifactControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_ARTIFACT_QUERY, ArtifactQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_ARTIFACT_HUNTING, ArtifactSendHuntingCMD);
        Manager.socket.addCMD(Protocol.CMD_ARTIFACT_INTEGRAL_REWARD, ArtifactIntegralCMD);
        Manager.socket.addCMD(Protocol.CMD_ARTIFACT_LOG, ArtifactLogCMD);
    };
    /**
     * 查询
     */
    ArtifactControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_QUERY);
        cmd.send();
    };
    /**
     * 寻宝
     */
    ArtifactControl.prototype.hunting = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_HUNTING);
        cmd.type = type;
        cmd.send();
    };
    /**
     *积分领奖
     */
    ArtifactControl.prototype.integralReward = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_INTEGRAL_REWARD);
        cmd.type = type;
        cmd.send();
    };
    /**
     * 个人寻宝记录
     */
    ArtifactControl.prototype.selfLog = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_LOG);
        cmd.send();
    };
    return ArtifactControl;
}(BaseControl));
__reflect(ArtifactControl.prototype, "ArtifactControl");
//# sourceMappingURL=ArtifactControl.js.map