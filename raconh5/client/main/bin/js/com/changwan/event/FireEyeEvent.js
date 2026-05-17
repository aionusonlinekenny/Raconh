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
 * 火眼金睛事件
 * liangyan
 * create 2018-03-27
*/
var FireEyeEvent = /** @class */ (function (_super) {
    __extends(FireEyeEvent, _super);
    function FireEyeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**收到下一关数据 */
    FireEyeEvent.FIRE_EYE_NEXT_DATA = "FIRE_EYE_NEXT_DATA";
    /**收到玩家数据 */
    FireEyeEvent.FIRE_EYE_PLAYER_DATA = "FIRE_EYE_PLAYER_DATA";
    /**更新已领取奖励 */
    FireEyeEvent.FIRE_EYE_UPDATE_REWARDS = "FIRE_EYE_UPDATE_REWARDS";
    return FireEyeEvent;
}(BaseEvent));
//# sourceMappingURL=FireEyeEvent.js.map