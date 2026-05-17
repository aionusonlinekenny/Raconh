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
 * 18.1.15
     * 福利Control
     */
var CashCowControl = /** @class */ (function (_super) {
    __extends(CashCowControl, _super);
    function CashCowControl() {
        return _super.call(this) || this;
    }
    CashCowControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_CASHCOW_QUERY, CashCowQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_CASHCOW_REWARD, CashCowRewardCMD);
        Manager.socket.addCMD(Protocol.CMD_LEVITEM_QUERY, LevItemQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_LEVITEM_REWARD, LevItemRewardCMD);
        Manager.socket.addCMD(Protocol.CMD_SEVENDAYS_QUERY, SevenDaysQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SEVENDAYS_REWARD, SevenDaysRewardCMD);
    };
    /**
     * 查询
     */
    CashCowControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CASHCOW_QUERY);
        cmd.send();
    };
    CashCowControl.prototype.reward = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CASHCOW_REWARD);
        cmd.send();
    };
    /** 冲级好礼查询 */
    CashCowControl.prototype.levItemQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LEVITEM_QUERY);
        cmd.send();
    };
    /** 冲级好礼奖励 */
    CashCowControl.prototype.rewardLevItem = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LEVITEM_REWARD);
        cmd.id = id;
        cmd.send();
    };
    /** 七天登陆查询 */
    CashCowControl.prototype.sevenDaysQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SEVENDAYS_QUERY);
        cmd.send();
    };
    /** 七天登陆奖励 */
    CashCowControl.prototype.sevenDaysReward = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SEVENDAYS_REWARD);
        cmd.login_id = id;
        cmd.send();
    };
    return CashCowControl;
}(BaseControl));
//# sourceMappingURL=CashCowControl.js.map