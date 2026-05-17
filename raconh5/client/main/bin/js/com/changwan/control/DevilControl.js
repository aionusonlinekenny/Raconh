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
 * 魔神降临controller
 * liangyan
 * create 2018-04-10
*/
var DevilControl = /** @class */ (function (_super) {
    __extends(DevilControl, _super);
    function DevilControl() {
        return _super.call(this) || this;
    }
    DevilControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.DEVIL_NOTICE_ROLL, DevilNoticeRollCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ROLL_INFO, DevilRollInfoCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ACT_RESULT, DevilActResultCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ROLL_REWARDS, DevilRollRewardsCMD);
        Manager.socket.addCMD(Protocol.DEVIL_INFO, DevilInfoCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ENTER, DevilEnterCMD);
        Manager.socket.addCMD(Protocol.DEVIL_EXIT, DevilExitCMD);
        Manager.socket.addCMD(Protocol.DEVIL_GRAB_LIST, DevilGrabListCMD);
        Manager.socket.addCMD(Protocol.DEVIL_CHALLENGE, DevilChallengeCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ROLL_DICE, DevilRollDiceCMD);
        Manager.socket.addCMD(Protocol.DEVIL_RANK_LIST, DevilRankListCMD);
        Manager.socket.addCMD(Protocol.DEVIL_EXIT_GRAB, DevilExitGrabCMD);
    };
    /**请求魔神降临数据 */
    DevilControl.prototype.askInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_INFO);
        cmd.send();
    };
    /**进入魔神降临地图 */
    DevilControl.prototype.enterDevil = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_ENTER);
        cmd.send();
    };
    /**退出魔神降临地图 */
    DevilControl.prototype.exitDevil = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_EXIT);
        cmd.send();
    };
    /**请求抢夺列表 */
    DevilControl.prototype.askGrabList = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_GRAB_LIST);
        cmd.send();
    };
    /**挑战玩家 */
    DevilControl.prototype.challenge = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_CHALLENGE);
        cmd.id = id;
        cmd.send();
    };
    /**摇奖 */
    DevilControl.prototype.rollDice = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_ROLL_DICE);
        cmd.send();
    };
    /**请求排名列表 */
    DevilControl.prototype.askRankList = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_RANK_LIST);
        cmd.send();
    };
    /**退出1V1 */
    DevilControl.prototype.exitGrab = function () {
        var cmd = Manager.socket.getCMD(Protocol.DEVIL_EXIT_GRAB);
        cmd.send();
    };
    return DevilControl;
}(BaseControl));
//# sourceMappingURL=DevilControl.js.map