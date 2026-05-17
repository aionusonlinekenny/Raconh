var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图视图
 */
var MapView = (function () {
    // private _path:PathInfo;
    // private _clipBounds:egret.Rectangle;
    function MapView(control, model) {
        this._control = control;
        this._model = model;
        this._tileds = {};
        // this._clipBounds = new egret.Rectangle(0,0,Manager.config.tiledMapSize * 0.1,Manager.config.tiledMapSize * 0.1);
        Manager.render.add(this.render, this);
        this._shakeInterval = 0;
        this._inShaking = false;
    }
    MapView.prototype.resetSmallMap = function (smallMap) {
        // if(this._smallMap != null)
        // {
        //     Manager.pool.push(this._smallMap);
        //     this._smallMap = null;
        // }
        // this._smallMap = Manager.pool.create(egret.Bitmap);
        // this._smallMap.texture = smallMap;
        this._smallMap = smallMap;
    };
    MapView.prototype.reset = function (smallMap) {
        this._initialize = true;
        this._updatePosition = false;
        for (var key in this._tileds) {
            Manager.pool.push(this._tileds[key]);
            delete this._tileds[key];
        }
        this.resetShake();
        this.resetSmallMap(smallMap);
    };
    MapView.prototype.render = function () {
        if (this._inShaking) {
            if (this._shakeLeftTime > 0) {
                if (!this._updatePosition)
                    this.shake(Manager.global.FRAME_TIME);
            }
            else
                this.resetShake();
        }
        if (this._updatePosition) {
            this._updatePosition = false;
            this.drawTiles();
        }
    };
    MapView.prototype.drawTiles = function () {
        if (Manager.camera.needUpdateTiled() || this._initialize) {
            this._initialize = false;
            var row = Math.floor(Manager.camera.getSeeRect().y / Manager.config.tiledMapSize);
            var col = Math.floor(Manager.camera.getSeeRect().x / Manager.config.tiledMapSize);
            var seeRectRow = Manager.camera.getMapSeeRect().height - Manager.camera.getSeeRect().y;
            var seeRectCol = Manager.camera.getMapSeeRect().width - Manager.camera.getSeeRect().x;
            var cameraRowHeight = seeRectRow < Manager.camera.getSeeRect().height ? seeRectRow : Manager.camera.getSeeRect().height;
            var cameraColWidth = seeRectCol < Manager.camera.getSeeRect().width ? seeRectCol : Manager.camera.getSeeRect().width;
            var endRow = Math.ceil((Manager.camera.getSeeRect().y + cameraRowHeight) / Manager.config.tiledMapSize);
            var endCol = Math.ceil((Manager.camera.getSeeRect().x + cameraColWidth) / Manager.config.tiledMapSize);
            Manager.camera.updateSeeRectRC(col * Manager.config.tiledMapSize, row * Manager.config.tiledMapSize, (endCol - col) * Manager.config.tiledMapSize, (endRow - row) * Manager.config.tiledMapSize);
            var midRow = row + Math.floor((endRow - row) / 2);
            var midCol = col + Math.floor((endCol - col) / 2);
            for (var key in this._tileds) {
                this._tileds[key].show = false;
            }
            var keys = 0;
            var tiled = null;
            for (var i = row; i < endRow; i++) {
                for (var j = col; j < endCol; j++) {
                    keys = i * 1000 + j;
                    tiled = this._tileds[keys];
                    if (tiled == null) {
                        tiled = Manager.pool.create(MapTiled, i, j);
                        this._tileds[keys] = tiled;
                        if (tiled.bitmapData == null)
                            this.setMosic(tiled);
                        // tiled.load();
                    }
                    tiled.show = true;
                }
            }
            // for (let key in this._tileds) this._tileds[key].draw();
            for (var key in this._tileds) {
                tiled = this._tileds[key];
                if (tiled.show && tiled.parent == null) {
                    if (tiled.loadStep == 0)
                        tiled.load();
                    Manager.layer.mapLayer.addChild(tiled);
                }
                else if (!tiled.show && tiled.parent != null) {
                    tiled.parent.removeChild(tiled);
                }
            }
        }
    };
    MapView.prototype.setMosic = function (tiled) {
        if (this._smallMap == null)
            return;
        // this._clipBounds.x = tiled.col * Manager.config.tiledMapSize * 0.01;
        // this._clipBounds.y = tiled.row * Manager.config.tiledMapSize * 0.01;
        tiled.setMosic(this._smallMap);
    };
    MapView.prototype.setCenter = function (x, y) {
        this._updatePosition = true;
        Manager.camera.setFocus(x, y);
        var rect = Manager.camera.getSeeRect();
        Manager.layer.moveMapPos(-rect.x, -rect.y);
        if (this._inShaking) {
            this._mapLayerP = new egret.Point(-rect.x, -rect.y);
            this.shake(Manager.global.FRAME_TIME_60);
        }
    };
    /**
     * 设置震屏
     * @param delayTime 震屏延迟 单位毫秒
     * @param shakeTime 震屏时间
     * @param shakeH    震屏高度
     * @param onlyY     只有Y震屏
     */
    MapView.prototype.setShake = function (delayTime, shakeTime, shakeH, onlyY) {
        if (delayTime === void 0) { delayTime = 0; }
        if (shakeTime === void 0) { shakeTime = 300; }
        if (shakeH === void 0) { shakeH = 5; }
        if (onlyY === void 0) { onlyY = false; }
        if (this._inShaking)
            this.resetShake();
        this._shakeIndex = 0;
        this._shakeTime = shakeTime;
        this._shakeLeftTime = shakeTime;
        this._shakeH = shakeH;
        this._shakeW = shakeH * 1.8;
        this._onlyY = onlyY;
        this._mapLayerP = new egret.Point(Manager.layer.mapLayer.x, Manager.layer.mapLayer.y);
        if (delayTime == 0)
            this._inShaking = true;
        else if (delayTime > 0)
            Manager.render.add(this.startShake, this, delayTime, 1, null, true);
    };
    /**开始震屏 */
    MapView.prototype.startShake = function () {
        Manager.render.remove(this.startShake, this);
        this._inShaking = true;
    };
    /**
     * 停止震屏
     */
    MapView.prototype.stopShake = function () {
        this.resetShake();
    };
    /**震屏 */
    MapView.prototype.shake = function (interval) {
        this._shakeLeftTime -= interval;
        this._shakeInterval++;
        if (this._shakeInterval > 2) {
            this._shakeInterval = 0;
            if (this._shakeLeftTime <= 0) {
                Manager.layer.moveMapPos(this._mapLayerP.x, this._mapLayerP.y);
            }
            else {
                this._shakeIndex++;
                var rangeH = Manager.layer.mapLayer.y + this._shakeH * Math.random(); //(this._shakeLeftTime / this._shakeTime) *
                var rangeW = Manager.layer.mapLayer.x + this._shakeW * Math.random();
                if ((this._shakeIndex % 2) == 0) {
                    rangeH = Manager.layer.mapLayer.y - this._shakeH * Math.random() * 2;
                    rangeW = Manager.layer.mapLayer.x - this._shakeW * Math.random() * 2;
                }
                if (this._onlyY) {
                    Manager.layer.moveMapY(rangeH);
                }
                else {
                    Manager.layer.moveMapPos(rangeW, rangeH);
                }
            }
        }
    };
    /**重置震屏 */
    MapView.prototype.resetShake = function () {
        if (Manager.render.contains(this.startShake, this))
            Manager.render.remove(this.startShake, this);
        this._inShaking = false;
        this._shakeLeftTime = this._shakeInterval = 0;
        if (this._mapLayerP)
            Manager.layer.moveMapPos(this._mapLayerP.x, this._mapLayerP.y);
    };
    return MapView;
}());
__reflect(MapView.prototype, "MapView");
//# sourceMappingURL=MapView.js.map