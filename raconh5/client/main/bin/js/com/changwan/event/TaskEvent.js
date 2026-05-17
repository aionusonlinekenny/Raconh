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
 * 17.11.15
 */
var TaskEvent = /** @class */ (function (_super) {
    __extends(TaskEvent, _super);
    function TaskEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    TaskEvent.TASK_UPDATE_EVENT = "TASK_UPDATE_EVENT";
    /**更新章节 */
    TaskEvent.TASK_UPDATE_SECTION_EVENT = "Task_UPDATE_SECTION_EVENT";
    /** 提交任务 */
    // public static TASK_COMMIT_EVENT:string = "TASK_COMMIT_EVENT";
    /** 完成任务 */
    TaskEvent.TASK_COMPLETE_EVENT = "TASK_COMPLETE_EVENT";
    /**任务初始化 */
    TaskEvent.TASK_INIT_EVENT = "TASK_INIT_EVENT";
    return TaskEvent;
}(BaseEvent));
//# sourceMappingURL=TaskEvent.js.map