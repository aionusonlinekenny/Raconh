/**
 *
 * pzx
 * create 2018-3-16
 * 分享CVO
 *
*/
var ShareCVO = /** @class */ (function () {
    function ShareCVO() {
    }
    ShareCVO.prototype.setStatus = function (value) {
        this._status = value == 1;
    };
    Object.defineProperty(ShareCVO.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    ShareCVO.prototype.setReward = function (value) {
        this._isReward = value == 1;
    };
    ShareCVO.prototype.isReward = function () {
        return this._isReward;
    };
    ShareCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        this._cvo = new ShareCVO;
        this._cvo.rewards = bytes.readUTF();
    };
    /**信息 */
    ShareCVO.cvo = function () {
        return this._cvo;
    };
    return ShareCVO;
}());
//# sourceMappingURL=ShareCVO.js.map