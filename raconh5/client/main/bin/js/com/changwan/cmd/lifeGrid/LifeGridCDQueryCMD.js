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
 * pzx
 * 17.11.18
 * 查询免费倒计时CD
 *  */
var LifeGridCDQueryCMD = /** @class */ (function (_super) {
    __extends(LifeGridCDQueryCMD, _super);
    function LifeGridCDQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LIFEGRID_INFO;
        return _this;
    }
    LifeGridCDQueryCMD.prototype.receive = function (ip) {
        var cd = ip.readInt();
        Manager.model.getLifeGrid().returnqueryCd(cd);
    };
    return LifeGridCDQueryCMD;
}(BaseCMD));
//# sourceMappingURL=LifeGridCDQueryCMD.js.map