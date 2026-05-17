var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-11
 *description
*/
var PetBombCVO = (function () {
    function PetBombCVO() {
    }
    PetBombCVO.prototype.parseOne = function (data) {
        this.resId = data.readShort();
        this.config = data.readUTF();
    };
    PetBombCVO.getBombPoss = function (resId) {
        var cvo = this.cvos[resId];
        if (cvo == null)
            return null;
        return PointUtil.getPoint3(cvo.config, "|", ",");
    };
    return PetBombCVO;
}());
__reflect(PetBombCVO.prototype, "PetBombCVO");
//# sourceMappingURL=PetBombCVO.js.map