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
 * 经验副本model
 * luzh
 * create 2018.1.10
*/
var CopyExpModel = /** @class */ (function (_super) {
    __extends(CopyExpModel, _super);
    function CopyExpModel() {
        var _this = _super.call(this) || this;
        _this._enterCount = 0; //已挑战次数
        _this._nextTime = 0; //下次可进入时间戳(秒)
        _this._inspireRate = 0; //鼓舞加成
        _this._exp = 0; //获得经验
        _this._kills = 0; //击杀数
        _this._wave = 0; //波数
        _this.needGuide = false;
        return _this;
    }
    Object.defineProperty(CopyExpModel.prototype, "totalCount", {
        //总能进入次数
        get: function () {
            return CopyExpConfigCVO.free_count + Manager.model.getCopy().getBuyCount(CopyConst.TYPE_EXP);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyExpModel.prototype, "leftCount", {
        get: function () {
            return this.totalCount - this._enterCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyExpModel.prototype, "nextLeftTime", {
        get: function () {
            var left = this._nextTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 副本信息
     * @param enterCount 已挑战次数
     * @param buyCount 已购买次数
     * @param nextTime 下次可进入时间戳(秒)
     * @param scoreID 评分id
     * @param hardLvl 难度id
     */
    CopyExpModel.prototype.setInfos = function (enterCount, nextTime, scoreID, hardLvl) {
        if (this._enterCount == enterCount && this._nextTime == nextTime && this.scoreID == scoreID && this.hardLvl == hardLvl)
            return;
        this._enterCount = enterCount;
        this._nextTime = nextTime;
        this.scoreID = scoreID;
        this.hardLvl = hardLvl;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_INFO_UPDATE));
    };
    Object.defineProperty(CopyExpModel.prototype, "inspireRate", {
        get: function () { return this._inspireRate; },
        set: function (value) {
            if (this._inspireRate == value)
                return;
            this._inspireRate = value;
            this.dispatchEvent(new CopyEvent(CopyEvent.EXP_INSPIRE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyExpModel.prototype, "exp", {
        get: function () { return this._exp; },
        set: function (value) {
            if (this._exp == value)
                return;
            this._exp = value;
            this.dispatchEvent(new CopyEvent(CopyEvent.EXP_GAINS));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyExpModel.prototype, "kills", {
        get: function () { return this._kills; },
        set: function (value) {
            if (this._kills == value)
                return;
            this._kills = value;
            this.dispatchEvent(new CopyEvent(CopyEvent.EXP_KILLS));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyExpModel.prototype, "wave", {
        get: function () { return this._wave; },
        set: function (value) {
            if (this._wave == value)
                return;
            this._wave = value;
            this.dispatchEvent(new CopyEvent(CopyEvent.EXP_WAVE));
        },
        enumerable: true,
        configurable: true
    });
    CopyExpModel.prototype.initData = function (wave, rate, kills, exp) {
        this.wave = wave;
        this.inspireRate = rate;
        this.kills = kills;
        this.exp = exp;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_DATA_INIT));
    };
    CopyExpModel.prototype.clean = function () {
        this._inspireRate = 0;
        this._wave = 0;
        this._kills = 0;
        this._exp = 0;
    };
    return CopyExpModel;
}(egret.EventDispatcher));
//# sourceMappingURL=CopyExpModel.js.map