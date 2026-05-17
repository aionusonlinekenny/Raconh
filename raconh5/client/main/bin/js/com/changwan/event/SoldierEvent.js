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
var SoldierEvent = /** @class */ (function (_super) {
    __extends(SoldierEvent, _super);
    function SoldierEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoldierEvent.SOLDIER_INFO_UPDATE = "SOLDIER_INFO_UPDATE";
    SoldierEvent.SOLDIER_UPGRADE_STAR = "SOLDIER_UPGRADE_STAR";
    SoldierEvent.SOLDIER_PUTON = "SOLDIER_PUTON";
    SoldierEvent.SOLDIER_ITEM_CLICK_EVENT = "SOLDIER_ITEM_CLICK_EVENT";
    return SoldierEvent;
}(BaseEvent));
//# sourceMappingURL=SoldierEvent.js.map