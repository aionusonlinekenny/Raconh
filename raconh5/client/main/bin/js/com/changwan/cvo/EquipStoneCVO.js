var EquipStoneCVO = /** @class */ (function () {
    function EquipStoneCVO() {
    }
    EquipStoneCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var cvoCount = bytes.readShort();
            if (i == 0) {
                for (var j = 0; j < cvoCount; j++) {
                    var info = new EquipStoneCVO();
                    info.id = bytes.readInt();
                    info.level = bytes.readShort();
                    info.nextId = bytes.readInt();
                    info.stoneType = bytes.readShort();
                    this._cvos[info.id] = info;
                }
            }
            else if (i == 1) {
                for (var j = 0; j < cvoCount; j++) {
                    var suitInfo = new EquipStoneSuitInfo();
                    suitInfo.id = bytes.readShort();
                    suitInfo.level = bytes.readShort();
                    suitInfo.attr = [];
                    var arr = bytes.readUTF();
                    if (arr.length != 0) {
                        var arr1 = arr.split("|");
                        for (var k = 0; k < arr1.length; k++) {
                            var arr2 = arr1[k].split(",");
                            var list = [];
                            list.push(Number(arr2[0]));
                            list.push(Number(arr2[1]));
                            suitInfo.attr.push(list);
                        }
                    }
                    this._suitCvos[suitInfo.level] = suitInfo;
                }
            }
            else if (i == 2) {
                for (var j = 0; j < cvoCount; j++) {
                    var stonePosInfo = new EquipStonePosInfo();
                    stonePosInfo.id = bytes.readShort();
                    stonePosInfo.equipPos = bytes.readShort();
                    stonePosInfo.stonePos = bytes.readShort();
                    stonePosInfo.stoneType = bytes.readShort();
                    this._stonePosCvos[stonePosInfo.equipPos + "_" + stonePosInfo.stonePos] = stonePosInfo;
                }
            }
        }
    };
    EquipStoneCVO.getGemInfo = function (id) {
        return this._cvos[id];
    };
    EquipStoneCVO.getGemInfoByTypeLevel = function (type, level) {
        for (var i in this._cvos) {
            if (this._cvos[i].stoneType == type && this._cvos[i].level == level)
                return this._cvos[i];
        }
        return null;
    };
    EquipStoneCVO.getGemSuitInfo = function (level) {
        return this._suitCvos[level];
    };
    EquipStoneCVO.getGemPosInfo = function (equipPos, stonePos) {
        return this._suitCvos[equipPos + "_" + stonePos];
    };
    EquipStoneCVO._cvos = {};
    EquipStoneCVO._suitCvos = {};
    EquipStoneCVO._stonePosCvos = {};
    return EquipStoneCVO;
}());
//# sourceMappingURL=EquipStoneCVO.js.map