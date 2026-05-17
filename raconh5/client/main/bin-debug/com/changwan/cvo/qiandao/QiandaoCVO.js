var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * drq
 * 签到 CVO
 * 2018.3.21
 */
var QiandaoCVO = (function () {
    function QiandaoCVO() {
    }
    QiandaoCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new QiandaoCVO();
            item.id = bytes.readByte();
            item.days = bytes.readInt();
            item.gain = bytes.readUTF();
            item.extra = bytes.readUTF();
            item.consume = bytes.readUTF();
            this._cvos.push(item);
        }
        QiandaoGainCVO.parse(bytes);
    };
    QiandaoCVO.getCvo = function () {
        return this._cvos;
    };
    return QiandaoCVO;
}());
__reflect(QiandaoCVO.prototype, "QiandaoCVO");
//# sourceMappingURL=QiandaoCVO.js.map