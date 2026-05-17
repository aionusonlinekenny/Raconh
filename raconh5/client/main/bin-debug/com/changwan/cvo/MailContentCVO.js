var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 邮件内容模板表
 * liangyan
 * create 2017-11-24
*/
var MailContentCVO = (function () {
    function MailContentCVO() {
    }
    MailContentCVO.prototype.parse = function (bytes) {
        this.id = bytes.readInt();
        this.title = bytes.readUTF();
        this.content = bytes.readUTF();
    };
    MailContentCVO.getCVO = function (id) {
        if (MailContentCVO.cvos == null)
            return null;
        return MailContentCVO.cvos[id];
    };
    return MailContentCVO;
}());
__reflect(MailContentCVO.prototype, "MailContentCVO");
//# sourceMappingURL=MailContentCVO.js.map