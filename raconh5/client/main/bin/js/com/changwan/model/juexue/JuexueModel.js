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
 * 绝学model
 * pzx
 * create 2018-2-26
*/
var JuexueModel = /** @class */ (function (_super) {
    __extends(JuexueModel, _super);
    function JuexueModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ambitLv = 1;
        /** 秘籍例表 */
        _this.esotericaList = [JuexueType.JUEXUE_ESOTERICA_1, JuexueType.JUEXUE_ESOTERICA_2, JuexueType.JUEXUE_ESOTERICA_3, JuexueType.JUEXUE_ESOTERICA_4];
        return _this;
    }
    JuexueModel.prototype.query = function (value) {
        this._ambitLv = value;
        this.dispatchEvent(new JuexueEvent(JuexueEvent.JUEXUE_QUERY_EVENT));
    };
    JuexueModel.prototype.updateAmbitLv = function (value) {
        this._ambitLv = value;
        this.dispatchEvent(new JuexueEvent(JuexueEvent.JUEXUE_AMBIT_EVENT));
    };
    JuexueModel.prototype.returnUpgrade = function (cvo) {
        this.dispatchEvent(new JuexueEvent(JuexueEvent.JUEXUE_UPGRADE_EVENT, cvo));
    };
    Object.defineProperty(JuexueModel.prototype, "ambitLv", {
        /** 境界阶 */
        get: function () {
            return this._ambitLv;
        },
        enumerable: true,
        configurable: true
    });
    /** 检测是否有可升级 */
    JuexueModel.prototype.checkUpgrade = function (type) {
        if (type) {
            var arr = JueXueCVO.getList(type);
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var cvo = arr_1[_i];
                if (cvo.checkUpgrade()) {
                    return true;
                }
            }
        }
        else {
            var obj = JueXueCVO.data();
            for (var key in obj) {
                var cvo = obj[key];
                if (cvo.checkUpgrade()) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 检测是否升级境界 */
    JuexueModel.prototype.checkAmbitLv = function () {
        var cvo = JueXueAmbitCVO.getInfo(this._ambitLv);
        if (cvo.loss == "") {
            return false;
        }
        else {
            var loss = new GainLossVO(cvo.loss);
            return loss.isEnough();
        }
    };
    return JuexueModel;
}(egret.EventDispatcher));
//# sourceMappingURL=JuexueModel.js.map