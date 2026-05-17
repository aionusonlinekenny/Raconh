/**
 * pzx
 * 2017.11.28
 *
 */
var ShopCVO = /** @class */ (function () {
    function ShopCVO() {
    }
    ShopCVO.parse = function (bytes) {
        ShopCVO._cvos = {};
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new ShopCVO();
            item.shop_type = bytes.readByte();
            item.sort = bytes.readShort();
            item.base_id = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            item.num = bytes.readInt();
            item.bind = bytes.readByte() == 1 ? true : false;
            item.label = bytes.readUTF();
            item.oldPrice = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            item.price = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            item.limit = bytes.readInt();
            item.limit_p = bytes.readInt();
            item.goods_tips = bytes.readByte();
            item.show_cond = bytes.readUTF();
            item.id = bytes.readInt();
            item.effect = bytes.readByte() == 1 ? true : false;
            ShopCVO._cvos[item.id] = item;
        }
    };
    ShopCVO.getShopTypeLists = function (type) {
        var arr = [];
        for (var key in this._cvos) {
            var cvo = this._cvos[key];
            if (cvo.shop_type == type) {
                arr.push(cvo);
            }
        }
        arr = ArrayUtil.sortOn(arr, ["sort"]);
        return arr;
    };
    ShopCVO.getCvo = function (id) {
        return this._cvos[id];
    };
    ShopCVO.prototype.setCount = function (value) {
        this._count = value;
    };
    Object.defineProperty(ShopCVO.prototype, "count", {
        /** 已购买数量  此变量不读表，由服务端数据传入 */
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    /** 通过baseId 获得shopCvo */
    ShopCVO.getbaseIdCvo = function (baseId) {
        for (var key in this._cvos) {
            var cvo = this._cvos[key];
            if (cvo.base_id == baseId) {
                return cvo;
            }
        }
        return null;
    };
    Object.defineProperty(ShopCVO.prototype, "lifeIsyiyou", {
        //=======================命格独用的=============
        get: function () {
            var itemCvo = ItemsCVO.getCvo(this.base_id);
            if (itemCvo.condition == "")
                return 0;
            var itemsModel = Manager.model.getItems();
            var arr = [];
            var infoArr = itemsModel.lifeGridList;
            for (var _i = 0, infoArr_1 = infoArr; _i < infoArr_1.length; _i++) {
                var info = infoArr_1[_i];
                if (info)
                    arr.push(info);
            }
            infoArr = itemsModel.lifeGridBagList;
            for (var _a = 0, infoArr_2 = infoArr; _a < infoArr_2.length; _a++) {
                var info = infoArr_2[_a];
                arr.push(info);
            }
            var isyiyou = false;
            for (var _b = 0, arr_1 = arr; _b < arr_1.length; _b++) {
                var info = arr_1[_b];
                if (info.base_id == this.base_id) {
                    //已有属性
                    return 1;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopCVO.prototype, "lifeislock", {
        get: function () {
            //是否解锁
            var condit = new ConditionVO(this.show_cond);
            if (condit.isSatisfy()) {
                return 0;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopCVO.prototype, "ample", {
        get: function () {
            var frag = Manager.model.self.attrInfo.destinyfrig;
            if (frag < this.price) {
                return 1;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ShopCVO;
}());
//# sourceMappingURL=ShopCVO.js.map