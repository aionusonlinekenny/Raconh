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
 * 18.1.15
 * 投资model
 */
var SysInvestModel = /** @class */ (function (_super) {
    __extends(SysInvestModel, _super);
    function SysInvestModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 激活介格例表 保存的介格代已激活
        */
        _this._actList = [];
        return _this;
    }
    SysInvestModel.prototype.queryList = function (ip) {
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var type = ip.readShort();
            this._actList.push("" + type);
        }
        this.sysList(ip);
    };
    /**更新 */
    SysInvestModel.prototype.sysList = function (ip) {
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte();
            var state = ip.readByte();
            SysInvestCVO.setState(id, state);
        }
        this.dispatchEvent(new SysInvestEvent(SysInvestEvent.SYSINVEST_UPDATE_EVENT));
    };
    SysInvestModel.prototype.isActive = function (price) {
        for (var _i = 0, _a = this._actList; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == price) {
                return true;
            }
        }
        return false;
    };
    /** 检测是否有奖励可领 */
    SysInvestModel.prototype.checkReward = function (price) {
        if (this.isActive(price)) {
            var arr = SysInvestCVO.getCvos(price);
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var cvo = arr_1[_i];
                if (cvo.state != 1 && cvo.isReward()) {
                    return true;
                }
            }
        }
        return false;
    };
    return SysInvestModel;
}(egret.EventDispatcher));
//# sourceMappingURL=SysInvestModel.js.map