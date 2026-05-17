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
 *create 2017-11-2
 *update devlil 2017-11-08
 *description
*/
var MonsterGameObject = (function (_super) {
    __extends(MonsterGameObject, _super);
    function MonsterGameObject() {
        var _this = _super.call(this) || this;
        //==============================↓↓↓↓↓↓↓↓死亡击飞动画↓↓↓↓↓↓↓↓==================================
        _this.DIE_REPEL_TIME1 = 400;
        _this.DIE_REPEL_TIME2 = 250;
        _this.DIE_REPEL_TIME3 = 150;
        _this.DIE_REPEL_TIME4 = 700;
        return _this;
    }
    Object.defineProperty(MonsterGameObject.prototype, "showName", {
        set: function (value) {
            if (this._showName == value)
                return;
            this._showName = value;
            this.invalidate(InvalidationType.GO_NAME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterGameObject.prototype, "showBlood", {
        set: function (value) {
            if (this._showBlood == value)
                return;
            else if (value && this._monsterGameObjectInfo.isType(GameObjectType.MONSTER_BOSS))
                return;
            this._showBlood = value;
            this.invalidate(InvalidationType.GO_BLOOD);
        },
        enumerable: true,
        configurable: true
    });
    MonsterGameObject.prototype.reuse = function (info) {
        this._monsterGameObjectInfo = info;
        if (this._monsterGameObjectInfo.isType(GameObjectType.MONSTER_BOSS)) {
            this._showName = true;
            this.showBossBlood(info);
        }
        _super.prototype.reuse.call(this, info);
    };
    MonsterGameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        if (this._monsterGameObjectInfo.cvo.type != MonsterType.EMPTY)
            this._elementShow = Manager.pool.create(ElementMonsterAnimation, this);
        if (this._monsterGameObjectInfo.cvo.birthAlpha != -1) {
            this.alpha = this._monsterGameObjectInfo.cvo.birthAlpha / 100;
            var showTime = this._monsterGameObjectInfo.cvo.birthAlphaTime;
            if (showTime == -1)
                showTime = 1000;
            egret.Tween.get(this).to({ alpha: 1 }, showTime); //.call(this.dieRepelComplete, this);
        }
    };
    MonsterGameObject.prototype.unuse = function () {
        egret.Tween.removeTweens(this);
        _super.prototype.unuse.call(this);
        ObjectUtil.remove(this);
        if (this._elementShow) {
            Manager.pool.push(this._elementShow);
            this._elementShow = null;
        }
        this._monsterGameObjectInfo = null;
        if (this._txtName) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        this._showName = false;
        this._showBlood = false;
        this._dieRepelPosS = null;
        this._dieRepelPosH = null;
        this._dieRepelPosE = null;
        this.hideBossBlood();
    };
    MonsterGameObject.prototype.createAction = function () {
        this._action = Manager.pool.create(MonsterAction, this._aliveGameObjectInfo);
    };
    MonsterGameObject.prototype.getMonsterAnimation = function () {
        if (this._elementShow != null && this._elementShow.animation != null)
            return this._elementShow.animation;
        return null;
    };
    MonsterGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawName();
        this.drawBlood();
        if (this._elementShow)
            this._elementShow.drawMonster();
    };
    MonsterGameObject.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.GO_NAME))
            this.drawName();
        if (this.isInvalid(InvalidationType.GO_BLOOD))
            this.drawBlood();
        if (this.isInvalid(InvalidationType.GO_DEAD) && this._elementShow)
            this._elementShow.drawDead();
        if (this.isInvalid(InvalidationType.GO_ANIMATION) && this._elementShow)
            this._elementShow.drawMonster();
        if (this.isInvalid(InvalidationType.GO_ACTION) && this._elementShow)
            this._elementShow.drawAction();
        if (this.isInvalid(InvalidationType.GO_DIRECTION) && this._elementShow)
            this._elementShow.drawDirection();
    };
    MonsterGameObject.prototype.drawName = function () {
        if (this._showName && this._monsterGameObjectInfo.cvo) {
            if (this._txtName == null) {
                this._txtName = Manager.pool.create(egret.TextField);
                this._txtName.text = this._monsterGameObjectInfo.cvo.name;
                this._txtName.width = this._txtName.textWidth;
                this._txtName.x = -this._txtName.width >> 1;
                this._txtName.y = -this._monsterGameObjectInfo.cvo.height - this._txtName.height;
                if (this._showBlood && this._bloodContainer)
                    this._txtName.y -= this._bloodContainer.height + 5;
            }
            if (this._txtName.parent == null)
                this.addChild(this._txtName);
        }
        else {
            if (this._txtName != null && this._txtName.parent != null)
                this._txtName.parent.removeChild(this._txtName);
        }
    };
    MonsterGameObject.prototype.drawBlood = function () {
        if (this._showBlood) {
            this.showStrip();
            if (this._showName && this._monsterGameObjectInfo.cvo)
                this._txtName.y = -this._monsterGameObjectInfo.cvo.height - this._txtName.height - this._bloodContainer.height - 5;
        }
        else
            this.hideStrip();
    };
    MonsterGameObject.prototype.showStrip = function () {
        _super.prototype.showStrip.call(this);
        // this._bloodContainer.move(this._bloodContainer.width == 0 ? -39 : -this._bloodContainer.width >> 1, -this._monsterGameObjectInfo.cvo.height - this._bloodContainer.height);
        this._bloodContainer.x = this._bloodContainer.width == 0 ? -39 : -this._bloodContainer.width >> 1;
        this._bloodContainer.y = -this._monsterGameObjectInfo.cvo.height - this._bloodContainer.height;
    };
    MonsterGameObject.prototype.eventDirection = function () {
        this.invalidate(InvalidationType.GO_DIRECTION);
    };
    MonsterGameObject.prototype.eventAction = function () {
        this.invalidate(InvalidationType.GO_ACTION);
    };
    MonsterGameObject.prototype.eventAliveFlag = function () {
        _super.prototype.eventAliveFlag.call(this);
        if (!this._aliveGameObjectInfo.getAliveFlag()) {
            this.playMonsterDeadAnimation();
            this.hideBossBlood();
        }
    };
    MonsterGameObject.prototype.eventBlood = function () {
        if (this._showBlood && this._bloodStrip3)
            this._bloodStrip3.updateBlood();
        else if (this._bossBlood2)
            this._bossBlood2.updateBlood();
        //死亡击飞
        if (this._aliveGameObjectInfo.attrInfo.hp <= 0) {
            var showDieRepel = true;
            if (!this._monsterGameObjectInfo.cvo.canDieRepel)
                showDieRepel = false;
            if (this._monsterGameObjectInfo.attackID <= 0)
                showDieRepel = false;
            var attack = Manager.model.getGameobject().getGameObject(this._monsterGameObjectInfo.attackID);
            if (attack == null)
                showDieRepel = false;
            if (showDieRepel)
                this.eventDieRepel(new egret.Point(attack.x, attack.y), false);
            else if (!this._monsterGameObjectInfo.cvo.deadNoHide)
                egret.Tween.get(this).to({ alpha: 0 }, 1500);
        }
        _super.prototype.eventBlood.call(this);
    };
    MonsterGameObject.prototype.eventStrip = function (value) {
        this.showBlood = value;
        this.showName = value;
    };
    MonsterGameObject.prototype.eventBeatBack = function (targetX, targetY) {
        this._action.beatBack(targetX, targetY);
    };
    MonsterGameObject.prototype.eventDieRepel = function (attackPos, onlyJumpOnce) {
        this._action.dieRepel(attackPos, onlyJumpOnce);
    };
    MonsterGameObject.prototype.drawColorFilter = function () {
        if (this._elementShow)
            this._elementShow.drawColorFilter();
    };
    MonsterGameObject.prototype.playMonsterDeadAnimation = function () {
        var index = [4013, 4014].indexOf(this._monsterGameObjectInfo.cvo.id); //是否为经验副本雕像怪
        if (index != -1) {
            var info = Manager.model.getGameobject().getSceneEffByCvoId([10017, 10016][index]);
            if (info)
                info.playShow();
            return;
        }
        var deadEffect = Number(this._monsterGameObjectInfo.cvo.deadEffect);
        if (deadEffect > 0) {
            var animation = Manager.animation.createSkillAnimation(deadEffect);
            animation.move(this._monsterGameObjectInfo.x, this._monsterGameObjectInfo.y);
            // Manager.layer.effectTopLayer.addChild(animation);
            Manager.layer.addChildToNodeByType(animation, animation.url, 1);
        }
    };
    /**
     * 填加进场景中执行
     */
    MonsterGameObject.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.invalidate(InvalidationType.GO_ANIMATION);
    };
    MonsterGameObject.prototype.markDead = function () {
        if (this._elementShow)
            this._elementShow.markDead();
    };
    Object.defineProperty(MonsterGameObject.prototype, "factor", {
        //贝塞尔
        get: function () { return 0; },
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this._dieRepelPosS.x + 2 * value * (1 - value) * this._dieRepelPosH.x + value * value * this._dieRepelPosE.x;
            this.y = (1 - value) * (1 - value) * this._dieRepelPosS.y + 2 * value * (1 - value) * this._dieRepelPosH.y + value * value * this._dieRepelPosE.y;
        },
        enumerable: true,
        configurable: true
    });
    /** 死亡击飞(弹跳1次) */
    MonsterGameObject.prototype.dieRepelBezier1 = function (p0, p1, p2) {
        this._shadow.visible = false;
        this._dieRepelPosS = p0;
        this._dieRepelPosH = p1;
        this._dieRepelPosE = p2;
        egret.Tween.get(this).to({ factor: 1 }, this.DIE_REPEL_TIME1).call(this.dieRepelComplete, this);
    };
    /** 死亡击飞(弹跳3次) */
    MonsterGameObject.prototype.dieRepelBezier2 = function (p0, ph1, p1, ph2, p2, p3) {
        this._shadow.visible = false;
        this._dieRepelPosS = p0;
        this._dieRepelPosH = ph1;
        this._dieRepelPosE = p1;
        egret.Tween.get(this).to({ factor: 1 }, this.DIE_REPEL_TIME1).call(this.dieRepelComplete2, this, [p1, ph2, p2, p3]);
    };
    MonsterGameObject.prototype.dieRepelComplete2 = function (p0, p1, p2, p3) {
        this._dieRepelPosS = p0;
        this._dieRepelPosH = p1;
        this._dieRepelPosE = p2;
        egret.Tween.get(this).to({ factor: 1 }, this.DIE_REPEL_TIME2).call(this.dieRepelComplete3, this, [p3]);
    };
    MonsterGameObject.prototype.dieRepelComplete3 = function (p) {
        egret.Tween.get(this).to({ x: p.x, y: p.y }, this.DIE_REPEL_TIME3)
            .to({ alpha: 0 }, this.DIE_REPEL_TIME4).call(this.dieRepelComplete, this);
    };
    MonsterGameObject.prototype.dieRepelComplete = function () {
        this.visible = false;
    };
    //==============================↑↑↑↑↑↑↑↑死亡击飞动画↑↑↑↑↑↑↑↑==================================
    //==============================↓↓↓↓↓↓↓↓boss类怪物血条↓↓↓↓↓↓↓↓==================================
    MonsterGameObject.prototype.showBossBlood = function (info) {
        if (!this._bossBlood2)
            this._bossBlood2 = Manager.view.show(36 /* BossBloodStrip */, info);
    };
    MonsterGameObject.prototype.hideBossBlood = function () {
        if (this._bossBlood2)
            Manager.view.hide(36 /* BossBloodStrip */);
        this._bossBlood2 = null;
    };
    //==============================↑↑↑↑↑↑↑↑boss类怪物血条↑↑↑↑↑↑↑↑==================================
    MonsterGameObject.prototype.disposeSelf = function () {
        egret.Tween.removeTweens(this);
        _super.prototype.disposeSelf.call(this);
        if (this._elementShow) {
            Manager.pool.push(this._elementShow);
            this._elementShow = null;
        }
        if (this._txtName != null) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        this._monsterGameObjectInfo = null;
        this._showName = false;
        this._showBlood = false;
        this._dieRepelPosS = null;
        this._dieRepelPosH = null;
        this._dieRepelPosE = null;
        this.hideBossBlood();
    };
    return MonsterGameObject;
}(AliveGameObject));
__reflect(MonsterGameObject.prototype, "MonsterGameObject");
//# sourceMappingURL=MonsterGameObject.js.map