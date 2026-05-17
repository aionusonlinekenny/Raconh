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
 * 经验副本购买次数协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpBuyCountCMD = /** @class */ (function (_super) {
    __extends(CopyExpBuyCountCMD, _super);
    function CopyExpBuyCountCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_BUY_COUNT;
        return _this;
    }
    CopyExpBuyCountCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.type);
    };
    CopyExpBuyCountCMD.prototype.receive = function (pi) {
        // array('name' => 'buy_cnt', 'type' => 'int8', 'desc' => 'vip已购买次数'),
        Manager.model.getCopy().setBuyCount(pi.readShort(), pi.readByte());
    };
    return CopyExpBuyCountCMD;
}(BaseCMD));
//# sourceMappingURL=CopyExpBuyCountCMD.js.map