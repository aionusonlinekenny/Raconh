/**
 * 火眼金睛物品数据
 * liangyan
 * create 2018-03-26
*/
var FireEyeGoodsData = /** @class */ (function () {
    function FireEyeGoodsData() {
    }
    Object.defineProperty(FireEyeGoodsData.prototype, "cvoID", {
        set: function (value) {
            if (this._cvoID == value)
                return;
            this._cvoID = value;
            this._cvo = FireEyeItemCVO.getCVOByID(this._cvoID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireEyeGoodsData.prototype, "cvo", {
        /**表数据 */
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    return FireEyeGoodsData;
}());
//# sourceMappingURL=FireEyeGoodsData.js.map