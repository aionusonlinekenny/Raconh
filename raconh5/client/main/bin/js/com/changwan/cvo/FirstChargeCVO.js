/**
 * 充值豪礼
 * pzx
 * 18.1.8
 */
var FirstChargeCVO = /** @class */ (function () {
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
//# sourceMappingURL=FirstChargeCVO.js.map