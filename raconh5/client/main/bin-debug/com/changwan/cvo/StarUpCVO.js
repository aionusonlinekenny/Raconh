var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * drq
 * 升星 CVO
 * 2018.4.17
 */
var StarUpCVO = (function () {
    function StarUpCVO() {
    }
    StarUpCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new StarUpCVO();
            item.item_id = bytes.readInt();
            item.star = bytes.readByte();
            item.offer_val = bytes.readShort();
            item.need_val = bytes.readShort();
            this._cvos.push(item);
        }
        //
    };
    StarUpCVO.getCvo = function () {
        return this._cvos;
    };
    return StarUpCVO;
}());
__reflect(StarUpCVO.prototype, "StarUpCVO");
//# sourceMappingURL=StarUpCVO.js.map