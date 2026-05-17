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
 * 副本结束时间协议
 * luzhihong
 * create 2017.12.25
 */
var CopyEndTimeCMD = /** @class */ (function (_super) {
    __extends(CopyEndTimeCMD, _super);
    function CopyEndTimeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_END_TIME;
        return _this;
    }
    CopyEndTimeCMD.prototype.receive = function (pi) {
        var id = pi.readInt();
        var endTime = pi.readInt();
        var cvo = CopyCVO.getCVO(id);
        if (cvo)
            cvo.endTime = endTime;
    };
    return CopyEndTimeCMD;
}(BaseCMD));
//# sourceMappingURL=CopyEndTimeCMD.js.map