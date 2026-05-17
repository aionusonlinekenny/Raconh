/**
 * pzx
 * 更新公告
 * 18.3.19
 */
var UpdNoticCVO = /** @class */ (function () {
    function UpdNoticCVO() {
    }
    UpdNoticCVO.prototype.setReward = function (value) {
        this._isReward = value == 1;
    };
    Object.defineProperty(UpdNoticCVO.prototype, "isReward", {
        /** 是否已领取奖励 */
        get: function () {
            return this._isReward;
        },
        enumerable: true,
        configurable: true
    });
    UpdNoticCVO.parse = function (bytes) {
        this._cvo = new UpdNoticCVO;
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        this._cvo.rewards = bytes.readUTF();
        this._cvo.content = bytes.readUTF();
    };
    UpdNoticCVO.cvo = function () {
        return this._cvo;
    };
    return UpdNoticCVO;
}());
//# sourceMappingURL=UpdNoticCVO.js.map