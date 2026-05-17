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
 * 传功控制器
 * Simon
 * create 2018-1-12
*/
var TrainingControl = /** @class */ (function (_super) {
    __extends(TrainingControl, _super);
    function TrainingControl() {
        return _super.call(this) || this;
    }
    TrainingControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PUSH_INFO, TrainingInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PUSH_END, TrainingEndCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PUSH_STATUS, TrainingStatusCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PREPARE, TrainingPrepareCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_COMMIT, TrainingCommitCMD);
    };
    /**传功信息 */
    TrainingControl.prototype.traingPrepare = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_TRAINING_PREPARE);
        cmd.trainingType = type;
        cmd.send();
    };
    /**传功进行确认 */
    TrainingControl.prototype.trainingCommit = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_TRAINING_COMMIT);
        cmd.send();
    };
    return TrainingControl;
}(BaseControl));
//# sourceMappingURL=TrainingControl.js.map