var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 邮件常量
var MailConst = (function () {
    function MailConst() {
    }
    /**无附件 */
    MailConst.NO_ATTACH = 0;
    /**未领取 */
    MailConst.UN_FETCH = 1;
    /**已领取 */
    MailConst.HAS_FETCH = 2;
    return MailConst;
}());
__reflect(MailConst.prototype, "MailConst");
//# sourceMappingURL=MailConst.js.map