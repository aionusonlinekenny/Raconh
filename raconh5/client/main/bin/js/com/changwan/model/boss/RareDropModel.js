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
 * 珍希掉落
 * create 18.2.1
 * pzx
 */
var RareDropModel = /** @class */ (function (_super) {
    __extends(RareDropModel, _super);
    function RareDropModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 最大显示条数 */
        _this.MAX_NUM = 50;
        return _this;
    }
    RareDropModel.prototype.query = function (arr) {
        this._list = ArrayUtil.sortOn(arr, ["time"], [1]);
        if (this._list.length > this.MAX_NUM) {
            this._list.splice(this.MAX_NUM, this._list.length - 1);
        }
        this.dispatchEvent(new BossEvent(BossEvent.RAREDROP_QUIER_EVENT));
    };
    Object.defineProperty(RareDropModel.prototype, "list", {
        /** 珍希掉落信息列表 */
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    return RareDropModel;
}(egret.EventDispatcher));
//# sourceMappingURL=RareDropModel.js.map