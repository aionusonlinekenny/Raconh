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
 *  取消副本挂机点
 * luzhihong
 * create 2018.3.10
 */
var CopyHookPosCancelCMD = (function (_super) {
    __extends(CopyHookPosCancelCMD, _super);
    function CopyHookPosCancelCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_HOOK_POS;
        return _this;
    }
    CopyHookPosCancelCMD.prototype.receive = function (pi) {
        Manager.model.getAuto().hookPos = null;
        // Manager.model.getAuto().autoHook = false;
    };
    return CopyHookPosCancelCMD;
}(BaseCMD));
__reflect(CopyHookPosCancelCMD.prototype, "CopyHookPosCancelCMD");
//# sourceMappingURL=CopyHookPosCancelCMD.js.map