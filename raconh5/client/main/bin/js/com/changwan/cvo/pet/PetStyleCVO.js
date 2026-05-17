/**
 *author Anydo
 *create 2018-2-1
 *description
*/
var PetStyleCVO = /** @class */ (function () {
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
//# sourceMappingURL=PetStyleCVO.js.map