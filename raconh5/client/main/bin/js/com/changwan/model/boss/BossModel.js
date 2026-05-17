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
 * luzhihong
 * create 2017.12.25
 */
var BossModel = /** @class */ (function (_super) {
    __extends(BossModel, _super);
    function BossModel() {
        var _this = _super.call(this) || this;
        _this.rareDropModel = new RareDropModel;
        _this.challengeNum = 0; //可挑战次数
        _this.recoverTime = 0; //次数恢复时间
        /*关注列表*/
        _this._attentionList = [];
        /*敌对玩家列表*/
        _this._enemyList = [];
        return _this;
    }
    /*设置挑战次数和恢复时间*/
    BossModel.prototype.setNumAndTime = function (curNum, curTime) {
        if (this.challengeNum == curNum && this.recoverTime == curTime)
            return;
        this.challengeNum = curNum;
        this.recoverTime = curTime;
        this.dispatchEvent(new BossEvent(BossEvent.CHALLENGE_TIMES));
    };
    /*设置关注列表*/
    BossModel.prototype.setAttentions = function (list) {
        this._attentionList = list;
        this.dispatchEvent(new BossEvent(BossEvent.ATTENTION));
    };
    /*是否已关注*/
    BossModel.prototype.isAttention = function (id) {
        return this._attentionList.indexOf(id) != -1;
    };
    Object.defineProperty(BossModel.prototype, "enemyList", {
        get: function () { return this._enemyList; },
        set: function (value) {
            this._enemyList = value;
            this.dispatchEvent(new BossEvent(BossEvent.ENEMY_LIST));
        },
        enumerable: true,
        configurable: true
    });
    BossModel.prototype.getEnemyByID = function (id) {
        for (var i = this._enemyList.length - 1; i >= 0; i--) {
            if (this._enemyList[i].id == i)
                return this._enemyList[i];
        }
        return null;
    };
    Object.defineProperty(BossModel.prototype, "privateChallenge", {
        //------------------
        get: function () {
            var cvos = CopyCVO.getCVOsByType(CopyConst.TYPE_BOSS_PRIVATE);
            for (var i = 0, len = cvos.length; i < len; i++) {
                if (cvos[i].isAllCondSatisfy())
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BossModel.prototype, "publicChallenge", {
        get: function () {
            var cvos = BossCVO.getCVOs();
            for (var i = 0, len = cvos.length; i < len; i++) {
                if (cvos[i].condVo.isSatisfy() && this.challengeNum > 0)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    BossModel.CHALLENGE_MAX = 10; //挑战次数上限
    return BossModel;
}(egret.EventDispatcher));
//# sourceMappingURL=BossModel.js.map