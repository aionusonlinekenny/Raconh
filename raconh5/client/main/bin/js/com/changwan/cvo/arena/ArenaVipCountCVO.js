/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaVipCountCVO = /** @class */ (function () {
    function ArenaVipCountCVO() {
    }
    ArenaVipCountCVO.parse = function (bytes) {
        ArenaVipCountCVO._cvos = [];
        var cvoCount = bytes.readShort();
        for (var i = 0; i < cvoCount; i++) {
            var cvo = new ArenaVipCountCVO();
            cvo.vipLevel = bytes.readByte();
            cvo.canBuyCount = bytes.readByte();
            ArenaVipCountCVO._cvos.push(cvo);
        }
        ArenaVipCountCVO._cvos.sort(this.sortFun);
    };
    ArenaVipCountCVO.sortFun = function (e1, e2) {
        if (e1.vipLevel > e2.vipLevel)
            return 1;
        else if (e1.vipLevel < e2.vipLevel)
            return -1;
        return 0;
    };
    ArenaVipCountCVO.getCanBuyCount = function (vipLevel) {
        var result;
        for (var i = 0; i < ArenaVipCountCVO._cvos.length; i++) {
            if (ArenaVipCountCVO._cvos[i].vipLevel <= vipLevel)
                result = ArenaVipCountCVO._cvos[i];
            else
                break;
        }
        return result ? result.canBuyCount : 0;
    };
    return ArenaVipCountCVO;
}());
//# sourceMappingURL=ArenaVipCountCVO.js.map