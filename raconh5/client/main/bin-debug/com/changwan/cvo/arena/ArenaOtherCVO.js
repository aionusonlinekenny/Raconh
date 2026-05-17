var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaOtherCVO = (function () {
    function ArenaOtherCVO() {
    }
    ArenaOtherCVO.parse = function (bytes) {
        ArenaOtherCVO._cvos = {};
        var cvoCount = bytes.readShort();
        for (var i = 0; i < cvoCount; i++) {
            var cvo = new ArenaOtherCVO();
            cvo.key = bytes.readUTF();
            cvo.value = bytes.readUTF();
            ArenaOtherCVO._cvos[cvo.key] = cvo;
        }
    };
    ArenaOtherCVO.getCVO = function (key) {
        return ArenaOtherCVO._cvos[key];
    };
    return ArenaOtherCVO;
}());
__reflect(ArenaOtherCVO.prototype, "ArenaOtherCVO");
//# sourceMappingURL=ArenaOtherCVO.js.map