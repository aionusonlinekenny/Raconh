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
 * drq
 * 兑换活动 Model
 * 2018.4.19
 */
var ExchangeModel = /** @class */ (function (_super) {
    __extends(ExchangeModel, _super);
    function ExchangeModel() {
        return _super.call(this) || this;
    }
    ExchangeModel.prototype.getData = function (data) {
        var condList = ConditionVO.getVOList(data.limit); //vip等级
        var condValue = condList[0].value;
        var curVip = Manager.model.self.attrInfo.vipLevel;
        var numArr = GainLossVO.parse(data.rewards); //消耗物品
        var num1 = numArr[0].num;
        var num2 = numArr[1].num;
        var cur_num1 = Manager.model.getItems().getCountItemById(numArr[0].baseId);
        var cur_num2;
        if (numArr[1].baseId == 90000001) {
            cur_num2 = Manager.model.self.attrInfo.gold;
        }
        else {
            cur_num2 = Manager.model.getItems().getCountItemById(numArr[1].baseId);
        }
        var any = {};
        any.condValue = condValue; //vip限制条件
        any.curVip = curVip; //当前vip
        any.num1 = num1; //消耗物品1
        any.num2 = num2; //消耗物品2
        any.cur_num1 = cur_num1; //当前物品1
        any.cur_num2 = cur_num2; //当前物品2
        any.itemBaseID = numArr[1].baseId; //识别是否为元宝
        return any;
    };
    ExchangeModel.prototype.checkCoin = function () {
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        var exchangeDay = ExchangeCVO.getServerDay();
        var num = this._endTime;
        var second = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (day <= exchangeDay || second <= 0)
            return false;
        this._cvo = ExchangeCVO.getCvo();
        for (var i = 0; i < this._cvo.length; i++) {
            var list = this._cvo[i];
            var any = this.getData(list);
            if ((list.maxCurent == 0 || list.curCount < list.maxCurent) && any.cur_num1 >= any.num1 && any.cur_num2 >= any.num2 && any.curVip >= any.condValue) {
                return true;
            }
        }
        return false;
    };
    return ExchangeModel;
}(egret.EventDispatcher));
//# sourceMappingURL=ExchangeModel.js.map