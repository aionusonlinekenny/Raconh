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
 * 盟会战
 * Simon
 * 2018.2.3
 */
var ClubLeaderWarEvent = (function (_super) {
    __extends(ClubLeaderWarEvent, _super);
    function ClubLeaderWarEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**活动信息更新 */
    ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE = "CLUB_LEADER_WAR_INFO_UPDATE";
    /**排名信息更新 */
    ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE = "CLUB_LEADER_WAR_RANK_UPDATE";
    /**玩家挑战次数更新 */
    ClubLeaderWarEvent.CLUB_LEADER_WAR_PLAY_TIME_UPDATE = "CLUB_LEADER_WAR_PLAY_TIME_UPDATE";
    /**三大盟主信息 */
    ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO = "CLUB_LEADER_WAR_LEADER_INFO";
    return ClubLeaderWarEvent;
}(BaseEvent));
__reflect(ClubLeaderWarEvent.prototype, "ClubLeaderWarEvent");
//# sourceMappingURL=ClubLeaderWarEvent.js.map