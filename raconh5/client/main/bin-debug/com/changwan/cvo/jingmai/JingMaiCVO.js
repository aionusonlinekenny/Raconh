var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.11.18
 * 经脉cvo
 */
var JingMaiCVO = (function () {
    function JingMaiCVO() {
    }
    JingMaiCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        this._maxLeve = tableCount - 1;
        this._maxCond = 1;
        for (var i = 0; i < tableCount; i++) {
            info = new JingMaiCvoInfo();
            info.id = bytes.readShort();
            info.level = bytes.readShort();
            info.cond = bytes.readShort();
            info.type = bytes.readByte();
            info.name = bytes.readUTF();
            info.quantity = bytes.readUTF();
            info.attr = bytes.readUTF();
            info.source_id = bytes.readUTF();
            info.pose = bytes.readByte();
            info.jingmaiType = bytes.readByte();
            info.gai = new GainLossVO(info.quantity);
            this._data[info.level] = info;
            if (info.cond > this._maxCond) {
                this._maxCond = info.cond;
            }
        }
    };
    JingMaiCVO.getInfo = function (leve) {
        return this._data[leve];
    };
    /**获得当前层数对应的经脉列表 */
    JingMaiCVO.getCondList = function (cond, type) {
        var arr = [];
        for (var value in this._data) {
            var info = this._data[value];
            if (cond == info.cond && type == info.jingmaiType) {
                arr.push(info);
            }
        }
        arr = ArrayUtil.sortOn(arr, ["pose"]);
        return arr;
    };
    Object.defineProperty(JingMaiCVO, "maxLevel", {
        /**最大级 */
        get: function () {
            return this._maxLeve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JingMaiCVO, "maxCond", {
        /**最大层 */
        get: function () {
            return this._maxCond;
        },
        enumerable: true,
        configurable: true
    });
    JingMaiCVO._data = {};
    return JingMaiCVO;
}());
__reflect(JingMaiCVO.prototype, "JingMaiCVO");
//# sourceMappingURL=JingMaiCVO.js.map