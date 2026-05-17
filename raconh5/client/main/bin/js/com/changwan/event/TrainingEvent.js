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
 * 传功事件
 * Simon
 * create 2018-1-12
*/
var TrainingEvent = /** @class */ (function (_super) {
    __extends(TrainingEvent, _super);
    function TrainingEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**传功活动信息更新 */
    TrainingEvent.INFO_UPDATE = "INFO_UPDATE";
    /**传功类型更新 */
    TrainingEvent.TYPE_UPDATE = "TYPE_UPDATE";
    /**传功数据更新 */
    TrainingEvent.DATA_UPDATE = "DATA_UPDATE";
    /**经验更新 */
    TrainingEvent.EXP_UPDATE = "EXP_UPDATE";
    return TrainingEvent;
}(BaseEvent));
//# sourceMappingURL=TrainingEvent.js.map