var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 宠物模板表
 * liangyan
 * create 2017-12-16
*/
var PetCVO = (function () {
    function PetCVO() {
    }
    PetCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.pinjie = data.readByte();
        this.star = data.readByte();
        this.starExp = data.readShort();
        this.loss = new GainLossVO(data.readUTF());
        this.attrStr = data.readUTF();
        this.zzdMax = data.readShort();
        this.wxdMax = data.readShort();
        this.newSkillID = data.readShort();
    };
    PetCVO.setMaxPinjie = function () {
        var count = 0;
        for (var key in PetCVO._cvos) {
            count++;
        }
        PetCVO.MAX_PINJIE = count;
    };
    PetCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var t = 0; t < tableCount; t++) {
            if (t == 0) {
                PetCVO._cvos = {};
                var baseCount = bytes.readShort();
                var cvo = void 0;
                for (var i = 0; i < baseCount; i++) {
                    cvo = new PetCVO();
                    cvo.parseOne(bytes);
                    if (!PetCVO._cvos.hasOwnProperty("" + cvo.pinjie))
                        PetCVO._cvos[cvo.pinjie] = new Array();
                    PetCVO._cvos[cvo.pinjie].push(cvo);
                }
                this.setMaxPinjie();
            }
            else if (t == 1) {
                PetSkillLevelCVO.cvos = {};
                var levelCount = bytes.readShort();
                var cvo = void 0;
                for (var i = 0; i < levelCount; i++) {
                    cvo = new PetSkillLevelCVO();
                    cvo.parseOne(bytes);
                    PetSkillLevelCVO.cvos[cvo.id] = cvo;
                }
            }
            else if (t == 2) {
                PetBombCVO.cvos = {};
                var bombCount = bytes.readShort();
                var cvo = void 0;
                for (var i = 0; i < bombCount; i++) {
                    cvo = new PetBombCVO();
                    cvo.parseOne(bytes);
                    PetBombCVO.cvos[cvo.resId] = cvo;
                }
            }
            else if (t == 3) {
                PetStyleCVO.cvos = [];
                var styleCount = bytes.readShort();
                var cvo = void 0;
                for (var i = 0; i < styleCount; i++) {
                    cvo = new PetStyleCVO();
                    cvo.parseOne(bytes);
                    PetStyleCVO.cvos.push(cvo);
                }
            }
        }
    };
    PetCVO.getCVO = function (pinjie, star) {
        var arr = PetCVO._cvos[pinjie];
        if (!arr)
            return null;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].star == star)
                return arr[i];
        }
    };
    PetCVO.getCVOByNewSkillId = function (newSkillId) {
        for (var key in PetCVO._cvos) {
            var arr = PetCVO._cvos[key];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].newSkillID == newSkillId)
                    return arr[i];
            }
        }
        return null;
    };
    return PetCVO;
}());
__reflect(PetCVO.prototype, "PetCVO");
//# sourceMappingURL=PetCVO.js.map