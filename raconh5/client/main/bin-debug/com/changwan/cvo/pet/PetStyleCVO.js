var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-2-1
 *description
*/
var PetStyleCVO = (function () {
    function PetStyleCVO() {
    }
    PetStyleCVO.prototype.parseOne = function (data) {
        this.id = data.readByte();
        this.name = data.readUTF();
        this.resId = data.readShort();
        this.attrVO = Manager.pool.create(AttrVO, data.readUTF());
        this.activeType = data.readByte();
        this.activeJie = data.readByte();
    };
    PetStyleCVO.getCVOByResId = function (resId) {
        var cvo;
        for (var i = 0; i < PetStyleCVO.cvos.length; i++) {
            cvo = PetStyleCVO.cvos[i];
            if (cvo.resId == resId)
                return cvo;
        }
        return null;
    };
    return PetStyleCVO;
}());
__reflect(PetStyleCVO.prototype, "PetStyleCVO");
//# sourceMappingURL=PetStyleCVO.js.map