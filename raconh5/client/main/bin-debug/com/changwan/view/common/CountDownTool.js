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
 *author Anydo
 *create 2018-1-4
 *description
*/
var CountDownTool = (function (_super) {
    __extends(CountDownTool, _super);
    function CountDownTool() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("common", "CountDownToolSkin");
        return _this;
    }
    CountDownTool.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    CountDownTool.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CountDownTool.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    CountDownTool.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    CountDownTool.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    CountDownTool.prototype.drawLayout = function () {
        if (!this._circleAni) {
            this._circleAni = Manager.animation.createEffectAnimation("circle");
            this._circleAni.x = 205;
            this._circleAni.y = 425;
            this.addChild(this._circleAni);
        }
        if (!this._num) {
            this._num = Manager.pool.create(NumImgView2);
            this.addChild(this._num);
        }
        this._picLabel.source = this._labelName;
        if (!this._life || this._life <= 0)
            return;
        this.setSecondValue();
    };
    CountDownTool.prototype.setSecondValue = function () {
        if (this._num == null)
            return;
        this._num.setValue(this._life, "nums_cd_", 25);
        this._num.x = (690 - this._num.width) / 2; //this._numBack.x + (this._numBack.width - this._num.width) / 2 - 10;
        this._num.y = 546; //this._numBack.y + (this._numBack.height - 74) / 2;
    };
    CountDownTool.prototype.countdown = function () {
        this._life--;
        if (this._life <= 0) {
            // Manager.render.remove(this.countdown, this);
            if (this._callback)
                this._callback.call(this._callbackTarget);
            Manager.view.hide(67 /* CountDownTool */);
        }
        else {
            this.setSecondValue();
        }
    };
    CountDownTool.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    CountDownTool.prototype.show = function (life, labelName, callback, callbackTarget) {
        var _this = this;
        if (!this.parent) {
            this._life = life;
            this._labelName = labelName;
            this._callback = callback;
            this._callbackTarget = callbackTarget;
            this.invalidate(InvalidationType.LAYOUT);
            // Manager.render.add(this.countdown, this, 1000, 0, null, true);
            window.clearInterval(this._tempTime);
            this._tempTime = window.setInterval(function () { return _this.countdown(); }, 1000);
            Manager.layer.tipsLayer.addChildAt(this, 0);
            this.onResizeHandler(null);
        }
        Manager.view.setModalAlpha(0.3);
    };
    CountDownTool.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    CountDownTool.prototype.dispose = function () {
        // if(Manager.render.contains(this.countdown, this)) Manager.render.remove(this.countdown, this);
        window.clearInterval(this._tempTime);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._circleAni, this._num);
        if (this._circleAni) {
            Manager.pool.push(this._circleAni);
            this._circleAni = null;
        }
        Manager.pool.push(this._num);
        this._num = null;
        Manager.view.setModalAlpha(0.8);
    };
    return CountDownTool;
}(UIComponent));
__reflect(CountDownTool.prototype, "CountDownTool", ["IViewManager"]);
//# sourceMappingURL=CountDownTool.js.map