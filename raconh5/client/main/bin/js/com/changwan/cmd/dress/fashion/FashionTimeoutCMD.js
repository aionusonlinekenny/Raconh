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
 * 服饰过期
 * luzh
 * create 2017-12-19
*/
var FashionTimeoutCMD = /** @class */ (function (_super) {
    __extends(FashionTimeoutCMD, _super);
    function FashionTimeoutCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FASHION_TIMEOUT;
        return _this;
    }
    FashionTimeoutCMD.prototype.receive = function (pi) {
        // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID'),
        // array('name'=>'valid', 'type'=>'int32', 'desc'=>'有效时间戳'),
        var id = pi.readShort();
        var cvo = FashionCVO.getCVO(id);
        if (cvo)
            cvo.setTimeAndStar(pi.readInt(), cvo.star);
    };
    return FashionTimeoutCMD;
}(BaseCMD));
//# sourceMappingURL=FashionTimeoutCMD.js.map