var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 转生model
 * liangyan
 * create 2017-12-14
*/
var ReinModel = (function (_super) {
    __extends(ReinModel, _super);
    function ReinModel() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    ReinModel.prototype.init = function () {
        this._bossCount = 0;
    };
    Object.defineProperty(ReinModel.prototype, "bossCount", {
        get: function () { return this._bossCount; },
        set: function (value) {
            if (this._bossCount == value)
                return;
            this._bossCount = value;
            this.dispatchEvent(new ReinEvent(ReinEvent.REIN_BOSS_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    ReinModel.prototype.getCheckCanRein = function () {
        var level = Manager.model.self.attrInfo.zhuanshu;
        if (level == ReinCVO.maxLevel)
            return false;
        var allFinish = true;
        var reinCvo = ReinCVO.getCvo(level);
        if (!reinCvo.loss.isEnough())
            allFinish = false;
        else {
            for (var i = 0; i < reinCvo.condArr.length; i++) {
                if (!reinCvo.condArr[i].isSatisfy()) {
                    allFinish = false;
                    break;
                }
            }
        }
        // if(!reinCvo.loss.isEnough()) allFinish = false;
        return allFinish;
    };
    return ReinModel;
}(egret.EventDispatcher));
__reflect(ReinModel.prototype, "ReinModel");
//# sourceMappingURL=ReinModel.js.map