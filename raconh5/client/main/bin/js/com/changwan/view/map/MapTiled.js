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
 * 地图块
 */
var MapTiled = /** @class */ (function (_super) {
    __extends(MapTiled, _super);
    function MapTiled() {
        var _this = _super.call(this) || this;
        _this.col = 0;
        _this.row = 0;
        _this.tempDis = 0;
        _this.loadStep = 0;
        return _this;
    }
    MapTiled.prototype.load = function () {
        if (this.loadStep > 0)
            return;
        this.loadStep = 1;
        Manager.loader.load(this._path, this.onLoadImgComplete, this, ResourceGCType.MAP);
    };
    MapTiled.prototype.onLoadImgComplete = function (loader) {
        // this.disposeBitmapData();
        this.loadStep = 2;
        if (this._texture != null) {
            Manager.pool.push(this._texture);
            this._texture = null;
        }
        this.texture = null;
        this.bitmapData = loader.data;
    };
    MapTiled.prototype.unuse = function () {
        Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        this.col = 0;
        this.row = 0;
        this._path = null;
        this.disposeBitmapData();
        this.loadStep = 0;
        if (this.parent != null)
            this.parent.removeChild(this);
    };
    MapTiled.prototype.reuse = function (row, col) {
        this.show = false;
        this.loadStep = 0;
        this.row = row;
        this.col = col;
        this._path = Manager.path.getMapPath(Manager.model.getMap().mapCVO.res, this.row, this.col);
        this.x = Manager.config.tiledMapSize * this.col;
        this.y = Manager.config.tiledMapSize * this.row;
    };
    MapTiled.prototype.setMosic = function (smallMap) {
        this._texture = Manager.pool.create(egret.Texture);
        this._texture.bitmapData = smallMap;
        var temp = Manager.config.tiledMapSize;
        this._texture.$initData(this.col * temp, this.row * temp, temp, temp, 0, 0, temp, temp, smallMap.width * 10, smallMap.height * 10);
        this.texture = this._texture;
    };
    MapTiled.prototype.disposeBitmapData = function () {
        // this.texture = null;
        // this._texture = null;
        // this.bitmapData = null;
        // if(this.bitmapData != null)this.bitmapData.$dispose();
        if (this._texture != null)
            Manager.pool.push(this._texture);
        this._texture = null;
        this.texture = null;
        this.bitmapData = null;
    };
    MapTiled.prototype.dispose = function () {
        Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        if (this.parent != null)
            this.parent.removeChild(this);
        this._path = null;
        this.disposeBitmapData();
    };
    return MapTiled;
}(egret.Bitmap));
//# sourceMappingURL=MapTiled.js.map