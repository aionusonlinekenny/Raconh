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
 * 寻宝
 *  */
var ArtifactSendHuntingCMD = (function (_super) {
    __extends(ArtifactSendHuntingCMD, _super);
    function ArtifactSendHuntingCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ARTIFACT_HUNTING;
        return _this;
    }
    ArtifactSendHuntingCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    ArtifactSendHuntingCMD.prototype.receive = function (ip) {
        //    array('name'=>'item_list', 'type'=>'arr', 'record'=>'artifact_log_ets', 'tuple'=>'true', 'desc'=>'寻宝列表', 'vars'=>array(
        //                 array('name'=>'srv_id', 'type'=>'int16', 'desc'=>'服务器id'),
        //                 array('name'=>'name', 'type'=>'string', 'desc'=>'玩家名称'),
        //                 array('name'=>'item', 'type'=>'int32', 'desc'=>'物品id'),
        //             )),
        //             array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var info = new ArtifactLogInfo();
            info.srv_id = ip.readShort();
            info.name = ip.readUTF();
            info.base_id = ip.readInt();
            Manager.model.getArtifact().hunting(info);
        }
        var integral = ip.readShort();
        var tencount = ip.readByte();
        Manager.model.getArtifact().setIntegral(integral, tencount);
    };
    return ArtifactSendHuntingCMD;
}(BaseCMD));
__reflect(ArtifactSendHuntingCMD.prototype, "ArtifactSendHuntingCMD");
//# sourceMappingURL=ArtifactSendHuntingCMD.js.map