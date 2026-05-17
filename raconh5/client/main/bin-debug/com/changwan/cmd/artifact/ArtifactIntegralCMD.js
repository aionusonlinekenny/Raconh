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
 * 寻宝积分领奖
 *  */
var ArtifactIntegralCMD = (function (_super) {
    __extends(ArtifactIntegralCMD, _super);
    function ArtifactIntegralCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ARTIFACT_INTEGRAL_REWARD;
        return _this;
    }
    ArtifactIntegralCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.type);
    };
    ArtifactIntegralCMD.prototype.receive = function (ip) {
        // array('name'=>'state', 'type'=>'arr', 'tuple'=>'true', 'desc'=>array(
        //             array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        //             array('name'=>'is_rewarded', 'type'=>'int8', 'desc'=>'是否已领奖 0-否 1-是'),
        //         )),
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var point = ip.readShort();
            var reward = ip.readByte();
            ArtifactIntegralCVO.setisReward(ArtifactType.integral_type, point, reward);
        }
        Manager.model.getArtifact().integralReward();
    };
    return ArtifactIntegralCMD;
}(BaseCMD));
__reflect(ArtifactIntegralCMD.prototype, "ArtifactIntegralCMD");
//# sourceMappingURL=ArtifactIntegralCMD.js.map