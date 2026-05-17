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
 * 盟主战
 * Simon
 * 2018.2.3
 */
var ClubLeaderWarModel = /** @class */ (function (_super) {
    __extends(ClubLeaderWarModel, _super);
    function ClubLeaderWarModel() {
        var _this = _super.call(this) || this;
        /**活动状态：0结束或未开始，1进行中 */
        _this.status = 0;
        _this.info = new ClubLeaderWarInfo;
        return _this;
    }
    ClubLeaderWarModel.prototype.updateInfo = function (status) {
        this.status = status;
        // this.info.rankList.sort(this.sortByWin);
        this.dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE));
    };
    ClubLeaderWarModel.prototype.sortByWin = function (value1, value2) {
        if (value1.winCount < value2.winCount)
            return 1;
        else if (value1.winCount > value2.winCount)
            return -1;
        else
            return 0;
    };
    ClubLeaderWarModel.prototype.updateRank = function () {
        // this.info.rankList.sort(this.sortByWin);
        this.dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE));
    };
    ClubLeaderWarModel.prototype.updateLeaderInfo = function (list) {
        list.sort(this.sortByFight);
        this.dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO, list));
    };
    ClubLeaderWarModel.prototype.sortByFight = function (value1, value2) {
        if (value1.fight < value2.fight)
            return 1;
        else if (value1.fight > value2.fight)
            return -1;
        else
            return 0;
    };
    /**判断是否有膜拜次数 */
    ClubLeaderWarModel.prototype.checkCanMobai = function () {
        if (this.status == 1)
            return false;
        var mobaiCvoInfo = ClubDataCVO.getClubLeaderWarInfo(9);
        if (mobaiCvoInfo) {
            if (Number(mobaiCvoInfo.clubLeaderWarInfoValue) - this.info.mobaiCount > 0)
                return true;
        }
        return false;
    };
    return ClubLeaderWarModel;
}(egret.EventDispatcher));
//# sourceMappingURL=ClubLeaderWarModel.js.map