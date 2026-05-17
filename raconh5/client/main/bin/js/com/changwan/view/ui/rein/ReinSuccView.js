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
 * 转生成功动画
 * liangyan
 * create 2017-12-15
*/
var ReinSuccView = /** @class */ (function (_super) {
    __extends(ReinSuccView, _super);
    function ReinSuccView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("rein", "ReinSuccViewSkin");
        return _this;
    }
    ReinSuccView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    ReinSuccView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ReinSuccView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ReinSuccView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        // this.onResizeHandler(null);
    };
    ReinSuccView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    };
    ReinSuccView.prototype.close = function () {
        Manager.render.remove(this.close, this);
        Manager.view.hide(43 /* ReinSuccView */);
    };
    ReinSuccView.prototype.playEff = function () {
        this._index++;
        if (this._index == 3) {
            Manager.render.remove(this.playEff, this);
            if (this._succ)
                Manager.pool.push(this._succ);
            this._succ = Manager.animation.createEffectAnimation("reinSucc", 0, true, true);
            this.addChild(this._succ);
        }
    };
    ReinSuccView.prototype.miss = function () {
        egret.Tween.get(this._bmp, { loop: false }).to({ x: 70, alpha: 0 }, 1000).call(this.missCallback, this);
    };
    ReinSuccView.prototype.missCallback = function () {
        Manager.render.add(this.close, this, 0, 1);
    };
    ReinSuccView.prototype.showCallback = function () {
        Manager.render.add(this.miss, this, 500, 1);
    };
    ReinSuccView.prototype.show = function () {
        if (!this.parent) {
            Manager.layer.tipsLayer.addChild(this);
            Manager.control.getMap().view.setShake(0, 2000, 10);
            this.onResizeHandler(null);
            this._bmp.load(Manager.path.getReinPath("rein_succ_" + Manager.model.self.attrInfo.career + "00" + (Manager.model.self.attrInfo.zhuanshu + 2), Extension.PNG));
            this._bmp.x = -300;
            this._bmp.y = 130;
            egret.Tween.get(this._bmp, { loop: false }).to({ x: 0 }, 800).call(this.showCallback, this);
            if (this._eff)
                Manager.pool.push(this._eff);
            this._eff = Manager.animation.createEffectAnimation("reinEff", 0, true, true);
            this.addChildAt(this._eff, 0);
            this._index = 0;
            Manager.render.add(this.playEff, this);
        }
    };
    ReinSuccView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    ReinSuccView.prototype.dispose = function () {
        if (Manager.render.contains(this.close, this))
            Manager.render.remove(this.close, this);
        if (Manager.render.contains(this.playEff, this))
            Manager.render.remove(this.playEff, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bmp, this._eff, this._succ);
        this._bmp.dispose();
        this._bmp = null;
        if (this._eff)
            Manager.pool.push(this._eff);
        this._eff = null;
        if (this._succ)
            Manager.pool.push(this._succ);
        this._succ = null;
    };
    return ReinSuccView;
}(UIComponent));
//# sourceMappingURL=ReinSuccView.js.map