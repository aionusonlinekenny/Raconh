/**
 * 摄像头管理器
 * 这里所有的尺寸，x,y值均是以地图的左下角(0,0)点为参考，也就是说都不会小于0，当玩家移动的时候相当于移动的是seeRect。
 * seeRect:当前实际看到的视角尺寸，就是玩家所见到实际尺寸，长宽为游戏屏幕的大小，不会更改。
 * seeRectRC:地图块大小的视角尺寸seeRectRC，不会小于seeRect。
 * mapSeeRect:地图大图片的实际尺寸，每次更新地图时会更新长宽，但x,y始终为0
 * centerRect:中心的矩形区域，在此区域内移动时，地图块不会更新。
 */
var CameraManager = /** @class */ (function () {
    function CameraManager() {
        this._seeRect = new egret.Rectangle(0, 0, Manager.global.gameMain.stage.stageWidth, Manager.global.gameMain.stage.stageHeight);
        this._seeRectRC = new egret.Rectangle(0, 0, 0, 0);
        this._focus = new egret.Point(0, 0);
        this._mapSeeRect = new egret.Rectangle(0, 0, 0, 0);
        this._centerRect = new egret.Rectangle(this._seeRect.width >> 1, this._seeRect.height >> 1, 100, 100);
    }
    CameraManager.prototype.updateSize = function () {
        this._seeRect.width = Manager.global.gameMain.stage.stageWidth;
        this._seeRect.height = Manager.global.gameMain.stage.stageHeight;
        this._centerRect.x = this._seeRect.x + ((this._seeRect.width - this._centerRect.width) >> 1);
        this._centerRect.y = this._seeRect.y + ((this._seeRect.height - this._centerRect.height) >> 1);
    };
    CameraManager.prototype.setFocus = function (x, y) {
        if (this._centerRect.x != x || this._centerRect.y != y) {
            var centerX = (x <= this._centerRect.x) ? this._centerRect.x : (this._centerRect.x + this._centerRect.width);
            var centerY = (y <= this._centerRect.y) ? this._centerRect.y : (this._centerRect.y + this._centerRect.height);
            this._seeRect.x += (x - centerX);
            this._seeRect.y += (y - centerY);
            var max = Math.max(0, this._mapSeeRect.width - this._seeRect.width);
            this._seeRect.x = cw.MathUtil.clamb(0, max, this._seeRect.x);
            max = Math.max(0, this._mapSeeRect.height - this._seeRect.height);
            this._seeRect.y = cw.MathUtil.clamb(0, max, this._seeRect.y);
            this._centerRect.x = this._seeRect.x + ((this._seeRect.width - this._centerRect.width) >> 1);
            this._centerRect.y = this._seeRect.y + ((this._seeRect.height - this._centerRect.height) >> 1);
        }
    };
    CameraManager.prototype.getSeeRect = function () {
        return this._seeRect;
    };
    CameraManager.prototype.getCenterRect = function () {
        return this._centerRect;
    };
    /**
     * 更新游戏视角位置
     */
    CameraManager.prototype.updateSeeRect = function (x, y) {
        this._seeRect.x = x;
        this._seeRect.y = y;
    };
    /**
     * 更新游戏视角
     */
    CameraManager.prototype.updateSeeRectRC = function (x, y, width, height) {
        this._seeRectRC.x = x;
        this._seeRectRC.y = y;
        this._seeRectRC.width = width;
        this._seeRectRC.height = height;
    };
    CameraManager.prototype.updateMapSeeRect = function (width, height) {
        this._mapSeeRect.width = width;
        this._mapSeeRect.height = height;
    };
    CameraManager.prototype.getMapSeeRect = function () {
        return this._mapSeeRect;
    };
    /**
     * 是否更新瓦片地图块
     */
    CameraManager.prototype.needUpdateTiled = function () {
        if (!(this._seeRectRC.x == this._seeRect.x && this._seeRectRC.y == this._seeRect.y))
            return true;
        else
            return false;
    };
    return CameraManager;
}());
//# sourceMappingURL=CameraManager.js.map