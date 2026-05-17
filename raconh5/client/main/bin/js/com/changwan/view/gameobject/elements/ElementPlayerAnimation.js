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
var ElementPlayerAnimation = /** @class */ (function (_super) {
    __extends(ElementPlayerAnimation, _super);
    function ElementPlayerAnimation() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ElementPlayerAnimation.prototype, "animation", {
        get: function () {
            return this._animation;
        },
        enumerable: true,
        configurable: true
    });
    ElementPlayerAnimation.prototype.drawStyle = function () {
        if (this._animation instanceof PlayerAnimation)
            this._animation.updateStyle();
    };
    ElementPlayerAnimation.prototype.drawDead = function () {
        if (this._animation instanceof PlayerAnimation)
            this._animation.dead();
    };
    ElementPlayerAnimation.prototype.drawPlayerAnimation = function () {
        if (this._animation == null) {
            var playerInfo = this.getInfo();
            this._animation = Manager.animation.createGameOjbectAnimation(playerInfo);
            this._gameObject.addChild(this._animation);
            this.drawAction();
            this.drawDirection();
        }
    };
    return ElementPlayerAnimation;
}(ElementBaseAnimation));
//# sourceMappingURL=ElementPlayerAnimation.js.map