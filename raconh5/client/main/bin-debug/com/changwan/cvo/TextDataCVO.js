var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextDataCVO = (function () {
    function TextDataCVO() {
    }
    TextDataCVO.parse = function (bytes) {
        TextDataCVO.cvos = {};
        MailContentCVO.cvos = {};
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < tableCount; i++) {
            cvo = new TextDataCVO();
            cvo.parseOne(bytes);
            TextDataCVO.cvos[cvo.id] = cvo;
        }
        var mailCount = bytes.readShort();
        var mailCvo;
        for (var j = 0; j < mailCount; j++) {
            mailCvo = new MailContentCVO();
            mailCvo.parse(bytes);
            MailContentCVO.cvos[mailCvo.id] = mailCvo;
        }
    };
    TextDataCVO.prototype.parseOne = function (datas) {
        this.id = datas.readShort();
        this.content = datas.readUTF();
        this.showLvl = datas.readShort();
        this.position = datas.readByte();
    };
    TextDataCVO.getCVO = function (id) {
        if (TextDataCVO.cvos == null)
            return null;
        return TextDataCVO.cvos[id];
    };
    return TextDataCVO;
}());
__reflect(TextDataCVO.prototype, "TextDataCVO");
//# sourceMappingURL=TextDataCVO.js.map