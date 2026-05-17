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
 *author Anydo
 *create 2017-11-30
 *description
*/
var ElementAliveAnimation = /** @class */ (function (_super) {
    __extends(ElementAliveAnimation, _super);
    function ElementAliveAnimation() {
        return _super.call(this) || this;
    }
    ElementAliveAnimation.prototype.drawStyle = function () {
        if (this._animation != null)
            this._animation.updateStyle();
    };
    ElementAliveAnimation.prototype.drawPet = function () {
        if (this._animation == null) {
            var info = this._gameObject.info;
            this._animation = Manager.animation.createGameOjbectAnimation(info);
            this._gameObject.addChild(this._animation);
            this.drawAction();
            this.drawDirection();
        }
    };
    return ElementAliveAnimation;
}(ElementBaseAnimation));
//# sourceMappingURL=ElementAliveAnimation.js.map