/**
 * pzx
 * 金蟾聚宝
 * 18.1.18
 */
var CashCowCVO = /** @class */ (function () {
    function CashCowCVO() {
        this._treasureNum = 0;
        /** 已聚宝次数 */
        this._crunt = 0;
    }
    CashCowCVO.prototype.setTreasure = function (value) {
        this._treasureNum = value;
    };
    Object.defineProperty(CashCowCVO.prototype, "truesureNum", {
        /** 可聚宝总次数 */
        get: function () {
            return this._treasureNum;
        },
        enumerable: true,
        configurable: true
    });
    CashCowCVO.prototype.setCrunt = function (value) {
        this._crunt = value;
    };
    Object.defineProperty(CashCowCVO.prototype, "crunt", {
        /** 已聚宝次数 */
        get: function () {
            return this._crunt;
        },
        enumerable: true,
        configurable: true
    });
    CashCowCVO.parse = function (bytes) {
        this._cvo = new CashCowCVO;
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < 1; i++) {
            this._cvo.coin = bytes.readInt();
            this._cvo.coin_up = bytes.readInt();
            this._cvo.gold_need = bytes.readUTF();
        }
    };
    CashCowCVO.getCvo = function () {
        return this._cvo;
    };
    return CashCowCVO;
}());
//# sourceMappingURL=CashCowCVO.js.map