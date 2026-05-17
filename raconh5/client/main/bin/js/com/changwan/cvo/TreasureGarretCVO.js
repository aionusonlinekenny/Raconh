/**
 * pzx
 * 珍宝阁
 * 18.2.3
 */
var TreasureGarretCVO = /** @class */ (function () {
    function TreasureGarretCVO() {
    }
    TreasureGarretCVO.parse = function (bytes) {
        this._cvos = [];
        this._max_count = 0;
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new TreasureGarretCVO();
            item.loss = bytes.readUTF();
            var n = bytes.readByte();
            item.count = n;
            this._cvos.push(item);
            if (this._max_count < n) {
                this._max_count = n;
            }
        }
    };
    Object.defineProperty(TreasureGarretCVO, "max_count", {
        /** 最大刷新次数 */
        get: function () {
            return this._max_count;
        },
        enumerable: true,
        configurable: true
    });
    TreasureGarretCVO.getCvo = function (count) {
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.count == count)
                return cvo;
        }
    };
    return TreasureGarretCVO;
}());
//# sourceMappingURL=TreasureGarretCVO.js.map