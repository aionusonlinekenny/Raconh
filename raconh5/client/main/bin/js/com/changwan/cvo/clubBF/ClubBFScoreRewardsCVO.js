/**
 * 盟会战积分奖励
 * luzh
 * create 2018.1.30
 */
var ClubBFScoreRewardsCVO = /** @class */ (function () {
    function ClubBFScoreRewardsCVO() {
    }
    /*解析表*/
    ClubBFScoreRewardsCVO.parse = function (bytes) {
        this._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new ClubBFScoreRewardsCVO();
            cvo.id = bytes.readByte();
            cvo.score = bytes.readInt();
            cvo.rewards = GainLossVO.parse(bytes.readUTF());
            this._cvos.push(cvo);
        }
    };
    ClubBFScoreRewardsCVO.getCVOs = function () {
        return this._cvos;
    };
    ClubBFScoreRewardsCVO.sortFun = function (a, b) {
        if (a.hasGet && !b.hasGet)
            return 1;
        if (!a.hasGet && b.hasGet)
            return -1;
        return (a.id < b.id ? -1 : 1);
    };
    Object.defineProperty(ClubBFScoreRewardsCVO, "hasCanGet", {
        get: function () {
            for (var i = this._cvos.length - 1; i >= 0; i--) {
                if (this._cvos[i].canGet)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFScoreRewardsCVO.prototype, "hasGet", {
        //---------------------------------------------------------------------
        /*已领取*/
        get: function () {
            return Manager.model.getClubBF().hasGet(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFScoreRewardsCVO.prototype, "canGet", {
        /*可领取*/
        get: function () {
            if (this.hasGet)
                return false;
            return this.score <= Manager.model.getClubBF().score;
        },
        enumerable: true,
        configurable: true
    });
    return ClubBFScoreRewardsCVO;
}());
//# sourceMappingURL=ClubBFScoreRewardsCVO.js.map