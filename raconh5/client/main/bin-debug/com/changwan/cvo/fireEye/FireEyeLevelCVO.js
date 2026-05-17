var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 火眼金睛闯关数据
 * liangyan
 * create 2018-03-27
*/
var FireEyeLevelCVO = (function () {
    function FireEyeLevelCVO() {
    }
    FireEyeLevelCVO.parse = function (bytes) {
        FireEyeLevelCVO._cvos = {};
        var cvoCount = bytes.readShort();
        this.maxLevel = cvoCount;
        var cvo;
        for (var i = 0; i < cvoCount; i++) {
            cvo = new FireEyeLevelCVO();
            cvo.id = bytes.readByte();
            cvo.time = bytes.readByte();
            cvo.findScore = bytes.readByte();
            cvo.timeScore = bytes.readByte();
            FireEyeLevelCVO._cvos[cvo.id] = cvo;
        }
    };
    FireEyeLevelCVO.getCVOByID = function (id) {
        return FireEyeLevelCVO._cvos[id];
    };
    return FireEyeLevelCVO;
}());
__reflect(FireEyeLevelCVO.prototype, "FireEyeLevelCVO");
//# sourceMappingURL=FireEyeLevelCVO.js.map