var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 盟会战排名奖励
 * luzh
 * create 2018.1.30
 */
var ClubBFRankRewardsCVO = (function () {
    function ClubBFRankRewardsCVO() {
    }
    /*解析表*/
    ClubBFRankRewardsCVO.parse = function (bytes) {
        this._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new ClubBFRankRewardsCVO();
            cvo.id = bytes.readByte();
            cvo.rewards = GainLossVO.parse(bytes.readUTF());
            cvo.desc = bytes.readUTF();
            this._cvos.push(cvo);
        }
    };
    ClubBFRankRewardsCVO.getCVOs = function () {
        return this._cvos;
    };
    return ClubBFRankRewardsCVO;
}());
__reflect(ClubBFRankRewardsCVO.prototype, "ClubBFRankRewardsCVO");
//# sourceMappingURL=ClubBFRankRewardsCVO.js.map