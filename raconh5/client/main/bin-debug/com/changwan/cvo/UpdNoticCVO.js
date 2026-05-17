var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 更新公告
 * 18.3.19
 */
var UpdNoticCVO = (function () {
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
__reflect(UpdNoticCVO.prototype, "UpdNoticCVO");
//# sourceMappingURL=UpdNoticCVO.js.map