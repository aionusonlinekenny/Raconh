/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaMaxRankCVO = /** @class */ (function () {
    function ArenaMaxRankCVO() {
    }
    ArenaMaxRankCVO.parse = function (bytes) {
        this.cvos = [];
        var cvoCount = bytes.readShort();
        for (var i = 0; i < cvoCount; i++) {
            var cvo = new ArenaMaxRankCVO();
            cvo.id = bytes.readByte();
            cvo.rankTarget = bytes.readShort();
            cvo.rankStart = bytes.readShort();
            cvo.gains = GainLossVO.parse(bytes.readUTF());
            this.cvos.push(cvo);
        }
        this.cvos.sort(this.sortFun);
    };
    ArenaMaxRankCVO.sortFun = function (e1, e2) {
        if (e1.rankTarget < e2.rankTarget)
            return 1;
        else if (e1.rankTarget > e2.rankTarget)
            return -1;
        return 0;
    };
    ArenaMaxRankCVO.getCVO = function (id) {
        for (var i = 0; i < this.cvos.length; i++) {
            if (this.cvos[i].id == id)
                return this.cvos[i];
        }
        return null;
    };
    return ArenaMaxRankCVO;
}());
//# sourceMappingURL=ArenaMaxRankCVO.js.map