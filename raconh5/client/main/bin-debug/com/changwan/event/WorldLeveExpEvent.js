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
 * 世界等级event
 * pzx
 * create 2018.4.3
 */
var WorldLeveExpEvent = (function (_super) {
    __extends(WorldLeveExpEvent, _super);
    function WorldLeveExpEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新
     */
    WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT = "UPDATE_WORLDLEVE_EVENT";
    return WorldLeveExpEvent;
}(BaseEvent));
__reflect(WorldLeveExpEvent.prototype, "WorldLeveExpEvent");
//# sourceMappingURL=WorldLeveExpEvent.js.map