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
 * 17.11.14
 * 返回获取已接任务列表
 *  */
var TaskListCMD = /** @class */ (function (_super) {
    __extends(TaskListCMD, _super);
    function TaskListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TASK_LIST;
        return _this;
    }
    TaskListCMD.prototype.receive = function (pi) {
        Manager.model.getTask().queryTaskList(pi);
    };
    return TaskListCMD;
}(BaseCMD));
//# sourceMappingURL=TaskListCMD.js.map