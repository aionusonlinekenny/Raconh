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
 *author Anydo
 *create 2017-12-27
 *description
*/
var ArenaEvent = (function (_super) {
    __extends(ArenaEvent, _super);
    function ArenaEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArenaEvent.UPDATE_PK_COUNT = "updatePKCount";
    ArenaEvent.UPDATE_MAX_RANK_AWARD = "updateMaxRankAward";
    ArenaEvent.UPDATE_RANK = "updateRank";
    ArenaEvent.UPDATE_PK_LOG = "updatePKLog";
    ArenaEvent.HIDE_JUMP_BTN = "hideJumpBtn";
    ArenaEvent.UPDATE_YESTERDAY_AWARD = "updateYesterdayAward";
    ArenaEvent.RANK_TOTAL_ITEM_SELECT = "rankTotalItemSelect";
    ArenaEvent.UPDATE_HIDE_WING = "updateHideWing";
    ArenaEvent.UPDATE_SIDE_OVER_SHOW = "updateSideOverShow";
    return ArenaEvent;
}(BaseEvent));
__reflect(ArenaEvent.prototype, "ArenaEvent");
//# sourceMappingURL=ArenaEvent.js.map