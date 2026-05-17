var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 缥缈录
 * Simon
 * create 2018-3-16
 */
var MaterialCopyCVO = (function () {
    function MaterialCopyCVO() {
    }
    /*解析表*/
    MaterialCopyCVO.parse = function (bytes) {
        MaterialCopyCVO.cvos = [];
        MaterialCopyCVO.typeList1 = [];
        MaterialCopyCVO.typeList2 = [];
        MaterialCopyCVO.typeList3 = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new MaterialCopyCVO();
            cvo.cell = bytes.readShort();
            cvo.name = bytes.readUTF();
            cvo.type1 = bytes.readByte();
            cvo.type2 = bytes.readByte();
            cvo.type3 = bytes.readByte();
            cvo.star = bytes.readByte();
            // cvo.totalStar = bytes.readShort();
            // cvo.award = new GainLossVO(bytes.readUTF());
            // cvo.boxAward = GainLossVO.parse(bytes.readUTF());
            cvo.collectAward = new GainLossVO(bytes.readUTF());
            cvo.monsterInfo = bytes.readUTF();
            cvo.conds = new ConditionVO(bytes.readUTF());
            cvo.passAward = GainLossVO.parse(bytes.readUTF());
            cvo.fight = bytes.readInt();
            MaterialCopyCVO.cvos[cvo.cell] = cvo;
            if (!MaterialCopyCVO.typeList1[cvo.type1])
                MaterialCopyCVO.typeList1[cvo.type1] = [];
            MaterialCopyCVO.typeList1[cvo.type1].push(cvo);
            if (!MaterialCopyCVO.typeList2[cvo.type1 + "_" + cvo.type2])
                MaterialCopyCVO.typeList2[cvo.type1 + "_" + cvo.type2] = [];
            MaterialCopyCVO.typeList2[cvo.type1 + "_" + cvo.type2].push(cvo);
            MaterialCopyCVO.typeList3[cvo.type1 + "_" + cvo.type2 + "_" + cvo.type3] = cvo;
            MaterialCopyCVO.MAX_CELL = cvo.cell;
        }
    };
    MaterialCopyCVO.getCellInfo = function (cell) {
        return MaterialCopyCVO.cvos[cell];
    };
    MaterialCopyCVO.getCopyNameById = function (type1) {
        for (var key in MaterialCopyCVO.cvos) {
            if (MaterialCopyCVO.cvos[key].type1 == type1)
                return MaterialCopyCVO.cvos[key].name;
        }
        return "";
    };
    MaterialCopyCVO.getMinFightType = function (type, fight) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                var info = MaterialCopyCVO.typeList3[type + "_" + (i + 1) + "_" + (j + 1)];
                if (info) {
                    if (Number(fight) >= Number(info.fight))
                        return info;
                }
            }
        }
        return null;
    };
    MaterialCopyCVO.getFirstCell = function (type) {
        return MaterialCopyCVO.typeList3[type + "_1_1"];
    };
    MaterialCopyCVO.MAX_CELL = 0;
    return MaterialCopyCVO;
}());
__reflect(MaterialCopyCVO.prototype, "MaterialCopyCVO");
//# sourceMappingURL=MaterialCopyCVO.js.map