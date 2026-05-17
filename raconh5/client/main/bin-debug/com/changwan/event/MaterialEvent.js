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
 * 缥缈录事件
 * Simon
 * create 2018-3-20
*/
var MaterialEvent = (function (_super) {
    __extends(MaterialEvent, _super);
    function MaterialEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**通关列表更新 */
    MaterialEvent.MATERIAL_PASS_LIST_UPDATE = "MATERIAL_PASS_LIST_UPDATE";
    MaterialEvent.MATERIAL_GET_AWARD_CELL = "MATERIAL_GET_AWARD_CELL";
    MaterialEvent.MATERIAL_CHECK_CAN_FIGHT = "MATERIAL_CHECK_CAN_FIGHT";
    return MaterialEvent;
}(BaseEvent));
__reflect(MaterialEvent.prototype, "MaterialEvent");
//# sourceMappingURL=MaterialEvent.js.map