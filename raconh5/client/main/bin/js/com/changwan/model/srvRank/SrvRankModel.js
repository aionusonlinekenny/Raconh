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
 *
 * pzx
 * create 2018-3-15
 * 冲榜竞技
 *
*/
var SrvRankModel = /** @class */ (function (_super) {
    __extends(SrvRankModel, _super);
    function SrvRankModel() {
        var _this = _super.call(this) || this;
        _this._mainRank = 0;
        _this._rank1Name = "";
        return _this;
    }
    SrvRankModel.prototype.returnQuery = function (rank, name) {
        this._mainRank = rank;
        this._rank1Name = name;
        this.reward();
    };
    SrvRankModel.prototype.reward = function () {
        this.dispatchEvent(new SrvRankEvent(SrvRankEvent.SRVRANK_UPDATE_LIST));
    };
    Object.defineProperty(SrvRankModel.prototype, "rank1Name", {
        /**
         * 第一名玩家名字
         */
        get: function () {
            return this._rank1Name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SrvRankModel.prototype, "mainRank", {
        /** 自己的排名 */
        get: function () {
            return this._mainRank;
        },
        enumerable: true,
        configurable: true
    });
    return SrvRankModel;
}(egret.EventDispatcher));
//# sourceMappingURL=SrvRankModel.js.map