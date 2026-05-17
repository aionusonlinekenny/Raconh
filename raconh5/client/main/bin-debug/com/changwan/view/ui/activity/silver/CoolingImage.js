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
 *冷却矩形
 *luzh
 *create 2017-3.23
*/
var CoolingImage = (function (_super) {
    __extends(CoolingImage, _super);
    function CoolingImage(radiu) {
        var _this = _super.call(this) || this;
        _this.anchorOffsetX = _this.anchorOffsetY = CoolingImage.ORIGIN_RADIU;
        _this.scaleX = _this.scaleY = radiu / CoolingImage.ORIGIN_RADIU;
        return _this;
    }
    CoolingImage.prototype.setSchedule = function (cur, total) {
        var index = Math.floor(cur / total * CoolingImage.PIC_COUNT);
        if (index > CoolingImage.PIC_COUNT)
            index = CoolingImage.PIC_COUNT;
        if (this._index == index)
            return;
        this._index = index;
        // this.source = index > 0 ? "cooling_" + index + "_png" : null;
        this.texture = CoolingImage.getPic(this._index);
    };
    CoolingImage.prototype.dispose = function () {
        this.texture = null;
        if (this.parent)
            this.parent.removeChild(this);
    };
    CoolingImage.getPic = function (index) {
        if (index < 0)
            return null;
        if (this.COOLING_PICS[index] == null) {
            var shape = new egret.Shape();
            ObjectUtil.drawSector(shape, this.ORIGIN_RADIU, this.ORIGIN_RADIU, this.ORIGIN_RADIU, 0x73E3FF, index / this.PIC_COUNT * 360, -90);
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(shape);
            this.COOLING_PICS[index] = renderTexture;
        }
        return this.COOLING_PICS[index];
    };
    //----------------------------------------------------------------------
    CoolingImage.ORIGIN_RADIU = 50; //原图大小
    CoolingImage.PIC_COUNT = 120; //图片数量
    CoolingImage.COOLING_PICS = new Object();
    return CoolingImage;
}(eui.Image));
__reflect(CoolingImage.prototype, "CoolingImage", ["cw.IDispose"]);
//# sourceMappingURL=CoolingImage.js.map