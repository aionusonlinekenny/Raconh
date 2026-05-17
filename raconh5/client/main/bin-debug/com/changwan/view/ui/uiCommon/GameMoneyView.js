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
 * 货币视图 1:铜钱 2:经验 3:元宝
 * liangyan
 * create 2017-11-22
*/
var GameMoneyView = (function (_super) {
    __extends(GameMoneyView, _super);
    function GameMoneyView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameMoneyViewSkin";
        return _this;
    }
    GameMoneyView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    GameMoneyView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
        this.drawData();
    };
    GameMoneyView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    GameMoneyView.prototype.drawLayout = function () {
        var name;
        switch (this._moneyType) {
            case 1:
                name = "playRes_coin_54_png";
                break;
            case 2:
                name = "playRes_exp_54_png";
                break;
            case 3:
                name = "playRes_gold_54_png";
                break;
            default:
                name = "";
                break;
        }
        this._icon.source = name;
    };
    GameMoneyView.prototype.drawData = function () {
        this._txt.textColor = this._color;
        var numStr = this._txt.text;
        if (numStr != "< 1") {
            if (this._wordsFormat)
                numStr = this.setWordsFormat(this._num);
            else
                numStr = "" + this._num;
        }
        this._txt.text = "  " + numStr;
        this.width = this._txt.x + this._txt.width;
    };
    GameMoneyView.prototype.setWordsFormat = function (num) {
        if (num < 10000)
            return "" + num;
        if (num >= 100000000)
            return (num / 100000000).toFixed(num % 100000000 == 0 ? 0 : 1) + "亿";
        return (num / 10000).toFixed(num % 10000 == 0 ? 0 : 1) + "万";
    };
    GameMoneyView.prototype.setNum = function (value, color) {
        if (color === void 0) { color = Color.WHITE; }
        if (this._num == value && this._color == color)
            return;
        this._num = value;
        this._color = color;
        this.invalidate(InvalidationType.DATA);
    };
    Object.defineProperty(GameMoneyView.prototype, "num", {
        get: function () {
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    GameMoneyView.prototype.reuse = function (moneyType, wordsFormat) {
        if (wordsFormat === void 0) { wordsFormat = true; }
        this._moneyType = moneyType;
        this._wordsFormat = wordsFormat;
        this._num = -1;
        this._color = -1;
        _super.prototype.reuse.call(this);
    };
    GameMoneyView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        // this._icon.bitmapData = null;
        // this._icon = null;
        // this._txt.dispose();
        // this._txt = null;
    };
    GameMoneyView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._icon, this._txt);
        this._icon.bitmapData = null;
        this._icon = null;
        this._txt.dispose();
        this._txt = null;
    };
    return GameMoneyView;
}(UIComponent));
__reflect(GameMoneyView.prototype, "GameMoneyView");
//# sourceMappingURL=GameMoneyView.js.map