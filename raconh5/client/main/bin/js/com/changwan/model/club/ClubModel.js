var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 宗门
 * Simon
 * 2017.12.16
 */
var ClubModel = /** @class */ (function (_super) {
    __extends(ClubModel, _super);
    function ClubModel() {
        var _this = _super.call(this) || this;
        /**成员总战力 */
        _this.allFight = 0;
        _this.clubInfo = Manager.pool.create(ClubInfo);
        _this.clubRecommendInfo = [];
        return _this;
    }
    /**宗门推荐信息更新 */
    ClubModel.prototype.updateChooseClubInfo = function (list) {
        this.clubRecommendInfo = list;
        this.dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_RECOMMEND));
    };
    ClubModel.prototype.updateMemberListInfo = function (list) {
        this.clubMemberList = list;
        this.dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST));
    };
    /**是否可以捐献 */
    ClubModel.prototype.checkCanDonate = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_CLUB_CENTER))
            return false;
        var ret = false;
        if (this.clubInfo.donateList) {
            var count = 0;
            var len = this.clubInfo.donateList.length;
            for (var i = 0; i < len; i++) {
                if (this.clubInfo.donateList[i].donateType == 1) {
                    count = ClubDataCVO.getClubDonateById(1).count - this.clubInfo.donateList[i].count;
                }
            }
            ret = count > 0;
        }
        return ret;
    };
    ClubModel.prototype.checkShowRedIcon = function () {
        return this.checkCanDonate() || this.clubInfo.isGetReward == 0 || Manager.model.getJingMai().checkCoin() || this.checkCanUpgrade();
    };
    ClubModel.prototype.checkCanUpgrade = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_CLUB_CAREER))
            return false;
        var ret = false;
        var careerInfo = ClubDataCVO.getClubCareerById(this.clubInfo.clubCareer);
        if (careerInfo) {
            var countCanUpgrade = 0;
            var condList = careerInfo.condList;
            for (var i = 0; i < condList.length; i++) {
                if (condList[i].type == GainLossVO.LEVEL) {
                    if (Manager.model.self.attrInfo.level >= condList[i].num)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.GUILD_DONATE) {
                    if (this.clubInfo.hisDonate >= condList[i].num)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.DIMLY_STAR) {
                    if (Manager.model.getCopy().towerModel.history >= condList[i].num)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.PET_LEV) {
                    if (Manager.model.getPet().pinjie >= condList[i].petPhase && Manager.model.getPet().star >= condList[i].petLevel)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.EQM_LEV) {
                    if (Manager.model.getEquip().getTotalStrengthenLevel() >= condList[i].num)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.STONE_LEV) {
                    if (Manager.model.getEquip().getTotalGemLevel() >= condList[i].num)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.EQM_SOUL_LEV) {
                    if (Manager.model.getEquip().getTotalZhuhuanLevel() >= condList[i].num)
                        countCanUpgrade += 1;
                }
                else if (condList[i].type == GainLossVO.MERIDIAN_LEV) {
                    if (Manager.model.getJingMai().getId(Manager.model.self.id) >= condList[i].num)
                        countCanUpgrade += 1;
                }
            }
            ret = countCanUpgrade == condList.length;
        }
        return ret;
    };
    return ClubModel;
}(egret.EventDispatcher));
//# sourceMappingURL=ClubModel.js.map