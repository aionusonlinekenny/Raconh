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
 * 转生事件
 * liangyan
 * create 2017-12-14
*/
var ReinEvent = (function (_super) {
    __extends(ReinEvent, _super);
    function ReinEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**转生全民boss次数 */
    ReinEvent.REIN_BOSS_UPDATE = "REIN_BOSS_UPDATE";
    /**转生数据返回 */
    ReinEvent.REIN_INFO = "REIN_INFO";
    /**转生申请结果 */
    ReinEvent.REIN_APPLY = "REIN_APPLY";
    return ReinEvent;
}(BaseEvent));
__reflect(ReinEvent.prototype, "ReinEvent");
//# sourceMappingURL=ReinEvent.js.map