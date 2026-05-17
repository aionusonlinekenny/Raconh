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
 *author Anydo
 *create 2017-12-27
 *description
*/
var ArenaControl = /** @class */ (function (_super) {
    __extends(ArenaControl, _super);
    function ArenaControl() {
        return _super.call(this) || this;
    }
    ArenaControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.ARENA_PK_COUNT, ArenaPKCountCMD);
        Manager.socket.addCMD(Protocol.ARENA_RANK_UPDATE, ArenaRankUpdateCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_SEND, ArenaPKSendCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_RESULT_PLAYER, ArenaPKResultPlayerCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_RESULT_ROBOT, ArenaPKResultRobotCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_LOG, ArenaPKLogCMD);
        Manager.socket.addCMD(Protocol.ARENA_MAX_RANK_AWARD, ArenaMaxRankAwardCMD);
        Manager.socket.addCMD(Protocol.ARENA_EXIT, ArenaExitCMD);
    };
    /**
     * @param flag 类型 0查询 1购买
     */
    ArenaControl.prototype.cmdPKCount = function (flag) {
        var cmd = Manager.socket.getCMD(Protocol.ARENA_PK_COUNT);
        cmd.flag = flag;
        cmd.send();
    };
    /**
     * @param id 类型 0查询 >0领取具体奖励
     */
    ArenaControl.prototype.cmdMaxRankAward = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.ARENA_MAX_RANK_AWARD);
        cmd.id = id;
        cmd.send();
    };
    ArenaControl.prototype.cmdPKSend = function (rank) {
        var cmd = Manager.socket.getCMD(Protocol.ARENA_PK_SEND);
        cmd.rank = rank;
        cmd.send();
    };
    return ArenaControl;
}(BaseControl));
//# sourceMappingURL=ArenaControl.js.map