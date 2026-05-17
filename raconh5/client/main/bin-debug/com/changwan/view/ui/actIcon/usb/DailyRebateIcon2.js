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
 * 天天返利活动图标
 * pzx
 * create 2018-3-15
*/
var DailyRebateIcon2 = (function (_super) {
    __extends(DailyRebateIcon2, _super);
    function DailyRebateIcon2() {
        return _super.call(this, Manager.layer.iconImageLayer, Manager.layer.homeImageLayer, Manager.layer.homeLayer) || this;
    }
    DailyRebateIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getdailyRebate().addEventListener(DailyRebateEvent.DAILYREBATE_UPDATE, this.__drawRed, this);
    };
    DailyRebateIcon2.prototype.removeEvent = function () {
        Manager.model.getdailyRebate().removeEventListener(DailyRebateEvent.DAILYREBATE_UPDATE, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    DailyRebateIcon2.prototype.__drawRed = function (e) {
        if (Manager.model.getdailyRebate().checkCompleteReward()) {
            Manager.model.getLogin().home.switch(HomeView2.DAILY, true);
        }
        else {
            this.invalidate("checkRedIcon");
        }
    };
    DailyRebateIcon2.prototype.hasRedIcon = function () {
        return Manager.model.getdailyRebate().checkReward();
    };
    return DailyRebateIcon2;
}(ActBaseIcon2));
__reflect(DailyRebateIcon2.prototype, "DailyRebateIcon2");
//# sourceMappingURL=DailyRebateIcon2.js.map