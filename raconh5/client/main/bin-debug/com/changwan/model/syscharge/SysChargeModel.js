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
 *
 * pzx
 * create 2018-1-3
*/
var SysChargeModel = (function (_super) {
    __extends(SysChargeModel, _super);
    function SysChargeModel() {
        var _this = _super.call(this) || this;
        /** 首充豪礼是否领奖 真为领 */
        _this._isReward = false;
        return _this;
    }
    SysChargeModel.prototype.returnQuery = function (arr) {
        this._fristArr = arr;
        this.dispatchEvent(new SysChargeEvent(SysChargeEvent.SYSCHARGE_QUERY_EVENT));
    };
    Object.defineProperty(SysChargeModel.prototype, "covs", {
        get: function () {
            var list = SysChargeCVO.cvos();
            if (this._fristArr) {
                for (var _i = 0, _a = this._fristArr; _i < _a.length; _i++) {
                    var id = _a[_i];
                    for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                        var info = list_1[_b];
                        if (info.id == id) {
                            info.setFirst();
                        }
                    }
                }
            }
            return list;
        },
        enumerable: true,
        configurable: true
    });
    /** 服务端返回是否领奖*/
    SysChargeModel.prototype.returnIsReward = function (value) {
        this._isReward = value;
        this.dispatchEvent(new FirstChargeEvent(FirstChargeEvent.FIRSTCHARGE_REWARD_EVENT));
        if (value) {
            Manager.view.hide(76 /* FirstChargeView */);
        }
    };
    Object.defineProperty(SysChargeModel.prototype, "isReward", {
        get: function () {
            return this._isReward;
        },
        enumerable: true,
        configurable: true
    });
    return SysChargeModel;
}(egret.EventDispatcher));
__reflect(SysChargeModel.prototype, "SysChargeModel");
//# sourceMappingURL=SysChargeModel.js.map