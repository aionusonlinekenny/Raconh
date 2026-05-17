/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaOtherCVO = /** @class */ (function () {
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
//# sourceMappingURL=ArenaOtherCVO.js.map