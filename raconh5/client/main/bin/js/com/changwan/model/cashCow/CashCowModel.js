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
 * 18.1.18
 * 金蟾model
 */
var CashCowModel = /** @class */ (function (_super) {
    __extends(CashCowModel, _super);
    function CashCowModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否激活白金卡 */
        _this._isActive = 0;
        //实际领免费的次数
        _this._rewardnum = 0;
        /** 领奖cd间隔 */
        _this.TIME_CD = 25200;
        _this.levItemModel = new LevItemModel();
        _this.sevenDaysModel = new SevenDaysModel();
        return _this;
    }
    /** time 上次聚宝时间， draw 可聚宝总次数，，current已聚宝次数 ,isActive是否激活白金卡*/
    CashCowModel.prototype.returnCashCowInfo = function (time, draw, current, isActive, num) {
        if (this._cvo == null) {
            this._cvo = CashCowCVO.getCvo();
        }
        this._lasTime = time;
        this._isActive = isActive;
        this._rewardnum = num;
        this._cvo.setTreasure(draw);
        this._cvo.setCrunt(current);
        this.dispatchEvent(new CashCowEvent(CashCowEvent.CASHCOW_UPDATE_EVENT));
    };
    /** 领奖返回 time 上次聚宝时间,为0时是用元宝领取，大于0是免费时间刷新*/
    CashCowModel.prototype.rewardUpdateInfo = function (time, draw, current, num) {
        if (time != 0) {
            this._lasTime = time;
        }
        this._rewardnum = num;
        this._cvo.setTreasure(draw);
        this._cvo.setCrunt(current);
        this.dispatchEvent(new CashCowEvent(CashCowEvent.CASHCOW_UPDATE_EVENT));
    };
    Object.defineProperty(CashCowModel.prototype, "cvo", {
        get: function () {
            if (this._cvo == null) {
                this._cvo = CashCowCVO.getCvo();
            }
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CashCowModel.prototype, "lasTime", {
        /** 上次聚宝时间 时间戳 秒 */
        get: function () {
            return this._lasTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CashCowModel.prototype, "isActive", {
        /**是否激活白金卡 */
        get: function () {
            return this._isActive == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CashCowModel.prototype, "rewardnum", {
        /** 实际领免费的次数 */
        get: function () {
            return this._rewardnum;
        },
        enumerable: true,
        configurable: true
    });
    /** 检测是否已到领奖cd */
    CashCowModel.prototype.checkRewardCd = function () {
        var second = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this._lasTime);
        if (second >= this.TIME_CD) {
            return true;
        }
    };
    return CashCowModel;
}(egret.EventDispatcher));
//# sourceMappingURL=CashCowModel.js.map