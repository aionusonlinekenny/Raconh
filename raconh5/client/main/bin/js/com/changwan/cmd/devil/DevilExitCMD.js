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
 * 退出魔神降临地图
 * liangyan
 * create 2018-04-10
*/
var DevilExitCMD = /** @class */ (function (_super) {
    __extends(DevilExitCMD, _super);
    function DevilExitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_EXIT;
        return _this;
    }
    DevilExitCMD.prototype.receive = function (pi) {
        var isSucc = pi.readByte() == 1;
        if (isSucc)
            Manager.view.hide(143 /* DevilGrabListView */);
    };
    return DevilExitCMD;
}(BaseCMD));
//# sourceMappingURL=DevilExitCMD.js.map