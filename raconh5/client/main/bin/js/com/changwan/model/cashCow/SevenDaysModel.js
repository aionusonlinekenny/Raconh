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
 * create 18.1.29
 * 七天登陆model
 */
var SevenDaysModel = /** @class */ (function (_super) {
    __extends(SevenDaysModel, _super);
    function SevenDaysModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._day = 1;
        return _this;
    }
    SevenDaysModel.prototype.query = function (act) {
        if (act == 0)
            act = 1;
        this._day = act;
        this.dispatchEvent(new CashCowEvent(CashCowEvent.SEVENDAYS_QUERY_EVENT));
    };
    /** @param reward 1为领成功，，，@param day 领取的天数 */
    SevenDaysModel.prototype.reward = function (reward, day) {
        if (reward == 1) {
            SevenDaysCVO.setState(day, 1);
            this.dispatchEvent(new CashCowEvent(CashCowEvent.SEVENDAYS_REWARD_EVENT, day));
        }
    };
    Object.defineProperty(SevenDaysModel.prototype, "login_day", {
        /** 已登陆的天数 */
        get: function () {
            return this._day;
        },
        enumerable: true,
        configurable: true
    });
    /** 检测是否有奖可领 */
    SevenDaysModel.prototype.checkSeverDaysReward = function () {
        var arr = SevenDaysCVO.getCvos();
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var cvo = arr_1[_i];
            if (cvo.state == 0) {
                if (cvo.isReward()) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 7天奖励是否已领完 */
    SevenDaysModel.prototype.checkSevenDaysHide = function () {
        var arr = SevenDaysCVO.getCvos();
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var cvo = arr_2[_i];
            if (cvo.state == 0) {
                return false;
            }
        }
        return true;
    };
    return SevenDaysModel;
}(egret.EventDispatcher));
//# sourceMappingURL=SevenDaysModel.js.map