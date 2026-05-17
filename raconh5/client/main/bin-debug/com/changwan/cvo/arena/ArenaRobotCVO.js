var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaRobotCVO = (function () {
    function ArenaRobotCVO() {
    }
    ArenaRobotCVO.parse = function (bytes) {
        ArenaRobotCVO._cvos = {};
        var cvoCount = bytes.readShort();
        for (var i = 0; i < cvoCount; i++) {
            var cvo = new ArenaRobotCVO();
            cvo.rank = bytes.readShort();
            cvo.nickname = bytes.readUTF();
            cvo.power = bytes.readInt();
            cvo.career = bytes.readByte();
            cvo.headID = bytes.readShort();
            cvo.level = bytes.readShort();
            cvo.hp = bytes.readInt();
            cvo.clothes = bytes.readInt();
            cvo.weapon = bytes.readInt();
            cvo.wing = bytes.readInt();
            cvo.petAni = bytes.readShort();
            ArenaRobotCVO._cvos[cvo.rank] = cvo;
        }
    };
    ArenaRobotCVO.getCVOByRank = function (rank) {
        return ArenaRobotCVO._cvos[rank];
    };
    return ArenaRobotCVO;
}());
__reflect(ArenaRobotCVO.prototype, "ArenaRobotCVO");
//# sourceMappingURL=ArenaRobotCVO.js.map