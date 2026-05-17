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
 * 缥缈录地图
 * Simon
 * 2018.3.14
 */
var MaterialMapView = (function (_super) {
    __extends(MaterialMapView, _super);
    function MaterialMapView(thisParent) {
        var _this = _super.call(this) || this;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("material", "MaterialMapViewSkin");
        return _this;
    }
    MaterialMapView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this.width = MaterialMapView.MAPIMG_WIDTH;
        this.height = MaterialMapView.MAPIMG_HEIGHT;
        this._smallMap = Manager.pool.create(BitmapRemote);
        this._smallMap.x = 0;
        this._smallMap.y = 0;
        this._smallMap.load(Manager.path.getPanelMaterialPath("material_smallMap", "jpg"), MaterialMapView.MAPIMG_WIDTH, MaterialMapView.MAPIMG_HEIGHT);
        this.addChild(this._smallMap);
        this._bgImgList = [];
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 11; j++) {
                var bgImg = Manager.pool.create(BitmapRemote);
                bgImg.x = j * 256;
                bgImg.y = i * 256;
                this.addChild(bgImg);
                bgImg.load(Manager.path.getPanelMaterialPath("bgImgs/" + i + "_" + j, "jpg"));
                this._bgImgList.push(bgImg);
            }
        }
        this.onMapLoadComplete();
    };
    MaterialMapView.prototype.onMapLoadComplete = function () {
        this._thisParent.onMapLoadComplete();
    };
    MaterialMapView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._smallMap)
            Manager.pool.push(this._smallMap);
        this._smallMap = null;
        if (this._bgImgList) {
            for (var i = 0; i < this._bgImgList.length; i++) {
                if (this._bgImgList[i])
                    Manager.pool.push(this._bgImgList[i]);
                this._bgImgList[i] = null;
            }
            this._bgImgList = null;
        }
        this._thisParent = null;
    };
    MaterialMapView.MAPIMG_WIDTH = 2758;
    MaterialMapView.MAPIMG_HEIGHT = 1544;
    return MaterialMapView;
}(UIComponent));
__reflect(MaterialMapView.prototype, "MaterialMapView");
//# sourceMappingURL=MaterialMapView.js.map