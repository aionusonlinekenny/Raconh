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
 * 缥缈录警告提示
 * Simon
 * create 2018.4.17
 */
var MaterialCopyWarningCMD = (function (_super) {
    __extends(MaterialCopyWarningCMD, _super);
    function MaterialCopyWarningCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_WARNING_TIP;
        return _this;
    }
    MaterialCopyWarningCMD.prototype.receive = function (pi) {
        var time = pi.readShort();
        Manager.view.show(152 /* MaterialWarningView */, time * 1000);
    };
    return MaterialCopyWarningCMD;
}(BaseCMD));
__reflect(MaterialCopyWarningCMD.prototype, "MaterialCopyWarningCMD");
//# sourceMappingURL=MaterialCopyWarningCMD.js.map