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
     * 任务Control
     */
var TaskControl = /** @class */ (function (_super) {
    __extends(TaskControl, _super);
    function TaskControl() {
        return _super.call(this) || this;
    }
    Object.defineProperty(TaskControl.prototype, "guideView", {
        get: function () {
            return this._guideView;
        },
        enumerable: true,
        configurable: true
    });
    TaskControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_TASK_LIST, TaskListCMD);
        Manager.socket.addCMD(Protocol.CMD_TASK_UPDATE, TaskUpdateListCMD);
        Manager.socket.addCMD(Protocol.CMD_TASK_COMMIT, TaskCommitCMD);
        //Manager.socket.addCMD(Protocol.CMD_TASK_MAIN_HISTORT,TaskMainHistoryCMD);
        Manager.socket.addCMD(Protocol.ROOKIE_STORY, RookieStoryCMD);
    };
    /**
     * 查询
     */
    TaskControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_TASK_LIST);
        cmd.send();
    };
    /**
    * 提交
    */
    TaskControl.prototype.taskCommit = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_TASK_COMMIT);
        cmd.task_id = id;
        cmd.send();
    };
    TaskControl.prototype.rookieAsk = function () {
        var cmd = Manager.socket.getCMD(Protocol.ROOKIE_STORY);
        cmd.send();
    };
    TaskControl.prototype.showGuide = function (globalPos, x, y, callBack, thisObj, modal) {
        if (modal === void 0) { modal = true; }
        if (!globalPos)
            return;
        if (this._guideView == null)
            this._guideView = new GuideView();
        if (this._guideView.parent == null)
            Manager.layer.tipsLayer.addChild(this._guideView);
        else
            Manager.layer.tipsLayer.addChildAt(this._guideView, Manager.layer.tipsLayer.numChildren - 1);
        // this._guideView.setData(target, x, y, callBack, thisObj, modal);
        this._guideView.setData2(globalPos, x, y, callBack, thisObj, modal);
    };
    TaskControl.prototype.hideGuide = function () {
        if (this._guideView)
            this._guideView.hide();
        Manager.model.getGuide().curID = 0;
    };
    return TaskControl;
}(BaseControl));
//# sourceMappingURL=TaskControl.js.map