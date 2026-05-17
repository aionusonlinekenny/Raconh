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
 * 17.11.14
 * 更新任务列表
 *  */
var TaskUpdateListCMD = (function (_super) {
    __extends(TaskUpdateListCMD, _super);
    function TaskUpdateListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TASK_UPDATE;
        return _this;
    }
    TaskUpdateListCMD.prototype.receive = function (pi) {
        Manager.model.getTask().updateTaskList(pi);
    };
    return TaskUpdateListCMD;
}(BaseCMD));
__reflect(TaskUpdateListCMD.prototype, "TaskUpdateListCMD");
//# sourceMappingURL=TaskUpdateListCMD.js.map