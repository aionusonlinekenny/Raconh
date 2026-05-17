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
 * 气泡提示
 * liangyan
 * create 2017-11-03
*/
var BubbleView = (function (_super) {
    __extends(BubbleView, _super);
    function BubbleView() {
        var _this = _super.call(this) || this;
        _this.MAX_NUM = 99;
        _this.skinName = Manager.path.getSkinName("common", "BubbleViewSkin");
        return _this;
    }
    BubbleView.prototype.update = function (num, autoVisible, showNum) {
        if (autoVisible === void 0) { autoVisible = true; }
        if (showNum === void 0) { showNum = true; }
        if (this.numTxt) {
            if (showNum) {
                num = num > this.MAX_NUM ? this.MAX_NUM : num;
                this.numTxt.text = "" + num;
            }
            else
                this.numTxt.text = "!";
        }
        if (autoVisible) {
            this.visible = num != 0;
        }
    };
    BubbleView.prototype.dispose = function () {
        this.back = null;
        if (this.numTxt)
            this.numTxt.dispose();
        this.numTxt = null;
        _super.prototype.dispose.call(this);
    };
    return BubbleView;
}(UIComponent));
__reflect(BubbleView.prototype, "BubbleView");
//# sourceMappingURL=BubbleView.js.map