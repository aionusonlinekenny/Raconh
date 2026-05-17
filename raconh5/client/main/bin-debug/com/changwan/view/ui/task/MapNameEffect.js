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
 * 地图名字特效
 * liangyan
 * create 2018-03-06
*/
var MapNameEffect = (function (_super) {
    __extends(MapNameEffect, _super);
    function MapNameEffect() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("task", "MapNameEffectSkin");
        return _this;
    }
    MapNameEffect.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    MapNameEffect.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    MapNameEffect.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MapNameEffect.prototype.initData = function () {
        this.onResizeHandler(null);
    };
    MapNameEffect.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    MapNameEffect.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    MapNameEffect.prototype.drawLayout = function () {
        Manager.render.add(this.render, this);
    };
    MapNameEffect.prototype.hidePnl = function () {
        Manager.render.remove(this.hidePnl, this);
        Manager.view.hide(120 /* MapNameEffect */);
    };
    MapNameEffect.prototype.onResizeHandler = function (e) {
        this.x = Manager.global.gameMain.stage.stageWidth * 0.7;
        this.y = Manager.global.gameMain.stage.stageHeight * 0.3;
    };
    MapNameEffect.prototype.render = function (interval) {
        if (this._mask.y >= this._miss.y + 200) {
            Manager.render.remove(this.render, this);
            this._miss.gotoAndPlay(2);
            Manager.render.add(this.hidePnl, this, 2100, 1, null, true);
            return;
        }
        this._mask.y += 1;
    };
    MapNameEffect.prototype.show = function () {
        if (!this.parent)
            Manager.layer.tipsLayer.addChild(this);
        this._miss = Manager.animation.createEffectAnimation("longmen", 0, true, true);
        this._miss.x = -80;
        this._miss.y = -22;
        this._miss.gotoAndStop(1);
        this.addChild(this._miss);
        // this._mask = Manager.pool.create(egret.Shape);
        // this._mask.graphics.beginFill(0, 1);
        this._mask = new egret.Rectangle(this._miss.x + 130, this._miss.y - 100, 60, 200);
        // this._mask.graphics.endFill();
        // this.addChild(this._mask);
        this._miss.mask = this._mask;
    };
    MapNameEffect.prototype.hide = function () {
        Manager.model.getTask().parseStep(RookieConst.FIRST_ID);
        if (this.parent)
            this.dispose();
    };
    MapNameEffect.prototype.dispose = function () {
        if (Manager.render.contains(this.hidePnl, this))
            Manager.render.remove(this.hidePnl, this);
        if (Manager.render.contains(this.render, this))
            Manager.render.remove(this.render, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._miss);
        if (this._back)
            this._back.bitmapData = null;
        this._back = null;
        if (this._miss)
            Manager.pool.push(this._miss);
        this._miss = null;
        // if(this._mask) Manager.pool.push(this._mask);
        this._mask = null;
    };
    return MapNameEffect;
}(UIComponent));
__reflect(MapNameEffect.prototype, "MapNameEffect", ["IViewManager"]);
//# sourceMappingURL=MapNameEffect.js.map