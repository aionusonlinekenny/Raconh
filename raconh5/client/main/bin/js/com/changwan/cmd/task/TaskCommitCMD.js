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
 * 提交任务
 *  */
var TaskCommitCMD = /** @class */ (function (_super) {
    __extends(TaskCommitCMD, _super);
    function TaskCommitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TASK_COMMIT;
        return _this;
    }
    TaskCommitCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.task_id);
    };
    TaskCommitCMD.prototype.receive = function (pi) {
        Manager.model.getTask().taskCommit(pi);
    };
    return TaskCommitCMD;
}(BaseCMD));
//# sourceMappingURL=TaskCommitCMD.js.map