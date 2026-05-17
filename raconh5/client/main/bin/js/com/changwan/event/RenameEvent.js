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
 * 改名事件
 * pzx
 * create 2017-12.14
 */
var RenameEvent = /** @class */ (function (_super) {
    __extends(RenameEvent, _super);
    function RenameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新
     */
    RenameEvent.UPDATE_RENAME_EVENT = "UPDATE_RENAME_EVENT";
    return RenameEvent;
}(BaseEvent));
//# sourceMappingURL=RenameEvent.js.map