var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 宗门表
 * Simon
 * create 2017-12-16
 */
var ClubDataCVO = (function () {
    function ClubDataCVO() {
    }
    /*解析表*/
    ClubDataCVO.parse = function (bytes) {
        ClubDataCVO._clubCvos = [];
        ClubDataCVO._clubDonateCvos = [];
        ClubDataCVO._clubCareerCvos = [];
        ClubDataCVO._clubGainCvos = [];
        ClubDataCVO._clubLeaderWarCvos = [];
        ClubDataCVO._clubLeaderWarTitle = {};
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            if (i == 0) {
                var cvoCount = bytes.readShort();
                for (var j = 0; j < cvoCount; j++) {
                    ClubDataCVO._clubCvos[bytes.readInt()] = bytes.readUTF();
                }
            }
            else if (i == 1) {
                var cvoCount = bytes.readShort();
                for (var j = 0; j < cvoCount; j++) {
                    var cvo = new ClubDataCVO();
                    cvo.donateId = bytes.readInt();
                    cvo.count = bytes.readInt();
                    var lostInfo = new GainLossVO(bytes.readUTF());
                    if (lostInfo) {
                        cvo.lostType = lostInfo.type;
                        cvo.lostValue = lostInfo.num;
                    }
                    var gainInfo = new GainLossVO(bytes.readUTF());
                    if (gainInfo) {
                        cvo.gainType = gainInfo.type;
                        cvo.gainValue = gainInfo.num;
                    }
                    ClubDataCVO._clubDonateCvos.push(cvo);
                }
            }
            else if (i == 2) {
                var cvoCount = bytes.readShort();
                for (var j = 0; j < cvoCount; j++) {
                    var cvo = new ClubDataCVO();
                    cvo.careerId = bytes.readInt();
                    cvo.careerName = bytes.readUTF();
                    cvo.salaryList = [];
                    var arr = bytes.readUTF().split("|");
                    for (var k = 0; k < arr.length; k++) {
                        var salaryInfo = new GainLossVO(arr[k]);
                        if (salaryInfo) {
                            if (salaryInfo.type == GainLossVO.ITEM)
                                cvo.salaryList.push({ type: salaryInfo.type, baseId: salaryInfo.baseId, isBind: salaryInfo.bind, num: salaryInfo.num });
                            else
                                cvo.salaryList.push({ type: salaryInfo.type, num: salaryInfo.num });
                        }
                    }
                    cvo.condList = [];
                    var arr2 = bytes.readUTF().split("|");
                    for (var k = 0; k < arr2.length; k++) {
                        var condInfo = new GainLossVO(arr2[k]);
                        if (condInfo) {
                            if (condInfo.type == GainLossVO.GUILD_DONATE || condInfo.type == GainLossVO.EQM_LEV || condInfo.type == GainLossVO.DIMLY_STAR
                                || condInfo.type == GainLossVO.STONE_LEV || condInfo.type == GainLossVO.EQM_SOUL_LEV || condInfo.type == GainLossVO.MERIDIAN_LEV)
                                cvo.condList.push({ type: condInfo.type, num: condInfo.num });
                            else if (condInfo.type == GainLossVO.DUN_PASS)
                                cvo.condList.push({ type: condInfo.type, copyId: condInfo.copyId, num: condInfo.num });
                            else if (condInfo.type == GainLossVO.PET_LEV)
                                cvo.condList.push({ type: condInfo.type, petPhase: condInfo.pet_phase, petLevel: condInfo.pet_level });
                        }
                    }
                    var attr = bytes.readUTF();
                    cvo.attrList = [];
                    if (attr.length != 0) {
                        var arr1 = attr.split("|");
                        for (var k = 0; k < arr1.length; k++) {
                            arr2 = arr1[k].split(",");
                            var list = [];
                            list.push(Number(arr2[0]));
                            list.push(Number(arr2[1]));
                            cvo.attrList.push(list);
                        }
                    }
                    ClubDataCVO._clubCareerCvos.push(cvo);
                }
            }
            else if (i == 3) {
                var cvoCount = bytes.readShort();
                for (var j = 0; j < cvoCount; j++) {
                    var cvo = new ClubDataCVO();
                    cvo.gainId = bytes.readInt();
                    cvo.gainList = [];
                    var arr = bytes.readUTF().split("|");
                    for (var k = 0; k < arr.length; k++) {
                        var gainInfo = new GainLossVO(arr[k]);
                        if (gainInfo) {
                            if (gainInfo.type == GainLossVO.ITEM)
                                cvo.gainList.push({ baseId: gainInfo.baseId, bind: gainInfo.bind, num: gainInfo.num });
                        }
                    }
                    ClubDataCVO._clubGainCvos.push(cvo);
                }
            }
            else if (i == 4) {
                var cvoCount = bytes.readShort();
                for (var j = 0; j < cvoCount; j++) {
                    var cvo = new ClubDataCVO();
                    cvo.clubLeaderWarInfoId = bytes.readByte();
                    var titleStr = bytes.readUTF();
                    cvo.clubLeaderWarInfoValue = bytes.readUTF();
                    if (cvo.clubLeaderWarInfoId >= 12 && cvo.clubLeaderWarInfoId <= 20) {
                        var gainLossInfo = new GainLossVO(titleStr);
                        if (gainLossInfo)
                            ClubDataCVO._clubLeaderWarTitle[gainLossInfo.clubId + "_" + gainLossInfo.clubLeaderWarRank] = Number(cvo.clubLeaderWarInfoValue);
                        // console.log(gainLossInfo.clubId);
                        // console.log(gainLossInfo.clubLeaderWarRank);
                        // console.log(ClubDataCVO._clubLeaderWarTitle[gainLossInfo.clubId + "_" + gainLossInfo.clubLeaderWarRank]);
                    }
                    ClubDataCVO._clubLeaderWarCvos.push(cvo);
                }
            }
        }
    };
    ClubDataCVO.getClubName = function (id) {
        return ClubDataCVO._clubCvos[id] ? ClubDataCVO._clubCvos[id] : "";
    };
    ClubDataCVO.getClubDonateById = function (id) {
        if (ClubDataCVO._clubDonateCvos) {
            for (var i = 0; i < ClubDataCVO._clubDonateCvos.length; i++) {
                if (ClubDataCVO._clubDonateCvos[i].donateId == id)
                    return ClubDataCVO._clubDonateCvos[i];
            }
        }
        return null;
    };
    ClubDataCVO.getClubCareerById = function (id) {
        if (ClubDataCVO._clubCareerCvos) {
            for (var i = 0; i < ClubDataCVO._clubCareerCvos.length; i++) {
                if (ClubDataCVO._clubCareerCvos[i].careerId == id)
                    return ClubDataCVO._clubCareerCvos[i];
            }
        }
        return;
    };
    ClubDataCVO.getClubGainById = function (id) {
        if (ClubDataCVO._clubGainCvos) {
            for (var i = 0; i < ClubDataCVO._clubGainCvos.length; i++) {
                if (ClubDataCVO._clubGainCvos[i].gainId == id)
                    return ClubDataCVO._clubGainCvos[i];
            }
        }
        return;
    };
    ClubDataCVO.getClubLeaderWarInfo = function (id) {
        if (ClubDataCVO._clubLeaderWarCvos) {
            for (var i = 0; i < ClubDataCVO._clubLeaderWarCvos.length; i++) {
                if (ClubDataCVO._clubLeaderWarCvos[i].clubLeaderWarInfoId == id)
                    return ClubDataCVO._clubLeaderWarCvos[i];
            }
        }
        return;
    };
    ClubDataCVO.getClubLeaderWarTitle = function (clubId, rank) {
        if (ClubDataCVO._clubLeaderWarTitle[clubId + "_" + rank])
            return ClubDataCVO._clubLeaderWarTitle[clubId + "_" + rank];
        return 0;
    };
    return ClubDataCVO;
}());
__reflect(ClubDataCVO.prototype, "ClubDataCVO");
//# sourceMappingURL=ClubDataCVO.js.map