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
 * 斗地主失败界面
 */
var LandlordResultFail = /** @class */ (function (_super) {
    __extends(LandlordResultFail, _super);
    function LandlordResultFail() {
        return _super.call(this) || this;
    }
    LandlordResultFail.prototype.countDown = function () {
        var left = this.leftTime;
        if (left <= 0) {
            Manager.view.hide(92 /* LandlordResultFail */);
            Manager.control.getLaird().lairdQuit();
            Manager.model.getArena().exitArenaHandler();
            return;
        }
        this._txt.text = LangCVO.getContent("activity2", left);
    };
    LandlordResultFail.prototype.hideView = function () {
        Manager.view.hide(92 /* LandlordResultFail */);
        Manager.control.getLaird().lairdQuit();
        Manager.model.getArena().exitArenaHandler();
    };
    return LandlordResultFail;
}(CopyResultFail));
//# sourceMappingURL=LandlordResultFail.js.map