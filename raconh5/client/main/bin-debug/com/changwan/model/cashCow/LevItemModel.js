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
 * 18.1.25
 * 冲级好礼model
 */
var LevItemModel = (function (_super) {
    __extends(LevItemModel, _super);
    function LevItemModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._is_activited = 0;
        return _this;
    }
    LevItemModel.prototype.query = function (act) {
        this._is_activited = act;
        this.dispatchEvent(new CashCowEvent(CashCowEvent.LEVITEM_QUERY_EVENT));
    };
    LevItemModel.prototype.reward = function (id) {
        this.dispatchEvent(new CashCowEvent(CashCowEvent.LEVITEM_UPDATE_EVENT, id));
    };
    Object.defineProperty(LevItemModel.prototype, "is_activited", {
        /** 是否激活钻石特权 */
        get: function () {
            return this._is_activited;
        },
        enumerable: true,
        configurable: true
    });
    LevItemModel.prototype.checkReward = function () {
        var arr = LevItemCVO.getCvos();
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (item.checkReward()) {
                return true;
            }
        }
        return false;
    };
    /** 检测是否已全部领完奖励 领完或者已经没有次数,则图标消失*/
    LevItemModel.prototype.checkTotalRaward = function () {
        var arr = LevItemCVO.getCvos();
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var cvo = arr_2[_i];
            if (cvo.totalNum > 0 && cvo.num < 1) {
                return false;
            }
        }
        return true;
    };
    return LevItemModel;
}(egret.EventDispatcher));
__reflect(LevItemModel.prototype, "LevItemModel");
//# sourceMappingURL=LevItemModel.js.map