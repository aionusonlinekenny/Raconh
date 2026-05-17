var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EquipZhuhunCVO = (function () {
    function EquipZhuhunCVO() {
    }
    EquipZhuhunCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var cvoCount = bytes.readShort();
            if (i == 0) {
                for (var j = 0; j < cvoCount; j++) {
                    var id = bytes.readShort();
                    var equipPos = bytes.readShort();
                    var level = bytes.readShort();
                    var item = bytes.readUTF();
                    var itemList = [];
                    var arr = item.split("|");
                    for (var k = 0; k < arr.length; k++) {
                        itemList.push(new GainLossVO(arr[k]));
                    }
                    var rate = bytes.readShort();
                    for (var k = 0; k < 2; k++) {
                        var info = new EquipZhuhunCVO();
                        info.id = id;
                        info.equipPos = equipPos;
                        info.level = level;
                        info.itemList = itemList;
                        info.rate = rate;
                        info.career = k + 1;
                        info.zhuhunAttrList = [];
                        info.levelAttrList = [];
                        this._cvos[info.career + "_" + info.equipPos + "_" + info.level] = info;
                    }
                }
            }
            else if (i == 1) {
                for (var j = 0; j < cvoCount; j++) {
                    var id = bytes.readShort();
                    var career = bytes.readByte();
                    var equipPos = bytes.readShort();
                    var level = bytes.readShort();
                    var arr = bytes.readUTF();
                    var info = this._cvos[career + "_" + equipPos + "_" + level];
                    if (info) {
                        if (arr.length != 0) {
                            var arr1 = arr.split("|");
                            for (var k = 0; k < arr1.length; k++) {
                                var arr2 = arr1[k].split(",");
                                var list = [];
                                list.push(Number(arr2[0]));
                                list.push(Number(arr2[1]));
                                info.zhuhunAttrList.push(list);
                            }
                        }
                    }
                }
            }
            else if (i == 2) {
                for (var j = 0; j < cvoCount; j++) {
                    var id = bytes.readShort();
                    var career = bytes.readByte();
                    var level = bytes.readShort();
                    var arr = bytes.readUTF();
                    for (var l = 0; l < 8; l++) {
                        var info = this._cvos[career + "_" + (l + 1) + "_" + level];
                        if (info) {
                            if (arr.length != 0) {
                                var arr1 = arr.split("|");
                                for (var k = 0; k < arr1.length; k++) {
                                    var arr2 = arr1[k].split(",");
                                    var list = [];
                                    list.push(Number(arr2[0]));
                                    list.push(Number(arr2[1]));
                                    info.levelAttrList.push(list);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    EquipZhuhunCVO.getInfo = function (career, equipPos, curLevel) {
        if (!curLevel)
            curLevel = 0;
        return this._cvos[career + "_" + equipPos + "_" + curLevel];
    };
    EquipZhuhunCVO._cvos = {};
    return EquipZhuhunCVO;
}());
__reflect(EquipZhuhunCVO.prototype, "EquipZhuhunCVO");
//# sourceMappingURL=EquipZhuhunCVO.js.map