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
// 邮件列表更新
var MailListCMD = (function (_super) {
    __extends(MailListCMD, _super);
    function MailListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAIL_LIST;
        return _this;
    }
    MailListCMD.prototype.receive = function (pi) {
        Manager.model.getMail().parseList(pi);
    };
    return MailListCMD;
}(BaseCMD));
__reflect(MailListCMD.prototype, "MailListCMD");
//# sourceMappingURL=MailListCMD.js.map