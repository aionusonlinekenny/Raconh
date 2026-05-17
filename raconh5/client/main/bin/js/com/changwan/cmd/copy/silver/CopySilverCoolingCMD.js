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
 * 银币副本冷却时间
 * luzhihong
 * create 2018.1.20
 */
var CopySilverCoolingCMD = /** @class */ (function (_super) {
    __extends(CopySilverCoolingCMD, _super);
    function CopySilverCoolingCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_SILVER_COOLING;
        return _this;
    }
    CopySilverCoolingCMD.prototype.receive = function (pi) {
        // array('name' => 'coin_enter_ts', 'type' => 'int32', 'desc' => '时间戳'),
        Manager.model.getCopy().silverModel.cd = pi.readInt();
    };
    return CopySilverCoolingCMD;
}(BaseCMD));
//# sourceMappingURL=CopySilverCoolingCMD.js.map