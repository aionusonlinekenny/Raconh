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
 *
 */
var BaseFuncBtn2 = (function (_super) {
    __extends(BaseFuncBtn2, _super);
    function BaseFuncBtn2(menuBtnContent, imageContainer) {
        var _this = _super.call(this) || this;
        _this._menuBtnContent = menuBtnContent;
        _this._imageContainer = imageContainer;
        _this.start();
        _this.addEvent();
        return _this;
    }
    BaseFuncBtn2.prototype.start = function () {
        this._bgImg = BitmapRes.create(this._menuBtnContent.bgImgNormal, 15, 27, 85, 85);
        this._imageContainer.addChild(this._bgImg);
        if (!this._changeEffect) {
            this._changeEffect = Manager.animation.createEffectAnimation("funcChange");
            this._changeEffect.width = 258;
            this._changeEffect.height = 258;
            this._changeEffect.x = -76;
            this._changeEffect.y = -60;
        }
        // if(!this._changeEffect.parent)
        // 	this._effect.addChild(this._changeEffect);
    };
    BaseFuncBtn2.prototype.addEvent = function () { };
    BaseFuncBtn2.prototype.dispose = function () {
    };
    return BaseFuncBtn2;
}(egret.DisplayObjectContainer));
__reflect(BaseFuncBtn2.prototype, "BaseFuncBtn2");
//# sourceMappingURL=BaseFuncBtn2.js.map