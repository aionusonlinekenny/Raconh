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
 * 魔神降临事件
 * liangyan
 * create 2018-04-16
*/
var DevilEvent = (function (_super) {
    __extends(DevilEvent, _super);
    function DevilEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**上期霸主更新 */
    DevilEvent.DEVIL_LAST_KING_UPDATE = "devilLastKingUpdate";
    /**抢夺列表更新 */
    DevilEvent.DEVIL_GRAB_LIST_UPDATE = "devilGrabListUpdate";
    /**自己摇点点数 */
    DevilEvent.DEVIL_SELF_ROLL_POINT = "devilSelfRollPoint";
    /**摇点最高更新 */
    DevilEvent.DEVIL_ROLL_MAX_UPDATE = "devilRollMaxUpdate";
    return DevilEvent;
}(BaseEvent));
__reflect(DevilEvent.prototype, "DevilEvent");
//# sourceMappingURL=DevilEvent.js.map