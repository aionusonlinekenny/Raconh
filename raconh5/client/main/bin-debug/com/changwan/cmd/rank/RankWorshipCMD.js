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
 * 膜拜
 * luzhihong
 * create 2017-11-03
 */
var RankWorshipCMD = (function (_super) {
    __extends(RankWorshipCMD, _super);
    function RankWorshipCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.RANK_WORSHIP;
        return _this;
    }
    RankWorshipCMD.prototype.processOut = function (pkg) {
        // array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
        // array('name' => 'target_id', 'type' => 'int64', 'desc' => '第一名玩家id'),
        pkg.writeShort(this.type);
        pkg.writeInt64(this.id);
    };
    RankWorshipCMD.prototype.receive = function (pi) {
        // array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
        var type = pi.readShort();
        Manager.model.getRank().addWorshipType(type);
    };
    return RankWorshipCMD;
}(BaseCMD));
__reflect(RankWorshipCMD.prototype, "RankWorshipCMD");
//# sourceMappingURL=RankWorshipCMD.js.map