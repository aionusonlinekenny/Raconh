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
 * 魔神降临退出1v1场景
 * liangyan
 * create 2018-04-18
*/
var DevilExitGrabCMD = /** @class */ (function (_super) {
    __extends(DevilExitGrabCMD, _super);
    function DevilExitGrabCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_EXIT_GRAB;
        return _this;
    }
    DevilExitGrabCMD.prototype.receive = function (pi) {
        var isSucc = pi.readByte() == 1;
        if (isSucc)
            Manager.model.getDevil().exitGrabHandler();
    };
    return DevilExitGrabCMD;
}(BaseCMD));
//# sourceMappingURL=DevilExitGrabCMD.js.map