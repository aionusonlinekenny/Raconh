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
 * 盟会战Event
 * luzh
 * 2018.1.30
 */
var ClubBFEvent = /** @class */ (function (_super) {
    __extends(ClubBFEvent, _super);
    function ClubBFEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //盟会战积分更新
    ClubBFEvent.SCORE_UPDATE = "SCORE_UPDATE";
    //盟会战积分奖励领取状态更新
    ClubBFEvent.REWARES_GET_STATE = "REWARES_GET_STATE";
    //盟会战玩家列表更新
    ClubBFEvent.PLAYER_LIST_UPDATE = "PLAYER_LIST_UPDATE";
    //盟会战面板数据更新
    ClubBFEvent.INFO_UPDATE = "INFO_UPDATE";
    //全部盟会战力更新
    ClubBFEvent.CLUB_POWERS = "CLUB_POWERS";
    //攻击方战意Buff更新
    ClubBFEvent.ATTACK_BUFF_UPDATE = "ATTACK_BUFF_UPDATE";
    //盟会鼓舞Buff购买更新
    ClubBFEvent.CLUB_BUFF_BUY = "CLUB_BUFF_BUY";
    //盟会战挑战cd更新
    ClubBFEvent.CD_UPDATE = "CD_UPDATE";
    //盟会战挑战cd更新
    ClubBFEvent.CHALLENGE_AREA_STATE = "CHALLENGE_AREA_STATE";
    //盟会战内小界面信息更新
    ClubBFEvent.MINI_INFOS = "MINI_INFOS";
    return ClubBFEvent;
}(BaseEvent));
//# sourceMappingURL=ClubBFEvent.js.map