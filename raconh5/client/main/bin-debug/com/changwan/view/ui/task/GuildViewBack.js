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
 * 引导界面
 * luzh
 * 2018.2.26
 */
var GuildViewBack = (function (_super) {
    __extends(GuildViewBack, _super);
    function GuildViewBack() {
        return _super.call(this) || this;
    }
    GuildViewBack.prototype.start = function () {
        _super.prototype.start.call(this);
        this._centerRect = Manager.pool.create(eui.Image);
        // this._centerRect.source = "task_guild_circle_png";
        this.addChild(this._centerRect);
        this._leftRect = Manager.pool.create(eui.Image);
        // this._leftRect.source = "task_guild_rect_png";
        this.addChild(this._leftRect);
        this._topRect = Manager.pool.create(eui.Image);
        // this._topRect.source = "task_guild_rect_png";
        this.addChild(this._topRect);
        this._rightRect = Manager.pool.create(eui.Image);
        // this._rightRect.source = "task_guild_rect_png";
        this.addChild(this._rightRect);
        this._bottomRect = Manager.pool.create(eui.Image);
        // this._bottomRect.source = "task_guild_rect_png";
        this.addChild(this._bottomRect);
        this.drawRect();
        this.touchEnabled = true;
    };
    GuildViewBack.prototype.drawRect = function () {
        var container = Manager.pool.create(egret.DisplayObjectContainer);
        var rect = Manager.pool.create(egret.Shape);
        rect.graphics.beginFill(0, 0.5);
        rect.graphics.drawRect(-100, -100, 200, 200);
        rect.graphics.endFill();
        container.addChild(rect);
        var circle = Manager.pool.create(egret.Shape);
        circle.graphics.beginFill(0, 1);
        circle.graphics.drawCircle(-0, -0, 45);
        circle.graphics.endFill();
        circle.blendMode = egret.BlendMode.ERASE;
        container.addChild(circle);
        var rt = new RenderTexture();
        rt.drawToTexture(container, new egret.Rectangle(-50, -50, 100, 100));
        this._centerRect.texture = rt;
        rt = new RenderTexture();
        rt.drawToTexture(container, new egret.Rectangle(-100, -100, 50, 50));
        this._leftRect.texture = rt;
        this._topRect.texture = rt;
        this._rightRect.texture = rt;
        this._bottomRect.texture = rt;
    };
    GuildViewBack.prototype.setPos = function (tempX, tempY) {
        tempX = Math.floor(tempX);
        tempY = Math.floor(tempY);
        var halfW = this._centerRect.width / 2;
        var left = tempX - halfW;
        var right = tempX + halfW;
        var top = tempY - halfW;
        var bottom = tempY + halfW;
        this._centerRect.x = left;
        this._centerRect.y = top;
        this._leftRect.x = 0;
        this._leftRect.y = top;
        this._leftRect.width = left;
        this._leftRect.height = bottom - top;
        this._topRect.x = 0;
        this._topRect.y = 0;
        this._topRect.width = Manager.config.gameWidth;
        this._topRect.height = top;
        this._rightRect.x = right;
        this._rightRect.y = top;
        this._rightRect.width = Manager.config.gameWidth - right;
        this._rightRect.height = bottom - top;
        this._bottomRect.x = 0;
        this._bottomRect.y = bottom;
        this._bottomRect.width = Manager.config.gameWidth;
        this._bottomRect.height = Manager.config.gameHeight - bottom;
    };
    GuildViewBack.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._centerRect, this._leftRect, this._topRect, this._rightRect, this._bottomRect);
        this._centerRect = null;
        this._leftRect = null;
        this._topRect = null;
        this._rightRect = null;
        this._bottomRect = null;
    };
    return GuildViewBack;
}(Sprite));
__reflect(GuildViewBack.prototype, "GuildViewBack");
//# sourceMappingURL=GuildViewBack.js.map