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
 * 爬塔副本boss出现动画
 * liangyan
 * create 2017-12-28
*/
var TowerCopyBossView = (function (_super) {
    __extends(TowerCopyBossView, _super);
    function TowerCopyBossView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "TowerCopyBossViewSkin");
        return _this;
    }
    TowerCopyBossView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._back.load(Manager.path.getActivityPath("copy_tower_boss_back.png"));
        this._word.load(Manager.path.getActivityPath("copy_tower_boss_word.png"));
        this._back.alpha = 0;
        this._back.x = -720;
        this._word.alpha = 0;
        egret.Tween.get(this._back).to({ alpha: 1, x: 0 }, 300, egret.Ease.circOut).call(this.tweenCallback1, this);
    };
    TowerCopyBossView.prototype.tweenCallback1 = function () {
        egret.Tween.get(this._word).to({ alpha: 1 }, 200)
            .to({ alpha: 0 }, 200)
            .to({ alpha: 1 }, 200)
            .to({ alpha: 0 }, 200)
            .to({ alpha: 1 }, 200).wait(200).call(this.tweenCallback2, this);
    };
    TowerCopyBossView.prototype.tweenCallback2 = function () {
        Manager.view.hide(63 /* TowerCopyBossView */);
    };
    TowerCopyBossView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    TowerCopyBossView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    TowerCopyBossView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
        // this.width = Manager.global.gameMain.stage.stageWidth;
    };
    TowerCopyBossView.prototype.show = function () {
        if (!this.parent) {
            Manager.layer.tipsLayer.addChild(this);
            // Manager.control.getMap().view.setShake(0, 3000, 10);
            this.onResizeHandler(null);
        }
    };
    TowerCopyBossView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    TowerCopyBossView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._word);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._word);
        this._back = null;
        this._word = null;
    };
    return TowerCopyBossView;
}(UIComponent));
__reflect(TowerCopyBossView.prototype, "TowerCopyBossView", ["IViewManager"]);
//# sourceMappingURL=TowerCopyBossView.js.map