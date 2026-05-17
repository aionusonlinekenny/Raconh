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
 * 数字显示类
 * author:Simon
 */
var NumImgView2 = /** @class */ (function (_super) {
    __extends(NumImgView2, _super);
    function NumImgView2() {
        var _this = _super.call(this) || this;
        _this._len = 0;
        /**间距 */
        _this._gap = 0;
        return _this;
    }
    NumImgView2.prototype.createBitmap = function (imgName, value) {
        var bitmap = Manager.pool.create(BitmapRes, imgName + value + "_png");
        var len = this._imgList.length;
        bitmap.x = len > 0 && this._imgList[len - 1] ? this._imgList[len - 1].x + this._imgWidth + this._gap : 0;
        this.addChild(bitmap);
        return bitmap;
    };
    NumImgView2.prototype.createSctBitmap = function (type, value) {
        var name = SCTConst.getWord(type, value);
        var bitmap = Manager.pool.create(BitmapRes, name);
        var len = this._imgList.length;
        bitmap.x = len > 0 && this._imgList[len - 1] ? this._imgList[len - 1].x + this._imgList[len - 1].width + this._gap : 0;
        bitmap.y = -bitmap.height >> 1;
        this.addChild(bitmap);
        return bitmap;
    };
    NumImgView2.prototype.clean = function () {
        if (this._imgList) {
            for (var i = 0; i < this._imgList.length; i++) {
                if (this._imgList[i])
                    Manager.pool.push(this._imgList[i]);
                this._imgList[i] = null;
                delete this._imgList[i];
            }
        }
    };
    NumImgView2.prototype.setValue = function (value, imgName, imgWidth, gap, numType, needAdd, wordType, needPercent) {
        if (imgName === void 0) { imgName = ""; }
        if (imgWidth === void 0) { imgWidth = 35; }
        if (gap === void 0) { gap = 3; }
        if (numType === void 0) { numType = -1; }
        if (needAdd === void 0) { needAdd = false; }
        if (wordType === void 0) { wordType = -1; }
        if (needPercent === void 0) { needPercent = false; }
        this.clean();
        if (wordType != -1) {
            this._imgList.push(this.createSctBitmap(SCTConst.WORD, wordType + ""));
        }
        if (imgName != "") {
            this._imgWidth = imgWidth;
            this._gap = gap;
            var str = "" + value;
            this._len = str.length;
            for (var i = 0; i < this._len; i++) {
                this._imgList.push(this.createBitmap(imgName, str.substr(i, 1)));
            }
        }
        if (numType != -1) {
            this._gap = SCTConst.getPadding(numType);
            if (needAdd) {
                this._imgList.push(this.createSctBitmap(numType, SCTConst.SIGN_ADD));
            }
            var str = "" + value;
            this._len = str.length;
            for (var i = 0; i < this._len; i++) {
                this._imgList.push(this.createSctBitmap(numType, str.substr(i, 1)));
            }
            if (needPercent) {
                this._imgList.push(this.createSctBitmap(numType, SCTConst.SIGN_PERCENT));
            }
        }
    };
    NumImgView2.prototype.reuse = function () {
        this._imgList = [];
    };
    NumImgView2.prototype.unuse = function () {
        this.clean();
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
    };
    Object.defineProperty(NumImgView2.prototype, "width", {
        get: function () {
            return this._len * (this._imgWidth + this._gap) - this._gap;
        },
        enumerable: true,
        configurable: true
    });
    NumImgView2.prototype.dispose = function () {
        this.clean();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return NumImgView2;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=NumImgView2.js.map