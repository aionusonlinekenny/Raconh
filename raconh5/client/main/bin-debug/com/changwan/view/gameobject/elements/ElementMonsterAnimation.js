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
 *author Anydo
 *create 2017-11-7
 *description
*/
var ElementMonsterAnimation = (function (_super) {
    __extends(ElementMonsterAnimation, _super);
    function ElementMonsterAnimation() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ElementMonsterAnimation.prototype, "animation", {
        get: function () {
            return this._animation;
        },
        enumerable: true,
        configurable: true
    });
    ElementMonsterAnimation.prototype.drawMonster = function () {
        if (this._animation == null) {
            var info = this.getInfo();
            this._animation = Manager.animation.createGameOjbectAnimation(info);
            if (this.sceneRobotFlag == 2) {
                this._animation.x = this._gameObject.info.cvo.posxMon + (info.cvo ? -info.cvo.offsetX : 0);
                this._animation.y = this._gameObject.info.cvo.posyMon + (info.cvo ? -info.cvo.offsetY : 0);
            }
            else {
                this._animation.x = (info.cvo ? -info.cvo.offsetX : 0);
                this._animation.y = (info.cvo ? -info.cvo.offsetY : 0);
            }
            this._gameObject.addChild(this._animation);
            this.drawAction();
            this.drawDirection();
        }
    };
    ElementMonsterAnimation.prototype.drawDead = function () {
        if (this._animation instanceof MonsterAnimation)
            this._animation.dead();
    };
    ElementMonsterAnimation.prototype.drawAction = function () {
        if (this._animation instanceof MonsterAnimation) {
            if (this._animation.isDeadFlag)
                this._animation.figureAction = FigureAction.DEAD;
            else
                this._animation.figureAction = this.getInfo().getActionStr();
        }
    };
    /** 怪物死亡后，info直接unuse，所以info有可能马上被其他的新怪赋值，导致info数据是不准确的，此方法用来做临时标记 */
    ElementMonsterAnimation.prototype.markDead = function () {
        if (this._animation instanceof MonsterAnimation)
            this._animation.isDeadFlag = true;
    };
    return ElementMonsterAnimation;
}(ElementBaseAnimation));
__reflect(ElementMonsterAnimation.prototype, "ElementMonsterAnimation");
//# sourceMappingURL=ElementMonsterAnimation.js.map