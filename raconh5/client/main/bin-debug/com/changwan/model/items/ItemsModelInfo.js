var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemsModelInfo = (function () {
    function ItemsModelInfo() {
        this.infoList = [];
        /** 存储空间  0为没有得到的物品，1在装备，2在背包，3 仓库*/
        this.storagetype = 0;
        /** 转生等级 */
        this.turnLevel = 0;
        /** 等级 */
        this.level = 0;
        /**
         * 强化等级
         */
        this.strengthenLevel = 0;
        /** 上次计算战力的属性版本号 */
        this.attrVersion = 0;
        /** _attrVersion版本对应计算的战力值 */
        this.fight = 0;
    }
    Object.defineProperty(ItemsModelInfo.prototype, "base_id", {
        get: function () { return this._base_id; },
        set: function (value) {
            if (this._base_id == value)
                return;
            this._base_id = value;
            if (Number(String(this._base_id).substr(2, 1)) == 0)
                this.level = Number(String(this._base_id).substr(3, 2)) * 10;
            else if (Number(String(this._base_id).substr(2, 1)) == 1)
                this.turnLevel = Number(String(this._base_id).substr(3, 2));
            this._cvo = ItemsCVO.getCvo(this._base_id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsModelInfo.prototype, "cvo", {
        get: function () { return this._cvo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsModelInfo.prototype, "career", {
        /**
         * 职业
         */
        get: function () {
            return Number(String(this.base_id).substr(1, 1));
        },
        enumerable: true,
        configurable: true
    });
    ItemsModelInfo.prototype.getStar = function () {
        var i = 0;
        var jipinfo;
        var inArr = [];
        for (var jip = 0; jip < this.infoList.length; jip++) {
            jipinfo = this.infoList[jip];
            if (jipinfo.type == 1) {
                //1为极品属性
                inArr.push(jipinfo);
            }
        }
        var jipVO;
        for (var _i = 0, inArr_1 = inArr; _i < inArr_1.length; _i++) {
            var info = inArr_1[_i];
            jipVO = Manager.pool.create(AttrVO, info.target + "," + info.value);
            var invo = jipVO.getinfo(info.target);
            if (invo.showStar == 1) {
                i++;
            }
            Manager.pool.push(jipVO);
        }
        return i;
    };
    return ItemsModelInfo;
}());
__reflect(ItemsModelInfo.prototype, "ItemsModelInfo");
var ExattrItemsinfo = (function () {
    function ExattrItemsinfo() {
    }
    return ExattrItemsinfo;
}());
__reflect(ExattrItemsinfo.prototype, "ExattrItemsinfo");
//# sourceMappingURL=ItemsModelInfo.js.map