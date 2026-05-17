var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaVipCountCVO = (function () {
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
__reflect(ArenaVipCountCVO.prototype, "ArenaVipCountCVO");
//# sourceMappingURL=ArenaVipCountCVO.js.map