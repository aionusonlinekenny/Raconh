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
 * 银币副本buff时间
 * luzhihong
 * create 2018.1.20
 */
var CopyBuffUnlockCMD = (function (_super) {
    __extends(CopyBuffUnlockCMD, _super);
    function CopyBuffUnlockCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_BUFF_UNLOCK;
        return _this;
    }
    CopyBuffUnlockCMD.prototype.receive = function (pi) {
        var totalTime = pi.readByte();
        var endTime = pi.readInt();
        var left = endTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (left)
            Manager.view.show(85 /* CopyBuffUnlockView */, left, totalTime);
        else
            Manager.view.hide(85 /* CopyBuffUnlockView */);
    };
    return CopyBuffUnlockCMD;
}(BaseCMD));
__reflect(CopyBuffUnlockCMD.prototype, "CopyBuffUnlockCMD");
//# sourceMappingURL=CopyBuffUnlockCMD.js.map