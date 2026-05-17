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
 * 经验副本model
 * luzh
 * create 2018.1.10
*/
var CopySilverModel = (function (_super) {
    __extends(CopySilverModel, _super);
    function CopySilverModel() {
        var _this = _super.call(this) || this;
        _this._cd = 0; //下次可进入时间戳(秒)
        _this.needGuide = false;
        return _this;
    }
    Object.defineProperty(CopySilverModel.prototype, "totalCount", {
        //总能进入次数
        get: function () {
            return CopyExpConfigCVO.silver_free_count + Manager.model.getCopy().getBuyCount(CopyConst.TYPE_SILVER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopySilverModel.prototype, "leftCount", {
        get: function () {
            var cvo = CopyCVO.getCVO(CopyConst.ID_SILVER);
            return this.totalCount - cvo.enterNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopySilverModel.prototype, "cd", {
        set: function (value) {
            if (this._cd == value)
                return;
            this._cd = value;
            this.dispatchEvent(new CopyEvent(CopyEvent.SILVER_COOLING));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopySilverModel.prototype, "nextLeftTime", {
        get: function () {
            var left = this._cd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    return CopySilverModel;
}(egret.EventDispatcher));
__reflect(CopySilverModel.prototype, "CopySilverModel");
//# sourceMappingURL=CopySilverModel.js.map