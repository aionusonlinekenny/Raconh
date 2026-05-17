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
// 邮件事件
var MailEvent = (function (_super) {
    __extends(MailEvent, _super);
    function MailEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新邮件列表
     */
    MailEvent.UPDATE_LIST = "UPDATE_LIST";
    /**
     * 推送新邮件
     */
    MailEvent.MAIL_RECEIVE = "MAIL_RECEIVE";
    /**
     * 删除邮件
     */
    MailEvent.MAIL_DELETE = "MAIL_DELETE";
    /**
     * 邮件已读
     */
    MailEvent.HAS_READ_MAIL = "HAS_READ_MAIL";
    /**
     * 领取指定邮件中的附件
     */
    MailEvent.FETCH_ATTACH = "FETCH_ATTACH";
    /**
     * 隐藏/显示邮件提醒标志
     */
    MailEvent.HIDE_SHOW_NOTICE = "HIDE_SHOW_NOTICE";
    /**
     * 一键领取邮件
     */
    MailEvent.MAIL_ALL_FETCH = "MAIL_ALL_FETCH";
    return MailEvent;
}(BaseEvent));
__reflect(MailEvent.prototype, "MailEvent");
//# sourceMappingURL=MailEvent.js.map