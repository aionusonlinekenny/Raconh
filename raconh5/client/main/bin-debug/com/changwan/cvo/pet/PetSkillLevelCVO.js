var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-31
 *description
*/
var PetSkillLevelCVO = (function () {
    function PetSkillLevelCVO() {
    }
    PetSkillLevelCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.skillGroupId = data.readShort();
        this.skillLevel = data.readShort();
        this.des = data.readUTF();
        this.loss = new GainLossVO(data.readUTF());
    };
    PetSkillLevelCVO.getCVO = function (groupId, level) {
        var cvo;
        for (var id in this.cvos) {
            cvo = this.cvos[id];
            if (cvo.skillGroupId == groupId && cvo.skillLevel == level)
                return cvo;
        }
        return null;
    };
    return PetSkillLevelCVO;
}());
__reflect(PetSkillLevelCVO.prototype, "PetSkillLevelCVO");
//# sourceMappingURL=PetSkillLevelCVO.js.map