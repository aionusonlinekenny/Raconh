var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 七天登陆
 * 18.1.29
 */
var SevenDaysCVO = (function () {
    function SevenDaysCVO() {
        this._state = 0;
    }
    SevenDaysCVO.prototype.setState = function (value) {
        this._state = value;
    };
    Object.defineProperty(SevenDaysCVO.prototype, "state", {
        /** 是否领取 1已领 */
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    /** 是否可领 true 可领取*/
    SevenDaysCVO.prototype.isReward = function () {
        return this.login_day_id <= Manager.model.getcashCow().sevenDaysModel.login_day;
    };
    SevenDaysCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new SevenDaysCVO();
            item.login_day_id = bytes.readByte();
            item.rewards = bytes.readUTF();
            item.fightNum = bytes.readInt();
            this._cvos.push(item);
        }
    };
    SevenDaysCVO.getCvos = function () {
        return this._cvos;
    };
    SevenDaysCVO.getcvo = function (id) {
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.login_day_id == id) {
                return cvo;
            }
        }
    };
    SevenDaysCVO.setState = function (login_day_id, state) {
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.login_day_id == login_day_id) {
                cvo.setState(state);
            }
        }
    };
    return SevenDaysCVO;
}());
__reflect(SevenDaysCVO.prototype, "SevenDaysCVO");
//# sourceMappingURL=SevenDaysCVO.js.map