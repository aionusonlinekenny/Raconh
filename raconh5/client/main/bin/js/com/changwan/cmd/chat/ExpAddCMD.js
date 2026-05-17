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
 * 增加经验
 * liangyan
 * create 2017-11-14
*/
var ExpAddCMD = /** @class */ (function (_super) {
    __extends(ExpAddCMD, _super);
    function ExpAddCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EXP_ADD;
        return _this;
    }
    ExpAddCMD.prototype.receive = function (pi) {
        var exp = pi.readInt64();
        var vipExp = pi.readInt64();
    };
    return ExpAddCMD;
}(BaseCMD));
//# sourceMappingURL=ExpAddCMD.js.map