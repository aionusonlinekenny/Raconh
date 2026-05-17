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
 * 新手剧情协议
 * liangyan
 * create 2018-03-14
*/
var RookieStoryCMD = /** @class */ (function (_super) {
    __extends(RookieStoryCMD, _super);
    function RookieStoryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROOKIE_STORY;
        return _this;
    }
    RookieStoryCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        Manager.model.getTask().parseStep(id);
    };
    return RookieStoryCMD;
}(BaseCMD));
//# sourceMappingURL=RookieStoryCMD.js.map