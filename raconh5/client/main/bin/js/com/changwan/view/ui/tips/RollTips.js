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
 * 滚动提示框
 * pzx
 * create 18-3-7
 */
var RollTips = /** @class */ (function (_super) {
    __extends(RollTips, _super);
    // private _disPlay:egret.DisplayObjectContainer;
    function RollTips() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "RollTipSkin");
        _this.visible = false;
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    RollTips.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    RollTips.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    RollTips.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    RollTips.prototype.drawData = function () {
        if (this._vers == RollTips.verseList[0]) {
            this._descTxt.text = LangCVO.getContent("task5"); //最强群攻 全屏大招
        }
        else if (this._vers == RollTips.verseList[1]) {
            this._descTxt.text = LangCVO.getContent("task6"); //天下绝学 世出凌烟
        }
        this.visible = true;
    };
    RollTips.prototype.show = function (target, n) {
        if (!target || !target.parent)
            return;
        // this._disPlay = target;
        this._vers = n;
        if (this._vers == RollTips.verseList[0]) {
            RollTips.openPanel5 = true;
            this.x = 111;
            this.y = 193;
        }
        else if (this._vers == RollTips.verseList[1]) {
            RollTips.openPanel10 = true;
            this.x = 23;
            this.y = 80;
        }
        target.addChild(this);
        this.starToweenPaly();
        //Manager.layer.tipsLayer.addChild(this);
    };
    RollTips.prototype.starToweenPaly = function () {
        egret.Tween.removeTweens(this);
        this._starY = this.y;
        this._endY = this.y + 23;
        this.starTween();
    };
    RollTips.prototype.starTween = function () {
        egret.Tween.get(this, { loop: false }).to({ y: this._endY }, 600).call(this.star2Tween, this);
    };
    RollTips.prototype.star2Tween = function () {
        egret.Tween.get(this, { loop: false }).to({ y: this._starY }, 600).call(this.starTween, this);
    };
    RollTips.prototype.hide = function () {
        this.dispose();
    };
    RollTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this);
        this.removeChild(this._bgImg);
        this._bgImg = null;
        this._descTxt.dispose();
        this._descTxt = null;
    };
    //最强群攻文字长度：最强群攻 全屏大招  第15关任务开启
    //凌烟阁文字：天下绝学 世出凌烟  第10关任务开启
    RollTips.verseList = [16, 10];
    return RollTips;
}(UIComponent));
//# sourceMappingURL=RollTips.js.map