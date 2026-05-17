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
 * 宗门
 * Simon
 * 2017.12.15
 */
var ClubControl = /** @class */ (function (_super) {
    __extends(ClubControl, _super);
    function ClubControl() {
        return _super.call(this) || this;
    }
    ClubControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CLUB_INFO, ClubInfoCMD);
        Manager.socket.addCMD(Protocol.CLUB_DAILY_UPDATE, ClubDailyUpdateCMD);
        Manager.socket.addCMD(Protocol.CLUB_CHIEF_UPDATE, ClubChiefUpdateCMD);
        Manager.socket.addCMD(Protocol.CLUB_RECOMMEND, ClubRecommendCMD);
        Manager.socket.addCMD(Protocol.CLUB_JOIN, ClubJoinCMD);
        Manager.socket.addCMD(Protocol.CLUB_ALTER, ClubAlterCMD);
        Manager.socket.addCMD(Protocol.CLUB_MEMBERLIST, ClubMemberListCMD);
        Manager.socket.addCMD(Protocol.CLUB_SALARY, ClubSalaryCMD);
        Manager.socket.addCMD(Protocol.CLUB_DONATE, ClubDonateCMD);
        Manager.socket.addCMD(Protocol.CLUB_UPGRADE, ClubCareerUpgradeCMD);
    };
    /**
     * 查询
     */
    ClubControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_INFO);
        cmd.send();
    };
    /**
     * 宗门推荐请求
     */
    ClubControl.prototype.clubRecommendQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_RECOMMEND);
        cmd.send();
    };
    /**
     * 宗门加入申请
     */
    ClubControl.prototype.clubJoin = function (clubId, isRecommend) {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_JOIN);
        cmd.clubId = clubId;
        cmd.isRecomment = isRecommend;
        cmd.send();
    };
    /**
     * 修改公告
     */
    ClubControl.prototype.modifyAlter = function (desc) {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_ALTER);
        cmd.desc = desc;
        cmd.send();
    };
    /**
     * 宗门成员列表
     */
    ClubControl.prototype.memberListQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_MEMBERLIST);
        cmd.send();
    };
    /**
     * 领取宗门职位福利
     */
    ClubControl.prototype.clubSalary = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_SALARY);
        cmd.send();
    };
    /**
     * 宗门捐献
     */
    ClubControl.prototype.clubDonate = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_DONATE);
        cmd.type = type;
        cmd.send();
    };
    /**
     * 晋升
     */
    ClubControl.prototype.clubCareerUpgrade = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_UPGRADE);
        cmd.send();
    };
    return ClubControl;
}(BaseControl));
//# sourceMappingURL=ClubControl.js.map