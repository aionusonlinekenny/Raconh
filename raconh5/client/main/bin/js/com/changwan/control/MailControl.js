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
// 邮件控制器
var MailControl = /** @class */ (function (_super) {
    __extends(MailControl, _super);
    function MailControl() {
        return _super.call(this) || this;
    }
    MailControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.MAIL_LIST, MailListCMD);
        Manager.socket.addCMD(Protocol.MAIL_RECEIVE, MailReceiveCMD);
        Manager.socket.addCMD(Protocol.MAIL_DELETE, MailDeleteCMD);
        Manager.socket.addCMD(Protocol.MAIL_READ, MailReadCMD);
        Manager.socket.addCMD(Protocol.MAIL_FETCH, MailFetchCMD);
        Manager.socket.addCMD(Protocol.MAIL_ALL_FETCH, MailAllFetchCMD);
    };
    //请求邮件
    MailControl.prototype.mailListRequest = function () {
        var cmd = Manager.socket.getCMD(Protocol.MAIL_LIST);
        cmd.send();
    };
    /**设置邮件状态为已读 */
    MailControl.prototype.mailRead = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.MAIL_READ);
        cmd.uniqueID = id;
        cmd.send();
    };
    /**领取指定邮件中的附件 */
    MailControl.prototype.mailFetch = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.MAIL_FETCH);
        cmd.uniqueID = id;
        cmd.send();
    };
    /**领取所有附件 */
    MailControl.prototype.mailAllFetch = function () {
        var cmd = Manager.socket.getCMD(Protocol.MAIL_ALL_FETCH);
        cmd.send();
    };
    return MailControl;
}(BaseControl));
//# sourceMappingURL=MailControl.js.map