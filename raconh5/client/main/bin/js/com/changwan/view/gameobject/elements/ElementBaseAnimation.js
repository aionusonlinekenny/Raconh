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
var ElementBaseAnimation = /** @class */ (function (_super) {
    __extends(ElementBaseAnimation, _super);
    function ElementBaseAnimation() {
        return _super.call(this) || this;
    }
    ElementBaseAnimation.prototype.reuse = function (gameObject) {
        _super.prototype.reuse.call(this, gameObject);
        this.sceneRobotFlag = 0;
    };
    ElementBaseAnimation.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.poolPushAnimation();
        this.sceneRobotFlag = 0;
    };
    ElementBaseAnimation.prototype.getInfo = function () {
        if (this.sceneRobotFlag == 0)
            return this._gameObject.info;
        else if (this.sceneRobotFlag == 1)
            return this._gameObject.info.infoPlayer;
        else if (this.sceneRobotFlag == 2)
            return this._gameObject.info.infoMonster;
    };
    ElementBaseAnimation.prototype.drawDirection = function () {
        if (this._animation instanceof ShowAnimation)
            this._animation.figureDirection = this.getInfo().getDirection();
    };
    ElementBaseAnimation.prototype.drawAction = function () {
        if (this._animation instanceof ShowAnimation)
            this._animation.figureAction = this.getInfo().getActionStr();
    };
    ElementBaseAnimation.prototype.drawColorFilter = function () {
        if (this._animation instanceof ShowAnimation) {
            var colorFilterType = this.getInfo().getColorFilterType();
            FilterUtil.addAliveColorFilter(this._animation, colorFilterType);
        }
    };
    ElementBaseAnimation.prototype.drawHide = function () {
        this.poolPushAnimation();
    };
    ElementBaseAnimation.prototype.poolPushAnimation = function () {
        if (this._animation != null) {
            if (this._animation instanceof ShowAnimation)
                Manager.pool.push(this._animation);
            else if (this._animation instanceof Animation)
                Manager.pool.push(this._animation);
            this._animation = null;
        }
    };
    ElementBaseAnimation.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        this.poolPushAnimation();
    };
    return ElementBaseAnimation;
}(ElementBase));
//# sourceMappingURL=ElementBaseAnimation.js.map