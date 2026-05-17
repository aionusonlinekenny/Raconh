var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 缥缈录
 * Simon
 * create 2018-3-16
 */
var MaterialCopyDataCVO = (function () {
    function MaterialCopyDataCVO() {
    }
    /*解析表*/
    MaterialCopyDataCVO.parse = function (bytes) {
        var tabCount = bytes.readByte();
        MaterialCopyDataCVO.cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new MaterialCopyDataCVO();
            cvo.id = bytes.readShort();
            cvo.star = bytes.readShort();
            cvo.award = new GainLossVO(bytes.readUTF());
            cvo.showAward = GainLossVO.parse(bytes.readUTF());
            MaterialCopyDataCVO.cvos[cvo.id] = cvo;
            MaterialCopyDataCVO.MAX_ID = cvo.id;
        }
    };
    MaterialCopyDataCVO.getInfo = function (id) {
        return MaterialCopyDataCVO.cvos[id];
    };
    MaterialCopyDataCVO.MAX_ID = 0;
    return MaterialCopyDataCVO;
}());
__reflect(MaterialCopyDataCVO.prototype, "MaterialCopyDataCVO");
//# sourceMappingURL=MaterialCopyDataCVO.js.map