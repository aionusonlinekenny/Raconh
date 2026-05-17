var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaBattleCVO = (function () {
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
__reflect(ArenaBattleCVO.prototype, "ArenaBattleCVO");
//# sourceMappingURL=ArenaBattleCVO.js.map