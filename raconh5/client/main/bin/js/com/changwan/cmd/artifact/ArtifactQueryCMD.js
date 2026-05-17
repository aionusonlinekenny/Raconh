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
 * 寻宝查询
 *  */
var ArtifactQueryCMD = /** @class */ (function (_super) {
    __extends(ArtifactQueryCMD, _super);
    function ArtifactQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ARTIFACT_QUERY;
        return _this;
    }
    ArtifactQueryCMD.prototype.receive = function (ip) {
        //  array('name'=>'item_list', 'type'=>'arr', 'record'=>'artifact_log_ets', 'tuple'=>'true', 'desc'=>'寻宝列表', 'vars'=>array(
        //             array('name'=>'srv_id', 'type'=>'int16', 'desc'=>'服务器id'),
        //             array('name'=>'name', 'type'=>'string', 'desc'=>'玩家名称'),
        //             array('name'=>'item', 'type'=>'int32', 'desc'=>'物品id'),
        //         )),
        //         array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        //         array('name'=>'is_first_extra', 'type'=>'int8', 'desc'=>'是否首次十次 0-否 1-10次'),
        //         array('name'=>'state', 'type'=>'arr', 'tuple'=>'true', 'desc'=>array(
        //             array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        //             array('name'=>'is_rewarded', 'type'=>'int8', 'desc'=>'是否已领奖 0-否 1-是'),
        //         ))
        var ln = ip.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var info = new ArtifactLogInfo();
            info.srv_id = ip.readShort();
            info.name = ip.readUTF();
            info.base_id = ip.readInt();
            arr.push(info);
        }
        var integral = ip.readShort();
        var isFirst = ip.readByte();
        ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var point = ip.readShort();
            var reward = ip.readByte();
            ArtifactIntegralCVO.setisReward(ArtifactType.integral_type, point, reward);
        }
        Manager.model.getArtifact().query(arr, integral, isFirst);
    };
    return ArtifactQueryCMD;
}(BaseCMD));
//# sourceMappingURL=ArtifactQueryCMD.js.map