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
 * 转生申请协议
 * liangyan
 * create 2017-12-14
*/
var ReinApplyCMD = /** @class */ (function (_super) {
    __extends(ReinApplyCMD, _super);
    function ReinApplyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.REIN_APPLY;
        return _this;
    }
    // protected processOut(pkg:TCPPacketOut):void{}
    ReinApplyCMD.prototype.receive = function (pi) {
        var len = pi.readShort();
        var baseID;
        var bind;
        var count;
        while (len > 0) {
            var baseID_1 = pi.readInt();
            var bind_1 = pi.readByte() == 1;
            var count_1 = pi.readInt();
            len--;
        }
        Manager.model.getRein().dispatchEvent(new ReinEvent(ReinEvent.REIN_APPLY));
    };
    return ReinApplyCMD;
}(BaseCMD));
//# sourceMappingURL=ReinApplyCMD.js.map