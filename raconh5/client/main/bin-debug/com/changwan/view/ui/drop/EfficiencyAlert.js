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
 * 掉落珍稀物品弹出框
 * luzhihong
 * create 2017-11-20
 */
var EfficiencyAlert = (function (_super) {
    __extends(EfficiencyAlert, _super);
    function EfficiencyAlert() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("drop", "EfficiencyAlertSkin");
        _this.touchEnabled = false;
        return _this;
    }
    EfficiencyAlert.prototype.reuse = function (lastSilver, lastExp, curSilver, curExp) {
        this.unuse();
        _super.prototype.reuse.call(this);
        this._txtSilver0.text = GameUtil.getNumShortStr(lastSilver);
        this._txtExp0.text = GameUtil.getNumShortStr(lastExp);
        HtmlUtil.setTextFlow(this._txtSilver1, HtmlUtil.addColorTag(GameUtil.getNumShortStr(curSilver), Color.GREEN_STR) + LangCVO.getContent("common35")); //分钟
        HtmlUtil.setTextFlow(this._txtExp1, HtmlUtil.addColorTag(GameUtil.getNumShortStr(curExp), Color.GREEN_STR) + LangCVO.getContent("common35")); //分钟
        Manager.layer.tipsLayer.addChild(this);
        this._back.width = 100;
        this._title.alpha = this._group0.alpha = this._group1.alpha = this._group2.alpha = this._group3.alpha = 0;
        //停留时间
        var stayTime = 1000;
        egret.Tween.get(this._back).to({ width: 480 }, 200)
            .wait(stayTime + 700).to({ width: 100 }, 200)
            .call(this.callback, this);
        egret.Tween.get(this._title).wait(200).to({ alpha: 1 }, 150)
            .wait(stayTime + 400).to({ alpha: 0 }, 150);
        egret.Tween.get(this._group0).wait(400).to({ alpha: 1 }, 200)
            .wait(stayTime - 200).to({ alpha: 0 }, 200);
        egret.Tween.get(this._group1).wait(500).to({ alpha: 1 }, 200)
            .wait(stayTime - 200).to({ alpha: 0 }, 200);
        egret.Tween.get(this._group2).wait(600).to({ alpha: 1 }, 200)
            .wait(stayTime - 200).to({ alpha: 0 }, 200);
        egret.Tween.get(this._group3).wait(700).to({ alpha: 1 }, 200)
            .wait(stayTime - 200).to({ alpha: 0 }, 200);
    };
    EfficiencyAlert.prototype.callback = function () {
        Manager.control.getDrop().hideEfficiencyAlert();
    };
    EfficiencyAlert.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        egret.Tween.removeTweens(this._group0);
        egret.Tween.removeTweens(this._group1);
        egret.Tween.removeTweens(this._group2);
        egret.Tween.removeTweens(this._group3);
    };
    EfficiencyAlert.prototype.dispose = function () {
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        egret.Tween.removeTweens(this._group0);
        egret.Tween.removeTweens(this._group1);
        egret.Tween.removeTweens(this._group2);
        egret.Tween.removeTweens(this._group3);
        _super.prototype.dispose.call(this);
        this._back = null;
        this._title = null;
        this._txtSilver0.dispose();
        this._txtSilver0 = null;
        this._txtSilver1.dispose();
        this._txtSilver1 = null;
        this._txtExp0.dispose();
        this._txtExp0 = null;
        this._txtExp1.dispose();
        this._txtExp1 = null;
        this._group0 = null;
        this._group1 = null;
        this._group2 = null;
        this._group3 = null;
    };
    return EfficiencyAlert;
}(UIComponent));
__reflect(EfficiencyAlert.prototype, "EfficiencyAlert");
//# sourceMappingURL=EfficiencyAlert.js.map