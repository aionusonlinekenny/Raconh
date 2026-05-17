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
 * 活动图标事件
 * liangyan
 * create 2017-12-23
*/
var ActIconEvent = (function (_super) {
    __extends(ActIconEvent, _super);
    function ActIconEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**图标列表更新 */
    ActIconEvent.LIST_UPDATE = "LIST_UPDATE";
    /**单个图标更新 */
    ActIconEvent.SINGLE_UPDATE = "SINGLE_UPDATE";
    /**活动结束10秒倒计时 */
    ActIconEvent.CD_TEN = "CD_TEN";
    return ActIconEvent;
}(BaseEvent));
__reflect(ActIconEvent.prototype, "ActIconEvent");
//# sourceMappingURL=ActIconEvent.js.map