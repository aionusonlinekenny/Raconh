var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 物品表
 */
var ItemsCVO = (function () {
    function ItemsCVO() {
    }
    Object.defineProperty(ItemsCVO.prototype, "color", {
        get: function () {
            switch (this.quality) {
                case 2: return Color.GREEN;
                case 3: return Color.BLUE;
                case 4: return Color.PURPLE;
                case 5: return Color.ORANGE;
                case 6: return Color.RED;
            }
            return Color.DEF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsCVO.prototype, "colorStr", {
        get: function () {
            switch (this.quality) {
                case 2: return Color.GREEN_STR;
                case 3: return Color.BLUE_STR;
                case 4: return Color.PURPLE_STR;
                case 5: return Color.ORANGE_STR;
                case 6: return Color.RED_STR;
            }
            return Color.DEF_STR;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsCVO.prototype, "needLevel", {
        /**
         * 装备需要等级,包括转身。
         * 转身的返回大于1000的数
         * 不转身的返回少于1000的数
         * 1-999 1级为：000,10级为001,100级为010
         *
         * 1转为1010,2转为1020
        */
        get: function () {
            var reilevLeve = Number(String(this.id).substr(2, 1));
            if (reilevLeve == 0) {
                var leve = Number(String(this.id).substr(3, 2));
                if (leve == 0) {
                    return 1;
                }
                else {
                    return Number(String(this.id).substr(3, 2)) * 10;
                }
            }
            else {
                return Number(String(this.id).substr(2, 3)) * 10;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsCVO.prototype, "needLevelStr", {
        /*** 所须要的转身或等级 */
        get: function () {
            var str;
            var leve = this.needLevel;
            if (leve < 1000) {
                str = leve + LangCVO.getContent("common15");
            }
            else {
                str = Math.floor((leve - 1000) / 10) + LangCVO.getContent("common14");
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    ItemsCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        var attrList;
        for (var i = 0; i < tableCount; i++) {
            info = new ItemsCVO();
            info.id = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            info.imgId = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            info.name = bytes.readUTF();
            info.group = bytes.readByte();
            info.type = bytes.readByte();
            info.quality = bytes.readByte();
            info.openView = bytes.readShort();
            var smelt = bytes.readUTF();
            if (smelt != "0")
                info.smelt = new GainLossVO(smelt);
            //info.needLevel = bytes.readInt();
            info.condition = bytes.readUTF();
            info.needCarrer = Number(String(info.id).substr(1, 1));
            info.attr = bytes.readUTF();
            attrList = [];
            if (info.attr) {
                var arr1 = info.attr.split("|");
                for (var j = 0; j < arr1.length; j++) {
                    var arr2 = arr1[j].split(",");
                    attrList.push([Number(arr2[0]), Number(arr2[1])]);
                }
            }
            info.attrList = attrList;
            info.desc = bytes.readUTF();
            info.desc_output = bytes.readUTF();
            // info.prompt = bytes.readUTF();
            var promptStr = bytes.readUTF();
            var index = promptStr.indexOf("|");
            if (index != -1) {
                info.openID = parseInt(promptStr.slice(0, index));
                info.prompt = promptStr.slice(index + 1);
            }
            else {
                info.openID = 0;
                info.prompt = "";
            }
            info.pos = Number(String(info.id).substr(6, 2));
            info.market = bytes.readShort();
            this._data[info.id] = info;
        }
    };
    ItemsCVO.getCvo = function (id) {
        return this._data[id];
    };
    ItemsCVO.cvos = function () {
        return this._data;
    };
    ItemsCVO._data = {};
    return ItemsCVO;
}());
__reflect(ItemsCVO.prototype, "ItemsCVO");
//# sourceMappingURL=ItemsCVO.js.map