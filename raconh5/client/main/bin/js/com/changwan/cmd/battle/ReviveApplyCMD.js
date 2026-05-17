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
 * 人物请求复活协议
 * liangyan
 * create 2017-12-06
*/
var ReviveApplyCMD = /** @class */ (function (_super) {
    __extends(ReviveApplyCMD, _super);
    function ReviveApplyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.REVIVE_APPLY;
        return _this;
    }
    ReviveApplyCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    ReviveApplyCMD.prototype.receive = function (pi) {
        var result = pi.readByte() == 1;
        if (result) {
            if (Manager.view.isOpening(35 /* ReviveChooseView */))
                Manager.view.hide(35 /* ReviveChooseView */);
            else if (Manager.view.isOpening(34 /* ReviveCDView */))
                Manager.view.hide(34 /* ReviveCDView */);
        }
    };
    return ReviveApplyCMD;
}(BaseCMD));
//# sourceMappingURL=ReviveApplyCMD.js.map