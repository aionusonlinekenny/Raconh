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
 * 请求玩家数据协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFPlayerInfoCMD = /** @class */ (function (_super) {
    __extends(ClubBFPlayerInfoCMD, _super);
    function ClubBFPlayerInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_PLAYER_INFO;
        return _this;
    }
    ClubBFPlayerInfoCMD.prototype.receive = function (pi) {
        // array('name' => 'score', 'type' => 'int32', 'desc' => '个人积分数'),
        // array('name' => 'guild_rank', 'type' => 'int32', 'desc' => '盟会积分排名'),
        // array('name' => 'score_get_ids', 'type' => 'arr', 'desc' => '已领取的个人积分奖励id', 'vars' => array(
        //     array('name' => 'score_id', 'type' => 'int16', 'desc' => '个人积分奖励id'),
        // )),
        Manager.model.getClubBF().score = pi.readInt();
        pi.readInt();
        var ids = [];
        var len = pi.readShort();
        while (len--) {
            ids.push(pi.readShort());
        }
        Manager.model.getClubBF().hasGetIDs = ids;
    };
    return ClubBFPlayerInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ClubBFPlayerInfoCMD.js.map