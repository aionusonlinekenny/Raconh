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
 * liangyan
 * create 2017-12-20
*/
var VipModel = (function (_super) {
    __extends(VipModel, _super);
    function VipModel() {
        var _this = _super.call(this) || this;
        _this._exp = 0;
        _this._exp = 0;
        _this._rewardsStatus = 0;
        return _this;
    }
    Object.defineProperty(VipModel.prototype, "exp", {
        /**当前额度 */
        get: function () { return this._exp; },
        set: function (value) {
            if (this._exp == value)
                return;
            this._exp = value;
            this.dispatchEvent(new VipEvent(VipEvent.EXP_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VipModel.prototype, "rewardsStaturs", {
        set: function (value) {
            if (this._rewardsStatus == value)
                return;
            this._rewardsStatus = value;
            this.dispatchEvent(new VipEvent(VipEvent.REWARDS_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    /**根据vip等级返回奖励状态 */
    VipModel.prototype.getRewardsStatus = function (level) {
        if (Manager.model.self.attrInfo.vipLevel < level)
            return VipRewardsStatus.NOT_REACH;
        var flag = Math.pow(2, level);
        if ((this._rewardsStatus & flag) == flag)
            return VipRewardsStatus.HAS_FETCH;
        else
            return VipRewardsStatus.UN_FETCH;
    };
    Object.defineProperty(VipModel.prototype, "hasCanFatch", {
        get: function () {
            for (var i = 0; i < VipLevelCVO.MAX_LEVEL; i++) {
                if (this.getRewardsStatus(i) == VipRewardsStatus.UN_FETCH)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return VipModel;
}(egret.EventDispatcher));
__reflect(VipModel.prototype, "VipModel");
//# sourceMappingURL=VipModel.js.map