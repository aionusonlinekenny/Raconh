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
 * 兑换活动 兑换cmd
 * 2018.4.19
 */
var ExchangeCMD = /** @class */ (function (_super) {
    __extends(ExchangeCMD, _super);
    function ExchangeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_EXCHANGE;
        return _this;
    }
    ExchangeCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this._id); //活动id
    };
    ExchangeCMD.prototype.receive = function (pi) {
        var id = pi.readByte(); //活动id
        this._cvo = ExchangeCVO.getCvo();
        for (var j = 0; j < this._cvo.length; j++) {
            if (id == this._cvo[j].id) {
                this._cvo[j].curCount += 1;
                break;
            }
        }
        Manager.model.getExchange().dispatchEvent(new ExchangeEvent(ExchangeEvent.EXCHANGE_UPDATE));
    };
    return ExchangeCMD;
}(BaseCMD));
//# sourceMappingURL=ExchangeCMD.js.map