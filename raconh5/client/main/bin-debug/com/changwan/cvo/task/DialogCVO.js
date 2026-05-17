var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * luzh
 * 2018.2.11
 * 对话表
 */
var DialogCVO = (function () {
    function DialogCVO() {
    }
    DialogCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < tableCount; i++) {
            cvo = new DialogCVO();
            cvo.id = bytes.readInt();
            cvo.head = bytes.readInt();
            cvo.dic = bytes.readByte();
            cvo.nameRes = bytes.readUTF();
            cvo.description = bytes.readUTF();
            cvo.sort = bytes.readByte();
            cvo.time = bytes.readInt();
            if (this._cvos[cvo.id] == null)
                this._cvos[cvo.id] = new Array();
            this._cvos[cvo.id].push(cvo);
        }
    };
    DialogCVO.getCVOs = function (id) {
        return this._cvos[id];
    };
    DialogCVO._cvos = {};
    return DialogCVO;
}());
__reflect(DialogCVO.prototype, "DialogCVO");
//# sourceMappingURL=DialogCVO.js.map