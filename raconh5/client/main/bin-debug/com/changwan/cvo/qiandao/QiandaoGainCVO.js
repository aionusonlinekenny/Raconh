var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * drq
 * 签到奖励 CVO
 * 2018.3.22
 */
var QiandaoGainCVO = (function () {
    function QiandaoGainCVO() {
    }
    QiandaoGainCVO.parse = function (bytes) {
        this._cvo = [];
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new QiandaoGainCVO();
            item.id = bytes.readByte();
            item.day = bytes.readInt();
            item.gain = bytes.readUTF();
            item.reward = bytes.readUTF();
            item.isGet = false;
            this._cvo.push(item);
        }
    };
    QiandaoGainCVO.getCvos = function () {
        return this._cvo;
    };
    return QiandaoGainCVO;
}());
__reflect(QiandaoGainCVO.prototype, "QiandaoGainCVO");
//# sourceMappingURL=QiandaoGainCVO.js.map