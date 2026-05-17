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
 * 斗地主
 * Simon
 * 2018.1.23
 */
var LairdModel = (function (_super) {
    __extends(LairdModel, _super);
    function LairdModel() {
        var _this = _super.call(this) || this;
        /**当前身份 */
        _this.curStatus = 0;
        _this.catchInfo = LairdCVO.getInfo(1);
        _this.rescueInfo = LairdCVO.getInfo(2);
        _this.interactInfo = LairdCVO.getInfo(3);
        _this.seekHelpInfo = LairdCVO.getInfo(4);
        _this.lairdRoleInfo = new LairdInfo();
        return _this;
    }
    LairdModel.prototype.updateCoolyInfo = function (targetId, workSec) {
        for (var i = 0; i < this.coolyInfoList.length; i++) {
            if (this.coolyInfoList[i].id == targetId) {
                this.coolyInfoList[i].pickSec = workSec;
            }
        }
    };
    LairdModel.prototype.updatePlayResult = function (isWin) {
        if (isWin)
            this.lairdView.changeItem(1);
    };
    /**是否显示红点提示 */
    LairdModel.prototype.checkRedIcon = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_LAIRD))
            return false;
        return this.checkInteractIcon() || this.checkCatchIcon() || this.checkCanGetExp();
    };
    //如果有苦工并且有互动次数时
    LairdModel.prototype.checkInteractIcon = function () {
        var leftTime = this.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (this.curStatus == LairdStatusType.STATUS_LORD && this.interactInfo.value - this.lairdRoleInfo.interactCount > 0 && this.coolyInfoList.length > 0 && leftTime <= 0)
            return true;
        return false;
    };
    //如果苦工人数未满并且有抓捕次数时
    LairdModel.prototype.checkCatchIcon = function () {
        if ((this.curStatus == LairdStatusType.STATUS_FREE || this.curStatus == LairdStatusType.STATUS_LORD)
            && this.catchInfo.value - this.lairdRoleInfo.catchCount > 0 && this.coolyInfoList.length < 2)
            return true;
        return false;
    };
    /**判断是否有超过1/24经验提取 */
    LairdModel.prototype.checkCanGetExp = function (playerId) {
        if (playerId === void 0) { playerId = 0; }
        if (this.coolyInfoList && this.coolyInfoList.length > 0) {
            var totalExp = 0;
            var totalCanGetExp = 0;
            for (var i = 0; i < this.coolyInfoList.length; i++) {
                if (playerId != 0 && playerId != this.coolyInfoList[i].id)
                    continue;
                var exp = 0;
                var info = LairdCVO.getExpInfoByLevel(this.coolyInfoList[i].level);
                if (info)
                    exp = info.exp;
                totalExp += Math.floor((this.coolyInfoList[i].freeTimes - this.coolyInfoList[i].catchTimes) / 60) * exp;
                totalCanGetExp += Math.floor((Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) - this.coolyInfoList[i].catchTimes - this.coolyInfoList[i].pickSec) / 60) * exp;
            }
            if (totalCanGetExp > 0 && totalCanGetExp >= totalExp / 24)
                return true;
        }
        return false;
    };
    Object.defineProperty(LairdModel.prototype, "catchCount", {
        /**每日抓捕次数 */
        get: function () {
            return this.catchInfo.value;
        },
        enumerable: true,
        configurable: true
    });
    return LairdModel;
}(egret.EventDispatcher));
__reflect(LairdModel.prototype, "LairdModel");
//# sourceMappingURL=LairdModel.js.map