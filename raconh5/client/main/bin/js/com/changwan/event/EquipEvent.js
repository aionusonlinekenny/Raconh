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
 * 装备EVENT
 * Simon
 * create 2018-1-4
 */
var EquipEvent = /** @class */ (function (_super) {
    __extends(EquipEvent, _super);
    function EquipEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**套装信息 */
    EquipEvent.SUIT_INFO_UPDATE = "SUIT_INFO_UPDATE";
    /** 宝石更新 */
    EquipEvent.GEM_UPDATE_EVENT = "GEM_UPDATE_EVENT";
    return EquipEvent;
}(BaseEvent));
//# sourceMappingURL=EquipEvent.js.map