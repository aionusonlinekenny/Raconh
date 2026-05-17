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
var ItemRenderer = (function (_super) {
    __extends(ItemRenderer, _super);
    function ItemRenderer() {
        var _this = _super.call(this) || this;
        _this._loadCompltet = false;
        return _this;
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
    }
    // private __removeFromStage(e:egret.Event):void
    // {
    // 	if(this._loadCompltet)
    // 		this.dispose();
    // }
    ItemRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._loadCompltet = true;
    };
    ItemRenderer.prototype.dispose = function () {
        // this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ItemRenderer;
}(eui.ItemRenderer));
__reflect(ItemRenderer.prototype, "ItemRenderer", ["cw.IDispose"]);
//# sourceMappingURL=ItemRenderer.js.map