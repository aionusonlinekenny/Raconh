var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 火眼金睛物品数据
 * liangyan
 * create 2018-03-26
*/
var FireEyeGoodsData = (function () {
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
__reflect(FireEyeGoodsData.prototype, "FireEyeGoodsData");
//# sourceMappingURL=FireEyeGoodsData.js.map