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
 *create 2017-11-27
 *description
*/
var ElementBuffAnimation = (function (_super) {
    __extends(ElementBuffAnimation, _super);
    function ElementBuffAnimation() {
        return _super.call(this) || this;
    }
    ElementBuffAnimation.prototype.unuse = function () {
        this.poolPushBuffAnimation();
        this.readyPlayCVO = null;
        this._buffAniPos = null;
    };
    ElementBuffAnimation.prototype.poolPushBuffAnimation = function () {
        if (this._buffAnimation != null) {
            Manager.pool.push(this._buffAnimation);
            this._buffAnimation = null;
        }
    };
    ElementBuffAnimation.prototype.drawBuff = function () {
        this.poolPushBuffAnimation();
        if (this.readyPlayCVO != null) {
            var cvo = AnimationCVO.getCVO("" + this.readyPlayCVO.aniId);
            this._buffAnimation = Manager.animation.createSkillAnimation(this.readyPlayCVO.aniId);
            this._buffAniPos = this._gameObject.info.getBuffAniPos(this.readyPlayCVO.placeFlag);
            this.movePosition();
            if (cvo.isInFeet)
                Manager.layer.addChildToNodeByType(this._buffAnimation, this._buffAnimation.url, 2);
            else
                Manager.layer.addChildToNodeByType(this._buffAnimation, this._buffAnimation.url, 1);
        }
    };
    ElementBuffAnimation.prototype.movePosition = function () {
        if (this._buffAnimation != null) {
            this._buffAnimation.move(this._gameObject.info.x + this._buffAniPos.x, this._gameObject.info.y + this._buffAniPos.y);
        }
    };
    ElementBuffAnimation.prototype.hasChange = function (buff, isAdd) {
        if (isAdd) {
            if (buff != null && buff.aniId != 0 && ((this.readyPlayCVO == null) || (this.readyPlayCVO.aniPriority < buff.aniPriority))) {
                this.readyPlayCVO = buff;
                return true;
            }
        }
        else {
            if (this.readyPlayCVO != null && this.readyPlayCVO.groupID == buff.groupID) {
                this.readyPlayCVO = null;
                return true;
            }
        }
        return false;
    };
    ElementBuffAnimation.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        this.poolPushBuffAnimation();
        this.readyPlayCVO = null;
        this._buffAniPos = null;
    };
    return ElementBuffAnimation;
}(ElementBase));
__reflect(ElementBuffAnimation.prototype, "ElementBuffAnimation");
//# sourceMappingURL=ElementBuffAnimation.js.map