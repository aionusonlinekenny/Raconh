var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 技能公式表
 * liangyan
 * create 2017-11-21
*/
var SkillFormulaCVO = (function () {
    function SkillFormulaCVO() {
    }
    SkillFormulaCVO.prototype.parse = function (data) {
        this.id = data.readShort();
        this.type = data.readUTF();
        this.arg1 = data.readShort();
        this.arg2 = data.readShort();
        this.arg3 = data.readShort();
    };
    SkillFormulaCVO.getCVO = function (id, type) {
        var result;
        var arr = SkillFormulaCVO.cvos[type];
        if (!arr)
            return null;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i].id == id)
                return arr[i];
        }
        return null;
    };
    SkillFormulaCVO.prototype.getFormulaResult = function (level) {
        var skillCvo = SkillCVO.getCVO(this.id);
        if (this.type == SkillFormulaType.CONDITION || this.type == SkillFormulaType.LOSS)
            level += 1;
        if (level > skillCvo.maxLevel)
            return 99999999999;
        // return level * this.arg1 + this.arg2;
        if (this.type == SkillFormulaType.LOSS) {
            return Math.floor((this.arg1 / 1000) * Math.pow(level, this.arg2 / 1000) + this.arg3);
        }
        else {
            return level * this.arg1 + this.arg2;
        }
    };
    return SkillFormulaCVO;
}());
__reflect(SkillFormulaCVO.prototype, "SkillFormulaCVO");
//# sourceMappingURL=SkillFormulaCVO.js.map