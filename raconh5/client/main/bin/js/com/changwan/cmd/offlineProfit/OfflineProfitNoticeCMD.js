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
 *author Anydo
 *create 2017-12-20
 *description
*/
var OfflineProfitNotice = /** @class */ (function (_super) {
    __extends(OfflineProfitNotice, _super);
    function OfflineProfitNotice() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.OFFLINE_PROFIT_NOTICE;
        return _this;
    }
    OfflineProfitNotice.prototype.receive = function (pi) {
        var time = pi.readShort();
        var exp = pi.readInt64();
        var coin = pi.readInt64();
        var zbCount = pi.readShort();
        var rlCount = pi.readShort();
        var qhsCount = pi.readShort();
        Manager.view.show(50 /* OfflineProfitView */, time, exp, coin, zbCount, rlCount, qhsCount);
    };
    return OfflineProfitNotice;
}(BaseCMD));
//# sourceMappingURL=OfflineProfitNoticeCMD.js.map