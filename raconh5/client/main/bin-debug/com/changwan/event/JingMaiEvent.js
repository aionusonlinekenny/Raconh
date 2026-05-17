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
 * pzx
 * 17.11.18
 * 经脉event
 */
var JingMaiEvent = (function (_super) {
    __extends(JingMaiEvent, _super);
    function JingMaiEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    JingMaiEvent.JINGMAI_UPDATE_EVENT = "JIANMAI_UPDATE_EVENT";
    //检测铜币
    JingMaiEvent.JINGMAI_CHECK_ICON_EVENT = "JIANMAI_CHECK_ICON_EVENT";
    //升极
    JingMaiEvent.JINGMAI_UPGRAPE_EVENT = "JIANMAI_UPGRAPE_EVENT";
    return JingMaiEvent;
}(BaseEvent));
__reflect(JingMaiEvent.prototype, "JingMaiEvent");
//# sourceMappingURL=JingMaiEvent.js.map