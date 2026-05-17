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
 * 17.12.16
 * Sysnoticemddel
 */
var SysnoticeModel = (function (_super) {
    __extends(SysnoticeModel, _super);
    function SysnoticeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**查询 */
    SysnoticeModel.prototype.querySysList = function (arr) {
        this._sysList = SysNoteiceCVO.getCvos();
        var ln = arr.length;
        var sl = this._sysList.length;
        for (var i = 0; i < ln; i++) {
            var info = arr[i];
            for (var j = 0; j < sl; j++) {
                var cvo = this._sysList[j];
                if (cvo.taskId == info.taskId) {
                    cvo.setState(info.state);
                    break;
                }
            }
        }
        this._sysList = ArrayUtil.sortOn(this._sysList, ["id"]);
        this.dispatchEvent(new SysnoticeEvent(SysnoticeEvent.SYSNOTICE_QUERY_EVENT));
    };
    SysnoticeModel.prototype.getCurNotice = function () {
        var task = Manager.model.getTask().getcurTask();
        if (task) {
            for (var _i = 0, _a = this._sysList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.open_task_id >= task.id) {
                    return obj;
                }
            }
            return this._sysList[this._sysList.length - 1];
        }
    };
    /**更新 */
    SysnoticeModel.prototype.updateSysList = function (taskId, statu) {
        for (var _i = 0, _a = this._sysList; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.taskId == taskId) {
                cvo.setState(statu);
                break;
            }
        }
        this.dispatchEvent(new SysnoticeEvent(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT, taskId));
    };
    SysnoticeModel.prototype.setSectionId = function (taskId) {
    };
    /**列表 */
    SysnoticeModel.prototype.getStsList = function () {
        return this._sysList;
    };
    /**检测是否有可领取的奖励 */
    SysnoticeModel.prototype.getlinquReward = function () {
        for (var _i = 0, _a = this._sysList; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.state == 0) {
                if (Manager.model.getTask().getTaskIdComplete(cvo.open_task_id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 游戏公告返回 */
    SysnoticeModel.prototype.returnUpdNotice = function () {
        this.dispatchEvent(new SysnoticeEvent(SysnoticeEvent.UPD_NOTICE_EVENT));
    };
    return SysnoticeModel;
}(egret.EventDispatcher));
__reflect(SysnoticeModel.prototype, "SysnoticeModel");
//# sourceMappingURL=SysnoticeModel.js.map