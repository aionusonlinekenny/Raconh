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
 *人物视图信息类
 * Anydo
 * create
 * update devil 2017-11-08
*/
var SelfGameObjectInfo = /** @class */ (function (_super) {
    __extends(SelfGameObjectInfo, _super);
    function SelfGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SelfGameObjectInfo.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    SelfGameObjectInfo.prototype.reuse = function (id, role) {
        _super.prototype.reuse.call(this, id, role);
    };
    SelfGameObjectInfo.prototype.remove = function (onlyView, isImmediately) {
        if (isImmediately === void 0) { isImmediately = true; }
        _super.prototype.remove.call(this, onlyView, isImmediately);
    };
    SelfGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._target = null;
    };
    SelfGameObjectInfo.prototype.getType = function () {
        return GameObjectType.SELF;
    };
    Object.defineProperty(SelfGameObjectInfo.prototype, "isSelfGO", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelfGameObjectInfo.prototype, "index9", {
        get: function () {
            return this._index9;
        },
        set: function (value) {
            if (this._index9.equals(value))
                return;
            this._index9 = value;
            this.dispatchEvent(new GameObjectEvent(GameObjectEvent.GO_INDEX9));
        },
        enumerable: true,
        configurable: true
    });
    SelfGameObjectInfo.prototype.canHit = function (showMsg, useCommonCD) {
        if (useCommonCD === void 0) { useCommonCD = true; }
        if (useCommonCD && !Manager.model.getSkill().canHitByCommonCD()) {
            return false;
        }
        if (!this.can(CanType.CAN_HIT, showMsg))
            return false;
        return true;
    };
    SelfGameObjectInfo.prototype.canHited = function (showMsg) {
        return false;
    };
    SelfGameObjectInfo.prototype.attrUpdateBlood = function (oldValue) {
        if ((this.attrInfo.hp > oldValue) && (oldValue > 0))
            this.playSCT(SCTConst.TYPE_BLOOD, this.attrInfo.hp - oldValue, 0);
        _super.prototype.attrUpdateBlood.call(this, oldValue);
    };
    SelfGameObjectInfo.prototype.setAliveFlag = function (value) {
        _super.prototype.setAliveFlag.call(this, value);
        if (!this._aliveFlag) {
            this.updateTarget(null);
            this.clearFollowTarget();
        }
        else {
            this.updateIsingState(BodyStateManger.ISING_JUMP, false);
            this.updateIsingState(BodyStateManger.ISING_SPRINT, false);
            this.updateIsingState(BodyStateManger.ISING_SLIDE, false);
            this.updateIsingState(BodyStateManger.ISING_KITE, false);
            this.updateIsingState(BodyStateManger.ISING_WATER, false);
        }
    };
    SelfGameObjectInfo.prototype.clearFollowTarget = function () {
        if (this.selfPet) {
            this.selfPet.updateTarget(null);
        }
    };
    SelfGameObjectInfo.prototype.updatePostion = function (x, y, isForce) {
        if (isForce === void 0) { isForce = false; }
        if (this.x == x && this.y == y && !isForce)
            return;
        var oldPos = new egret.Point(this.x, this.y);
        _super.prototype.updatePostion.call(this, x, y, isForce);
        Manager.model.getGameobject().checkJumpPointTrigger();
        this.checkSelfPosSync(oldPos);
        this.dispatchEvent(new GameObjectEvent(GameObjectEvent.GO_POSITION));
    };
    SelfGameObjectInfo.prototype.checkSelfPosSync = function (oldPos) {
        //野外地图(单人)，九宫格改变同步位置；多人地图，小格子改变同步位置
        var oldIndex;
        var noChange = true;
        if (Manager.model.getMap().mapCVO.isFieldMap) {
            oldIndex = IndexUtil.getIndex9ByXY(oldPos.x, oldPos.y);
            noChange = this.index9.equals(oldIndex);
        }
        else {
            oldIndex = IndexUtil.getIndexByXY(oldPos.x, oldPos.y);
            noChange = this._indexes.equals(oldIndex);
        }
        if (!noChange)
            Manager.control.getMap().cmdSelfWalkPosSync(this.x, this.y);
    };
    SelfGameObjectInfo.prototype.updateTarget = function (value) {
        var lastTarget = this._target;
        this._target = value;
        if (this._view != null)
            this._view.eventTarget();
        if (lastTarget == this._target)
            return;
        var mapCVO = Manager.model.getMap().mapCVO;
        if (mapCVO && mapCVO.type == MapConst.TYPE_BOSS) //暂需求，只在boss地图里做这个处理
         {
            var bossStrip = Manager.view.getView(36 /* BossBloodStrip */);
            if (this._target && this._target instanceof PlayerGameObjectInfo) {
                Manager.view.show(117 /* PlayerBloodStrip */, this._target);
                if (bossStrip)
                    bossStrip.setVisible(false);
                // ObjectUtil.remove(bossStrip);
                // if(bossStrip)Manager.view.hide(ViewID.BossBloodStrip);
            }
            else {
                Manager.view.hide(117 /* PlayerBloodStrip */);
                // if(bossStrip) Manager.layer.uiLayer_home.addChildAt(bossStrip, 0);
                // if(!bossStrip)Manager.view.show(ViewID.BossBloodStrip,this._target as MonsterGameObjectInfo)
                if (bossStrip)
                    bossStrip.setVisible(true);
            }
        }
    };
    SelfGameObjectInfo.prototype.cancelAction = function () {
        if (this._view != null)
            this._view.eventCancelAction();
        // Manager.control.getMap().cmdPlayerWalk([new egret.Point(this.x, this.y)], WalkType.WALK);
    };
    Object.defineProperty(SelfGameObjectInfo.prototype, "selfPet", {
        get: function () {
            return this._pet;
        },
        enumerable: true,
        configurable: true
    });
    SelfGameObjectInfo.prototype.setPet = function (value) {
        if (this._pet == value)
            return;
        if (value != null) {
            var petPos = GameUtil.getNearCanWalkRandomPos(this.x, this.y);
            value.updatePostion(petPos.x, petPos.y);
        }
        _super.prototype.setPet.call(this, value);
    };
    SelfGameObjectInfo.prototype.dispatchJump = function (targets, complete) {
        if (this._view != null)
            this._view.eventJump(targets, complete);
    };
    /*能否参与活动、副本或战场
    * showTips 是否提示
    */
    SelfGameObjectInfo.prototype.canJoinActive = function (showTips) {
        if (showTips === void 0) { showTips = false; }
        if (this.attrInfo.bfType == BFType.COPY) {
            if (showTips)
                FloatTips.addTips(LangCVO.getContent("common27")); //正在副本中，请退出副本后进行操作
            return false;
        }
        if (this.attrInfo.bfType == BFType.BOSS_PRIVATE || this.attrInfo.bfType == BFType.BOSS_PUBLIC) {
            if (showTips)
                FloatTips.addTips(LangCVO.getContent("common28")); //正在BOSS中，请退出BOSS后进行操作
            return false;
        }
        if (this.attrInfo.bfType == BFType.ARENA) {
            if (showTips)
                FloatTips.addTips(LangCVO.getContent("common36")); //正在个人竞技中，请退出个人竞技后进行操作
            return false;
        }
        if (this.attrInfo.bfType == BFType.CLUB_BF || this.attrInfo.bfType == BFType.CLUB_BF_1V1 || this.attrInfo.bfType == BFType.CLUB_BF_BOSS) {
            if (showTips)
                FloatTips.addTips(LangCVO.getContent("common42")); //正在盟会战中，请退出盟会战后进行操作
            return false;
        }
        return true;
    };
    SelfGameObjectInfo.prototype.enterMap = function () {
        this.stopWalk();
        this.needCanYing = false;
        this.updateIsingState(BodyStateManger.ISING_JUMP, false);
        this.updateIsingState(BodyStateManger.ISING_SPRINT, false);
        this.updateIsingState(BodyStateManger.ISING_SLIDE, false);
        this.updateIsingState(BodyStateManger.ISING_KITE, false);
        this.updateIsingState(BodyStateManger.ISING_WATER, false);
        if (this._view != null)
            this._view.eventAliveFlag();
    };
    SelfGameObjectInfo.prototype.isIn9Scale = function (info, dis) {
        if (dis === void 0) { dis = 1; }
        return (Math.abs(this._index9.x - info.index9.x) <= dis && Math.abs(this._index9.y - info.index9.y) <= dis);
    };
    Object.defineProperty(SelfGameObjectInfo.prototype, "targetShowHalfWidth", {
        get: function () {
            if (this._target instanceof MonsterGameObjectInfo) {
                return this._target.cvo.showHalfWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    SelfGameObjectInfo.prototype.isInAttackRect = function (showMsg, target) {
        if (showMsg === void 0) { showMsg = false; }
        if (this._target == null)
            return false;
        var currentSkill = Manager.model.getSkill().currentSkill;
        if (currentSkill == null)
            return false;
        var dis = egret.Point.distance(new egret.Point(this.x, this.y), (target == null) ? new egret.Point(this._target.x, this._target.y) : new egret.Point(target.x, target.y));
        if (dis <= (currentSkill.cvo.maxRange + this.targetShowHalfWidth))
            return true;
        return false;
    };
    SelfGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(SelfGameObject, this);
        return this._view;
    };
    SelfGameObjectInfo.prototype.collect = function (collectionInfo, callback, target) {
        if (collectionInfo == null)
            return;
        this._collectionInfoCallBack = callback;
        this._collectionInfoTarget = target;
        var dis = egret.Point.distance(new egret.Point(this.x, this.y), new egret.Point(collectionInfo.x, collectionInfo.y));
        if (dis > 200) {
            if (this._view != null) {
                this._view.eventWalk([new egret.Point(this.x, this.y), new egret.Point(collectionInfo.x, collectionInfo.y)], 1, this.gotoCollectionComplete, this);
            }
        }
        else {
            this.gotoCollectionComplete();
        }
    };
    SelfGameObjectInfo.prototype.gotoCollectionComplete = function () {
        // this.updateStyle(1001, 0, 0);
        Manager.model.self.updateIsingState(BodyStateManger.ISING_COLLECT, true);
        Manager.view.show(132 /* CollectEffect */, "caiji", this._collectionInfoCallBack, this._collectionInfoTarget);
        this._collectionInfoTarget = null;
        this._collectionInfoCallBack = null;
    };
    SelfGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._target = null;
    };
    return SelfGameObjectInfo;
}(PlayerGameObjectInfo));
//# sourceMappingURL=SelfGameObjectInfo.js.map