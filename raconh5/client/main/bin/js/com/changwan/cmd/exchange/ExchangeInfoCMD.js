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
 * 兑换活动 初始信息cmd
 * 2018.4.19
 */
var ExchangeInfoCMD = /** @class */ (function (_super) {
    __extends(ExchangeInfoCMD, _super);
    function ExchangeInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_EXCHANGE_INFO;
        return _this;
    }
    ExchangeInfoCMD.prototype.receive = function (pi) {
        this._model = Manager.model.getExchange();
        this._cvo = ExchangeCVO.getCvo();
        var end_ts = pi.readInt(); //结束时间戳
        this._model._endTime = end_ts;
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var id = pi.readByte(); //活动id
            var count = pi.readShort(); //领取次数
            for (var j = 0; j < this._cvo.length; j++) {
                if (id == this._cvo[j].id) {
                    this._cvo[j].curCount = this._cvo[j].maxCurent - count;
                    break;
                }
            }
        }
    };
    return ExchangeInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ExchangeInfoCMD.js.map