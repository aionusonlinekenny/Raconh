/**
 * 套装
 * Simon
 * 2018.1.4
 */
var SuitCVO = /** @class */ (function () {
    function SuitCVO() {
    }
    SuitCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var cvoCount = bytes.readShort();
            if (i == 0) {
                for (var j = 0; j < cvoCount; j++) {
                    var cvo = new SuitCVO();
                    cvo.id = bytes.readByte();
                    cvo.suitId = bytes.readInt();
                    cvo.type = Number(String(cvo.suitId).substr(0, 1));
                    cvo.level = Number(String(cvo.suitId).substr(String(cvo.suitId).length - 2, 2));
                    cvo.num = bytes.readByte();
                    var str = bytes.readUTF();
                    cvo.attr = [];
                    var arr = str.split("|");
                    for (var k = 0; k < arr.length; k++) {
                        var arr2 = arr[k].split(",");
                        cvo.attr.push({ key: Number(arr2[0]), value: Number(arr2[1]) });
                    }
                    cvo.attrInfo = Manager.pool.create(AttrVO, str);
                    this._suitInfoList[cvo.type + "_" + cvo.level + "_" + cvo.num] = cvo;
                }
            }
            if (i == 1) {
                for (var j = 0; j < cvoCount; j++) {
                    var cvo = new SuitUpgradeCVO();
                    cvo.id = bytes.readByte();
                    cvo.level = bytes.readByte();
                    cvo.pos = bytes.readByte();
                    cvo.loss = new GainLossVO(bytes.readUTF());
                    this._suitUpgradeList[cvo.level + "_" + cvo.pos] = cvo;
                }
            }
        }
    };
    /**
     * 返回套装信息
     * type:类型
     * level:等阶
     * num:件数
     */
    SuitCVO.getSuitInfo = function (type, level, num) {
        return this._suitInfoList[type + "_" + level + "_" + num];
    };
    SuitCVO.getSuitUpgradeInfo = function (level, pos) {
        return this._suitUpgradeList[level + "_" + pos];
    };
    SuitCVO._suitInfoList = {};
    SuitCVO._suitUpgradeList = {};
    return SuitCVO;
}());
var SuitUpgradeCVO = /** @class */ (function () {
    function SuitUpgradeCVO() {
    }
    return SuitUpgradeCVO;
}());
//# sourceMappingURL=SuitCVO.js.map