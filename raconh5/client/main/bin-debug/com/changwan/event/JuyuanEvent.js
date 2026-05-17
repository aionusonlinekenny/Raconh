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
 * drq
 * 聚元Event
 * 2018.4.2
 */
var JuyuanEvent = (function (_super) {
    __extends(JuyuanEvent, _super);
    function JuyuanEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JuyuanEvent.JUYUAN_INFO_UPDATE = "juyuanInfoUpdate";
    JuyuanEvent.JUYUAN_PROGRESS_UPDATE = "juyuanProgessUpdate";
    return JuyuanEvent;
}(BaseEvent));
__reflect(JuyuanEvent.prototype, "JuyuanEvent");
//# sourceMappingURL=JuyuanEvent.js.map