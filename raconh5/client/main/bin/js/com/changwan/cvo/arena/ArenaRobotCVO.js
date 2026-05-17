/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaRobotCVO = /** @class */ (function () {
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
//# sourceMappingURL=ArenaRobotCVO.js.map