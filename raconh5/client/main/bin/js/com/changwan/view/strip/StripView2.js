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
 * 面板上的进度条
 * liangyan
 * create 2017-12-14
 * @update devil 2018-04-19
*/
var StripView2 = /** @class */ (function (_super) {
    __extends(StripView2, _super);
    function StripView2(uiImageLayer, uiLayer) {
        return _super.call(this, uiImageLayer, uiLayer) || this;
    }
    /**修正用BitmapRes创建strip，complete方法会重置strip的宽度 */
    StripView2.prototype.__stripComplete = function () {
        this._strip.width = this._initW;
    };
    StripView2.prototype.reuse = function (backSource, stripSource, bWidth, bHeight, sWidth, sHeight, x, y, needTxt, isBackFront, size) {
        if (needTxt === void 0) { needTxt = false; }
        if (isBackFront === void 0) { isBackFront = false; }
        if (size === void 0) { size = 24; }
        this._bWidth = bWidth;
        this._bHeight = bHeight;
        this._sWidth = sWidth;
        this._sHeight = sHeight;
        this._initW = this._sWidth;
        this._back = BitmapRes.create(backSource, 0, 0, this._bWidth, this._bHeight);
        this._strip = BitmapRes.create("", x, y, this._sWidth, this._sHeight, this.__stripComplete, this);
        this._strip.source = stripSource;
        if (isBackFront) {
            // 设置背景在进度条元素前面，适用于背景进度条区域透明的情况 *
            this._imageLayer.addChild(this._strip);
            this._imageLayer.addChild(this._back);
        }
        else {
            this._imageLayer.addChild(this._back);
            this._imageLayer.addChild(this._strip);
        }
        if (needTxt && this._txt == null) {
            this._txt = TextField.create(this._sWidth, this._sHeight, 0xFFF7E6, size, "center", "middle");
            this._txt.x = x;
            this._txt.y = y;
            this._layer.addChild(this._txt);
        }
        // super.reuse(null);
    };
    StripView2.prototype.setPer = function (per) {
        if (per < 0)
            per += 1;
        this._initW = this._sWidth * per;
        if (this._strip != null)
            this._strip.width = this._sWidth * per;
    };
    /**更新 */
    StripView2.prototype.update = function (current, total, fullFirst) {
        if (fullFirst === void 0) { fullFirst = false; }
        if (current < 0)
            current = 0;
        if (total <= 0)
            return;
        if (current > total)
            current = total;
        if (this._txt)
            this._txt.text = current + "/" + total;
        this.updatePercent(current / total, fullFirst);
    };
    // public unuse():void
    // {
    //     super.unuse();
    //     Manager.pool.push(this._back);
    // 	this._back = null;
    //     Manager.pool.push(this._strip);
    //     this._strip = null;
    // }
    StripView2.prototype.dispose = function () {
        Manager.pool.push(this._back);
        this._back = null;
        Manager.pool.push(this._strip);
        this._strip = null;
        _super.prototype.dispose.call(this);
    };
    StripView2.create = function (imageLayer, layer, backSource, stripSource, bWidth, bHeight, sWidth, sHeight, x, y, needTxt, isBackFront, size) {
        if (needTxt === void 0) { needTxt = false; }
        if (isBackFront === void 0) { isBackFront = false; }
        if (size === void 0) { size = 24; }
        var result = new StripView2(imageLayer, layer);
        result.reuse(backSource, stripSource, bWidth, bHeight, sWidth, sHeight, x, y, needTxt, isBackFront, size);
        return result;
    };
    return StripView2;
}(BaseStripView2));
//# sourceMappingURL=StripView2.js.map