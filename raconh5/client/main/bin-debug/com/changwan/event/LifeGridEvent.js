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
 * 17.12.27
 */
var LifeGridEvent = (function (_super) {
    __extends(LifeGridEvent, _super);
    function LifeGridEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新免费时间
    LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT = "LIFEGRID_UPDATE_FREECD_EVENT";
    /**升级 */
    LifeGridEvent.LIFEGRID_LVUP_EVENT = "LIFEGRID_LVUP_EVENT";
    /** 穿上 */
    LifeGridEvent.LIFEGRID_WARE_EVENT = "LIFEGRID_WARE_EVENT";
    /** 分解 */
    LifeGridEvent.LIFEGRID_SEPARATE_EVENT = "LIFEGRID_SEPARATE_EVENT";
    /** 猎命 */
    LifeGridEvent.LIFEGRID_HUNT_EVENT = "LIFEGRID_HUNT_EVENT";
    /** 可升级 */
    LifeGridEvent.LV_UPGRADE_EVENT = "LV_UPGRADE_EVENT";
    return LifeGridEvent;
}(BaseEvent));
__reflect(LifeGridEvent.prototype, "LifeGridEvent");
//# sourceMappingURL=LifeGridEvent.js.map