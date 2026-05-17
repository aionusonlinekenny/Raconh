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
 *create 2017-11-17
 *description
*/
var ElementSkillEffect = (function (_super) {
    __extends(ElementSkillEffect, _super);
    function ElementSkillEffect() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ElementSkillEffect.prototype, "effectInfo", {
        set: function (value) {
            if (this._effectInfo != null)
                Manager.pool.push(this._effectInfo);
            this._effectInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    ElementSkillEffect.prototype.reuse = function (gameObject) {
        this._aliveGameObject = gameObject;
        _super.prototype.reuse.call(this, gameObject);
    };
    ElementSkillEffect.prototype.unuse = function () {
        this.poolPushSingleEffect();
        if (this._effectInfo) {
            Manager.pool.push(this._effectInfo);
            this._effectInfo = null;
        }
        this._aliveGameObject = null;
    };
    ElementSkillEffect.prototype.drawSkillSingleEffect = function () {
        this.poolPushSingleEffect();
        var effID = this._effectInfo.effID;
        this._singleEffect = Manager.animation.createSkillAnimation(effID, 0, true, false);
        this._singleEffect.x = this._aliveGameObject.x;
        this._singleEffect.y = this._aliveGameObject.y;
        this._singleEffect.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.singleLoadFail, this);
        this._singleEffect.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        var cvo = AnimationCVO.getCVO("" + effID);
        if (cvo != null) {
            // if(cvo.isInFeet) this._aliveGameObject.addChildAt(this._singleEffect, 0);
            // else this._aliveGameObject.addChild(this._singleEffect);
            if (cvo.isInFeet)
                Manager.layer.addChildToNodeByType(this._singleEffect, this._singleEffect.url, 2);
            else
                Manager.layer.addChildToNodeByType(this._singleEffect, this._singleEffect.url, 1);
        }
    };
    ElementSkillEffect.prototype.singleLoadFail = function (e) {
        this.poolPushSingleEffect();
    };
    ElementSkillEffect.prototype.playComplete = function (e) {
        this.poolPushSingleEffect();
    };
    ElementSkillEffect.prototype.poolPushSingleEffect = function () {
        if (this._singleEffect == null)
            return;
        this._singleEffect.removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.singleLoadFail, this);
        this._singleEffect.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        Manager.pool.push(this._singleEffect);
        this._singleEffect = null;
    };
    ElementSkillEffect.prototype.drawSkill = function () {
        if (this._effectInfo != null) {
            if (this._effectInfo.isConfig)
                this.drawSkillConfigEffect();
            else
                this.drawSkillSingleEffect();
            Manager.pool.push(this._effectInfo);
            this._effectInfo = null;
        }
    };
    ElementSkillEffect.prototype.drawSkillConfigEffect = function () {
        var cvo = this._effectInfo.cvo;
        if (cvo == null)
            return;
        var aliveGameObjectInfo = this._aliveGameObject.info;
        var effects = [];
        var len1 = cvo.effectLineConfig.length;
        if (len1 > 0) {
            var correctRotation = GameObjectType.isPlayer(aliveGameObjectInfo.getType()) || GameObjectType.isMonster(aliveGameObjectInfo.getType());
            for (var i = 0; i < len1; i++) {
                effects.push(Manager.pool.create(SkillLineEffect, cvo.effectLineConfig[i], this._effectInfo.rotation, correctRotation));
            }
        }
        var len2 = cvo.effectAreaConfig.length;
        if (len2 > 0) {
            for (var j = 0; j < len2; j++) {
                effects.push(Manager.pool.create(SkillAreaEffect, cvo.effectAreaConfig[j], this._effectInfo.rotation));
            }
        }
        effects.sort(this.effectSortFun);
        var effect;
        for (var k = 0; k < effects.length; k++) {
            effect = effects[k];
            effect.move(aliveGameObjectInfo.x, aliveGameObjectInfo.y);
            if (effect.getIsInFeet())
                Manager.layer.addChildToNodeByType(effect, effect.url, 2);
            else
                Manager.layer.addChildToNodeByType(effect, effect.url, 1);
        }
    };
    ElementSkillEffect.prototype.effectSortFun = function (e1, e2) {
        if (e1.getSortIndex() < e2.getSortIndex())
            return 1;
        else if (e1.getSortIndex() > e2.getSortIndex())
            return -1;
        return 0;
    };
    ElementSkillEffect.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        this.poolPushSingleEffect();
        if (this._effectInfo) {
            Manager.pool.push(this._effectInfo);
            this._effectInfo = null;
        }
        this._aliveGameObject = null;
    };
    return ElementSkillEffect;
}(ElementBase));
__reflect(ElementSkillEffect.prototype, "ElementSkillEffect");
//# sourceMappingURL=ElementSkillEffect.js.map