/**
 * 装扮基础信息
 * liangyan
 * create 2017-11-28
*/
var DressBaseCVO = /** @class */ (function () {
    function DressBaseCVO() {
        this._baseAttrCfg = "";
        this._baseAttr = null;
        this.isActived = false;
        this._leftTime = 0;
    }
    Object.defineProperty(DressBaseCVO.prototype, "templateID", {
        get: function () { return this._templateID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DressBaseCVO.prototype, "baseAttr", {
        //附加属性
        get: function () {
            if (this._baseAttr == null)
                this._baseAttr = Manager.pool.create(AttrVO, this._baseAttrCfg);
            return this._baseAttr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DressBaseCVO.prototype, "isTimeLimited", {
        /**是否限时 */
        get: function () {
            return this.time != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DressBaseCVO.prototype, "leftTime", {
        get: function () {
            var t = this._leftTime - (Manager.model.getLogin().serverTimeInfo.serverTime - this._updateTime) / 1000;
            return t > 0 ? t : 0;
        },
        set: function (value) {
            this._leftTime = value;
            this._updateTime = Manager.model.getLogin().serverTimeInfo.serverTime;
        },
        enumerable: true,
        configurable: true
    });
    return DressBaseCVO;
}());
//# sourceMappingURL=DressBaseCVO.js.map