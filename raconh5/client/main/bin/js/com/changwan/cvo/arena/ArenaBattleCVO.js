/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaBattleCVO = /** @class */ (function () {
    function ArenaBattleCVO() {
    }
    ArenaBattleCVO.parse = function (bytes) {
        ArenaBattleCVO._cvos = {};
        var cvoCount = bytes.readShort();
        for (var i = 0; i < cvoCount; i++) {
            var cvo = new ArenaBattleCVO();
            cvo.step = bytes.readByte();
            cvo.selfAction = bytes.readUTF();
            cvo.selfSkill = bytes.readByte();
            cvo.enemyAction = bytes.readUTF();
            cvo.enemySkill = bytes.readByte();
            cvo.selfComHurt = bytes.readByte();
            cvo.selfSkillHurt = bytes.readByte();
            cvo.enemyComHurt = bytes.readByte();
            cvo.enemySkillHurt = bytes.readByte();
            ArenaBattleCVO._cvos[cvo.step] = cvo;
        }
    };
    ArenaBattleCVO.getCVOByStep = function (step) {
        return ArenaBattleCVO._cvos[step];
    };
    return ArenaBattleCVO;
}());
//# sourceMappingURL=ArenaBattleCVO.js.map