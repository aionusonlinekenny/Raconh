var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 元宝充值
 * pzx
 * 18.1.3
 */
var SysChargeCVO = (function () {
    function SysChargeCVO() {
        this._first = false;
    }
    SysChargeCVO.prototype.setFirst = function () {
        this._first = true;
    };
    Object.defineProperty(SysChargeCVO.prototype, "first", {
        /** 是否已首充 ture为是 */
        get: function () {
            return this._first;
        },
        enumerable: true,
        configurable: true
    });
    SysChargeCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new SysChargeCVO();
            item.id = bytes.readByte();
            item.money = bytes.readInt();
            item.gold = bytes.readInt();
            item.ratio = bytes.readInt();
            item.first_retrive = bytes.readInt();
            item.second_retrive = bytes.readInt();
            item.first_label = bytes.readShort();
            item.second_label = bytes.readShort();
            item.goldImg = bytes.readUTF();
            this._cvos.push(item);
        }
    };
    SysChargeCVO.cvos = function () {
        return this._cvos;
    };
    return SysChargeCVO;
}());
__reflect(SysChargeCVO.prototype, "SysChargeCVO");
//# sourceMappingURL=SysChargeCvo.js.map