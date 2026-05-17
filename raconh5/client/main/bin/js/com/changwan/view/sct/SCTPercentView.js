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
 * SCT视图
 * luzhihong
 * create 2017-11-08
 */
var SCTPercentView = /** @class */ (function (_super) {
    __extends(SCTPercentView, _super);
    function SCTPercentView() {
        return _super.call(this) || this;
    }
    /**
     */
    SCTPercentView.prototype.reuse = function (numType, value) {
        var padding = SCTConst.getPadding(numType);
        this._khLeft = this.createBitmap(numType, SCTConst.SIGN_KH_LEFT);
        this.addChild(this._khLeft);
        // this._num = Manager.pool.create(NumPic, value, numType, true, -1, true);
        this._num = Manager.pool.create(NumImgView2);
        this._num.setValue(value, "", 0, 0, numType, true, -1, true);
        this._num.x = this.width + padding;
        this.addChild(this._num);
        this._khRight = this.createBitmap(numType, SCTConst.SIGN_KH_RIGHT);
        this._khRight.x = this.width + padding;
        this.addChild(this._khRight);
    };
    SCTPercentView.prototype.createBitmap = function (numType, value) {
        var name = SCTConst.getWord(numType, value);
        var bitmap = Manager.pool.create(BitmapRes, name);
        bitmap.y = -bitmap.height >> 1;
        this.addChild(bitmap);
        return bitmap;
    };
    SCTPercentView.prototype.unuse = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.visible = true;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        Manager.pool.push(this._khLeft);
        this._khLeft = null;
        Manager.pool.push(this._khRight);
        this._khRight = null;
        Manager.pool.push(this._num);
        this._num = null;
    };
    SCTPercentView.prototype.dispose = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        Manager.pool.push(this._khLeft);
        this._khLeft = null;
        Manager.pool.push(this._khRight);
        this._khRight = null;
        Manager.pool.push(this._num);
        this._num = null;
    };
    return SCTPercentView;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=SCTPercentView.js.map