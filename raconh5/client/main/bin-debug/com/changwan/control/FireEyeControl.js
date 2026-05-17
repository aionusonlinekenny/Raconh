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
 * 火眼金睛control
 * liangyan
 * create 2018-03-27
*/
var FireEyeControl = (function (_super) {
    __extends(FireEyeControl, _super);
    function FireEyeControl() {
        return _super.call(this) || this;
    }
    FireEyeControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.FIRE_EYE_HAS_JOIN, FireEyeHasJoinCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_MATCH_SUCC, FireEyeMatchSuccCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_NEXT, FireEyeNextLevelCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_GOODS_DATA, FireEyeGoodsDataCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_PLAYER_DATA, FireEyePlayerDataCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_LEVEL_RESULT, FireEyeLevelResultCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_ACT_DATA, FireEyeResultCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_HAS_FETCH, FireEyeHasFetchCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_MATCH, FireEyeMatchCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_ENEMY_DATA, FireEyeAskDataCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_FETCH, FireEyeFetchRewardsCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_SELECT, FireEyeSelectItemCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_SELECT_SPECIAL, FireEyeSelectSpecialCMD);
    };
    /**参与活动（进入匹配队列） */
    FireEyeControl.prototype.match = function () {
        var cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_MATCH);
        cmd.send();
    };
    /**请求对手数据 */
    FireEyeControl.prototype.askEnemyData = function () {
        var cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_ENEMY_DATA);
        cmd.send();
    };
    /**领取奖励 */
    FireEyeControl.prototype.fetchByID = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_FETCH);
        cmd.id = id;
        cmd.send();
    };
    /**选中物品 */
    FireEyeControl.prototype.selectByID = function (id, cvoID) {
        var cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_SELECT);
        cmd.id = id;
        cmd.cvoID = cvoID;
        cmd.send();
    };
    return FireEyeControl;
}(BaseControl));
__reflect(FireEyeControl.prototype, "FireEyeControl");
//# sourceMappingURL=FireEyeControl.js.map