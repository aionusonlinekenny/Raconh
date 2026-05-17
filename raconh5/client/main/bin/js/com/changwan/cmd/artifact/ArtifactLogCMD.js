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
 * 寻宝查询个人记录
 *  */
var ArtifactLogCMD = /** @class */ (function (_super) {
    __extends(ArtifactLogCMD, _super);
    function ArtifactLogCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ARTIFACT_LOG;
        return _this;
    }
    ArtifactLogCMD.prototype.receive = function (ip) {
        // array('name'=>'list', 'type'=>'arr', 'record'=>'artifact_log', 'vars'=>array(
        //             array('name'=>'type', 'type'=>'int8', 'desc'=>'寻宝类型 1-1次 2-10次'),
        //             array('name'=>'item', 'type'=>'arr', 'desc'=>'物品列表', 'vars'=>array(
        //                 array('name'=>'base_id', 'type'=>'int32', 'desc'=>'基础id'),
        //             )),
        //         )),
        var ln = ip.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var info = new ArtifactSelfLogInfo();
            info.type = ip.readByte();
            var j = ip.readShort();
            for (var n = 0; n < j; n++) {
                var id = ip.readInt();
                info.itemList.push(id);
            }
            arr.push(info);
        }
        Manager.model.getArtifact().selfLog(arr);
    };
    return ArtifactLogCMD;
}(BaseCMD));
//# sourceMappingURL=ArtifactLogCMD.js.map