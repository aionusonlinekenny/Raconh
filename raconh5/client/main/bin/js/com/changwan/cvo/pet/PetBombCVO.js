/**
 *author Anydo
 *create 2018-1-11
 *description
*/
var PetBombCVO = /** @class */ (function () {
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
//# sourceMappingURL=PetBombCVO.js.map