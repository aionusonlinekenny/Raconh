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
 * 盟会战model
 * luzh
 * 2018.1.30
 */
var ClubBFModel = /** @class */ (function (_super) {
    __extends(ClubBFModel, _super);
    function ClubBFModel() {
        var _this = _super.call(this) || this;
        /*个人积分数*/
        _this._score = 0;
        /*盟会战积分奖励已领取id列表*/
        _this._hasGetIDs = [];
        return _this;
    }
    Object.defineProperty(ClubBFModel.prototype, "score", {
        get: function () { return this._score; },
        set: function (value) {
            if (this._score == value)
                return;
            this._score = value;
            this._scoreRewardReset = true;
            this.dispatchEvent(new ClubBFEvent(ClubBFEvent.SCORE_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "hasGetIDs", {
        set: function (value) {
            if (this._hasGetIDs == value)
                return;
            this._hasGetIDs = value;
            this._scoreRewardReset = true;
            this.dispatchEvent(new ClubBFEvent(ClubBFEvent.REWARES_GET_STATE));
        },
        enumerable: true,
        configurable: true
    });
    ClubBFModel.prototype.addGetID = function (id) {
        if (this.hasGet(id))
            return;
        this._hasGetIDs.push(id);
        this._scoreRewardReset = true;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.REWARES_GET_STATE));
    };
    ClubBFModel.prototype.hasGet = function (id) {
        return this._hasGetIDs.indexOf(id) != -1;
    };
    Object.defineProperty(ClubBFModel.prototype, "hasCanGet", {
        get: function () {
            if (!OpenCVO.isOpen(OpenConst.ID_CLUB_WAR))
                return false;
            if (this._scoreRewardReset)
                this._scoreRewardHasCanGet = ClubBFScoreRewardsCVO.hasCanGet;
            return this._scoreRewardHasCanGet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "atkBuffCVO", {
        get: function () { return this._atkBuffCVO; },
        set: function (value) {
            if (this._atkBuffCVO == value)
                return;
            this._atkBuffCVO = value;
            this.dispatchEvent(new ClubBFEvent(ClubBFEvent.ATTACK_BUFF_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "isSelfDef", {
        get: function () { return this.defClubType == Manager.model.self.attrInfo.guildType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "clubBFHasBuy", {
        get: function () { return this._clubBFHasBuy; },
        set: function (value) {
            if (this._clubBFHasBuy == value)
                return;
            this._clubBFHasBuy = value;
            this.dispatchEvent(new ClubBFEvent(ClubBFEvent.CLUB_BUFF_BUY));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "cdEndTime", {
        set: function (value) {
            if (this._cdEndTime == value)
                return;
            this._cdEndTime = value;
            this.dispatchEvent(new ClubBFEvent(ClubBFEvent.CD_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "cd", {
        get: function () {
            var left = 0;
            if (this._cdEndTime > 0)
                left = Math.ceil(this._cdEndTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubBFModel.prototype, "hasEnterChallengeArea", {
        get: function () { return this._hasEnterChallengeArea; },
        set: function (value) {
            if (this._hasEnterChallengeArea == value)
                return;
            this._hasEnterChallengeArea = value;
            if (this._hasEnterChallengeArea)
                Manager.view.show(102 /* ClubBFChallengePanel */);
            this.dispatchEvent(new ClubBFEvent(ClubBFEvent.CHALLENGE_AREA_STATE));
        },
        enumerable: true,
        configurable: true
    });
    /*清空数据*/
    ClubBFModel.prototype.clear = function () {
        this.hasEnterChallengeArea = false;
        this.autoChallenge = false;
        this._clubBFHasBuy = false;
        this._cdEndTime = 0;
        this._atkBuffCVO = null;
    };
    return ClubBFModel;
}(egret.EventDispatcher));
//# sourceMappingURL=ClubBFModel.js.map