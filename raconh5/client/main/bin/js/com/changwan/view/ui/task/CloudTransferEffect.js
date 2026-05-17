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
 * 云转场效果
 * liangyan
 * create 2018-03-06
*/
var CloudTransferEffect = /** @class */ (function (_super) {
    __extends(CloudTransferEffect, _super);
    function CloudTransferEffect() {
        var _this = _super.call(this) || this;
        _this.CLOUD_WIDTH = 512;
        _this.skinName = "";
        return _this;
    }
    CloudTransferEffect.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    CloudTransferEffect.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CloudTransferEffect.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    CloudTransferEffect.prototype.initData = function () {
        this.onResizeHandler(null);
    };
    CloudTransferEffect.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    CloudTransferEffect.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    CloudTransferEffect.prototype.drawLayout = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this._cloud0, { loop: false }).to({ x: Manager.global.gameMain.stage.stageWidth }, 2000);
        egret.Tween.get(this._cloud1, { loop: false }).to({ x: Manager.global.gameMain.stage.stageWidth }, 2000);
        egret.Tween.get(this._cloud2, { loop: false }).to({ x: -this.CLOUD_WIDTH * 10 }, 2000).call(Manager.view.hide, Manager.view, [118 /* CloudTransferEffect */]);
    };
    CloudTransferEffect.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
        this.height = Manager.global.gameMain.stage.stageHeight;
    };
    CloudTransferEffect.prototype.show = function () {
        if (!this.parent)
            Manager.layer.uiLayer.addChild(this);
        var path = Manager.path.getTaskPath("cloud/cloud.png");
        this._cloud0 = Manager.pool.create(BitmapRemote, path);
        this._cloud0.scaleX = this._cloud0.scaleY = 3;
        this._cloud0.x = -this.CLOUD_WIDTH * 3;
        this._cloud0.y = -300;
        this.addChild(this._cloud0);
        this._cloud1 = Manager.pool.create(BitmapRemote, path);
        this._cloud1.scaleX = this._cloud1.scaleY = 10;
        this._cloud1.x = -this.CLOUD_WIDTH * 10;
        this._cloud1.y = 0;
        this.addChild(this._cloud1);
        this._cloud2 = Manager.pool.create(BitmapRemote, path);
        this._cloud2.scaleX = this._cloud2.scaleY = 20;
        this._cloud2.x = this.CLOUD_WIDTH * 2;
        this._cloud2.y = -2000;
        this.addChild(this._cloud2);
    };
    CloudTransferEffect.prototype.hide = function () {
        Manager.control.getMap().cmdEnterMap(MapConst.ID_ROOKIE_STORY_II);
        if (this.parent)
            this.dispose();
    };
    CloudTransferEffect.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this);
        ObjectUtil.removes(this._cloud0, this._cloud1, this._cloud2);
        if (this._cloud0)
            Manager.pool.push(this._cloud0);
        this._cloud0 = null;
        if (this._cloud1)
            Manager.pool.push(this._cloud1);
        this._cloud1 = null;
        if (this._cloud2)
            Manager.pool.push(this._cloud2);
        this._cloud2 = null;
    };
    return CloudTransferEffect;
}(UIComponent));
//# sourceMappingURL=CloudTransferEffect.js.map