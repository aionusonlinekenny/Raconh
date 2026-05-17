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
 * 爬塔副本model
 * liangyan
 * create 2017-12-27
*/
var TowerCopyModel = /** @class */ (function (_super) {
    __extends(TowerCopyModel, _super);
    function TowerCopyModel() {
        var _this = _super.call(this) || this;
        _this._curLvl = 0;
        _this._history = 0;
        return _this;
        // this._saodangTimes = 0;
    }
    Object.defineProperty(TowerCopyModel.prototype, "curLvl", {
        // private _saodangTimes:number;
        /**当前挑战关卡 */
        get: function () { return this._curLvl; },
        set: function (value) {
            if (this._curLvl == value)
                return;
            this._curLvl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TowerCopyModel.prototype, "history", {
        /**历史通关数 */
        get: function () { return this._history; },
        set: function (value) {
            if (this._history == value)
                return;
            this._history = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TowerCopyModel.prototype, "canSaodang", {
        /**扫荡剩余次数 */
        // public get saodangTimes():number {return this._saodangTimes;}
        // public set saodangTimes(value:number)
        // {
        //     if(this._saodangTimes == value) return;
        //     this._saodangTimes = value;
        // }
        /**能否扫荡 */
        get: function () {
            // if(this._saodangTimes <= 0) return false;
            if (this._history <= 0)
                return false;
            if (this._curLvl < 0)
                return false;
            if (this._curLvl >= this._history)
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**能否挑战 */
    TowerCopyModel.prototype.canChallenge = function (needCheckFight) {
        if (needCheckFight === void 0) { needCheckFight = true; }
        if (this._history >= TowerCopyCVO.MAX_CELL)
            return false;
        var cvo = TowerCopyCVO.getCVO(this._curLvl + 1);
        if (cvo == null)
            cvo = TowerCopyCVO.getCVO(this._curLvl);
        if (!cvo.isAllCondSatisfy())
            return false;
        var self = Manager.model.self;
        if (needCheckFight && self.attrInfo.fight < cvo.fightAdvise)
            return false;
        return true;
    };
    return TowerCopyModel;
}(egret.EventDispatcher));
//# sourceMappingURL=TowerCopyModel.js.map