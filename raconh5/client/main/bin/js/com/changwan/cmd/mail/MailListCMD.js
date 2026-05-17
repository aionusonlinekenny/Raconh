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
var MailListCMD = /** @class */ (function (_super) {
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
//# sourceMappingURL=MailListCMD.js.map