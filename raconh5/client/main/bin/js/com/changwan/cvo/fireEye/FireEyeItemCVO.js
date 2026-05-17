/**
 * 火眼金睛物品配置表
 * liangyan
 * create 2018-03-28
*/
var FireEyeItemCVO = /** @class */ (function () {
    function FireEyeItemCVO() {
    }
    FireEyeItemCVO.parse = function (bytes) {
        FireEyeItemCVO._cvos = {};
        var cvoCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < cvoCount; i++) {
            cvo = new FireEyeItemCVO();
            cvo.id = bytes.readShort();
            cvo.resID = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            cvo.name = bytes.readUTF();
            cvo.type = bytes.readShort();
            FireEyeItemCVO._cvos[cvo.id] = cvo;
        }
    };
    FireEyeItemCVO.getCVOByID = function (id) {
        return FireEyeItemCVO._cvos[id];
    };
    FireEyeItemCVO.getFirstCvoByType = function (type) {
        var cvo;
        for (var key in FireEyeItemCVO._cvos) {
            cvo = FireEyeItemCVO._cvos[key];
            if (cvo && cvo.type == type)
                return cvo;
        }
        return null;
    };
    /**招财猫类型 */
    FireEyeItemCVO.TYPE_GOOD_CAT = 99;
    return FireEyeItemCVO;
}());
//# sourceMappingURL=FireEyeItemCVO.js.map