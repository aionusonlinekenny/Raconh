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
 * 天天返利Model
 * pzx
 * create 2018-3-14
 */
var DailyRebateModel = (function (_super) {
    __extends(DailyRebateModel, _super);
    function DailyRebateModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 今日充值总额 */
        _this._money = 0;
        return _this;
    }
    DailyRebateModel.prototype.query = function (nomey, any) {
        // array('name'=>'list', 'type'=>'arr', 'tuple'=>'true', 'desc'=>'领取奖励列表', 'vars'=>array(
        //             array('name'=>'amount', 'type'=>'int16', 'desc'=>'额度'),
        //             array('name'=>'isRewarded', 'type'=>'int8', 'desc'=>'是否已领取奖励 0-否 1-是'),
        //         )),
        this._money = nomey;
        this.updateToDayData();
        this.reward(any);
        if (this._list)
            Manager.model.getLogin().home.switch(HomeView2.DAILY, !this.checkCompleteReward());
    };
    DailyRebateModel.prototype.reward = function (any) {
        if (!this._list)
            return;
        for (var key in any) {
            var cvo = this._list[key];
            if (cvo) {
                cvo.setCharge();
                if (any[key] == 1) {
                    cvo.setReward();
                }
            }
        }
        this.dispatchEvent(new DailyRebateEvent(DailyRebateEvent.DAILYREBATE_UPDATE));
    };
    Object.defineProperty(DailyRebateModel.prototype, "money", {
        /** 今日充值总额 */
        get: function () {
            return this._money;
        },
        enumerable: true,
        configurable: true
    });
    /** 刷新今天的活动列表 */
    DailyRebateModel.prototype.updateToDayData = function () {
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        this._list = DailyRebateCVO.getcovs(day);
    };
    DailyRebateModel.prototype.getList = function () {
        if (!this._list)
            this.updateToDayData();
        return this._list;
    };
    /** 检测是否有奖励 */
    DailyRebateModel.prototype.checkReward = function () {
        if (!this._list)
            return;
        for (var key in this._list) {
            var cvo = this._list[key];
            if (cvo.checkReward()) {
                return true;
            }
        }
        return false;
    };
    /**检测当天奖励是否已领完 */
    DailyRebateModel.prototype.checkCompleteReward = function () {
        for (var key in this._list) {
            var cvo = this._list[key];
            if (!cvo.isReward) {
                return false;
            }
        }
        return true;
    };
    DailyRebateModel.prototype.drawTime = function () {
        var second = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        var nowDate = cw.DateUtil.getDateBySecs(second);
        var updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 23, 59, 59); //取当天0时
        this._endTime = Math.round(updateData.getTime() / 1000) + 2;
        Manager.render.add(this.countdown, this, 60000);
    };
    DailyRebateModel.prototype.countdown = function () {
        var second = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            Manager.control.getdailyRebate().query();
            Manager.render.remove(this.countdown, this);
            return;
        }
    };
    return DailyRebateModel;
}(egret.EventDispatcher));
__reflect(DailyRebateModel.prototype, "DailyRebateModel");
//# sourceMappingURL=DailyRebateModel.js.map