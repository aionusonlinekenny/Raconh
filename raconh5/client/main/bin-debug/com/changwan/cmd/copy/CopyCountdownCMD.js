var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 副本倒计时协议
 * luzhihong
 * create 2018.1.12
 */
var CopyCountdownCMD = (function (_super) {
    __extends(CopyCountdownCMD, _super);
    function CopyCountdownCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_COUNT_DOWN;
        return _this;
    }
    CopyCountdownCMD.prototype.receive = function (pi) {
        var endTime = pi.readInt();
        Manager.view.show(75 /* CopyCountDownView */, endTime);
    };
    return CopyCountdownCMD;
}(BaseCMD));
__reflect(CopyCountdownCMD.prototype, "CopyCountdownCMD");
//# sourceMappingURL=CopyCountdownCMD.js.map