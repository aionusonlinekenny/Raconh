var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.11.14
 * 任务信息
 */
var TaskInfo = (function () {
    function TaskInfo() {
        /**子任务 */
        this.infoList = [];
    }
    return TaskInfo;
}());
__reflect(TaskInfo.prototype, "TaskInfo");
//# sourceMappingURL=TaskInfo.js.map