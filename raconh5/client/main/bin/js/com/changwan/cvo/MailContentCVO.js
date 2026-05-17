/**
 * 邮件内容模板表
 * liangyan
 * create 2017-11-24
*/
var MailContentCVO = /** @class */ (function () {
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
//# sourceMappingURL=MailContentCVO.js.map