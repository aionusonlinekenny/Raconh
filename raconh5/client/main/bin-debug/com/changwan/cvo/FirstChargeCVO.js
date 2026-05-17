var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 充值豪礼
 * pzx
 * 18.1.8
 */
var FirstChargeCVO = (function () {
    function FirstChargeCVO() {
    }
    FirstChargeCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            this._cvo = new FirstChargeCVO();
            this._cvo.rewards = bytes.readUTF();
            this._cvo.modelId = bytes.readUTF();
            this._cvo.effect = bytes.readUTF();
        }
    };
    FirstChargeCVO.cvo = function () {
        return this._cvo;
    };
    return FirstChargeCVO;
}());
__reflect(FirstChargeCVO.prototype, "FirstChargeCVO");
//# sourceMappingURL=FirstChargeCVO.js.map