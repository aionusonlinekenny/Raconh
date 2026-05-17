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
 *author luzh
 *create 2018-1-16
 *description
*/
var SwitchSceneAni = /** @class */ (function (_super) {
    __extends(SwitchSceneAni, _super);
    function SwitchSceneAni() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("common", "SwitchSceneSkin");
        return _this;
    }
    SwitchSceneAni.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._light0.scaleX = this._light0.scaleY = 0;
        this._light1.scaleX = this._light1.scaleY = 0;
        egret.Tween.get(this._hand0).to({ x: this._hand0.x + 36, y: this._hand0.y + 24 }, 400, egret.Ease.circOut).wait(100)
            .to({ x: this._hand0.x + 45, y: this._hand0.y + 30 }, 150)
            .call(this.setAlphaZero, this, [this._hand0]);
        egret.Tween.get(this._hand1).to({ x: this._hand1.x - 36, y: this._hand1.y - 24 }, 400, egret.Ease.circOut).wait(100)
            .to({ x: this._hand1.x - 45, y: this._hand1.y - 30 }, 150)
            .call(this.setAlphaZero, this, [this._hand1]);
        egret.Tween.get(this._light0).to({ scaleX: 2, scaleY: 2 }, 300, egret.Ease.circOut)
            .to({ scaleX: 1, scaleY: 1 }, 150, egret.Ease.circIn)
            .call(this.setAlphaZero, this, [this._light0]);
        egret.Tween.get(this._light1).wait(400).to({ scaleX: 3, scaleY: 3 }, 300, egret.Ease.circIn)
            .to({ alpha: 0 }, 100, egret.Ease.circIn);
        var backDuration = this._back0.width / 720 * 150;
        egret.Tween.get(this._back0).wait(600).to({ x: this._back0.x - this._back0.width }, backDuration, egret.Ease.circIn);
        egret.Tween.get(this._back1).wait(600).to({ x: this._back1.x + this._back1.width }, backDuration, egret.Ease.circIn)
            .call(this.hideView, this);
    };
    SwitchSceneAni.prototype.setAlphaZero = function (target) {
        target.alpha = 0;
    };
    SwitchSceneAni.prototype.hideView = function () {
        Manager.view.hide(68 /* SwitchSceneAni */);
    };
    SwitchSceneAni.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    SwitchSceneAni.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SwitchSceneAni.prototype.onResizeHandler = function (e) {
        var w = Manager.config.gameWidth;
        var h = Manager.config.gameHeight;
        this.x = Math.round((w - 720) / 2);
        var max = w > h ? w : h;
        this._back0.width = this._back0.height = this._back1.width = this._back1.height = max;
        this._back0.x = -Math.round((max - 720) / 2);
        this._back0.y = -Math.round((max - 1280) / 2);
        this._back1.x = this._back0.x + this._back1.width;
        this._back1.y = this._back0.y + this._back1.height;
    };
    SwitchSceneAni.prototype.show = function () {
        if (!this.parent) {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
    };
    SwitchSceneAni.prototype.hide = function () {
        this.dispose();
    };
    SwitchSceneAni.prototype.dispose = function () {
        egret.Tween.removeTweens(this._hand0);
        egret.Tween.removeTweens(this._hand1);
        egret.Tween.removeTweens(this._light0);
        egret.Tween.removeTweens(this._light1);
        egret.Tween.removeTweens(this._back0);
        egret.Tween.removeTweens(this._back1);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back0, this._back1, this._hand0, this._hand1, this._light0, this._light1, this._group);
        this._back0 = null;
        this._back1 = null;
        this._hand0 = null;
        this._hand1 = null;
        this._light0 = null;
        this._light1 = null;
        this._group = null;
        // let isMainMap:boolean = Manager.model.getMap().mapCVO.isMainMap;
        // if(!isMainMap && !Manager.model.getAuto().autoHook)
        // {
        //     Manager.model.getAuto().autoHook = true;
        // }
    };
    return SwitchSceneAni;
}(UIComponent));
//# sourceMappingURL=SwitchSceneAni.js.map