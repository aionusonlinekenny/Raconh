/**
 * 显示天天返利图标
 * */
var DailyRebate = /** @class */ (function () {
    function DailyRebate() {
        this._visible = false;
    }
    DailyRebate.prototype.switch = function (visible) {
        visible = visible && !Manager.model.getdailyRebate().checkCompleteReward() && Manager.model.getSysCharge().isReward;
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (!visible) {
            if (this._dailyrebateIcon != null) {
                this._dailyrebateIcon.dispose();
                this._dailyrebateIcon = null;
            }
            Manager.model.getdailyRebate().drawTime();
        }
        else {
            if (!this._dailyrebateIcon) {
                var cvo = DailyActivityCVO.getCVO(ActIconID.DAILYREBATE);
                this._dailyrebateIcon = new DailyRebateIcon2();
                this._dailyrebateIcon.setID(cvo.id);
                this._dailyrebateIcon.move(39, 580);
            }
        }
    };
    return DailyRebate;
}());
//# sourceMappingURL=DailyRebate.js.map