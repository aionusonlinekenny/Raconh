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
 * 称号事件
 * liangyan
 * create 2017-11-29
*/
var TitleEvent = (function (_super) {
    __extends(TitleEvent, _super);
    function TitleEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**选中称号 */
    TitleEvent.TITLE_SELECTED = "TITLE_SELECTED";
    /**称号列表刷新 */
    TitleEvent.TITLE_LIST = "TITLE_LIST";
    /**称号激活成功 */
    TitleEvent.TITLE_ACT_SUCC = "TITLE_ACT_SUCC";
    /**称号穿戴 */
    TitleEvent.TITLE_WEAR = "TITLE_WEAR";
    /**称号卸下 */
    TitleEvent.TITLE_TAKE_OFF = "TITLE_TAKE_OFF";
    /**称号获得 */
    TitleEvent.TITLE_GAIN = "TITLE_GAIN";
    /**称号删除 */
    TitleEvent.TITLE_DELETE = "TITLE_DELETE";
    return TitleEvent;
}(BaseEvent));
__reflect(TitleEvent.prototype, "TitleEvent");
//# sourceMappingURL=TitleEvent.js.map